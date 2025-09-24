/** CreaConstruye - Módulo Ecosistema y Comunidad **/

import Layout from '@/layout'

const creaConstruyeEcosistemaRouter = {
  path: '/ecosistema-comunidad',
  component: Layout,
  redirect: '/ecosistema-comunidad/comunidad',
  name: 'EcosistemaComunidad',
  meta: {
    title: 'Ecosistema y Comunidad',
    icon: 'community'
  },
  children: [
    // COMUNIDAD
    {
      path: 'comunidad',
      component: () => import('@/views/crea-construye/ecosistema/comunidad/index'),
      name: 'Comunidad',
      meta: {
        title: 'Comunidad',
        icon: 'people'
      }
    },

    // CONTENIDO Y APRENDIZAJE
    {
      path: 'contenido-aprendizaje',
      component: () => import('@/views/crea-construye/ecosistema/contenido-aprendizaje/index'),
      name: 'ContenidoAprendizaje',
      meta: {
        title: 'Contenido y Aprendizaje',
        icon: 'education'
      }
    },

    // ANALYTICS
    {
      path: 'analytics',
      component: () => import('@/views/crea-construye/ecosistema/analytics/index'),
      name: 'Analytics',
      meta: {
        title: 'Analytics',
        icon: 'data'
      }
    }
  ]
}

export default creaConstruyeEcosistemaRouter
