import { RouteRecordRaw, NavigationGuardNext } from 'vue-router';
import { useAuth } from 'src/services/auth.service';

const { user, verify } = useAuth();

export const ROUTE_NAMES = {

  CONFIGURATIE_OVERZICHT: 'configuratie',
  LEADERBORD: 'leaderbord'
  ADMIN: 'admin',
  HOME: 'home'

};

const mustBeLoggedIn = async (next: NavigationGuardNext) => {
  await verify();
  if (!user.value) {
    next('/login');
  } else {
    next();
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.HOME,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/admin',
        name: ROUTE_NAMES.ADMIN,
        beforeEnter: async (to, from, next) => {
          await mustBeLoggedIn(next);
        },
        component: () => import('pages/AdminPage.vue'),
      },
      {
        path: '/:access_token(access_token=.*)',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,

        path: '/configuratie', component: () => import('pages/ConfiguratieOverzicht.vue') },
      {
        name: ROUTE_NAMES.LEADERBORD,
        path: '/leaderbord/:id', component: () => import('pages/LeaderbordOverzicht.vue'),
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
