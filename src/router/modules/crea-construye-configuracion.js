/** CreaConstruye - Módulo Configuración y Cuenta **/

import Layout from '@/layout'

const creaConstruyeConfiguracionRouter = {
  path: '/configuracion-cuenta',
  component: Layout,
  redirect: '/configuracion-cuenta/perfil',
  name: 'ConfiguracionCuenta',
  meta: {
    title: 'Configuración y Cuenta',
    icon: 'setting'
  },
  children: [
    // PERFIL Y SEGURIDAD
    {
      path: 'perfil',
      component: () => import('@/views/crea-construye/configuracion/perfil/index'),
      name: 'Perfil',
      meta: {
        title: 'Perfil y Seguridad',
        icon: 'user'
      }
    },

    // SUSCRIPCIÓN Y PAGOS
    {
      path: 'suscripcion-pagos',
      component: () => import('@/views/crea-construye/configuracion/suscripcion-pagos/index'),
      name: 'SuscripcionPagos',
      meta: {
        title: 'Suscripción y Pagos',
        icon: 'credit-card'
      }
    },

    // NOTIFICACIONES
    {
      path: 'notificaciones',
      component: () => import('@/views/crea-construye/configuracion/notificaciones/index'),
      name: 'Notificaciones',
      meta: {
        title: 'Notificaciones',
        icon: 'notification'
      }
    },

    // SOPORTE
    {
      path: 'soporte',
      component: () => import('@/views/crea-construye/configuracion/soporte/index'),
      name: 'Soporte',
      meta: {
        title: 'Soporte',
        icon: 'support'
      }
    }
  ]
}

export default creaConstruyeConfiguracionRouter
