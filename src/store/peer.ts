import { defineStore } from "pinia";

export const usePeer = defineStore("peer", {
    state() {
        return {
            host: "localhost",
            port: 9000,
            path: "/",
            targetUID: "",
        };
    },
    getters: {
        getHost(state) {
            let host = state.host;
            if (host.startsWith("http://")) {
                host = host.slice(7);
            } else if (host.startsWith("https://")) {
                host = host.slice(8);
            }
            return host;
        },
        getPort(state) {
            return state.port;
        },
        getPath: (state) => (state.path.length > 1 ? state.path : "/"),
        getPeerConfig() {
            return { host: this.getHost, port: this.getPort, path: this.getPath };
        },
    },
});
