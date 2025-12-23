import type { Student, Announcement, Course } from '@/types'

export const mockStudent: Student = {
    id: '1',
    studentNumber: '444084',
    tcKimlikNo: '13541193568',
    firstName: 'TUNAHAN',
    lastName: 'AKARGÜL',
    email: '444084@ogr.ktu.edu.tr',
    personalEmail: 'tuna.akargul@gmail.com',
    phone: '5372002400',
    faculty: 'FEN',
    department: 'YAZILIM GELİŞTİRME BÖLÜMÜ',
    program: 'YAZILIM GELİŞTİRME',
    grade: 2,
    semester: '2. SINIF',
    status: 'active',
    registrationStatus: 'halen kayıtlı öğrencidir',
    advisor: 'Prof. Dr. Özcan ÖZYURT',
    gpa: 3.45,
    totalCredits: 120,
    completedCredits: 64,
    feeStatus: 'pending',
}

export const mockAnnouncements: Announcement[] = [
    {
        id: '1',
        title: '1955 KTÜ Açılıyor',
        content: 'Yükseköğretim Yürütme Kurulu Kararı ile yeni dönem başlamaktadır.',
        date: '2024-02-10',
        category: 'general',
        isImportant: true,
        link: 'https://ktu.edu.tr'
    },
    {
        id: '2',
        title: 'Yetenek Kapısı Platformu',
        content: 'Öğrenci ve mezunlar, Yetenek Kapısı\'nda profil oluşturarak işverenlerle iletişime geçebilecekler.',
        date: '2024-02-08',
        category: 'event',
        isImportant: false,
        link: 'https://yetenekkapisi.org'
    },
    {
        id: '3',
        title: 'Harç Ödeme Duyurusu',
        content: 'Harç ödemelerinizi son ödeme tarihine kadar yapmanız gerekmektedir.',
        date: '2024-02-05',
        category: 'financial',
        isImportant: true,
    },
    {
        id: '4',
        title: 'Bahar Dönemi Ders Kayıtları',
        content: 'Bahar dönemi ders kayıtları 15 Şubat tarihinde başlayacaktır.',
        date: '2024-02-01',
        category: 'academic',
        isImportant: true,
    },
]

export const mockCourses: Course[] = [
    {
        id: '1',
        code: 'YZM201',
        name: 'Veri Yapıları',
        credits: 4,
        instructor: 'Prof. Dr. Özcan ÖZYURT',
        schedule: 'Pazartesi 09:00-12:00',
        status: 'active',
    },
    {
        id: '2',
        code: 'YZM203',
        name: 'Nesne Yönelimli Programlama',
        credits: 4,
        instructor: 'Doç. Dr. Ahmet YILDIZ',
        schedule: 'Salı 13:00-16:00',
        status: 'active',
    },
    {
        id: '3',
        code: 'YZM205',
        name: 'Veritabanı Yönetim Sistemleri',
        credits: 3,
        instructor: 'Dr. Öğr. Üyesi Mehmet KAYA',
        schedule: 'Çarşamba 09:00-12:00',
        status: 'active',
    },
    {
        id: '4',
        code: 'YZM101',
        name: 'Programlamaya Giriş',
        credits: 4,
        instructor: 'Prof. Dr. Özcan ÖZYURT',
        schedule: '',
        status: 'completed',
        grade: 'AA',
        points: 4.0,
    },
    {
        id: '5',
        code: 'MAT101',
        name: 'Matematik I',
        credits: 4,
        instructor: 'Prof. Dr. Ali VURAL',
        schedule: '',
        status: 'completed',
        grade: 'BA',
        points: 3.5,
    },
]

export const navigationItems = [
    {
        title: 'Kişisel İşlemler',
        icon: 'mdi-account',
        children: [
            { title: 'Kişisel Bilgiler', icon: 'mdi-account-details', to: '/profile' },
            { title: 'Telefon / E-Posta / HES Kodu', icon: 'mdi-phone', to: '/contact' },
            { title: 'BYS Şifre Değiştirme', icon: 'mdi-key', to: '/password' },
            { title: 'Mail Şifre Değiştirme', icon: 'mdi-email-lock', to: '/mail-password' },
        ]
    },
    {
        title: 'Ders İşlemleri',
        icon: 'mdi-book-open-variant',
        children: [
            { title: 'Ders Kayıt', icon: 'mdi-book-plus', to: '/courses' },
            { title: 'Ders Programı', icon: 'mdi-calendar-clock', to: '/schedule' },
            { title: 'Not Bilgileri', icon: 'mdi-clipboard-text', to: '/grades' },
            { title: 'Transkript', icon: 'mdi-file-document', to: '/transcript' },
        ]
    },
    {
        title: 'Staj Yönetim Sistemi',
        icon: 'mdi-briefcase',
        children: [
            { title: 'Staj Başvurusu', icon: 'mdi-file-send', to: '/internship' },
        ]
    },
    {
        title: 'Burs Başvurusu',
        icon: 'mdi-wallet',
        to: '/scholarship'
    },
    {
        title: 'Yemekhane',
        icon: 'mdi-food',
        to: '/cafeteria'
    },
    {
        title: 'Kütüphane Borç Ödeme',
        icon: 'mdi-library',
        to: '/library'
    },
]
