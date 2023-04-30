import { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  CONFIGURATIE_OVERZICHT: 'configuratie',
  LEADERBORD: 'leaderbord'
};


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') },
      {
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,
        path: '/configuratie', component: () => import('pages/ConfiguratieOverzicht.vue') },
      {
        name: ROUTE_NAMES.LEADERBORD,
        path: '/leaderbord', component: () => import('pages/LeaderbordOverzicht.vue'),
      },
  ],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
