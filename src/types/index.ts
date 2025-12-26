export interface Student {
    id: string
    studentNumber: string
    tcKimlikNo: string
    firstName: string
    lastName: string
    email: string
    personalEmail: string
    phone: string
    faculty: string
    department: string
    program: string
    grade: number
    semester: string
    status: 'active' | 'passive' | 'graduated' | 'suspended'
    registrationStatus: string
    advisor: string
    gpa: number
    totalCredits: number
    completedCredits: number
    photoUrl?: string
    feeStatus: 'paid' | 'pending' | 'overdue'
}

export interface Announcement {
    id: string
    title: string
    content: string
    date: string
    category: 'general' | 'academic' | 'financial' | 'event'
    isImportant: boolean
    link?: string
}

export interface Course {
    id: string
    code: string
    name: string
    credits: number
    instructor: string
    schedule: string
    status: 'active' | 'completed' | 'failed' | 'withdrawn'
    grade?: string
    points?: number
}

export interface NavItem {
    title: string
    icon: string
    to?: string
    children?: NavItem[]
}

export interface CourseScheduleItem {
    id: string
    courseCode: string
    courseName: string
    day: 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma'
    startTime: string
    endTime: string
    classroom: string
    instructor: string
}

export interface Attendance {
    courseId: string
    courseCode: string
    courseName: string
    totalWeeks: number
    absentWeeks: number
    maxAbsentWeeks: number
    status: 'safe' | 'warning' | 'danger' | 'failed'
}

export interface Fee {
    id: string
    semester: string
    amount: number
    status: 'paid' | 'pending' | 'overdue'
    dueDate: string
    paymentDate?: string
}

export interface LibraryBook {
    id: string
    title: string
    author: string
    borrowDate: string
    dueDate: string
    status: 'borrowed' | 'overdue' | 'returned'
}

export interface CafeteriaMenu {
    day: string
    date: string
    soup: string
    mainCourse: string
    sideDish: string
    dessert: string
    calories: number
}

export interface MakeupEligibleCourse {
    id: string
    code: string
    name: string
    instructor: string
    grade: string
}
