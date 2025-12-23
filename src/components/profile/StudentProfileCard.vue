<script setup lang="ts">
import { computed } from 'vue'
import type { Student } from '@/types'

const props = defineProps<{
  student: Student
}>()

const statusColor = computed(() => {
  switch (props.student.status) {
    case 'active': return 'success'
    case 'passive': return 'warning'
    case 'graduated': return 'info'
    case 'suspended': return 'error'
    default: return 'grey'
  }
})

const statusText = computed(() => {
  switch (props.student.status) {
    case 'active': return 'Aktif Öğrenci'
    case 'passive': return 'Pasif'
    case 'graduated': return 'Mezun'
    case 'suspended': return 'Kayıt Dondurulmuş'
    default: return 'Bilinmiyor'
  }
})
</script>

<template>
  <v-card class="profile-card overflow-hidden">
    <div class="card-header">
      <div class="header-pattern" />
    </div>

    <div class="card-body">
      <v-avatar size="100" class="avatar-wrapper">
        <v-img v-if="student.photoUrl" :src="student.photoUrl" />
        <span v-else class="text-h4 font-weight-bold text-white">
          {{ student.firstName[0] }}{{ student.lastName[0] }}
        </span>
      </v-avatar>

      <div class="student-info text-center mt-3">
        <h2 class="text-h5 font-weight-bold">{{ student.firstName }} {{ student.lastName }}</h2>
        <p class="text-body-2 text-medium-emphasis mb-2">{{ student.studentNumber }}</p>

        <v-chip :color="statusColor" size="small" class="mb-3">
          <v-icon start size="small">mdi-circle</v-icon>
          {{ statusText }}
        </v-chip>

        <div class="info-grid">
          <div class="info-item">
            <v-icon color="primary" class="mb-1">mdi-domain</v-icon>
            <span class="text-caption text-medium-emphasis">Fakülte</span>
            <span class="text-body-2 font-weight-medium">{{ student.faculty }}</span>
          </div>
          <div class="info-item">
            <v-icon color="primary" class="mb-1">mdi-book-education</v-icon>
            <span class="text-caption text-medium-emphasis">Bölüm</span>
            <span class="text-body-2 font-weight-medium text-truncate" style="max-width: 120px;">
              {{ student.department }}
            </span>
          </div>
          <div class="info-item">
            <v-icon color="primary" class="mb-1">mdi-school</v-icon>
            <span class="text-caption text-medium-emphasis">Sınıf</span>
            <span class="text-body-2 font-weight-medium">{{ student.semester }}</span>
          </div>
          <div class="info-item">
            <v-icon color="primary" class="mb-1">mdi-chart-line</v-icon>
            <span class="text-caption text-medium-emphasis">GNO</span>
            <span class="text-body-2 font-weight-medium">{{ student.gpa.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <v-divider />
  </v-card>
</template>

<style scoped>
.profile-card {
  border-radius: 20px;
  background: white;
}

.card-header {
  height: 100px;
  background: linear-gradient(135deg, #1565C0 0%, #00ACC1 50%, #26C6DA 100%);
  position: relative;
  overflow: hidden;
}

.header-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.card-body {
  margin-top: -50px;
  padding: 0 24px 24px;
  position: relative;
}

.avatar-wrapper {
  background: linear-gradient(135deg, #1565C0 0%, #00BCD4 100%);
  border: 4px solid white;
  box-shadow: 0 4px 20px rgba(21, 101, 192, 0.3);
  margin: 0 auto;
  display: block;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: rgba(21, 101, 192, 0.04);
  border-radius: 12px;
}
</style>
