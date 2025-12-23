<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import { mockTranscriptCourses } from '@/mock/mockData'

const studentStore = useStudentStore()
const search = ref('')
const selectedSemester = ref('all')

const headers = [
  { title: 'Ders Kodu', key: 'code' },
  { title: 'Ders Adı', key: 'name' },
  { title: 'Kredi', key: 'credits' },
  { title: 'Öğretim Üyesi', key: 'instructor' },
  { title: 'Harf Notu', key: 'grade' },
  { title: 'Puan', key: 'points' },
]

const semesters = computed(() => {
  const uniqueSemesters = [...new Set(mockTranscriptCourses.map(c => c.semester))]
  return [{ title: 'Tüm Dönemler', value: 'all' }, ...uniqueSemesters.map(s => ({ title: s, value: s }))]
})

const filteredCourses = computed(() => {
  if (selectedSemester.value === 'all') return mockTranscriptCourses
  return mockTranscriptCourses.filter(c => c.semester === selectedSemester.value)
})

const totalCredits = computed(() => {
  return filteredCourses.value.reduce((sum, c) => sum + c.credits, 0)
})

const semesterGPA = computed(() => {
  const totalPoints = filteredCourses.value.reduce((sum, c) => sum + (c.points * c.credits), 0)
  const totalCredits = filteredCourses.value.reduce((sum, c) => sum + c.credits, 0)
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
})

function getGradeColor(grade?: string) {
  if (!grade) return 'grey'
  if (grade.startsWith('A')) return 'success'
  if (grade.startsWith('B')) return 'info'
  if (grade.startsWith('C')) return 'warning'
  if (grade.startsWith('D')) return 'orange'
  return 'error'
}
</script>

<template>
  <v-container fluid class="transcript-page pa-6">
    <!-- Header Card -->
    <v-card class="mb-6 pa-6" elevation="0">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center mb-2">
            <v-icon color="primary" size="32" class="mr-3">mdi-file-document</v-icon>
            <div>
              <h1 class="text-h5 font-weight-bold">Transkript</h1>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Akademik not ortalamanız ve ders geçmişiniz
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4" class="text-md-right">
          <v-btn color="primary" variant="tonal" prepend-icon="mdi-download" class="mr-2">
            PDF İndir
          </v-btn>
          <v-btn color="success" variant="tonal" prepend-icon="mdi-printer">
            Yazdır
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Stats Row -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4" elevation="0">
          <div class="text-h3 font-weight-bold text-primary">
            {{ studentStore.student.gpa.toFixed(2) }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Genel Not Ortalaması</div>
          <v-progress-linear :model-value="(studentStore.student.gpa / 4) * 100" color="primary" height="6" rounded
            class="mt-3" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4" elevation="0">
          <div class="text-h3 font-weight-bold text-success">
            {{ mockTranscriptCourses.length }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Tamamlanan Ders</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4" elevation="0">
          <div class="text-h3 font-weight-bold text-info">
            {{ studentStore.student.completedCredits }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Toplam Kredi</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4" elevation="0">
          <div class="text-h3 font-weight-bold text-warning">
            {{ studentStore.student.totalCredits - studentStore.student.completedCredits }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Kalan Kredi</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Transcript Table -->
    <v-card rounded="lg" elevation="0" class="transcript-card">
      <v-card-title class="d-flex align-center justify-space-between flex-wrap pa-5">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-3">mdi-history</v-icon>
          <span class="text-h6 font-weight-bold">Ders Geçmişi</span>
        </div>
        <div class="d-flex gap-3 flex-wrap">
          <v-select v-model="selectedSemester" :items="semesters" item-title="title" item-value="value"
            density="compact" variant="outlined" style="max-width: 200px" hide-details />
          <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Ders Ara" single-line hide-details
            density="compact" variant="outlined" style="max-width: 200px" />
        </div>
      </v-card-title>

      <v-divider />

      <v-data-table :headers="headers" :items="filteredCourses" :search="search" class="transcript-table">
        <template #item.code="{ item }">
          <v-chip size="small" color="primary" variant="flat">
            {{ item.code }}
          </v-chip>
        </template>

        <template #item.name="{ item }">
          <div>
            <span class="font-weight-medium">{{ item.name }}</span>
            <div class="text-caption text-medium-emphasis">{{ item.semester }}</div>
          </div>
        </template>

        <template #item.grade="{ item }">
          <v-chip :color="getGradeColor(item.grade)" size="small" variant="tonal">
            {{ item.grade }}
          </v-chip>
        </template>

        <template #item.points="{ item }">
          <span class="font-weight-bold">{{ item.points?.toFixed(2) }}</span>
        </template>

        <template #bottom>
          <v-divider />
          <div class="d-flex justify-space-between align-center pa-4">
            <div>
              <span class="text-body-2 text-medium-emphasis">Seçili dönem: </span>
              <span class="font-weight-bold">{{ selectedSemester === 'all' ? 'Tüm Dönemler' :
                selectedSemester }}</span>
            </div>
            <div class="d-flex gap-6">
              <div class="text-right">
                <div class="text-body-2 text-medium-emphasis">Dönem Kredisi</div>
                <div class="text-h6 font-weight-bold text-info">{{ totalCredits }}</div>
              </div>
              <div class="text-right">
                <div class="text-body-2 text-medium-emphasis">Dönem Ortalaması</div>
                <div class="text-h6 font-weight-bold text-primary">{{ semesterGPA }}</div>
              </div>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
.transcript-page {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.stat-card {
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.transcript-card {
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.transcript-table {
  border-radius: 0 0 16px 16px;
}
</style>
