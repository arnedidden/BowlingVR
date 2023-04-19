import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/leaderbord',
    component: () => import('pages/LeaderbordOverzicht.vue'),
  },
];

export default routes;
