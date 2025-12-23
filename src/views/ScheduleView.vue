<script setup lang="ts">
import { mockCourseSchedule } from '@/mock/mockData'

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'] as const
const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

function getCourseAtTime(day: string, time: string) {
    return mockCourseSchedule.find(course => {
        const startHour = parseInt(course.startTime.split(':')[0])
        const endHour = parseInt(course.endTime.split(':')[0])
        const currentHour = parseInt(time.split(':')[0])
        return course.day === day && currentHour >= startHour && currentHour < endHour
    })
}

function getCourseColor(courseCode: string): string {
    const colors: Record<string, string> = {
        'YZG2013': '#1565C0',
        'YZG2011': '#00897B',
        'YZG2009': '#7B1FA2',
        'YZG2007': '#E65100',
        'YZG2005': '#C62828',
        'YZG2003': '#2E7D32',
        'YZG2001': '#4527A0',
    }
    return colors[courseCode] || '#1565C0'
}
</script>

<template>
    <v-container fluid class="schedule-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                        <v-icon size="32" color="primary" class="mr-3">mdi-calendar-clock</v-icon>
                        <div>
                            <h1 class="text-h4 font-weight-bold">Ders Programı</h1>
                            <p class="text-subtitle-1 text-medium-emphasis mb-0">
                                2024-2025 Güz Dönemi - Haftalık Ders Programınız
                            </p>
                        </div>
                    </div>
                    <v-btn color="primary" variant="tonal" prepend-icon="mdi-download">
                        PDF İndir
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <!-- Schedule Table -->
        <v-card class="schedule-card" elevation="0">
            <v-card-text class="pa-0">
                <div class="schedule-table-wrapper">
                    <table class="schedule-table">
                        <thead>
                            <tr>
                                <th class="time-header">Saat</th>
                                <th v-for="day in days" :key="day" class="day-header">{{ day }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="time in timeSlots" :key="time">
                                <td class="time-cell">{{ time }}</td>
                                <td v-for="day in days" :key="day" class="course-cell">
                                    <div v-if="getCourseAtTime(day, time)" class="course-block"
                                        :style="{ backgroundColor: getCourseColor(getCourseAtTime(day, time)?.courseCode || '') }">
                                        <div class="course-code">{{ getCourseAtTime(day, time)?.courseCode }}</div>
                                        <div class="course-name">{{ getCourseAtTime(day, time)?.courseName }}</div>
                                        <div class="course-room">{{ getCourseAtTime(day, time)?.classroom }}</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-card-text>
        </v-card>

        <!-- Course List -->
        <v-row class="mt-6">
            <v-col cols="12">
                <v-card elevation="0" class="course-list-card">
                    <v-card-title class="d-flex align-center pa-5">
                        <v-icon color="primary" class="mr-3">mdi-format-list-bulleted</v-icon>
                        <span class="text-h6 font-weight-bold">Ders Listesi</span>
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pa-0">
                        <v-table>
                            <thead>
                                <tr>
                                    <th>Ders Kodu</th>
                                    <th>Ders Adı</th>
                                    <th>Gün</th>
                                    <th>Saat</th>
                                    <th>Derslik</th>
                                    <th>Öğretim Üyesi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="course in mockCourseSchedule" :key="course.id">
                                    <td>
                                        <v-chip size="small" :color="getCourseColor(course.courseCode)" dark>
                                            {{ course.courseCode }}
                                        </v-chip>
                                    </td>
                                    <td class="font-weight-medium">{{ course.courseName }}</td>
                                    <td>{{ course.day }}</td>
                                    <td>{{ course.startTime }} - {{ course.endTime }}</td>
                                    <td class="text-caption">{{ course.classroom }}</td>
                                    <td>{{ course.instructor }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.schedule-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.schedule-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.schedule-table-wrapper {
    overflow-x: auto;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;
}

.schedule-table th,
.schedule-table td {
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding: 8px;
    text-align: center;
}

.time-header {
    background: #1565C0;
    color: white;
    font-weight: 600;
    width: 80px;
}

.day-header {
    background: #1565C0;
    color: white;
    font-weight: 600;
    min-width: 150px;
}

.time-cell {
    background: #f5f5f5;
    font-weight: 600;
    color: #333;
}

.course-cell {
    height: 60px;
    vertical-align: top;
    padding: 4px !important;
}

.course-block {
    height: 100%;
    border-radius: 8px;
    padding: 6px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 11px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.course-block:hover {
    transform: scale(1.02);
}

.course-code {
    font-weight: 700;
    font-size: 12px;
}

.course-name {
    font-size: 10px;
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.course-room {
    font-size: 9px;
    opacity: 0.8;
    margin-top: 2px;
}

.course-list-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
