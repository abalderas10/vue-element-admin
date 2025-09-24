/** CreaConstruye - Módulo de Gestión de Proyectos **/

import Layout from '@/layout'

const creaConstruyeProyectosRouter = {
  path: '/gestion-proyectos',
  component: Layout,
  redirect: '/gestion-proyectos/dashboard',
  name: 'GestionProyectos',
  meta: {
    title: 'Gestión de Proyectos',
    icon: 'project'
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/crea-construye/proyectos/dashboard'),
      name: 'DashboardProyectos',
      meta: {
        title: 'Dashboard de Proyectos',
        icon: 'dashboard'
      }
    },
    {
      path: 'mis-proyectos',
      component: () => import('@/views/crea-construye/proyectos/mis-proyectos/index'),
      name: 'MisProyectos',
      meta: {
        title: 'Mis Proyectos',
        icon: 'list'
      }
    },
    {
      path: 'nuevo-proyecto',
      component: () => import('@/views/crea-construye/proyectos/nuevo-proyecto/index'),
      name: 'NuevoProyecto',
      meta: {
        title: 'Nuevo Proyecto',
        icon: 'plus'
      }
    }
  ]
}

export default creaConstruyeProyectosRouter
