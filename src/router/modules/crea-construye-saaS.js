/** CreaConstruye - Módulo SaaS (Proforma Modular) **/

import Layout from '@/layout'

const creaConstruyeSaaSRouter = {
  path: '/herramientas-saas',
  component: Layout,
  redirect: '/herramientas-saas/viabilidad-terrenos',
  name: 'HerramientasSaaS',
  meta: {
    title: 'Herramientas SaaS',
    icon: 'component'
  },
  children: [
    // I. VIABILIDAD Y TERRENOS
    {
      path: 'viabilidad-terrenos',
      component: () => import('@/views/crea-construye/saas/viabilidad-terrenos/index'),
      name: 'ViabilidadTerrenos',
      meta: {
        title: 'Viabilidad y Terrenos',
        icon: 'chart'
      },
      children: [
        {
          path: 'adquisicion-terrenos',
          component: () => import('@/views/crea-construye/saas/viabilidad-terrenos/adquisicion-terrenos'),
          name: 'AppAdquisicionTerrenos',
          meta: {
            title: 'Adquisición de Terrenos',
            icon: 'map'
          }
        }
      ]
    },

    // II. COSTOS DE OBRA
    {
      path: 'costos-obra',
      component: () => import('@/views/crea-construye/saas/costos-obra/index'),
      name: 'CostosObra',
      meta: {
        title: 'Costos de Obra',
        icon: 'money'
      }
    },

    // III. FINANCIAMIENTO
    {
      path: 'financiamiento',
      component: () => import('@/views/crea-construye/saas/financiamiento/index'),
      name: 'Financiamiento',
      meta: {
        title: 'Financiamiento',
        icon: 'bank'
      }
    },

    // IV. MARKETING Y VENTAS
    {
      path: 'marketing-ventas',
      component: () => import('@/views/crea-construye/saas/marketing-ventas/index'),
      name: 'MarketingVentas',
      meta: {
        title: 'Marketing y Ventas',
        icon: 'marketing'
      }
    },

    // V. INTEGRACIÓN IA
    {
      path: 'integracion-ia',
      component: () => import('@/views/crea-construye/saas/integracion-ia/index'),
      name: 'IntegracionIA',
      meta: {
        title: 'Integración IA',
        icon: 'robot'
      }
    }
  ]
}

export default creaConstruyeSaaSRouter
