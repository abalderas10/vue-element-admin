/** Elementos de Plantilla - Módulo Consolidado (Template Original) **/

import Layout from '@/layout'

const templateElementsRouter = {
  path: '/template-elements',
  component: Layout,
  redirect: '/template-elements/dashboard',
  name: 'TemplateElements',
  meta: {
    title: 'Elementos de Plantilla',
    icon: 'component'
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/admin/index'),
      name: 'TemplateDashboard',
      meta: {
        title: 'Dashboard Original',
        icon: 'dashboard'
      }
    },
    {
      path: 'documentation',
      component: () => import('@/views/documentation/index'),
      name: 'TemplateDocumentation',
      meta: {
        title: 'Documentación',
        icon: 'documentation'
      }
    },
    {
      path: 'guide',
      component: () => import('@/views/guide/index'),
      name: 'TemplateGuide',
      meta: {
        title: 'Guía',
        icon: 'guide'
      }
    },
    {
      path: 'permissions',
      component: () => import('@/views/permission/page'),
      name: 'TemplatePermissions',
      meta: {
        title: 'Permisos',
        icon: 'lock'
      }
    },
    {
      path: 'icons',
      component: () => import('@/views/icons/index'),
      name: 'TemplateIcons',
      meta: {
        title: 'Iconos',
        icon: 'icon'
      }
    },
    {
      path: 'example',
      component: () => import('@/views/example/list'),
      name: 'TemplateExample',
      meta: {
        title: 'Ejemplos',
        icon: 'el-icon-s-help'
      }
    },
    {
      path: 'tab',
      component: () => import('@/views/tab/index'),
      name: 'TemplateTab',
      meta: {
        title: 'Pestañas',
        icon: 'tab'
      }
    },
    {
      path: 'error-pages',
      component: () => import('@/views/error-page/404'),
      name: 'TemplateErrorPages',
      meta: {
        title: 'Páginas de Error',
        icon: '404'
      }
    },
    {
      path: 'error-log',
      component: () => import('@/views/error-log/index'),
      name: 'TemplateErrorLog',
      meta: {
        title: 'Registro de Errores',
        icon: 'bug'
      }
    },
    {
      path: 'excel',
      component: () => import('@/views/excel/export-excel'),
      name: 'TemplateExcel',
      meta: {
        title: 'Excel',
        icon: 'excel'
      }
    },
    {
      path: 'zip',
      component: () => import('@/views/zip/index'),
      name: 'TemplateZip',
      meta: {
        title: 'ZIP',
        icon: 'zip'
      }
    },
    {
      path: 'pdf',
      component: () => import('@/views/pdf/index'),
      name: 'TemplatePDF',
      meta: {
        title: 'PDF',
        icon: 'pdf'
      }
    },
    {
      path: 'theme',
      component: () => import('@/views/theme/index'),
      name: 'TemplateTheme',
      meta: {
        title: 'Tema',
        icon: 'theme'
      }
    },
    {
      path: 'clipboard',
      component: () => import('@/views/clipboard/index'),
      name: 'TemplateClipboard',
      meta: {
        title: 'Portapapeles',
        icon: 'clipboard'
      }
    }
  ]
}

export default templateElementsRouter
