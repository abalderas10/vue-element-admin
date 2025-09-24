/** Ejemplos - Módulo Principal de Ejemplos (Template Original) **/

import Layout from '@/layout'

const ejemplosRouter = {
  path: '/ejemplos',
  component: Layout,
  redirect: '/ejemplos/componentes',
  name: 'Ejemplos',
  meta: {
    title: 'Ejemplos',
    icon: 'example'
  },
  children: [
    {
      path: 'componentes',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'EjemplosComponentes',
      meta: {
        title: 'Componentes',
        icon: 'component'
      }
    },
    {
      path: 'tablas',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'EjemplosTablas',
      meta: {
        title: 'Tablas',
        icon: 'table'
      }
    },
    {
      path: 'excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'EjemplosExcel',
      meta: {
        title: 'Excel',
        icon: 'excel'
      }
    },
    {
      path: 'iconos',
      component: () => import('@/views/icons/index'),
      name: 'EjemplosIconos',
      meta: {
        title: 'Iconos',
        icon: 'icon'
      }
    },
    {
      path: 'graficos',
      component: () => import('@/views/charts/keyboard'),
      name: 'EjemplosGraficos',
      meta: {
        title: 'Gráficos',
        icon: 'chart'
      }
    }
  ]
}

export default ejemplosRouter
