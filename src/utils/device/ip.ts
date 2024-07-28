// 获取本地 IP 地址
export function getNetworkIP(): string {
    const RTCPeerConnection =
        window.RTCPeerConnection || (window as any)["webkitRTCPeerConnection"];
    if (!RTCPeerConnection) {
        console.error("RTCPeerConnection not supported");
        return "";
    }
    const pc = new RTCPeerConnection();
    pc.createDataChannel("");
    pc.createOffer().then(pc.setLocalDescription.bind(pc));
    pc.onicecandidate = (ice) => {
        if (ice.candidate) {
            const ip = ice.candidate.candidate.split(" ")[4];
            return ip;
        }
    };
    return "";
}
