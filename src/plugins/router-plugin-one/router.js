const authRoutes = [
  {
    path: "/fix",
    name: "fix",
    meta: {
      auth: false,
    },
    component: () => import("@/views/FixView.vue"),
  },
  {
    path: "/my",
    name: "my",
    meta: {
      auth: true,
    },
    component: () => import("@/views/MyView.vue"),
  },
];
const defaultPage = {
  path: "/:catchAll(.*)",
  name: "default",
  meta: {
    auth: false,
  },
  component: () => import("@/views/common/404.vue"),
};

export { authRoutes, defaultPage };
