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
    path: '/contacto',
    name: 'Contacto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "eventos" */ '../views/Contact.vue')
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
    path: '/crud',
    name: 'Crud',
    component: () => import(/* webpackChunkName: "about" */ '../views/Crud.vue'),
    meta: { logged: true },
  },
  {
    path: '/editarFormulario/:id',
    name: 'EditorFormulario',
    component: () => import(/* webpackChunkName: "about" */ '../views/editorFormulario.vue'),
    meta:{logged:true}
  },
  {
    path: '/adoptarMascota/mascota/:id',
    name: 'adopcion',
    component: () => import(/* webpackChunkName: "about" */ '../views/adoptar.vue'),
  },
  {
    path: '/VerSolicitud/:id',
    name: 'VerSolicitud',
    component: () => import(/* webpackChunkName: "about" */ '../views/VerSolicitud.vue'),
    meta:{logged:true}
  },
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
