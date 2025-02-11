import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import { RouteConfig } from 'vue-router/types/router';

Vue.use(VueRouter);

function loadView(view: string): object {
  return (): object => import(`@/views/${view}.vue`);
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'start',
    component: loadView('StartView'),
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
    path: '/library/Interface',
    name: 'library',
    component: loadView('LibraryView')
  }
];
const options: RouterOptions = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
};
export default new VueRouter(options);
