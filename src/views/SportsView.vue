<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const balance = ref(45.50)

const currentView = computed(() => {
  const path = route.path
  if (path.includes('/balance')) return 'balance'
  if (path.includes('/fields')) return 'fields'
  if (path.includes('/reservations')) return 'reservations'
  return 'fields'
})

const pageInfo = computed(() => {
  const info: Record<string, { title: string, icon: string, subtitle: string }> = {
    'balance': { title: 'Bakiye Yükle', icon: 'mdi-credit-card-plus-outline', subtitle: 'Spor sahası rezervasyonları için bakiye yönetimi' },
    'fields': { title: 'Spor Sahaları', icon: 'mdi-stadium-outline', subtitle: 'Kampüs içi spor tesisleri ve doluluk durumu' },
    'reservations': { title: 'Rezervasyonlarım', icon: 'mdi-calendar-check-outline', subtitle: 'Aktif ve geçmiş saha rezervasyonlarınız' }
  }
  return info[currentView.value]
})

const fields = [
  { id: 1, name: 'Halı Saha 1', type: 'Futbol', icon: 'mdi-soccer', status: 'Dolu' },
  { id: 2, name: 'Halı Saha 2', type: 'Futbol', icon: 'mdi-soccer', status: 'Müsait' },
  { id: 3, name: 'Tenis Kortu A', type: 'Tenis', icon: 'mdi-tennis', status: 'Müsait' },
  { id: 4, name: 'Basketbol Sahası', type: 'Basketbol', icon: 'mdi-basketball', status: 'Bakımda' },
]
</script>

<template>
  <v-container fluid class="sports-page pa-6">
    <!-- Consistent Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="32" color="deep-orange" class="mr-3">{{ pageInfo.icon }}</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold">{{ pageInfo.title }}</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">{{ pageInfo.subtitle }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Balance Section -->
    <v-card v-if="currentView === 'balance'" class="content-card pa-12 text-center" elevation="0">
      <div class="text-overline mb-2">Mevcut Bakiyeniz</div>
      <div class="text-h2 font-weight-black text-deep-orange mb-8">{{ balance.toFixed(2) }} ₺</div>
      <v-divider class="mb-8" />
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-btn color="deep-orange" block size="large" prepend-icon="mdi-credit-card">Bakiye Yükle</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Fields Section -->
    <v-row v-if="currentView === 'fields'">
      <v-col v-for="field in fields" :key="field.id" cols="12" sm="6" lg="3">
        <v-card class="content-card pa-6 text-center" elevation="0">
          <v-avatar color="deep-orange-lighten-5" size="64" class="mb-4">
            <v-icon :icon="field.icon" color="deep-orange" size="32" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-1">{{ field.name }}</div>
          <div class="text-caption mb-4">{{ field.type }}</div>
          <v-chip :color="field.status === 'Müsait' ? 'success' : 'error'" size="small" variant="flat" class="mb-4">{{ field.status }}</v-chip>
          <v-btn block color="deep-orange" variant="tonal" :disabled="field.status !== 'Müsait'">Rezervasyon Yap</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Reservations Section -->
    <v-card v-if="currentView === 'reservations'" class="content-card pa-12 text-center" elevation="0">
      <v-icon size="64" color="grey-lighten-2">mdi-calendar-blank</v-icon>
      <p class="mt-4 text-medium-emphasis">Aktif rezervasyonunuz bulunmamaktadır.</p>
    </v-card>
  </v-container>
</template>

<style scoped>
.sports-page {
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  min-height: calc(100vh - 64px);
}

.content-card {
  border-radius: 20px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
