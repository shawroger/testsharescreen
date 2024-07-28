<script lang="ts" setup>
import { ref, watch } from "vue";
import Peer, { MediaConnection } from "peerjs";
import ClipBoard from "clipboardy";
import { useDebounceFn, useKeyPress } from "vue-hooks-plus";
import shareScreenSrc from "../../assets/shareScreen.png";
import { useUID } from "../../store/uid";
import { useToast } from "vuestic-ui";
import { combineAudioStream } from "../../utils/webrtc/combine";
import { closePeer } from "../../utils/webrtc/connect";

const findStream = ref(false); // 是否找到流
const videoIsPlay = ref(false); // 视频是否播放
const videoIsFitscreen = ref(false); // 视频是否网页全屏
const videoVolume = ref(0); // 视频音量
const videoIsMuted = ref(false); // 视频是否静音
const screenVideo = ref(null as HTMLVideoElement | null); // 屏幕分享 DOM
const localStream = ref(null as MediaStream | null);
let currentPeer: null | MediaConnection = null;

const UIDStore = useUID();
const { notify } = useToast();

function changeVideoPlay() {
    if (!screenVideo.value) return;
    if (videoIsPlay.value) {
        screenVideo.value.pause();
        videoIsPlay.value = false;
    } else {
        screenVideo.value.play();
        videoIsPlay.value = true;
    }
}

function videoFitscreen() {
    if (!screenVideo.value) return;
    videoIsFitscreen.value = !videoIsFitscreen.value;
    const app = document.getElementById("app");
    if (app) app.style.display = videoIsFitscreen.value ? "none" : "block";
}

function findScreenStream() {
    closePeer(currentPeer, localStream.value);
    const peerInstance = new Peer(UIDStore.uid);
    window.navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then(async (videoStream) => {
            const audioStream = await window.navigator.mediaDevices
                .getUserMedia({ audio: true })
                .catch((e) => {
                    notify({
                        color: "danger",
                        message: "无法获取音频流：" + e,
                        position: "bottom-right",
                    });
                    throw e;
                });

            const combineStream = combineAudioStream([
                videoStream,
                audioStream,
            ]);
            return new MediaStream([
                ...videoStream.getVideoTracks(),
                ...combineStream.getAudioTracks(),
            ]);
        })
        .then((stream) => {
            findStream.value = true;
            localStream.value = stream;
            if (screenVideo.value !== null) {
                screenVideo.value.srcObject = stream;
                screenVideo.value.play();
                screenVideo.value.muted = true;
                videoIsMuted.value = true;
                videoVolume.value = 100;
                videoIsPlay.value = true;
            }

            return stream;
        })
        .then((stream) => {
            peerInstance.on("call", (call) => {
                call.answer(stream);
                currentPeer = call;
                console.log("接收到来自 " + call.peer + " 的请求");
            });
            return stream;
        })
        .catch((e) => {
            notify({
                color: "danger",
                message: "无法获取屏幕分享：" + e,
                position: "bottom-right",
            });
            console.error(e);
        });

    window.addEventListener("beforeunload", () => {
        closePeer(currentPeer, localStream.value);
    });
}

function videoFullscreen() {
    if (!screenVideo.value) return;
    screenVideo.value.requestFullscreen();
}

useKeyPress("Space", changeVideoPlay);
useKeyPress("1", videoFitscreen);
useKeyPress("2", videoFullscreen);

const changeVideoVolumn = useDebounceFn(
    (value: number) => {
        if (!screenVideo.value) return;
        screenVideo.value.volume = value / 100;
    },
    {
        wait: 500,
    }
);

watch(videoVolume, (c) => {
    changeVideoVolumn.run(c);
});

function toggleVolume() {
    if (!screenVideo.value) return;
    videoIsMuted.value = !videoIsMuted.value;
    screenVideo.value.muted = !screenVideo.value.muted;
}

