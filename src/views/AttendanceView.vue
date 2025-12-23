
<script setup lang="ts">
import { computed } from 'vue'
import { mockAttendance } from '@/mock/mockData'
import type { Attendance } from '@/types'

// Computed properties
const safeCourses = computed(() => mockAttendance.filter(c => c.status === 'safe').length)
const warningCourses = computed(() => mockAttendance.filter(c => c.status === 'warning').length)
const dangerCourses = computed(() => mockAttendance.filter(c => c.status === 'danger').length)
const failedCourses = computed(() => mockAttendance.filter(c => c.status === 'failed').length)

// Sort by status priority: failed > danger > warning > safe
const sortedAttendance = computed(() => {
    const priority: Record<string, number> = { failed: 0, danger: 1, warning: 2, safe: 3 }
    return [...mockAttendance].sort((a, b) => (priority[a.status] ?? 4) - (priority[b.status] ?? 4))
})

// Helper functions
function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        safe: 'success',
        warning: 'warning',
        danger: 'error',
        failed: 'grey-darken-1'
    }
    return colors[status] || 'grey'
}

function getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
        safe: 'mdi-check-circle',
        warning: 'mdi-alert',
        danger: 'mdi-alert-circle',
        failed: 'mdi-close-circle'
    }
    return icons[status] || 'mdi-help'
}


function getAlertType(status: string): 'success' | 'warning' | 'error' | 'info' {
    const types: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
        safe: 'success',
        warning: 'warning',
        danger: 'error',
        failed: 'error'
    }
    return types[status] || 'info'
}

function getCardClass(status: string): string {
    return `status-${status}`
}

function getProgressValue(course: Attendance): number {
    return (course.absentWeeks / course.maxAbsentWeeks) * 100
}

function getStatusMessage(course: Attendance): string {
    switch (course.status) {
        case 'safe':
            return `Devamsızlık durumunuz güvenli. ${getRemainingWeeks(course)} hafta hakkınız var.`
        case 'warning':
            return `⚠️ Dikkat! ${course.absentWeeks} hafta devamsızlık yaptınız. Sadece ${getRemainingWeeks(course)} hafta hakkınız kaldı!`
        case 'danger':
            return `🚨 Tehlike! ${course.absentWeeks} hafta devamsızlık var. ${getRemainingWeeks(course)} hafta sonra kalırsınız!`
        case 'failed':
            return `❌ Bu dersten ${course.absentWeeks} hafta devamsızlıktan dolayı KALDINIZ!`
        default:
            return ''
    }
}

function getRemainingWeeks(course: Attendance): number {
    const remaining = course.maxAbsentWeeks - course.absentWeeks
    return Math.max(0, Math.round(remaining * 10) / 10)
}

