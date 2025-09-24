<template>
  <div class="crea-construye-dashboard">
    <!-- Header del Dashboard -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1>🏠 Dashboard CreaConstruye</h1>
        <p class="header-subtitle">Plataforma integral para desarrollo inmobiliario con IA</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" size="large" @click="showNewProjectDialog = true">
          ➕ Nuevo Proyecto
        </el-button>
      </div>
    </div>

    <!-- Métricas Principales -->
    <el-row :gutter="20" class="metrics-section">
      <el-col :span="6">
        <el-card class="metric-card primary">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-data-line" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ dashboardMetrics.totalProjects || 0 }}</div>
              <div class="metric-label">Proyectos Totales</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card success">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-check" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ dashboardMetrics.activeProjects || 0 }}</div>
              <div class="metric-label">Proyectos Activos</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card warning">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-time" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ dashboardMetrics.pendingAnalysis || 0 }}</div>
              <div class="metric-label">Pendientes de Análisis</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card info">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-money" />
            </div>
            <div class="metric-info">
              <div class="metric-value">${{ formatCurrency(dashboardMetrics.totalInvestment) }}</div>
              <div class="metric-label">Inversión Total</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Sección de Aplicaciones SaaS -->
    <el-row :gutter="20" class="saas-apps-section">
      <el-col :span="24">
        <el-card class="saas-apps-card">
          <div slot="header" class="saas-header">
            <span>🛠️ Herramientas SaaS - Proforma Modular</span>
          </div>

          <el-row :gutter="20">
            <!-- Viabilidad y Terrenos -->
            <el-col :span="6">
              <div class="saas-app-card" @click="navigateToApp('viabilidad-terrenos')">
                <div class="app-icon">
                  <svg-icon icon-class="map" class="icon-large" />
                </div>
                <div class="app-info">
                  <h3>Viabilidad y Terrenos</h3>
                  <p>Análisis de ubicación y estimación de valor con IA</p>
                  <div class="app-stats">
                    <el-tag size="mini" type="success">8 módulos</el-tag>
                    <span class="stat-text">{{ saasMetrics.viabilityProperties }} propiedades</span>
                  </div>
                </div>
              </div>
            </el-col>

            <!-- Costos de Obra -->
            <el-col :span="6">
              <div class="saas-app-card" @click="navigateToApp('costos-obra')">
                <div class="app-icon">
                  <svg-icon icon-class="construction" class="icon-large" />
                </div>
                <div class="app-info">
                  <h3>Costos de Obra</h3>
                  <p>Estimación de costos por m² con IA</p>
                  <div class="app-stats">
                    <el-tag size="mini" type="warning">6 módulos</el-tag>
                    <span class="stat-text">{{ saasMetrics.constructionProjects }} proyectos</span>
                  </div>
                </div>
              </div>
            </el-col>

            <!-- Financiamiento -->
            <el-col :span="6">
              <div class="saas-app-card" @click="navigateToApp('financiamiento')">
                <div class="app-icon">
                  <svg-icon icon-class="bank" class="icon-large" />
                </div>
                <div class="app-info">
                  <h3>Financiamiento</h3>
                  <p>Análisis de crédito y modelado de flujos</p>
                  <div class="app-stats">
                    <el-tag size="mini" type="info">4 módulos</el-tag>
                    <span class="stat-text">{{ saasMetrics.financingAnalyses }} análisis</span>
                  </div>
                </div>
              </div>
            </el-col>

            <!-- Marketing y Ventas -->
            <el-col :span="6">
              <div class="saas-app-card" @click="navigateToApp('marketing-ventas')">
                <div class="app-icon">
                  <svg-icon icon-class="campaign" class="icon-large" />
                </div>
                <div class="app-info">
                  <h3>Marketing y Ventas</h3>
                  <p>Planificación de campañas y proyección de ventas</p>
                  <div class="app-stats">
                    <el-tag size="mini" type="primary">3 módulos</el-tag>
                    <span class="stat-text">{{ saasMetrics.marketingCampaigns }} campañas</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- Actividad Reciente -->
    <el-row :gutter="20" class="activity-section">
      <el-col :span="12">
        <el-card class="activity-card">
          <div slot="header" class="activity-header">
            <span>📈 Actividad Reciente</span>
          </div>
          <div class="activity-list">
            <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
              <div class="activity-icon">
                <i :class="activity.icon" />
              </div>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="ai-insights-card">
          <div slot="header" class="insights-header">
            <span>🤖 Insights de IA</span>
          </div>
          <div class="insights-list">
            <div v-for="(insight, index) in aiInsights" :key="index" class="insight-item">
              <div class="insight-icon">
                <i :class="insight.icon" />
              </div>
              <div class="insight-content">
                <div class="insight-title">{{ insight.title }}</div>
                <div class="insight-description">{{ insight.description }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Diálogo para Nuevo Proyecto -->
    <el-dialog
      title="➕ Crear Nuevo Proyecto"
      :visible.sync="showNewProjectDialog"
      width="50%"
    >
      <el-form :model="newProject" label-width="120px">
        <el-form-item label="Nombre del Proyecto">
          <el-input v-model="newProject.name" placeholder="Nombre del proyecto inmobiliario" />
        </el-form-item>
        <el-form-item label="Ubicación">
          <el-input v-model="newProject.location" placeholder="Ciudad, Estado, País" />
        </el-form-item>
        <el-form-item label="Tipo de Proyecto">
          <el-select v-model="newProject.type" placeholder="Seleccionar tipo" style="width: 100%">
            <el-option label="Residencial" value="Residencial" />
            <el-option label="Comercial" value="Comercial" />
            <el-option label="Industrial" value="Industrial" />
            <el-option label="Mixto" value="Mixto" />
          </el-select>
        </el-form-item>
        <el-form-item label="Presupuesto Estimado">
          <el-input-number
            v-model="newProject.budget"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewProjectDialog = false">Cancelar</el-button>
        <el-button type="primary" @click="createProject">Crear Proyecto</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DashboardCreaConstruye',
  data() {
    return {
      dashboardMetrics: {
        totalProjects: 0,
        activeProjects: 0,
        pendingAnalysis: 0,
        totalInvestment: 0
      },
      saasMetrics: {
        viabilityProperties: 0,
        constructionProjects: 0,
        financingAnalyses: 0,
        marketingCampaigns: 0
      },
      recentActivities: [],
      aiInsights: [],
      showNewProjectDialog: false,
      newProject: {
        name: '',
        location: '',
        type: '',
        budget: null
      }
    }
  },
  mounted() {
    this.loadDashboardData()
  },
  methods: {
    loadDashboardData() {
      // Simulación de carga de datos del dashboard
      this.dashboardMetrics = {
        totalProjects: 12,
        activeProjects: 8,
        pendingAnalysis: 4,
        totalInvestment: 25000000
      }

      this.saasMetrics = {
        viabilityProperties: 24,
        constructionProjects: 18,
        financingAnalyses: 15,
        marketingCampaigns: 9
      }

      this.recentActivities = [
        {
          icon: 'el-icon-plus',
          title: 'Nuevo proyecto "Torre Reforma" creado',
          time: 'Hace 2 horas'
        },
        {
          icon: 'el-icon-data-analysis',
          title: 'Análisis de viabilidad completado para "Centro Comercial Norte"',
          time: 'Hace 4 horas'
        },
        {
          icon: 'el-icon-money',
          title: 'Estimación de costos actualizada para "Residencial Sur"',
          time: 'Hace 6 horas'
        },
        {
          icon: 'el-icon-check',
          title: 'Permisos aprobados para "Plaza Industrial"',
          time: 'Hace 1 día'
        }
      ]

      this.aiInsights = [
        {
          icon: 'el-icon-trend',
          title: 'Oportunidad de Mercado Detectada',
          description: 'La IA detectó un aumento del 15% en la demanda de propiedades residenciales en la zona norte de la ciudad.'
        },
        {
          icon: 'el-icon-warning',
          title: 'Alerta de Costos',
          description: 'Los costos de construcción han aumentado un 8% en el último mes. Considere ajustar presupuestos.'
        },
        {
          icon: 'el-icon-money',
          title: 'Optimización Financiera',
          description: 'Se recomienda reestructurar el financiamiento para reducir la tasa de interés en 2 puntos porcentuales.'
        }
      ]
    },
    navigateToApp(appPath) {
      this.$router.push(`/herramientas-saas/${appPath}`)
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    },
    createProject() {
      if (this.validateNewProject()) {
        // Aquí iría la lógica para crear el proyecto
        this.$message.success('Proyecto creado exitosamente')
        this.showNewProjectDialog = false
        this.resetNewProject()
        this.loadDashboardData() // Recargar datos
      }
    },
    validateNewProject() {
      if (!this.newProject.name) {
        this.$message.error('El nombre del proyecto es requerido')
        return false
      }
      if (!this.newProject.location) {
        this.$message.error('La ubicación es requerida')
        return false
      }
      if (!this.newProject.type) {
        this.$message.error('El tipo de proyecto es requerido')
        return false
      }
      if (!this.newProject.budget || this.newProject.budget <= 0) {
        this.$message.error('El presupuesto debe ser mayor a 0')
        return false
      }
      return true
    },
    resetNewProject() {
      this.newProject = {
        name: '',
        location: '',
        type: '',
        budget: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.crea-construye-dashboard {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #0A2E5C 0%, #1565C0 100%);
  border-radius: 12px;
  color: white;

  .header-content {
    h1 {
      margin: 0;
      font-size: 2.5em;
      font-weight: 600;
    }

    .header-subtitle {
      margin: 5px 0 0 0;
      font-size: 1.1em;
      opacity: 0.9;
    }
  }

  .header-actions {
    .el-button {
      background-color: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;

      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

.metrics-section {
  margin-bottom: 30px;
}

.metric-card {
  text-align: center;
  height: 120px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &.primary {
    background: linear-gradient(135deg, #0A2E5C 0%, #1565C0 100%);
    color: white;
  }

  &.success {
    background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%);
    color: white;
  }

  &.warning {
    background: linear-gradient(135deg, #EF6C00 0%, #FF9800 100%);
    color: white;
  }

  &.info {
    background: linear-gradient(135deg, #455A64 0%, #607D8B 100%);
    color: white;
  }

  .metric-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .metric-icon {
    font-size: 2.5em;
    margin-right: 15px;
  }

  .metric-info {
    text-align: left;
  }

  .metric-value {
    font-size: 1.8em;
    font-weight: bold;
    line-height: 1;
  }

  .metric-label {
    font-size: 0.9em;
    opacity: 0.8;
    margin-top: 5px;
  }
}

.saas-apps-section {
  margin-bottom: 30px;
}

.saas-apps-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .saas-header {
    font-weight: 600;
    color: #0A2E5C;
    font-size: 1.2em;
  }
}

.saas-app-card {
  background: white;
  border: 2px solid #E1E5E9;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: #0A2E5C;
    box-shadow: 0 8px 24px rgba(10, 46, 92, 0.15);
    transform: translateY(-2px);
  }

  .app-icon {
    margin-bottom: 15px;

    .icon-large {
      font-size: 3em;
      color: #0A2E5C;
    }
  }

  .app-info {
    h3 {
      margin: 0 0 10px 0;
      color: #0A2E5C;
      font-size: 1.1em;
    }

    p {
      margin: 0 0 15px 0;
      color: #78909C;
      font-size: 0.9em;
      line-height: 1.4;
    }

    .app-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stat-text {
        font-size: 0.8em;
        color: #90A4AE;
      }
    }
  }
}

.activity-section {
  .activity-card,
  .ai-insights-card {
    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .activity-header,
    .insights-header {
      font-weight: 600;
      color: #0A2E5C;
    }
  }
}

.activity-list,
.insights-list {
  .activity-item,
  .insight-item {
    display: flex;
    align-items: flex-start;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  .activity-icon,
  .insight-icon {
    margin-right: 15px;
    color: #0A2E5C;
    font-size: 1.2em;
  }

  .activity-content,
  .insight-content {
    flex: 1;
  }

  .activity-title,
  .insight-title {
    font-weight: 500;
    color: #263238;
    margin-bottom: 5px;
  }

  .activity-time {
    font-size: 0.8em;
    color: #90A4AE;
  }

  .insight-description {
    font-size: 0.9em;
    color: #78909C;
    line-height: 1.4;
  }
}

.dialog-footer {
  text-align: right;
}
</style>
