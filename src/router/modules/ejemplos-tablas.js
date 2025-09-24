/** Ejemplos - Módulo de Tablas (Template Original) **/

import Layout from '@/layout'

const ejemplosTablasRouter = {
  path: '/ejemplos/tablas',
  component: Layout,
  redirect: '/ejemplos/tablas/dynamic-table',
  name: 'EjemplosTablas',
  meta: {
    title: 'Tablas',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable',
      meta: { title: 'Tabla Dinámica', icon: 'table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Tabla Arrastrable', icon: 'drag' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Tabla Edición en Línea', icon: 'edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Tabla Compleja', icon: 'complex' }
    }
  ]
}

export default ejemplosTablasRouter
