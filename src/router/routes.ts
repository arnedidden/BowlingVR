import { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  CONFIGURATIE_OVERZICHT: 'configuratie'
};


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      {
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,
        path: '/configuratie', component: () => import('pages/ConfiguratieOverzicht.vue') },
  ],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/leaderbord/:id',
    component: () => import('pages/LeaderbordOverzicht.vue'),
  },
];

export default routes;
