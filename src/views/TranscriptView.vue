<template>
  <div class="transcript-page">
    <!-- Header Card -->
    <v-card class="mb-6 pa-6">
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
          <v-btn color="primary" variant="tonal" prepend-icon="mdi-download">
            PDF İndir
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Stats Row -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4">
          <div class="text-h3 font-weight-bold text-primary">
            {{ studentStore.student.gpa.toFixed(2) }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Genel Not Ortalaması</div>
          <v-progress-linear
            :model-value="(studentStore.student.gpa / 4) * 100"
            color="primary"
            height="6"
            rounded
            class="mt-3"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4">
          <div class="text-h3 font-weight-bold text-success">
            {{ completedCourses.length }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Tamamlanan Ders</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4">
          <div class="text-h3 font-weight-bold text-info">
            {{ studentStore.student.completedCredits }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Toplam Kredi</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card text-center pa-4">
          <div class="text-h3 font-weight-bold text-warning">
            {{ remainingCredits }}
          </div>
          <div class="text-body-2 text-medium-emphasis">Kalan Kredi</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Transcript Table -->
    <v-card rounded="lg">
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Ders Geçmişi</span>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Ders Ara"
          single-line
          hide-details
          density="compact"
          variant="outlined"
          style="max-width: 250px"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="completedCourses"
        :search="search"
        class="transcript-table"
      >
        <template #item.code="{ item }">
          <v-chip size="small" color="primary" variant="flat">
            {{ item.code }}
          </v-chip>
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
          <div class="d-flex justify-end pa-4">
            <div class="text-right">
              <div class="text-body-2 text-medium-emphasis">Toplam Kredi</div>
              <div class="text-h6 font-weight-bold text-primary">
                {{ studentStore.student.completedCredits }}
              </div>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()
const search = ref('')

const headers = [
  { title: 'Ders Kodu', key: 'code' },
  { title: 'Ders Adı', key: 'name' },
  { title: 'Kredi', key: 'credits' },
  { title: 'Öğretim Üyesi', key: 'instructor' },
  { title: 'Harf Notu', key: 'grade' },
  { title: 'Puan', key: 'points' },
]

const completedCourses = computed(() => 
  studentStore.courses.filter(c => c.status === 'completed')
)

const remainingCredits = computed(() => 
  studentStore.student.totalCredits - studentStore.student.completedCredits
)

function getGradeColor(grade?: string) {
  if (!grade) return 'grey'
  if (grade.startsWith('A')) return 'success'
  if (grade.startsWith('B')) return 'info'
  if (grade.startsWith('C')) return 'warning'
  if (grade.startsWith('D')) return 'orange'
  return 'error'
}
</script>

<style scoped>
.stat-card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.transcript-table {
  border-radius: 0 0 16px 16px;
}
</style>
