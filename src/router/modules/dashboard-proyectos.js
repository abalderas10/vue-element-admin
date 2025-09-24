/** CreaConstruye - Dashboard y Proyectos Module **/

import Layout from '@/layout'

const dashboardProyectosRouter = {
  path: '/dashboard-cc',
  component: Layout,
  redirect: '/dashboard-cc/resumen',
  name: 'DashboardCreaConstruye',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'resumen',
      component: () => import('@/views/crea-construye/dashboard/resumen'),
      name: 'ResumenEjecutivo',
      meta: {
        title: 'Resumen Ejecutivo',
        icon: 'chart',
        affix: true
      }
    },
    {
      path: 'metricas',
      component: () => import('@/views/crea-construye/dashboard/metricas'),
      name: 'MetricasClave',
      meta: {
        title: 'Métricas Clave',
        icon: 'skill'
      }
    },
    {
      path: 'estado-proyectos',
      component: () => import('@/views/crea-construye/dashboard/estado-proyectos'),
      name: 'EstadoProyectos',
      meta: {
        title: 'Estado de Proyectos',
        icon: 'list'
      }
    }
  ]
}

const misProyectosRouter = {
  path: '/mis-proyectos',
  component: Layout,
  redirect: '/mis-proyectos/activos',
  name: 'MisProyectos',
  meta: {
    title: 'Mis Proyectos',
    icon: 'component'
  },
  children: [
    {
      path: 'activos',
      component: () => import('@/views/crea-construye/proyectos/activos'),
      name: 'ProyectosActivos',
      meta: {
        title: 'Proyectos Activos',
        icon: 'eye-open'
      }
    },
    {
      path: 'finalizados',
      component: () => import('@/views/crea-construye/proyectos/finalizados'),
      name: 'ProyectosFinalizados',
      meta: {
        title: 'Proyectos Finalizados',
        icon: 'example'
      }
    },
    {
      path: 'plantillas',
      component: () => import('@/views/crea-construye/proyectos/plantillas'),
      name: 'PlantillasGuardadas',
      meta: {
        title: 'Plantillas Guardadas',
        icon: 'clipboard'
      }
    },
    {
      path: 'nuevo-proyecto',
      component: () => import('@/views/crea-construye/proyectos/nuevo-proyecto'),
      name: 'NuevoProyecto',
      meta: {
        title: 'Nuevo Proyecto',
        icon: 'edit',
        noCache: true
      }
    },
    {
      path: 'iniciar-proforma',
      component: () => import('@/views/crea-construye/proyectos/iniciar-proforma'),
      name: 'IniciarProforma',
      meta: {
        title: 'Iniciar Proforma',
        icon: 'money',
        noCache: true
      }
    }
  ]
}

export { dashboardProyectosRouter, misProyectosRouter }
