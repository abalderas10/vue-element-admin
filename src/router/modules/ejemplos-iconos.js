/** Ejemplos - Módulo de Iconos (Template Original) **/

import Layout from '@/layout'

const ejemplosIconosRouter = {
  path: '/ejemplos/iconos',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/icons/index'),
      name: 'Icons',
      meta: { title: 'Iconos', icon: 'icon', noCache: true }
    }
  ]
}

export default ejemplosIconosRouter
