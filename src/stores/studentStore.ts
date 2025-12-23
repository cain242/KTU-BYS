import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockStudent, mockAnnouncements, mockCourses } from '@/mock/mockData'
import type { Student, Announcement, Course } from '@/types'

export const useStudentStore = defineStore('student', () => {
    const student = ref<Student>(mockStudent)
    const announcements = ref<Announcement[]>(mockAnnouncements)
    const courses = ref<Course[]>(mockCourses)
    const isLoading = ref(false)

    const fullName = computed(() => `${student.value.firstName} ${student.value.lastName}`)

    const activeCoursesCount = computed(() =>
        courses.value.filter(c => c.status === 'active').length
    )

    const gpa = computed(() => student.value.gpa)

    async function fetchStudentData() {
        isLoading.value = true
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        isLoading.value = false
    }

    return {
        student,
        announcements,
        courses,
        isLoading,
        fullName,
        activeCoursesCount,
        gpa,
        fetchStudentData,
    }
})
