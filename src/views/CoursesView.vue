<template>
  <div class="courses-page">
    <v-card class="mb-6">
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" class="mr-2">mdi-book-open-variant</v-icon>
        Ders İşlemleri
      </v-card-title>
      <v-card-subtitle>
        Kayıtlı olduğunuz dersleri görüntüleyin ve yönetin
      </v-card-subtitle>
    </v-card>

    <!-- Tabs -->
    <v-tabs v-model="tab" bg-color="transparent" color="primary" class="mb-4">
      <v-tab value="active">
        <v-icon start>mdi-book-check</v-icon>
        Aktif Dersler
      </v-tab>
      <v-tab value="completed">
        <v-icon start>mdi-check-circle</v-icon>
        Tamamlanan Dersler
      </v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- Active Courses -->
      <v-window-item value="active">
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="course in activeCourses" :key="course.id">
            <v-card class="course-card" rounded="lg">
              <div class="course-header pa-4">
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <v-chip size="small" color="primary" variant="flat" class="mb-2">
                      {{ course.code }}
                    </v-chip>
                    <h3 class="text-body-1 font-weight-bold">{{ course.name }}</h3>
                  </div>
                  <v-chip size="small" color="success" variant="tonal">
                    {{ course.credits }} Kredi
                  </v-chip>
                </div>
              </div>
              
              <v-divider />
              
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-icon size="18" class="mr-2" color="primary">mdi-account-tie</v-icon>
                  <span class="text-body-2">{{ course.instructor }}</span>
                </div>
                <div class="d-flex align-center">
                  <v-icon size="18" class="mr-2" color="primary">mdi-clock-outline</v-icon>
                  <span class="text-body-2">{{ course.schedule }}</span>
                </div>
              </v-card-text>
              
              <v-card-actions>
                <v-btn variant="text" color="primary" size="small">
                  Detaylar
                </v-btn>
                <v-spacer />
                <v-btn variant="tonal" color="primary" size="small">
                  Ders Materyalleri
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-alert v-if="activeCourses.length === 0" type="info" variant="tonal" class="mt-4">
          Aktif ders bulunmamaktadır.
        </v-alert>
      </v-window-item>

      <!-- Completed Courses -->
      <v-window-item value="completed">
        <v-card rounded="lg">
          <v-table>
            <thead>
              <tr>
                <th>Ders Kodu</th>
                <th>Ders Adı</th>
                <th>Kredi</th>
                <th>Öğretim Üyesi</th>
                <th>Harf Notu</th>
                <th>Puan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in completedCourses" :key="course.id">
                <td>
                  <v-chip size="small" color="primary" variant="flat">
                    {{ course.code }}
                  </v-chip>
                </td>
                <td class="font-weight-medium">{{ course.name }}</td>
                <td>{{ course.credits }}</td>
                <td>{{ course.instructor }}</td>
                <td>
                  <v-chip :color="getGradeColor(course.grade)" size="small" variant="tonal">
                    {{ course.grade }}
                  </v-chip>
                </td>
                <td class="font-weight-bold">{{ course.points?.toFixed(2) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

        <v-alert v-if="completedCourses.length === 0" type="info" variant="tonal" class="mt-4">
          Tamamlanmış ders bulunmamaktadır.
        </v-alert>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()
const tab = ref('active')

const activeCourses = computed(() => 
  studentStore.courses.filter(c => c.status === 'active')
)

const completedCourses = computed(() => 
  studentStore.courses.filter(c => c.status === 'completed')
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
.course-card {
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(21, 101, 192, 0.15);
}

.course-header {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%);
}
</style>
