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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: { title: 'Kişisel Bilgiler' }
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
