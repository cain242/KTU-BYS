<script setup lang="ts">
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()

const gpaHistory = [
  { semester: '2023 Güz', gpa: 3.10 },
  { semester: '2023 Bahar', gpa: 3.25 },
  { semester: '2024 Güz', gpa: 3.29 }
]
</script>

<template>
  <v-container fluid class="analysis-page pa-6">
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="32" color="blue-darken-2" class="mr-3">mdi-chart-bar</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold">Akademik Durum Analizi</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">
              Başarı grafiğiniz ve kredi tamamlama oranlarınızın görsel analizi
            </p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- GPA Progress -->
      <v-col cols="12" md="8">
        <v-card class="analysis-card pa-6" elevation="0">
          <h3 class="text-h6 font-weight-bold mb-6">Dönemlik Not Ortalaması Değişimi</h3>
          <div class="chart-container d-flex align-end justify-space-between px-4 pb-2" style="height: 200px;">
            <div v-for="point in gpaHistory" :key="point.semester" class="text-center" style="width: 30%;">
              <div
                class="bg-blue-darken-2 rounded-t-lg mx-auto"
                :style="`height: ${(point.gpa / 4) * 100}%; width: 40px;`"
              >
                <div class="text-caption text-white pt-1">{{ point.gpa }}</div>
              </div>
              <div class="text-caption mt-2">{{ point.semester }}</div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Credits Breakdown -->
      <v-col cols="12" md="4">
        <v-card class="analysis-card pa-6 text-center" elevation="0">
          <h3 class="text-h6 font-weight-bold mb-6">Kredi Tamamlama</h3>
          <v-progress-circular
            :model-value="(studentStore.student.completedCredits / studentStore.student.totalCredits) * 100"
            :size="150"
            :width="15"
            color="blue-darken-2"
          >
            <div class="text-center">
              <div class="text-h4 font-weight-bold">
                %{{ Math.round((studentStore.student.completedCredits / studentStore.student.totalCredits) * 100) }}
              </div>
              <div class="text-caption">Tamamlandı</div>
            </div>
          </v-progress-circular>
          <div class="mt-6">
            <div class="d-flex justify-space-between mb-1">
              <span class="text-body-2">Kazanılan Kredi:</span>
              <span class="font-weight-bold">{{ studentStore.student.completedCredits }}</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-body-2">Kalan Kredi:</span>
              <span class="font-weight-bold">{{ studentStore.student.totalCredits - studentStore.student.completedCredits }}</span>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Predictions / Target -->
      <v-col cols="12">
        <v-card class="pa-6 target-card" elevation="0">
          <div class="d-flex align-center">
            <v-icon color="success" class="mr-3" size="32">mdi-trending-up</v-icon>
            <div>
              <h3 class="text-subtitle-1 font-weight-bold">Hedef Takibi</h3>
              <p class="text-body-2 text-medium-emphasis">
                Mevcut ortalamanızla mezuniyet hedefiniz (3.50) için önümüzdeki dönemlerde ortalama <strong>3.72</strong> yapmanız gerekmektedir.
              </p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.analysis-page {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  min-height: 100vh;
}

.analysis-card {
  border-radius: 20px;
  border: 1px solid rgba(21, 101, 192, 0.1);
  background: white;
}

.chart-container {
  border-bottom: 2px solid #eee;
}

.target-card {
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f1f8e9 100%);
  border: 1px solid rgba(76, 175, 80, 0.1);
}
</style>
