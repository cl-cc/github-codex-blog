import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Tools from '../views/Tools.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/tools', name: 'tools', component: Tools },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;
