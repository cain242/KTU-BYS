import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: 'Ana Sayfa' }
    },
    {
        path: '/announcements',
        name: 'Announcements',
        component: () => import('@/views/AnnouncementsView.vue'),
        meta: { title: 'Duyurular' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: { title: 'Kişisel Bilgiler' }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/ContactView.vue'),
        meta: { title: 'Telefon / E-Posta' }
    },
    {
        path: '/password',
        name: 'Password',
        component: () => import('@/views/PasswordView.vue'),
        meta: { title: 'BYS Şifre Değiştirme' }
    },
    {
        path: '/mail-password',
        name: 'MailPassword',
        component: () => import('@/views/MailPasswordView.vue'),
        meta: { title: 'Mail Şifre Değiştirme' }
    },
    {
        path: '/courses',
        name: 'Courses',
        component: () => import('@/views/CoursesView.vue'),
        meta: { title: 'Ders İşlemleri' }
    },
    {
        path: '/transcript',
        name: 'Transcript',
        component: () => import('@/views/TranscriptView.vue'),
        meta: { title: 'Transkript' }
    },
    {
        path: '/midterm-grades',
        name: 'MidtermGrades',
        component: () => import('@/views/MidtermGradesView.vue'),
        meta: { title: 'Vize Notları' }
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('@/views/ScheduleView.vue'),
        meta: { title: 'Ders Programı' }
    },
    {
        path: '/department-schedule',
        name: 'DepartmentSchedule',
        component: () => import('@/views/DepartmentScheduleView.vue'),
        meta: { title: 'Bölüm Ders Programı' }
    },
    {
        path: '/makeup-exams',
        name: 'MakeupExams',
        component: () => import('@/views/MakeupExamsView.vue'),
        meta: { title: 'Bütünleme' }
    },
    {
        path: '/academic-analysis',
        name: 'AcademicAnalysis',
        component: () => import('@/views/AcademicAnalysisView.vue'),
        meta: { title: 'Akademik Durum Analizi' }
    },
    {
        path: '/attendance',
        name: 'Attendance',
        component: () => import('@/views/AttendanceView.vue'),
        meta: { title: 'Devamsızlık Takibi' }
    },
    {
        path: '/clearance',
        name: 'Clearance',
        component: () => import('@/views/ClearanceView.vue'),
        meta: { title: 'İlişik Kesme Talebi' }
    },
    // Internship routes
    {
        path: '/internship/announcements',
        name: 'InternshipAnnouncements',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Duyuruları' }
    },
    {
        path: '/internship/regulations',
        name: 'InternshipRegulations',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Mevzuatları' }
    },
    {
        path: '/internship/apply',
        name: 'InternshipApply',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Başvuru' }
    },
    {
        path: '/internship/applications',
        name: 'InternshipApplications',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Başvuruları' }
    },
    {
        path: '/internship/documents',
        name: 'InternshipDocuments',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Dosyaları' }
    },
    {
        path: '/internship/requests',
        name: 'InternshipRequests',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Talepleri' }
    },
    {
        path: '/internship/complete',
        name: 'InternshipComplete',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj Sonlandır' }
    },
    {
        path: '/internship/faq',
        name: 'InternshipFAQ',
        component: () => import('@/views/InternshipView.vue'),
        meta: { title: 'Staj SSS' }
    },
    // Scholarship routes
    {
        path: '/scholarship/foundation-apply',
        name: 'ScholarshipFoundationApply',
        component: () => import('@/views/ScholarshipView.vue'),
        meta: { title: 'Vakıf Bursu Başvurusu' }
    },
    {
        path: '/scholarship/foundation-list',
        name: 'ScholarshipFoundationList',
        component: () => import('@/views/ScholarshipView.vue'),
        meta: { title: 'Vakıf Bursu Başvurularım' }
    },
    {
        path: '/scholarship/meal-apply',
        name: 'ScholarshipMealApply',
        component: () => import('@/views/ScholarshipView.vue'),
        meta: { title: 'Yemek Bursu Başvurusu' }
    },
    {
        path: '/scholarship/meal-list',
        name: 'ScholarshipMealList',
        component: () => import('@/views/ScholarshipView.vue'),
        meta: { title: 'Yemek Bursu Başvurularım' }
    },
    {
        path: '/cafeteria',
        name: 'Cafeteria',
        component: () => import('@/views/CafeteriaView.vue'),
        meta: { title: 'Yemekhane' }
    },
    // Sports routes
    {
        path: '/sports/balance',
        name: 'SportsBalance',
        component: () => import('@/views/SportsView.vue'),
        meta: { title: 'Bakiye Yükle' }
    },
    {
        path: '/sports/fields',
        name: 'SportsFields',
        component: () => import('@/views/SportsView.vue'),
        meta: { title: 'Spor Sahaları' }
    },
    {
        path: '/sports/reservations',
        name: 'SportsReservations',
        component: () => import('@/views/SportsView.vue'),
        meta: { title: 'Rezervasyonlarım' }
    },
    {
        path: '/library',
        name: 'Library',
        component: () => import('@/views/LibraryView.vue'),
        meta: { title: 'Kütüphane Borç Ödeme' }
    },
    // Education routes
    {
        path: '/education/courses',
        name: 'EducationCourses',
        component: () => import('@/views/EducationView.vue'),
        meta: { title: 'Kurs Yönetimi' }
    },
    {
        path: '/education/applications',
        name: 'EducationApplications',
        component: () => import('@/views/EducationView.vue'),
        meta: { title: 'Kurs Başvurularım' }
    },
    {
        path: '/education/help',
        name: 'EducationHelp',
        component: () => import('@/views/EducationView.vue'),
        meta: { title: 'Yardım Dökümanı' }
    },
    {
        path: '/fees',
        name: 'Fees',
        component: () => import('@/views/FeesView.vue'),
        meta: { title: 'Harç Ödemeleri' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title || 'KTÜ BYS'} - KTÜ Öğrenci Bilgi Sistemi`
    next()
})

export default router
