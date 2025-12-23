<template>
    <div class="profile-page">
        <v-row>
            <!-- Left Column - Profile Card -->
            <v-col cols="12" md="4">
                <StudentProfileCard :student="studentStore.student" />
            </v-col>

            <!-- Right Column - Info Tables -->
            <v-col cols="12" md="8">
                <StudentInfoTable title="Kişisel Bilgiler" :items="personalInfo" class="mb-6" />
                <StudentInfoTable title="İletişim Bilgileri" :items="contactInfo" class="mb-6" />
                <StudentInfoTable title="Akademik Bilgiler" :items="academicInfo" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import StudentProfileCard from '@/components/profile/StudentProfileCard.vue'
import StudentInfoTable from '@/components/profile/StudentInfoTable.vue'
import type { InfoItem } from '@/types/profile'

const studentStore = useStudentStore()

const personalInfo = computed<InfoItem[]>(() => [
    { label: 'Ad Soyad', value: `${studentStore.student.firstName} ${studentStore.student.lastName}`, icon: 'mdi-account' },
    { label: 'TC Kimlik No', value: studentStore.student.tcKimlikNo, icon: 'mdi-card-account-details' },
    { label: 'Öğrenci No', value: studentStore.student.studentNumber, icon: 'mdi-identifier' },
    { label: 'Sınıf', value: studentStore.student.semester, icon: 'mdi-school' },
    { label: 'Durum', value: 'Aktif Öğrenci', icon: 'mdi-check-circle', type: 'chip', chipColor: 'success' },
])

const contactInfo = computed<InfoItem[]>(() => [
    { label: 'E-Posta', value: studentStore.student.email, icon: 'mdi-email', type: 'link', href: `mailto:${studentStore.student.email}` },
    { label: 'Kişisel E-Posta', value: studentStore.student.personalEmail, icon: 'mdi-email-outline', type: 'link', href: `mailto:${studentStore.student.personalEmail}` },
    { label: 'Telefon', value: studentStore.student.phone, icon: 'mdi-phone' },
])

const academicInfo = computed<InfoItem[]>(() => [
    { label: 'Fakülte', value: studentStore.student.faculty, icon: 'mdi-domain' },
    { label: 'Bölüm', value: studentStore.student.department, icon: 'mdi-book-education' },
    { label: 'Program', value: studentStore.student.program, icon: 'mdi-certificate' },
    { label: 'Danışman', value: studentStore.student.advisor, icon: 'mdi-account-tie', type: 'link', href: '#' },
    { label: 'Genel Not Ortalaması', value: studentStore.student.gpa.toFixed(2), icon: 'mdi-chart-line' },
    { label: 'Harç Durumu', value: 'Harç ödemeniz gerekmektedir', icon: 'mdi-currency-try', type: 'chip', chipColor: 'warning' },
])
</script>

<style scoped>
.profile-page {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
