const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    //@ts-ignore
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
};

const createEmptyVideoTrack = (params: { width: number; height: number }) => {
    const { width, height } = params;
    const canvas = Object.assign(document.createElement("canvas"), {
        width,
        height,
    });
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = "green";
    ctx!.fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
};

export const createMediaStreamFake = () => {
    return new MediaStream([
        createEmptyAudioTrack(),
        createEmptyVideoTrack({ width: 640, height: 480 }),
    ]);
};
