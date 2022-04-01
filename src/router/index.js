import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../views/UsersView.vue";

const routes = [
  {
    path: "/",
    name: "users",
    component: UsersView,
  },
  {
    path: "/tasks",
    name: "tasks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Tasks.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
