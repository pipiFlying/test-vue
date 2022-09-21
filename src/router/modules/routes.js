const authRoutes = [
  {
    path: "/fix",
    name: "FixView",
    meta: {
      roles: ["main"],
    },
    component: () => import("@/views/FixView.vue"),
  },
  {
    path: "/diy",
    name: "DiyView",
    meta: {
      roles: ["main"],
    },
    component: () => import("@/views/DiyView.vue"),
  },
  {
    path: "/my",
    name: "MyView",
    meta: {
      roles: ["editor"],
    },
    component: () => import("@/views/MyView.vue"),
  },
];
const defaultPage = {
  path: "/:catchAll(.*)",
  name: "default",
  component: () => import("@/views/common/404.vue"),
};

export { authRoutes, defaultPage };
