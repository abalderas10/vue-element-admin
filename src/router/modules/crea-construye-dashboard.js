/** CreaConstruye - Módulo Dashboard Principal **/

import Layout from '@/layout'

const creaConstruyeDashboardRouter = {
  path: '/crea-construye',
  component: Layout,
  redirect: '/crea-construye/dashboard',
  name: 'CreaConstruye',
  meta: {
    title: 'CreaConstruye',
    icon: 'component'
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/crea-construye/dashboard/resumen'),
      name: 'DashboardCreaConstruye',
      meta: {
        title: 'Dashboard Principal',
        icon: 'component'
      }
    },
    {
      path: 'metricas',
      component: () => import('@/views/crea-construye/dashboard/metricas'),
      name: 'MetricasCreaConstruye',
      meta: {
        title: 'Métricas Avanzadas',
        icon: 'component'
      }
    }
  ]
}

export default creaConstruyeDashboardRouter
