<template>
  <div class="metricas-dashboard">
    <div class="page-header">
      <h1>📈 Métricas Clave</h1>
      <p class="page-subtitle">Análisis detallado del rendimiento de la plataforma</p>
    </div>

    <!-- Filtros de Fecha -->
    <el-card class="filters-card">
      <div slot="header" class="filters-header">
        <span>📅 Filtros de Análisis</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="Período">
            <el-select v-model="dateFilter.period" placeholder="Seleccionar período" style="width: 100%">
              <el-option label="Últimos 7 días" value="7d" />
              <el-option label="Últimos 30 días" value="30d" />
              <el-option label="Últimos 3 meses" value="3m" />
              <el-option label="Último año" value="1y" />
              <el-option label="Personalizado" value="custom" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Fecha Inicio">
            <el-date-picker
              v-model="dateFilter.startDate"
              type="date"
              placeholder="Fecha inicio"
              style="width: 100%"
              :disabled="dateFilter.period !== 'custom'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Fecha Fin">
            <el-date-picker
              v-model="dateFilter.endDate"
              type="date"
              placeholder="Fecha fin"
              style="width: 100%"
              :disabled="dateFilter.period !== 'custom'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Aplicación SaaS">
            <el-select v-model="dateFilter.saasApp" placeholder="Todas las aplicaciones" style="width: 100%">
              <el-option label="Todas las aplicaciones" value="all" />
              <el-option label="Adquisición de Terrenos" value="viability" />
              <el-option label="Costos de Construcción" value="construction" />
              <el-option label="Financiamiento" value="financing" />
              <el-option label="Marketing y Ventas" value="marketing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="filter-actions">
        <el-button type="primary" @click="applyFilters">Aplicar Filtros</el-button>
        <el-button @click="resetFilters">Limpiar Filtros</el-button>
        <el-button type="success" @click="exportReport">Exportar Reporte</el-button>
      </div>
    </el-card>

    <!-- Métricas Principales -->
    <el-row :gutter="20" class="main-metrics">
      <el-col :span="8">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-user" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metrics.totalUsers || 0 }}</div>
              <div class="metric-label">Usuarios Totales</div>
              <div class="metric-change positive">
                <i class="el-icon-top" />
                +{{ metrics.userGrowth }}% vs período anterior
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-data-line" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metrics.totalProjects || 0 }}</div>
              <div class="metric-label">Proyectos Creados</div>
              <div class="metric-change positive">
                <i class="el-icon-top" />
                +{{ metrics.projectGrowth }}% vs período anterior
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-money" />
            </div>
            <div class="metric-info">
              <div class="metric-value">${{ formatCurrency(metrics.totalValue) }}</div>
              <div class="metric-label">Valor Total de Proyectos</div>
              <div class="metric-change positive">
                <i class="el-icon-top" />
                +{{ metrics.valueGrowth }}% vs período anterior
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Gráficos de Rendimiento -->
    <el-row :gutter="20" class="charts-section">
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header" class="chart-header">
            <span>📊 Uso de Aplicaciones SaaS</span>
          </div>
          <div class="chart-container">
            <div class="chart-placeholder">
              <i class="el-icon-data-line" />
              <p>Gráfico de uso por aplicación</p>
              <p>Se mostraría aquí con ECharts</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <div slot="header" class="chart-header">
            <span>📈 Crecimiento de Usuarios</span>
          </div>
          <div class="chart-container">
            <div class="chart-placeholder">
              <i class="el-icon-trend" />
              <p>Gráfico de crecimiento mensual</p>
              <p>Se mostraría aquí con ECharts</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Tabla de Métricas Detalladas -->
    <el-card class="detailed-metrics-card">
      <div slot="header" class="table-header">
        <span>📋 Métricas Detalladas por Aplicación</span>
      </div>

      <el-table
        :data="detailedMetrics"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="appName" label="Aplicación SaaS" width="200" />
        <el-table-column prop="totalUsers" label="Usuarios" width="120" />
        <el-table-column prop="activeUsers" label="Usuarios Activos" width="140" />
        <el-table-column prop="totalProjects" label="Proyectos" width="120" />
        <el-table-column prop="completionRate" label="Tasa de Completitud" width="150">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.completionRate"
              :color="getCompletionColor(scope.row.completionRate)"
              :stroke-width="8"
            />
          </template>
        </el-table-column>
        <el-table-column prop="avgTimeSpent" label="Tiempo Promedio" width="140">
          <template slot-scope="scope">
            {{ scope.row.avgTimeSpent }} min
          </template>
        </el-table-column>
        <el-table-column prop="satisfaction" label="Satisfacción" width="120">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.satisfaction"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </template>
        </el-table-column>
        <el-table-column label="Acciones" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="viewAppDetails(scope.row)"
            >
              Ver Detalles
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Insights de IA -->
    <el-card class="ai-insights-card">
      <div slot="header" class="insights-header">
        <span>🤖 Insights Automáticos de IA</span>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(insight, index) in aiInsights" :key="index" :span="8">
          <div class="insight-card">
            <div class="insight-icon">
              <i :class="insight.icon" />
            </div>
            <div class="insight-content">
              <h4>{{ insight.title }}</h4>
              <p>{{ insight.description }}</p>
              <el-tag :type="insight.type" size="small">{{ insight.impact }}</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MetricasClave',
  data() {
    return {
      dateFilter: {
        period: '30d',
        startDate: null,
        endDate: null,
        saasApp: 'all'
      },
      metrics: {
        totalUsers: 0,
        userGrowth: 0,
        totalProjects: 0,
        projectGrowth: 0,
        totalValue: 0,
        valueGrowth: 0
      },
      detailedMetrics: [],
      aiInsights: []
    }
  },
  mounted() {
    this.loadMetricsData()
  },
  methods: {
    loadMetricsData() {
      // Simulación de carga de métricas
      this.metrics = {
        totalUsers: 1247,
        userGrowth: 12.5,
        totalProjects: 89,
        projectGrowth: 8.3,
        totalValue: 45670000,
        valueGrowth: 15.7
      }

      this.detailedMetrics = [
        {
          appName: 'Adquisición de Terrenos',
          totalUsers: 234,
          activeUsers: 189,
          totalProjects: 45,
          completionRate: 78,
          avgTimeSpent: 25,
          satisfaction: 4.2
        },
        {
          appName: 'Costos de Construcción',
          totalUsers: 198,
          activeUsers: 156,
          totalProjects: 38,
          completionRate: 82,
          avgTimeSpent: 32,
          satisfaction: 4.5
        },
        {
          appName: 'Financiamiento',
          totalUsers: 167,
          activeUsers: 134,
          totalProjects: 28,
          completionRate: 71,
          avgTimeSpent: 28,
          satisfaction: 4.1
        },
        {
          appName: 'Marketing y Ventas',
          totalUsers: 145,
          activeUsers: 112,
          totalProjects: 22,
          completionRate: 68,
          avgTimeSpent: 22,
          satisfaction: 3.9
        }
      ]

      this.aiInsights = [
        {
          icon: 'el-icon-trend',
          title: 'Crecimiento Acelerado',
          description: 'La aplicación de Adquisición de Terrenos muestra un crecimiento del 23% en usuarios activos.',
          type: 'success',
          impact: 'Alto Impacto'
        },
        {
          icon: 'el-icon-warning',
          title: 'Área de Mejora',
          description: 'La satisfacción en Marketing y Ventas es menor al promedio. Considerar mejoras en UX.',
          type: 'warning',
          impact: 'Medio Impacto'
        },
        {
          icon: 'el-icon-money',
          title: 'Optimización de Recursos',
          description: 'Los usuarios pasan más tiempo en Costos de Construcción, lo que indica mayor complejidad.',
          type: 'info',
          impact: 'Bajo Impacto'
        }
      ]
    },
    applyFilters() {
      console.log('Aplicando filtros:', this.dateFilter)
      this.loadMetricsData()
      this.$message.success('Filtros aplicados correctamente')
    },
    resetFilters() {
      this.dateFilter = {
        period: '30d',
        startDate: null,
        endDate: null,
        saasApp: 'all'
      }
      this.loadMetricsData()
    },
    exportReport() {
      this.$message.success('Reporte exportado correctamente')
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    },
    getCompletionColor(rate) {
      if (rate >= 80) return '#67C23A'
      if (rate >= 60) return '#E6A23C'
      return '#F56C6C'
    },
    viewAppDetails(app) {
      this.$message.info(`Viendo detalles de: ${app.appName}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.metricas-dashboard {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #0A2E5C;
    font-size: 2.5em;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .page-subtitle {
    color: #455A64;
    font-size: 1.2em;
    margin: 0;
  }
}

.filters-card {
  margin-bottom: 20px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .filters-header {
    font-weight: 600;
    color: #0A2E5C;
  }

  .filter-actions {
    text-align: right;
    margin-top: 20px;
  }
}

.main-metrics {
  margin-bottom: 20px;
}

.metric-card {
  text-align: center;
  height: 120px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .metric-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .metric-icon {
    font-size: 2.5em;
    margin-right: 15px;
    color: #0A2E5C;
  }

  .metric-info {
    text-align: left;
  }

  .metric-value {
    font-size: 1.8em;
    font-weight: bold;
    color: #263238;
    line-height: 1;
  }

  .metric-label {
    font-size: 0.9em;
    color: #78909C;
    margin-top: 5px;
  }

  .metric-change {
    font-size: 0.8em;
    margin-top: 5px;
    display: flex;
    align-items: center;

    &.positive {
      color: #2E7D32;

      i {
        margin-right: 3px;
      }
    }
  }
}

.charts-section {
  margin-bottom: 20px;

  .chart-card {
    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .chart-header {
      font-weight: 600;
      color: #0A2E5C;
    }

    .chart-container {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      .chart-placeholder {
        text-align: center;
        color: #90A4AE;

        i {
          font-size: 4em;
          margin-bottom: 15px;
          display: block;
        }

        p {
          margin: 5px 0;
        }
      }
    }
  }
}

.detailed-metrics-card {
  margin-bottom: 20px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .table-header {
    font-weight: 600;
    color: #0A2E5C;
  }
}

.ai-insights-card {
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .insights-header {
    font-weight: 600;
    color: #0A2E5C;
  }
}

.insight-card {
  background: white;
  border: 1px solid #E1E5E9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .insight-icon {
    margin-bottom: 10px;

    i {
      font-size: 2em;
      color: #0A2E5C;
    }
  }

  .insight-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4 {
      margin: 0 0 10px 0;
      color: #0A2E5C;
      font-size: 1em;
    }

    p {
      margin: 0 0 10px 0;
      color: #78909C;
      font-size: 0.9em;
      line-height: 1.4;
    }
  }
}
</style>