function copyUID() {
    const uid = UIDStore.uid;
    const url = window.location.href.split("#")[0] + "#/~receive?uid=" + uid;
    ClipBoard.write(url).then(() => {
        notify({
            message: "复制成功：" + url,
            position: "bottom-right",
        });
    });
}
</script>

<template>
    <div class="mt-5">
        <VaCard class="m-auto flex flex-col w-5/6 mb-4">
            <VaCardTitle class="text-lg"> 分享 Share Panel </VaCardTitle>
            <VaCardContent>
                <div class="flex items-end">
                    <VaInput
                        readonly
                        label="当前的 UID"
                        class="grow w-24 md:w-auto"
                        v-model="UIDStore.uid"
                    />
                    <div class="flex grow-0 flex-row justify-end ml-4">
                        <VaButton
                            @click="copyUID"
                            style="height: 34px"
                            round
                            class="grow-0 ml-2"
                            icon="content_copy"
                        />
                        <VaButton
                            @click="UIDStore.resetUID"
                            style="height: 34px"
                            round
                            class="grow-0 ml-2"
                            icon="autorenew"
                        />
                    </div>
                </div>
            </VaCardContent>
        </VaCard>

        <Teleport to="body" :disabled="!videoIsFitscreen">
            <div class="relative">
                <video
                    v-show="findStream"
                    class="w-5/6 m-auto shadow-md"
                    :class="{ 'video-fit-screen': videoIsFitscreen }"
                    ref="screenVideo"
                    autoplay
                    controls
                ></video>
                <VaButton
                    v-show="findStream"
                    round
                    class="ml-3 absolute opacity-20 hover:opacity-100 top-[0.5em]"
                    :style="{
                        right: videoIsFitscreen
                            ? '1em'
                            : 'calc(8.33333% + 0.5em)',
                    }"
                    @click="videoFitscreen"
                    icon="fit_screen"
                />
            </div>
        </Teleport>
        <img
            @click="findScreenStream"
            v-show="!findStream"
            :src="shareScreenSrc"
            class="lg:w-1/3 md:w-1/2 w-2/3 m-auto mt-10 shadow-md hover:shadow-lg cursor-pointer"
            alt="shareScreen"
        />
        <!-- <div
            class="w-5/6 m-auto p-2 bg-gray-200 flex items-center justify-end"
            v-if="findStream"
        >
            <div class="ml-4">
                <VaSlider
                    color="#154EC1"
                    class="w-40"
                    v-model="videoVolume"
                    track-label-visible
                />
            </div>
            <Teleport to="body" :disabled="!videoIsFitscreen">
                <div
                    class="grow-0"
                    :class="{ 'video-fit-screen-btn': videoIsFitscreen }"
                >
                    <VaButton
                        round
                        class="ml-3"
                        @click="toggleVolume"
                        :icon="videoIsMuted ? 'volume_off' : 'volume_up'"
                        color="#154EC1"
                        v-show="!videoIsFitscreen"
                    />
                    <VaButton
                        round
                        class="ml-3"
                        @click="findScreenStream"
                        icon="preview"
                        color="#154EC1"
                        v-show="!videoIsFitscreen"
                    />

                    <VaButton
                        :disabled="!findStream"
                        round
                        class="ml-3"
                        @click="videoFitscreen"
                        icon="fit_screen"
                        color="#154EC1"
                        :class="{
                            'opacity-20 hover:opacity-100': videoIsFitscreen,
                        }"
                    />

                    <VaButton
                        :disabled="!findStream"
                        round
                        class="ml-3"
                        @click="videoFullscreen"
                        icon="fullscreen"
                        color="#154EC1"
                        v-show="!videoIsFitscreen"
                    />

                    <VaButton
                        round
                        class="ml-3"
                        @click="changeVideoPlay"
                        :icon="videoIsPlay ? 'pause' : 'play_arrow'"
                        color="#154EC1"
                        v-show="!videoIsFitscreen"
                    />
                </div>
            </Teleport>
        </div> -->
    </div>
</template>

<style scoped>
.video-fit-screen {
    object-fit: cover;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed;
    top: 0;
    left: 0;
}
</style>
