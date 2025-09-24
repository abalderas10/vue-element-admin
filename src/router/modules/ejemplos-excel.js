/** Ejemplos - Módulo de Excel (Template Original) **/

import Layout from '@/layout'

const ejemplosExcelRouter = {
  path: '/ejemplos/excel',
  component: Layout,
  redirect: '/ejemplos/excel/export-excel',
  name: 'EjemplosExcel',
  meta: {
    title: 'Excel',
    icon: 'excel'
  },
  children: [
    {
      path: 'export-excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'ExportExcel',
      meta: { title: 'Exportar Excel', icon: 'export' }
    },
    {
      path: 'export-selected-excel',
      component: () => import('@/views/excel/select-excel'),
      name: 'SelectExcel',
      meta: { title: 'Exportar Seleccionado', icon: 'export-selected' }
    },
    {
      path: 'export-merge-header',
      component: () => import('@/views/excel/merge-header'),
      name: 'MergeHeader',
      meta: { title: 'Combinar Encabezados', icon: 'merge' }
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/excel/upload-excel'),
      name: 'UploadExcel',
      meta: { title: 'Subir Excel', icon: 'upload' }
    }
  ]
}

export default ejemplosExcelRouter
