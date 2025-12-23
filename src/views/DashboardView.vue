<template>
  <div class="dashboard">
    <!-- Welcome Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="welcome-card pa-6">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div>
              <h1 class="text-h4 font-weight-bold mb-2">
                Hoş Geldiniz, {{ studentStore.student.firstName }}! 👋
              </h1>
              <p class="text-body-1 text-medium-emphasis mb-0">
                KTÜ Öğrenci Bilgi Sistemine hoş geldiniz. Bugün {{ formattedDate }}.
              </p>
            </div>
            <div class="d-none d-md-block">
              <v-img
                src="https://img.icons8.com/3d-fluency/188/student-male--v2.png"
                width="100"
                height="100"
              />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card pa-4">
          <div class="d-flex align-center">
            <v-avatar color="primary" size="48" class="mr-3">
              <v-icon color="white">mdi-chart-line</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">{{ studentStore.student.gpa.toFixed(2) }}</div>
              <div class="text-caption text-medium-emphasis">Genel Not Ortalaması</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card pa-4">
          <div class="d-flex align-center">
            <v-avatar color="success" size="48" class="mr-3">
              <v-icon color="white">mdi-book-check</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">{{ studentStore.activeCoursesCount }}</div>
              <div class="text-caption text-medium-emphasis">Aktif Ders</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card pa-4">
          <div class="d-flex align-center">
            <v-avatar color="info" size="48" class="mr-3">
              <v-icon color="white">mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            <div>
              <div class="text-h5 font-weight-bold">
                {{ studentStore.student.completedCredits }}/{{ studentStore.student.totalCredits }}
              </div>
              <div class="text-caption text-medium-emphasis">Tamamlanan Kredi</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card pa-4">
          <div class="d-flex align-center">
            <v-avatar :color="feeStatusColor" size="48" class="mr-3">
              <v-icon color="white">mdi-currency-try</v-icon>
            </v-avatar>
            <div>
              <div class="text-h6 font-weight-bold">{{ feeStatusText }}</div>
              <div class="text-caption text-medium-emphasis">Harç Durumu</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row>
      <!-- Left Column - Profile -->
      <v-col cols="12" md="4">
        <StudentProfileCard :student="studentStore.student" />
      </v-col>

      <!-- Right Column - Announcements & Quick Actions -->
      <v-col cols="12" md="8">
        <!-- Quick Actions -->
        <h2 class="text-h6 font-weight-bold mb-4">Hızlı Erişim</h2>
        <v-row class="mb-6">
          <v-col cols="6" sm="3" v-for="action in quickActions" :key="action.title">
            <QuickActionCard v-bind="action" />
          </v-col>
        </v-row>

        <!-- Announcements -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h6 font-weight-bold">Duyurular</h2>
          <v-btn variant="text" color="primary" size="small">
            Tümünü Gör
            <v-icon end size="16">mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        
        <v-row>
          <v-col cols="12" sm="6" v-for="announcement in studentStore.announcements.slice(0, 4)" :key="announcement.id">
            <AnnouncementCard :announcement="announcement" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import StudentProfileCard from '@/components/profile/StudentProfileCard.vue'
import AnnouncementCard from '@/components/announcements/AnnouncementCard.vue'
import QuickActionCard from '@/components/common/QuickActionCard.vue'

const studentStore = useStudentStore()

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

const feeStatusColor = computed(() => {
  switch (studentStore.student.feeStatus) {
    case 'paid': return 'success'
    case 'pending': return 'warning'
    case 'overdue': return 'error'
    default: return 'grey'
  }
})

const feeStatusText = computed(() => {
  switch (studentStore.student.feeStatus) {
    case 'paid': return 'Ödendi'
    case 'pending': return 'Bekliyor'
    case 'overdue': return 'Gecikmiş'
    default: return 'Bilinmiyor'
  }
})

const quickActions = [
  { title: 'Ders Kayıt', subtitle: 'Ders kaydı yap', icon: 'mdi-book-plus', color: '#1565C0', to: '/courses' },
  { title: 'Transkript', subtitle: 'Notlarını gör', icon: 'mdi-file-document', color: '#00897B', to: '/transcript' },
  { title: 'Harç Öde', subtitle: 'Harç ödeme', icon: 'mdi-wallet', color: '#F4511E', to: '/fees' },
  { title: 'Danışman', subtitle: 'İletişime geç', icon: 'mdi-account-tie', color: '#7B1FA2', to: '/advisor' },
]
</script>

<style scoped>
.welcome-card {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.08) 0%, rgba(0, 188, 212, 0.08) 100%);
  border-radius: 20px;
  border: 1px solid rgba(21, 101, 192, 0.1);
}

.stat-card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>
