import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../view/home.vue";
import ScreenView from "../view/screen.vue";
import ReceiveView from "../view/screen/receiveScreen.vue";
import SettingsView from "../view/settings.vue";

const routes = [
    { path: "/", component: HomeView },
    { path: "/~share", component: ScreenView },
    { path: "/~receive", component: ReceiveView },
    //{ path: "/~settings", component: SettingsView },
];

export const routePaths = routes.map((e) => e.path);

export const router = createRouter({
    routes,
    history: createWebHashHistory(),
});