function getRemainingClass(course: Attendance): string {
    const remaining = getRemainingWeeks(course)
    if (remaining <= 0) return 'text-grey-darken-1'
    if (remaining <= 0.5) return 'text-error'
    if (remaining <= 1) return 'text-warning'
    return 'text-success'
}
</script>
<template>
    <v-container fluid class="attendance-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">mdi-account-check</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Devamsızlık Takibi</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            2024-2025 Güz Dönemi - Devamsızlık durumunuzu takip edin
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Summary Cards -->
        <v-row class="mb-6">
            <v-col cols="12" sm="6" md="3">
                <v-card class="summary-card safe-card" elevation="0">
                    <v-card-text class="text-center py-6">
                        <v-icon size="40" color="success" class="mb-2">mdi-check-circle</v-icon>
                        <div class="text-h4 font-weight-bold text-success">{{ safeCourses }}</div>
                        <div class="text-body-2 text-medium-emphasis">Güvenli</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="summary-card warning-card" elevation="0">
                    <v-card-text class="text-center py-6">
                        <v-icon size="40" color="warning" class="mb-2">mdi-alert</v-icon>
                        <div class="text-h4 font-weight-bold text-warning">{{ warningCourses }}</div>
                        <div class="text-body-2 text-medium-emphasis">Uyarı</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="summary-card danger-card" elevation="0">
                    <v-card-text class="text-center py-6">
                        <v-icon size="40" color="error" class="mb-2">mdi-alert-circle</v-icon>
                        <div class="text-h4 font-weight-bold text-error">{{ dangerCourses }}</div>
                        <div class="text-body-2 text-medium-emphasis">Tehlike</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="summary-card failed-card" elevation="0">
                    <v-card-text class="text-center py-6">
                        <v-icon size="40" color="grey-darken-1" class="mb-2">mdi-close-circle</v-icon>
                        <div class="text-h4 font-weight-bold text-grey-darken-1">{{ failedCourses }}</div>
                        <div class="text-body-2 text-medium-emphasis">Kaldı</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Info Alert -->
        <v-row class="mb-6">
            <v-col cols="12">
                <v-alert type="info" variant="tonal" icon="mdi-information" class="info-alert">
                    <strong>Devamsızlık Kuralı:</strong> 14 haftalık dönemde toplam <strong>%30</strong> (4.2 hafta)
                    oranından fazla devamsızlık yapılamaz.
                    4 haftayı aşan devamsızlıklarda dersten <strong>kalınır</strong>.
                </v-alert>
            </v-col>
        </v-row>

        <!-- Attendance Cards -->
        <v-row>
            <v-col v-for="course in sortedAttendance" :key="course.courseId" cols="12" md="6" lg="4">
                <v-card class="attendance-card" :class="getCardClass(course.status)" elevation="0">
                    <v-card-text class="pa-5">
                        <!-- Header -->
                        <div class="d-flex justify-space-between align-start mb-4">
                            <div>
                                <v-chip :color="getStatusColor(course.status)" size="small" class="mb-2">
                                    {{ course.courseCode }}
                                </v-chip>
                                <h3 class="text-h6 font-weight-bold">{{ course.courseName }}</h3>
                            </div>
                            <v-icon :color="getStatusColor(course.status)" size="28">
                                {{ getStatusIcon(course.status) }}
                            </v-icon>
                        </div>

                        <!-- Progress -->
                        <div class="mb-4">
                            <div class="d-flex justify-space-between mb-2">
                                <span class="text-body-2 text-medium-emphasis">Devamsızlık</span>
                                <span class="text-body-2 font-weight-medium">
                                    {{ course.absentWeeks }} / {{ course.maxAbsentWeeks }} hafta
                                </span>
                            </div>
                            <v-progress-linear :model-value="getProgressValue(course)"
                                :color="getStatusColor(course.status)" height="10" rounded class="progress-bar" />
                        </div>

                        <!-- Status Message -->
                        <v-alert :type="getAlertType(course.status)" variant="tonal" density="compact"
                            class="status-alert">
                            <span class="text-body-2">{{ getStatusMessage(course) }}</span>
                        </v-alert>

                        <!-- Details -->
                        <div class="mt-4 pt-3 details-section">
                            <div class="d-flex justify-space-between text-body-2">
                                <span class="text-medium-emphasis">Toplam Hafta:</span>
                                <span class="font-weight-medium">{{ course.totalWeeks }}</span>
                            </div>
                            <div class="d-flex justify-space-between text-body-2 mt-1">
                                <span class="text-medium-emphasis">Kalan Hak:</span>
                                <span class="font-weight-medium" :class="getRemainingClass(course)">
                                    {{ getRemainingWeeks(course) }} hafta
                                </span>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.attendance-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.summary-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.summary-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.safe-card {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
}

.warning-card {
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.danger-card {
    background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
}

.failed-card {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
}

.info-alert {
    border-radius: 12px;
}

.attendance-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
}

.attendance-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.status-safe {
    border-left: 4px solid #22c55e;
    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
}

.status-warning {
    border-left: 4px solid #f59e0b;
    background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
}

.status-danger {
    border-left: 4px solid #ef4444;
    background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
}

.status-failed {
    border-left: 4px solid #6b7280;
    background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
}

.progress-bar {
    border-radius: 5px;
}

.status-alert {
    border-radius: 8px;
}

.details-section {
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
}
</style>
