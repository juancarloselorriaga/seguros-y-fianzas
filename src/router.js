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
      path: '/agenda/pendientes',
      name: 'pendientes',
      component: () => import('./views/agenda/Pendientes.vue')
    },
    {
      path: '/agenda/citas',
      name: 'citas',
      component: () => import('./views/agenda/Citas.vue')
    },
    {
      path: '/agenda/llamadas',
      name: 'llamadas',
      component: () => import('./views/agenda/Llamadas.vue')
    },
    {
      path: '/agenda/tramites',
      name: 'tramites',
      component: () => import('./views/agenda/Tramites.vue')
    },
    {
      path: '/configuraciones/configuracion',
      name: 'configuracion',
      component: () => import('./views/configuraciones/Configuracion.vue')
    },
    {
      path: '/configuraciones/ayuda',
      name: 'ayuda',
      component: () => import('./views/configuraciones/Ayuda.vue')
    },
    {
      path: '/seguros/pagos',
      name: 'pagos',
      component: () => import('./views/seguros/Pagos.vue')
    },
    {
      path: '/seguros/polizas',
      name: 'polizas',
      component: () => import('./views/seguros/Polizas.vue')
    },
    {
      path: '/seguros/renovaciones',
      name: 'renovaciones',
      component: () => import('./views/seguros/Renovaciones.vue')
    }
  ]
})
