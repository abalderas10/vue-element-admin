/** Ejemplos - Módulo de Gráficos (Template Original) **/

import Layout from '@/layout'

const ejemplosChartsRouter = {
  path: '/ejemplos/graficos',
  component: Layout,
  redirect: '/ejemplos/graficos/keyboard',
  name: 'EjemplosGraficos',
  meta: {
    title: 'Gráficos',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Gráfico Teclado', icon: 'keyboard' }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'Gráfico de Líneas', icon: 'line' }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Gráfico Mixto', icon: 'mix' }
    }
  ]
}

export default ejemplosChartsRouter
