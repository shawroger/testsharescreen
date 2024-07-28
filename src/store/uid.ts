import { uid } from "uid";
import { defineStore } from "pinia";

export const useUID = defineStore("uid", {
    state() {
        return {
            uid: uid(16),
        };
    },
    actions: {
        resetUID() {
            this.uid = uid(16);
        },
    },
});
