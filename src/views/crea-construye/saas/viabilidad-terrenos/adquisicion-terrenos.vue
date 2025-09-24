<template>
  <div class="app-container">
    <div class="crea-construye-header">
      <h1>🏗️ App - Adquisición de Terrenos</h1>
      <p class="subtitle">Análisis de ubicación, zonificación y estimación de valor con IA</p>
    </div>

    <!-- Dashboard de métricas -->
    <el-row :gutter="20" class="metrics-row">
      <el-col :span="6">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon">
              <i class="el-icon-map-location" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metrics.totalProperties || 0 }}</div>
              <div class="metric-label">Propiedades Analizadas</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon success">
              <i class="el-icon-check" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metrics.viableProperties || 0 }}</div>
              <div class="metric-label">Propiedades Viables</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon warning">
              <i class="el-icon-warning" />
            </div>
            <div class="metric-info">
              <div class="metric-value">{{ metrics.pendingAnalysis || 0 }}</div>
              <div class="metric-label">Pendientes de Análisis</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="metric-card">
          <div class="metric-content">
            <div class="metric-icon info">
              <i class="el-icon-money" />
            </div>
            <div class="metric-info">
              <div class="metric-value">${{ formatCurrency(metrics.avgValue) }}</div>
              <div class="metric-label">Valor Promedio</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- Filtros y búsqueda -->
    <el-card class="filter-card">
      <div slot="header" class="filter-header">
        <span>🔍 Filtros y Búsqueda</span>
      </div>
      <el-form :inline="true" :model="filters" class="filter-form">
        <el-form-item label="Ubicación">
          <el-input
            v-model="filters.location"
            placeholder="Ciudad, Estado, Código Postal"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="Rango de Precio">
          <el-input-number
            v-model="filters.minPrice"
            :min="0"
            :max="filters.maxPrice"
            placeholder="Mín"
            style="width: 120px"
          />
          <span style="margin: 0 10px">-</span>
          <el-input-number
            v-model="filters.maxPrice"
            :min="filters.minPrice"
            placeholder="Máx"
            style="width: 120px"
          />
        </el-form-item>
        <el-form-item label="Tamaño Mínimo">
          <el-input-number
            v-model="filters.minSize"
            :min="0"
            placeholder="m²"
            style="width: 100px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyFilters">Aplicar Filtros</el-button>
          <el-button @click="resetFilters">Limpiar</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- Tabla de propiedades -->
    <el-card class="properties-card">
      <div slot="header" class="table-header">
        <span>📋 Propiedades Encontradas</span>
        <el-button type="primary" size="small" @click="showAddPropertyDialog = true">
          ➕ Agregar Propiedad
        </el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="properties"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="address" label="Dirección" width="250" />
        <el-table-column prop="size" label="Tamaño (m²)" width="120" />
        <el-table-column prop="price" label="Precio" width="150">
          <template slot-scope="scope">
            ${{ formatCurrency(scope.row.price) }}
          </template>
        </el-table-column>
        <el-table-column prop="zone" label="Zonificación" width="120" />
        <el-table-column prop="viability" label="Viabilidad" width="120">
          <template slot-scope="scope">
            <el-tag
              :type="getViabilityType(scope.row.viability)"
              size="small"
            >
              {{ scope.row.viability }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="aiScore" label="Puntuación IA" width="130">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.aiScore"
              :color="getScoreColor(scope.row.aiScore)"
              :stroke-width="8"
            />
          </template>
        </el-table-column>
        <el-table-column label="Acciones" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="viewPropertyDetails(scope.row)"
            >
              Ver Detalles
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          :current-page="pagination.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Diálogo para agregar propiedad -->
    <el-dialog
      title="➕ Agregar Nueva Propiedad"
      :visible.sync="showAddPropertyDialog"
      width="50%"
    >
      <el-form :model="newProperty" label-width="120px">
        <el-form-item label="Dirección">
          <el-input v-model="newProperty.address" placeholder="Dirección completa" />
        </el-form-item>
        <el-form-item label="Tamaño (m²)">
          <el-input-number
            v-model="newProperty.size"
            :min="1"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="Precio">
          <el-input-number
            v-model="newProperty.price"
            :min="0"
            :precision="2"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="Zonificación">
          <el-select v-model="newProperty.zone" placeholder="Seleccionar zonificación" style="width: 100%">
            <el-option label="Residencial" value="Residencial" />
            <el-option label="Comercial" value="Comercial" />
            <el-option label="Industrial" value="Industrial" />
            <el-option label="Mixto" value="Mixto" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddPropertyDialog = false">Cancelar</el-button>
        <el-button type="primary" @click="addProperty">Agregar Propiedad</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppAdquisicionTerrenos',
  data() {
    return {
      metrics: {
        totalProperties: 0,
        viableProperties: 0,
        pendingAnalysis: 0,
        avgValue: 0
      },
      filters: {
        location: '',
        minPrice: null,
        maxPrice: null,
        minSize: null
      },
      properties: [],
      loading: false,
      showAddPropertyDialog: false,
      newProperty: {
        address: '',
        size: null,
        price: null,
        zone: ''
      },
      pagination: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  mounted() {
    this.loadMetrics()
    this.loadProperties()
  },
  methods: {
    loadMetrics() {
      // Simulación de carga de métricas
      this.metrics = {
        totalProperties: 24,
        viableProperties: 18,
        pendingAnalysis: 6,
        avgValue: 1250000
      }
    },
    loadProperties() {
      this.loading = true
      // Simulación de carga de propiedades
      setTimeout(() => {
        this.properties = [
          {
            id: 1,
            address: 'Av. Reforma 123, CDMX',
            size: 500,
            price: 1500000,
            zone: 'Comercial',
            viability: 'Alta',
            aiScore: 85
          },
          {
            id: 2,
            address: 'Calle 5 de Mayo 456, Monterrey',
            size: 300,
            price: 850000,
            zone: 'Residencial',
            viability: 'Media',
            aiScore: 72
          },
          {
            id: 3,
            address: 'Blvd. Díaz Ordaz 789, Guadalajara',
            size: 750,
            price: 2100000,
            zone: 'Mixto',
            viability: 'Alta',
            aiScore: 91
          }
        ]
        this.pagination.total = this.properties.length
        this.loading = false
      }, 1000)
    },
    applyFilters() {
      console.log('Aplicando filtros:', this.filters)
      this.loadProperties()
    },
    resetFilters() {
      this.filters = {
        location: '',
        minPrice: null,
        maxPrice: null,
        minSize: null
      }
      this.loadProperties()
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value)
    },
    getViabilityType(viability) {
      const types = {
        'Alta': 'success',
        'Media': 'warning',
        'Baja': 'danger'
      }
      return types[viability] || 'info'
    },
    getScoreColor(score) {
      if (score >= 80) return '#67C23A'
      if (score >= 60) return '#E6A23C'
      return '#F56C6C'
    },
    handleSizeChange(size) {
      this.pagination.size = size
      this.loadProperties()
    },
    handleCurrentChange(current) {
      this.pagination.current = current
      this.loadProperties()
    },
    viewPropertyDetails(property) {
      this.$message.success(`Viendo detalles de: ${property.address}`)
    },
    addProperty() {
      if (this.validateNewProperty()) {
        this.properties.push({
          id: this.properties.length + 1,
          ...this.newProperty,
          viability: 'Pendiente',
          aiScore: 0
        })
        this.showAddPropertyDialog = false
        this.resetNewProperty()
        this.$message.success('Propiedad agregada exitosamente')
      }
    },
    validateNewProperty() {
      if (!this.newProperty.address) {
        this.$message.error('La dirección es requerida')
        return false
      }
      if (!this.newProperty.size || this.newProperty.size <= 0) {
        this.$message.error('El tamaño debe ser mayor a 0')
        return false
      }
      if (!this.newProperty.price || this.newProperty.price <= 0) {
        this.$message.error('El precio debe ser mayor a 0')
        return false
      }
      if (!this.newProperty.zone) {
        this.$message.error('La zonificación es requerida')
        return false
      }
      return true
    },
    resetNewProperty() {
      this.newProperty = {
        address: '',
        size: null,
        price: null,
        zone: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.crea-construye-header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #0A2E5C;
    font-size: 2.5em;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    color: #455A64;
    font-size: 1.2em;
    margin: 0;
  }
}

.metrics-row {
  margin-bottom: 20px;
}

.metric-card {
  text-align: center;
  height: 120px;

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

    &.success {
      color: #2E7D32;
    }

    &.warning {
      color: #EF6C00;
    }

    &.info {
      color: #455A64;
    }
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
}

.filter-card {
  margin-bottom: 20px;

  .filter-header {
    font-weight: 600;
    color: #0A2E5C;
  }

  .filter-form {
    margin-top: 20px;
  }
}

.properties-card {
  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #0A2E5C;
  }
}

.pagination-container {
  text-align: center;
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}
</style>
