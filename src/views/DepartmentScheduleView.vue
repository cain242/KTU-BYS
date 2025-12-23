<script setup lang="ts">
import { ref } from 'vue'
import { mockDepartmentSchedule } from '@/mock/mockData'

const search = ref('')

const headers = [
    { title: 'Ders Kodu', key: 'code' },
    { title: 'Ders Adı', key: 'name' },
    { title: 'Şube', key: 'section' },
    { title: 'Derslik', key: 'classroom' },
    { title: 'Akademisyen', key: 'instructor' },
]
</script>

<template>
    <v-container fluid class="dept-schedule-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                        <v-icon size="32" color="primary" class="mr-3">mdi-calendar-month</v-icon>
                        <div>
                            <h1 class="text-h4 font-weight-bold">Bölüm Ders Programı</h1>
                            <p class="text-subtitle-1 text-medium-emphasis mb-0">
                                Yazılım Geliştirme Bölümü - 2024-2025 Güz Dönemi
                            </p>
                        </div>
                    </div>
                    <v-btn color="primary" variant="tonal" prepend-icon="mdi-download">
                        PDF İndir
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <!-- Info Alert -->
        <v-row class="mb-4">
            <v-col cols="12">
                <v-alert type="info" variant="tonal" icon="mdi-information">
                    Bu liste bölümünüzde açılan tüm dersleri göstermektedir. Kendi ders programınız için
                    <router-link to="/schedule" class="text-primary font-weight-medium">Ders Programı</router-link>
                    sayfasını ziyaret edin.
                </v-alert>
            </v-col>
        </v-row>

        <!-- Department Schedule Table -->
        <v-card class="dept-schedule-card" elevation="0">
            <v-card-title class="d-flex align-center justify-space-between pa-5">
                <div class="d-flex align-center">
                    <v-icon color="primary" class="mr-3">mdi-school</v-icon>
                    <span class="text-h6 font-weight-bold">Tüm Bölüm Dersleri</span>
                </div>
                <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" label="Ders Ara" single-line
                    hide-details density="compact" variant="outlined" style="max-width: 300px" />
            </v-card-title>

            <v-divider />

            <v-data-table :headers="headers" :items="mockDepartmentSchedule" :search="search"
                class="dept-schedule-table" items-per-page="20">
                <template #item.code="{ item }">
                    <v-chip size="small" color="primary" variant="flat">
                        {{ item.code }}
                    </v-chip>
                </template>

                <template #item.name="{ item }">
                    <span class="font-weight-medium">{{ item.name }}</span>
                </template>

                <template #item.section="{ item }">
                    <v-chip size="small" color="info" variant="tonal">
                        {{ item.section }}
                    </v-chip>
                </template>

                <template #item.classroom="{ item }">
                    <span class="text-caption">{{ item.classroom }}</span>
                </template>

                <template #item.instructor="{ item }">
                    <div class="d-flex align-center">
                        <v-avatar size="28" color="primary" class="mr-2">
                            <span class="text-caption text-white">{{ item.instructor.split(' ').pop()?.charAt(0)
                            }}</span>
                        </v-avatar>
                        <span>{{ item.instructor }}</span>
                    </div>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<style scoped>
.dept-schedule-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.dept-schedule-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.dept-schedule-table {
    border-radius: 0 0 16px 16px;
}
</style>
