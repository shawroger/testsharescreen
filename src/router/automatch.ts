import { computed, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { routePaths } from "./index";

export function autoMatchRoute(page: Ref<number>) {
    const route = useRoute();
    const routeFullPath = computed(() => route.fullPath.slice(1));
    function matchRoute() {
        page.value = routePaths.findIndex((e) => e === route.path);
    }

    watch(routeFullPath, () => {
        matchRoute();
    });

    matchRoute();
}
