<script setup lang="ts">
import { useToast } from "vuestic-ui";
import { useUID } from "../store/uid";
//import { usePeer } from "../store/peer";

const UIDStore = useUID();
//const PeerStore = usePeer();
const { notify } = useToast();

function copyUID() {
    const uid = UIDStore.uid;
    window.navigator.clipboard.writeText(uid).then(() => {
        notify({
            message: "复制成功：" + uid,
            position: "bottom-right",
        });
    });
}
</script>

<template>
    <div class="mt-5">
        <VaCard class="m-auto flex flex-col xl6 sm10 xs11">
            <VaCardTitle class="text-lg"> 设置 Settings Panel </VaCardTitle>
            <VaCardContent>
                <div class="flex items-end">
                    <VaInput
                        readonly
                        label="当前的 UID"
                        class="flex-1"
                        v-model="UIDStore.uid"
                    />
                    <div class="flex flex-none flex-row justify-end ml-4">
                        <VaButton
                            @click="copyUID"
                            style="height: 34px"
                            round
                            class="flex-none"
                            icon="content_copy"
                        />
                        <VaButton
                            @click="UIDStore.resetUID"
                            style="height: 34px"
                            round
                            class="flex-none ml-2"
                            icon="autorenew"
                        />
                    </div>
                </div>
                <!-- <h1 class="mt-4 ml-1">Peer 服务器配置</h1>
                <VaInput
                    class="w-full mt-4"
                    label="服务器 Host"
                    v-model="PeerStore.host"
                />

                <div class="flex mt-3">
                    <VaInput
                    class="basis-2/3 mr-4"
                    label="服务器 Port"
                    v-model="PeerStore.port"
                />

                <VaInput
                    class="basis-1/3"
                    label="服务器 Path"
                    v-model="PeerStore.path"
                />
                </div> -->
            </VaCardContent>
        </VaCard>
    </div>
</template>

<style lang="less"></style>
