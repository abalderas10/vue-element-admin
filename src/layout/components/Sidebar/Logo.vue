<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'CreaConstruye',
      logo: '' // Logo personalizado se agregará después
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;        // Altura aumentada para mayor robustez
  line-height: 60px;
  background: #0A2E5C;  // Azul principal robusto
  text-align: center;
  overflow: hidden;
  border-bottom: 2px solid #0D47A1;  // Borde inferior robusto

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #FFFFFF;        // Blanco puro para contraste
      font-weight: 700;      // Más robusto
      line-height: 60px;     // Ajustado a nueva altura
      font-size: 16px;       // Tamaño aumentado
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  // Fuente robusta
      vertical-align: middle;
      letter-spacing: 0.5px; // Espaciado para elegancia
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
