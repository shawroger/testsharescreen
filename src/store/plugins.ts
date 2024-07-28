import { PiniaPluginContext } from "pinia";

const KEY_PREFIX = "WEBRTC_STATE_";

// 自动存储状态
export function autoStorageState(context: PiniaPluginContext) {
    const { store } = context;
    const KEY = KEY_PREFIX + store.$id.toLocaleUpperCase();
    window.addEventListener("beforeunload", () => {
        window.localStorage.setItem(KEY, JSON.stringify(store.$state));
    });

    try {
        const localData = window.localStorage.getItem(KEY);
        if (localData) store.$patch(JSON.parse(localData));
    } catch (err) {
        console.log("本地状态解析失败");
    }
}
