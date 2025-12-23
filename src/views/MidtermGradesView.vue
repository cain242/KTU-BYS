<script setup lang="ts">
import { computed } from 'vue'
import { mockMidtermGrades } from '@/mock/mockData'

const averageGrade = computed(() => {
    const total = mockMidtermGrades.reduce((sum, g) => sum + g.average, 0)
    return (total / mockMidtermGrades.length).toFixed(1)
})

function getGradeColor(grade: number): string {
    if (grade >= 85) return 'success'
    if (grade >= 70) return 'info'
    if (grade >= 60) return 'warning'
    return 'error'
}

function getGradeStatus(grade: number): string {
    if (grade >= 85) return 'Çok İyi'
    if (grade >= 70) return 'İyi'
    if (grade >= 60) return 'Orta'
    return 'Düşük'
}
</script>

<template>
    <v-container fluid class="midterm-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">mdi-clipboard-text</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Vize Notları</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            2024-2025 Güz Dönemi - Ara Sınav Sonuçları
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Stats Cards -->
        <v-row class="mb-6">
            <v-col cols="12" sm="6" md="3">
                <v-card class="stat-card text-center pa-4" elevation="0">
                    <v-icon size="40" color="primary" class="mb-2">mdi-chart-line</v-icon>
                    <div class="text-h4 font-weight-bold text-primary">{{ averageGrade }}</div>
                    <div class="text-body-2 text-medium-emphasis">Ortalama</div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="stat-card text-center pa-4" elevation="0">
                    <v-icon size="40" color="success" class="mb-2">mdi-check-circle</v-icon>
                    <div class="text-h4 font-weight-bold text-success">{{ mockMidtermGrades.length }}</div>
                    <div class="text-body-2 text-medium-emphasis">Ders Sayısı</div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="stat-card text-center pa-4" elevation="0">
                    <v-icon size="40" color="info" class="mb-2">mdi-arrow-up-bold</v-icon>
                    <div class="text-h4 font-weight-bold text-info">
                        {{Math.max(...mockMidtermGrades.map(g => g.average))}}
                    </div>
                    <div class="text-body-2 text-medium-emphasis">En Yüksek</div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="stat-card text-center pa-4" elevation="0">
                    <v-icon size="40" color="warning" class="mb-2">mdi-arrow-down-bold</v-icon>
                    <div class="text-h4 font-weight-bold text-warning">
                        {{Math.min(...mockMidtermGrades.map(g => g.average))}}
                    </div>
                    <div class="text-body-2 text-medium-emphasis">En Düşük</div>
                </v-card>
            </v-col>
        </v-row>

        <!-- Grades Cards -->
        <v-row>
            <v-col v-for="grade in mockMidtermGrades" :key="grade.courseCode" cols="12" md="6" lg="4">
                <v-card class="grade-card" elevation="0">
                    <v-card-text class="pa-5">
                        <!-- Header -->
                        <div class="d-flex justify-space-between align-start mb-4">
                            <div>
                                <v-chip :color="getGradeColor(grade.average)" size="small" class="mb-2">
                                    {{ grade.courseCode }}
                                </v-chip>
                                <h3 class="text-subtitle-1 font-weight-bold">{{ grade.courseName }}</h3>
                                <p class="text-caption text-medium-emphasis mb-0">{{ grade.instructor }}</p>
                            </div>
                            <div class="text-center">
                                <div class="text-h4 font-weight-bold" :class="`text-${getGradeColor(grade.average)}`">
                                    {{ grade.average }}
                                </div>
                                <v-chip size="x-small" :color="getGradeColor(grade.average)" variant="tonal">
                                    {{ getGradeStatus(grade.average) }}
                                </v-chip>
                            </div>
                        </div>

                        <v-divider class="mb-4" />

                        <!-- Grade Details -->
                        <v-row>
                            <v-col cols="6">
                                <div class="grade-item">
                                    <div class="text-caption text-medium-emphasis">Vize 1</div>
                                    <div class="text-h6 font-weight-bold">
                                        {{ grade.midterm1 ?? '-' }}
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="grade-item">
                                    <div class="text-caption text-medium-emphasis">Vize 2</div>
                                    <div class="text-h6 font-weight-bold">
                                        {{ grade.midterm2 ?? '-' }}
                                    </div>
                                </div>
                            </v-col>
                        </v-row>

                        <!-- Progress Bar -->
                        <v-progress-linear :model-value="grade.average" :color="getGradeColor(grade.average)" height="8"
                            rounded class="mt-4" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.midterm-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.stat-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
}

.grade-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.grade-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.grade-item {
    text-align: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 8px;
}
</style>
