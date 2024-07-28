import { MediaConnection } from "peerjs";

export function closePeer(
    currentPeer: null | MediaConnection,
    stream: null | MediaStream
) {
    if (!currentPeer || !stream) return;

    const videoTrack = stream.getVideoTracks()[0];
    const sender = currentPeer.peerConnection
        .getSenders()
        .find((s) => s && s.track && s.track.kind == videoTrack.kind);

    if (sender) {
        currentPeer.peerConnection.removeTrack(sender);
    }

    stream.getTracks().forEach((track) => {
        track.stop();
    });
}
