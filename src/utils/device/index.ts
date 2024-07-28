

export async function getMediaDevices() {
    try {
        const deviceInfos = await window.navigator.mediaDevices.enumerateDevices();
        console.log("deviceInfos: ", deviceInfos);
        
    } catch (error) {
        console.error("Error: ", error);
    }
}


