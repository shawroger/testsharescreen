import { defineStore } from "pinia";

export const useMetaStore = defineStore("meta", {
    state() {
        return {
            title: __TITLE__,
            anthor: "Roger",
            year: "2024",
        };
    },
});
