import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './views/Inicio.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('./views/Inicio.vue')
    },
    {
      path: '/pendientes',
      name: 'pendientes',
      component: () => import('./views/agenda/Pendientes.vue')
    },
    {
      path: '/citas',
      name: 'citas',
      component: () => import('./views/agenda/Citas.vue')
    },
    {
      path: '/llamadas',
      name: 'llamadas',
      component: () => import('./views/agenda/Llamadas.vue')
    },
    {
      path: '/tramites',
      name: 'tramites',
      component: () => import('./views/agenda/Tramites.vue')
    },
    {
      path: '/configuracion',
      name: 'configuracion',
      component: () => import('./views/configuraciones/Configuracion.vue')
    },
    {
      path: '/ayuda',
      name: 'ayuda',
      component: () => import('./views/configuraciones/Ayuda.vue')
    },
    {
      path: '/pagos',
      name: 'pagos',
      component: () => import('./views/seguros/Pagos.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('./views/seguros/Clientes/Clientes.vue')
    },
    {
      path: '/polizas',
      name: 'polizas',
      component: () => import('./views/seguros/Polizas.vue')
    },
    {
      path: '/renovaciones',
      name: 'renovaciones',
      component: () => import('./views/seguros/Renovaciones.vue')
    }
  ]
})
