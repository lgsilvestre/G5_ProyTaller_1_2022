import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    
  },
  {
    path: '/adoptame',
    name: 'Adoptame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Catalog.vue')
  },
  {
    path: '/eventos',
    name: 'Eventos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "eventos" */ '../views/Eventos.vue')
  },
  {
    path: '/aportes',
    name: 'Aportes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "aportes" */ '../views/Aportes.vue')
  },
  {
    path: '/tenenciaResponsable',
    name: 'TenenciaResponsable',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "aportes" */ '../views/TenenciaResponsable.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    meta: { guest: true },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue'),
    meta: { guest: true },

  },
  {
    path: '/crudMascotas',
    name: 'CrudMascotas',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrudMascotas.vue'),
    meta: { logged: true },
  },
  // {
  //   path: '/adoptame/:id',
  //   name: 'Adoptame',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Adoptame.vue'),
  // }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    var loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      next("/");
      return;
    }
    else{
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.logged)) {
    var loggedIn = localStorage.getItem('token')
    if (loggedIn) {
      next();
      return;
    }
    else{
      next("/");
    }
  } else {
    next();
  }
});
export default router
