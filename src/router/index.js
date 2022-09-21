/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter, { RouterLink } from "vue-router";
import store from "@/store";
import { authRoutes, defaultPage } from "./modules/routes";
import { Message } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "LoginView",
    meta: {},
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "HomeView",
    meta: {
      auth: false,
    },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "AboutView",
    meta: {
      roles: ["editor"],
    },
    component: () => import("../views/AboutView.vue"),
  },
  /* 对于动态路由而言最好不要在默认路由中加上, 因为这样除了默认路由不会报404, 后面新增的动态路由均会报404 */
  // {
  //   path: "/:catchAll(.*)",
  //   name: "default",
  //   component: () => import("../views/common/404.vue"),
  // },
  /* 可以选择在动态路由添加结束后再单独动态添加404路由<具体详见router-plugin-one插件中的配置> */
];

const creatRouter = () => {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
};

const router = creatRouter();

// 页面是否刷新标志位, 防止动态添加死循环;
let first = true;

router.beforeEach((to, from, next) => {
  const { path } = to;
  const { token, routers, roles } = store.getters;
  if (!token) {
    path === "/login" ? next() : next({ path: "/login" });
  } else {
    if (routers && first) {
      routers.forEach((e) => (e.component = routerParsing(e.name)));
      addRoutes(routers, false);
      next({ ...to, replace: true });
    }
    if (routers && !first) next();
    if (!routers) {
      const auth = hasPermissionRouter(roles);
      const roleRouter = [...routes, ...auth];
      // 利用concat在数组最末端添加上404路由保证匹配404页面
      addRoutes(roleRouter, false);
      store.commit("setRouters", roleRouter);
      next({ ...to, replace: true });
    }
  }
});

// 动态添加路由公共模块;
const addRoutes = (list, flag) => {
  list.concat([{ ...defaultPage }]).map((t) => {
    router.addRoute({ ...t });
  });
  router.options.routes = list;
  first = flag;
};

// 因为本地存储无法存储component属性, 故在利用本地存储的routers需要关联上component再利用addRouter添加;
// 如不使用这种方式, 直接使用本地存储的routers进行addRouter, 会找不到对应路由的组件;
// 解析对应路由component;
const routerParsing = (name) => {
  //对路由的component解析
  return (resolve) => require([`@/views/${name}.vue`], resolve);
};

// 获取对应角色的路由list
const hasPermissionRouter = (roles) => {
  let arr = [];
  roles.map((t, i) => {
    arr.push(authRoutes.filter((e) => e.meta.roles.includes(t)));
  });
  return arr.flat(Infinity);
};

// 重置路由
export const restRouter = () => {
  const newRouter = creatRouter(true);
  router.matcher = newRouter.matcher;
  store.dispatch("logout");
};

export default router;
