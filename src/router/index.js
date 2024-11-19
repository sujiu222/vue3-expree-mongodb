import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue"),
  },
  {
    path: "/news/:id",
    name: "New",
    component: () => import("../views/New.vue"),
  },
  {
    path: "/Product",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});
router.afterEach(() => {
  nprogress.done();
});

export default router;
