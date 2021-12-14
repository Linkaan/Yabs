import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import { RouteConfig } from 'vue-router/types/router';
import UsersModule from '@/store/modules/UsersModule';

Vue.use(VueRouter);

function loadView(view: string): object {
  return (): object => import(`@/views/${view}.vue`);
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'start',
    component: loadView('Start'),
  },
  {
    path: '/users/:id',
    name: 'profile',
    component: loadView('ProfileView'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: loadView('AdminView'),
    children: [
      {path: '', component: loadView('AdminDashboardView')},
      {path: 'loans', component: loadView('AdminLoansView')},
      {path: 'titles', component: loadView('AdminTitlesView')},
      {path: 'titles/:id', component: loadView('AdminTitlesEditView')},
      {path: 'books', component: loadView('AdminBooksView')},
      {path: 'books/:id', component: loadView('EditBookView')},
      {path: 'cards', component: loadView('AdminCardsView')},
      {path: 'users', component: loadView('AdminUsersView')},
    ]
  },
  {
    path: '/find',
    name: 'find',
    component: loadView('FindView'),
  },
  {
    path: '/library',
    name: 'library',
    component: loadView('LibraryView'),
  },
  {
    path: '/login',
    name: 'login',
    component: loadView('LogInView'),
  }
];
const options: RouterOptions = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
};
const router = new VueRouter(options);
export default router;

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'start' && !UsersModule.currentUser) next({ name: 'login' });
  //else if (to.name !== 'start' && !UsersModule.currentUser) next({ name: 'login' });
  else next();
});
