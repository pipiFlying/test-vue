/* eslint-disable no-unused-vars */
import router from "@/router";
import { authRoutes, defaultPage } from "./router";

export default {
  install: (app, option) => {
    console.log(app, "app");
    console.log(router, "router");
    console.log(router.matcher.getRoutes(), "routerbefore");
    authRoutes.map((item) => {
      const {
        meta: { auth },
      } = item;
      if (!auth) return;
      router.addRoute({ ...item });
    });
    router.addRoute({ ...defaultPage });
    router.options.routes = router.matcher.getRoutes();
    console.log(router.matcher.getRoutes(), "routerafter");
  },
};
