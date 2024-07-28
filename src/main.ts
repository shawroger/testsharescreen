import { createApp } from "vue";
import { createVuestic } from "vuestic-ui";

// css
import "./style.css";
import "./tailwind.css";
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

// vue-router is not included in the Vuestic UI plugin
import App from "./App.vue";
import { router } from "./router";

// pinia
import { createPinia } from "pinia";
import { autoStorageState }  from "./store/plugins";

createApp(App)
    .use(router)
    .use(createPinia().use(autoStorageState))
    .use(
        createVuestic()
    )
    .mount("#app");
