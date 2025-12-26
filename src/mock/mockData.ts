import type { Student, Announcement, Course, CourseScheduleItem, Attendance, Fee, LibraryBook, CafeteriaMenu, MakeupEligibleCourse } from '@/types'
import tunahanPhoto from '@/assets/Photos/tunahan.jpeg'

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
    gpa: 3.29,
    totalCredits: 120,
    completedCredits: 64,
    feeStatus: 'paid',
    photoUrl: tunahanPhoto
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

// Yeni görüntüdeki ders programına göre güncellendi
export const mockCourses: Course[] = [
    {
        id: '1',
        code: 'YZG2013',
        name: 'Programlama Laboratuvarı III',
        credits: 3,
        instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH',
        schedule: 'Perşembe 14:00-17:00',
        status: 'active',
    },
    {
        id: '2',
        code: 'YZG2011',
        name: 'Yazılım Gereksinimleri Analizi',
        credits: 3,
        instructor: 'Prof. Dr. Özcan ÖZYURT',
        schedule: 'Çarşamba 10:00-12:00, 13:00-14:00',
        status: 'active',
    },
    {
        id: '3',
        code: 'YZG2009',
        name: 'Bilgisayar Mimarisi ve Mantıksal Tasarım',
        credits: 4,
        instructor: 'Dr. Öğr. Üyesi Özkan BİNGÖL',
        schedule: 'Pazartesi 09:00-12:00',
        status: 'active',
    },
    {
        id: '4',
        code: 'YZG2007',
        name: 'Veri Yapıları ve Algoritmalar',
        credits: 4,
        instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH',
        schedule: 'Çarşamba 08:00-10:00, Perşembe 13:00-15:00',
        status: 'active',
    },
    {
        id: '5',
        code: 'YZG2005',
        name: 'Sayısal Analiz',
        credits: 3,
        instructor: 'Prof. Dr. Erhan COŞKUN',
        schedule: 'Çarşamba 15:00-17:00',
        status: 'active',
    },
    {
        id: '6',
        code: 'YZG2003',
        name: 'Nesneye Yönelik Programlama',
        credits: 4,
        instructor: 'Prof. Dr. Hacer ÖZYURT',
        schedule: 'Pazartesi 13:00-16:00',
        status: 'active',
    },
    {
        id: '7',
        code: 'YZG2001',
        name: 'Diferansiyel Denklemler',
        credits: 4,
        instructor: 'Prof. Dr. Yasemin SAĞİROĞLU',
        schedule: 'Perşembe 10:00-12:00, Cuma 10:00-12:00',
        status: 'active',
    },
]

// Haftalık ders programı detayları
export const mockCourseSchedule: CourseScheduleItem[] = [
    // Pazartesi
    { id: '1', courseCode: 'YZG2009', courseName: 'Bilgisayar Mimarisi ve Mantıksal Tasarım', day: 'Pazartesi', startTime: '09:00', endTime: '12:00', classroom: '-', instructor: 'Dr. Öğr. Üyesi Özkan BİNGÖL' },
    { id: '2', courseCode: 'YZG2003', courseName: 'Nesneye Yönelik Programlama', day: 'Pazartesi', startTime: '13:00', endTime: '16:00', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Prof. Dr. Hacer ÖZYURT' },

    // Çarşamba
    { id: '3', courseCode: 'YZG2007', courseName: 'Veri Yapıları ve Algoritmalar', day: 'Çarşamba', startTime: '08:00', endTime: '10:00', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { id: '4', courseCode: 'YZG2011', courseName: 'Yazılım Gereksinimleri Analizi', day: 'Çarşamba', startTime: '10:00', endTime: '12:00', classroom: 'D202 / MAT-K3-2 (D202)', instructor: 'Prof. Dr. Özcan ÖZYURT' },
    { id: '5', courseCode: 'YZG2011', courseName: 'Yazılım Gereksinimleri Analizi', day: 'Çarşamba', startTime: '13:00', endTime: '14:00', classroom: 'D202 / MAT-K3-2 (D202)', instructor: 'Prof. Dr. Özcan ÖZYURT' },
    { id: '6', courseCode: 'YZG2005', courseName: 'Sayısal Analiz', day: 'Çarşamba', startTime: '15:00', endTime: '17:00', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Prof. Dr. Erhan COŞKUN' },

    // Perşembe
    { id: '7', courseCode: 'YZG2001', courseName: 'Diferansiyel Denklemler', day: 'Perşembe', startTime: '10:00', endTime: '12:00', classroom: 'DZ-01 / MAT-K1-33 (DZ-01) / MAT-K2-2 (D101)', instructor: 'Prof. Dr. Yasemin SAĞİROĞLU' },
    { id: '8', courseCode: 'YZG2007', courseName: 'Veri Yapıları ve Algoritmalar', day: 'Perşembe', startTime: '13:00', endTime: '15:00', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { id: '9', courseCode: 'YZG2013', courseName: 'Programlama Laboratuvarı III', day: 'Perşembe', startTime: '14:00', endTime: '17:00', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },

    // Cuma
    { id: '10', courseCode: 'YZG2001', courseName: 'Diferansiyel Denklemler', day: 'Cuma', startTime: '10:00', endTime: '12:00', classroom: 'DZ-01 / MAT-K1-33 (DZ-01) / MAT-K2-2 (D101)', instructor: 'Prof. Dr. Yasemin SAĞİROĞLU' },
]

// Devamsızlık verileri - 14 haftada %30 = 4.2 hafta (max 4 hafta devamsızlık)
export const mockAttendance: Attendance[] = [
    {
        courseId: '1',
        courseCode: 'YZG2013',
        courseName: 'Programlama Laboratuvarı III',
        totalWeeks: 14,
        absentWeeks: 1,
        maxAbsentWeeks: 4,
        status: 'safe',
    },
    {
        courseId: '2',
        courseCode: 'YZG2011',
        courseName: 'Yazılım Gereksinimleri Analizi',
        totalWeeks: 14,
        absentWeeks: 3,
        maxAbsentWeeks: 4,
        status: 'warning', // 3 hafta devamsızlık - uyarı
    },
    {
        courseId: '3',
        courseCode: 'YZG2009',
        courseName: 'Bilgisayar Mimarisi ve Mantıksal Tasarım',
        totalWeeks: 14,
        absentWeeks: 0,
        maxAbsentWeeks: 4,
        status: 'safe',
    },
    {
        courseId: '4',
        courseCode: 'YZG2007',
        courseName: 'Veri Yapıları ve Algoritmalar',
        totalWeeks: 14,
        absentWeeks: 2,
        maxAbsentWeeks: 4,
        status: 'safe',
    },
    {
        courseId: '5',
        courseCode: 'YZG2005',
        courseName: 'Sayısal Analiz',
        totalWeeks: 14,
        absentWeeks: 3.5,
        maxAbsentWeeks: 4,
        status: 'danger', // 3.5 hafta - tehlike
    },
    {
        courseId: '6',
        courseCode: 'YZG2003',
        courseName: 'Nesneye Yönelik Programlama',
        totalWeeks: 14,
        absentWeeks: 5,
        maxAbsentWeeks: 4,
        status: 'failed', // 5 hafta - devamsızlıktan kaldı
    },
    {
        courseId: '7',
        courseCode: 'YZG2001',
        courseName: 'Diferansiyel Denklemler',
        totalWeeks: 14,
        absentWeeks: 1,
        maxAbsentWeeks: 4,
        status: 'safe',
    },
]

// Bölüm ders programı - tüm bölüm dersleri
export const mockDepartmentSchedule = [
    { id: '1', code: 'YZG2003', name: 'Nesneye Yönelik Programlama - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Prof. Dr. Hacer ÖZYURT' },
    { id: '2', code: 'YDB1003', name: 'İngilizce - I - A', section: 'A', classroom: 'DZ-02 / MAT-K2-1 (DZ-02)', instructor: 'Öğr. Gör. Özcan GÜRSOY' },
    { id: '3', code: 'FİZ1023', name: 'Fizik - I - A', section: 'A', classroom: 'Fizik Derslik-1 / FİZ-Z-6 (Fizik Derslik-1)', instructor: 'Prof. Dr. Coşkun AYDIN' },
    { id: '4', code: 'MAT1037', name: 'Matematik - I - A', section: 'A', classroom: 'D103 / MAT-K2-2 (D101) / MAT-K2-4 (D103)', instructor: 'Prof. Dr. Mehmet KUNT' },
    { id: '5', code: 'MAT1037', name: 'Matematik - I - A', section: 'A', classroom: 'D103 / MAT-K2-2 (D101) / MAT-K2-4 (D103)', instructor: 'Prof. Dr. Mehmet KUNT' },
    { id: '6', code: 'YZG1001', name: 'Lineer Cebir - A', section: 'A', classroom: 'D102 / MAT-K2-3 (D102)', instructor: 'Prof. Dr. Funda KARAÇAL' },
    { id: '7', code: 'YZG1003', name: 'Yazılım Geliştirme Temelleri - A', section: 'A', classroom: 'D202 / MAT-K3-2 (D202)', instructor: 'Dr. Öğr. Üyesi Ercüment YILMAZ' },
    { id: '8', code: 'YZG1005', name: 'Programlama I - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Işılay BOZKURT' },
    { id: '9', code: 'YZG1007', name: 'Programlama Laboratuvarı I - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Işılay BOZKURT' },
    { id: '10', code: 'YZG2001', name: 'Diferansiyel Denklemler - A', section: 'A', classroom: 'D101 / MAT-K1-33 (DZ-01) / MAT-K2-2 (D101)', instructor: 'Prof. Dr. Yasemin SAĞİROĞLU' },
    { id: '11', code: 'YZG2001', name: 'Diferansiyel Denklemler - A', section: 'A', classroom: 'D101 / MAT-K1-33 (DZ-01) / MAT-K2-2 (D101)', instructor: 'Prof. Dr. Yasemin SAĞİROĞLU' },
    { id: '12', code: 'YZG2005', name: 'Sayısal Analiz - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Prof. Dr. Erhan COŞKUN' },
    { id: '13', code: 'YZG2007', name: 'Veri Yapıları ve Algoritmalar - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { id: '14', code: 'YZG2009', name: 'Bilgisayar Mimarisi ve Mantıksal Tasarım - A', section: 'A', classroom: '/', instructor: 'Dr. Öğr. Üyesi Özkan BİNGÖL' },
    { id: '15', code: 'YZG2011', name: 'Yazılım Gereksinimleri Analizi - A', section: 'A', classroom: 'D202 / MAT-K3-2 (D202)', instructor: 'Prof. Dr. Özcan ÖZYURT' },
    { id: '16', code: 'YZG2013', name: 'Programlama Laboratuvarı III - A', section: 'A', classroom: 'D204 / MAT-K3-4 (D204)', instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
]

// Vize notları - daha gerçekçi ve çeşitli
export const mockMidtermGrades = [
    { courseCode: 'YZG2013', courseName: 'Programlama Laboratuvarı III', midterm1: 78, midterm2: null, average: 78, instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { courseCode: 'YZG2011', courseName: 'Yazılım Gereksinimleri Analizi', midterm1: 85, midterm2: 79, average: 82, instructor: 'Prof. Dr. Özcan ÖZYURT' },
    { courseCode: 'YZG2009', courseName: 'Bilgisayar Mimarisi ve Mantıksal Tasarım', midterm1: 62, midterm2: null, average: 62, instructor: 'Dr. Öğr. Üyesi Özkan BİNGÖL' },
    { courseCode: 'YZG2007', courseName: 'Veri Yapıları ve Algoritmalar', midterm1: 91, midterm2: 86, average: 88.5, instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { courseCode: 'YZG2005', courseName: 'Sayısal Analiz', midterm1: 55, midterm2: 68, average: 61.5, instructor: 'Prof. Dr. Erhan COŞKUN' },
    { courseCode: 'YZG2003', courseName: 'Nesneye Yönelik Programlama', midterm1: 72, midterm2: 81, average: 76.5, instructor: 'Prof. Dr. Hacer ÖZYURT' },
    { courseCode: 'YZG2001', courseName: 'Diferansiyel Denklemler', midterm1: 48, midterm2: 59, average: 53.5, instructor: 'Prof. Dr. Yasemin SAĞİROĞLU' },
]

// Geçmiş dönem dersleri (transkript için) - daha gerçekçi notlar
export const mockTranscriptCourses = [
    // 1. Dönem
    { semester: '2023-2024 Güz', code: 'YZG1001', name: 'Lineer Cebir', credits: 4, grade: 'BB', points: 3.0, instructor: 'Prof. Dr. Funda KARAÇAL' },
    { semester: '2023-2024 Güz', code: 'YZG1003', name: 'Yazılım Geliştirme Temelleri', credits: 3, grade: 'AA', points: 4.0, instructor: 'Dr. Öğr. Üyesi Ercüment YILMAZ' },
    { semester: '2023-2024 Güz', code: 'YZG1005', name: 'Programlama I', credits: 4, grade: 'BA', points: 3.5, instructor: 'Dr. Öğr. Üyesi Işılay BOZKURT' },
    { semester: '2023-2024 Güz', code: 'YZG1007', name: 'Programlama Laboratuvarı I', credits: 2, grade: 'AA', points: 4.0, instructor: 'Dr. Öğr. Üyesi Işılay BOZKURT' },
    { semester: '2023-2024 Güz', code: 'MAT1037', name: 'Matematik I', credits: 5, grade: 'CB', points: 2.5, instructor: 'Prof. Dr. Mehmet KUNT' },
    { semester: '2023-2024 Güz', code: 'FİZ1023', name: 'Fizik I', credits: 4, grade: 'BA', points: 3.5, instructor: 'Prof. Dr. Coşkun AYDIN' },
    { semester: '2023-2024 Güz', code: 'YDB1003', name: 'İngilizce I', credits: 3, grade: 'BB', points: 3.0, instructor: 'Öğr. Gör. Özcan GÜRSOY' },
    // 2. Dönem
    { semester: '2023-2024 Bahar', code: 'YZG1002', name: 'Ayrık Matematik', credits: 4, grade: 'BA', points: 3.5, instructor: 'Prof. Dr. Funda KARAÇAL' },
    { semester: '2023-2024 Bahar', code: 'YZG1004', name: 'Algoritma Analizi', credits: 3, grade: 'AA', points: 4.0, instructor: 'Dr. Öğr. Üyesi Ercüment YILMAZ' },
    { semester: '2023-2024 Bahar', code: 'YZG1006', name: 'Programlama II', credits: 4, grade: 'AA', points: 4.0, instructor: 'Dr. Öğr. Üyesi Işılay BOZKURT' },
    { semester: '2023-2024 Bahar', code: 'YZG1008', name: 'Programlama Laboratuvarı II', credits: 2, grade: 'BA', points: 3.5, instructor: 'Dr. Öğr. Üyesi Sayyad ALİZADEH' },
    { semester: '2023-2024 Bahar', code: 'MAT1038', name: 'Matematik II', credits: 5, grade: 'CC', points: 2.0, instructor: 'Prof. Dr. Mehmet KUNT' },
    { semester: '2023-2024 Bahar', code: 'FİZ1024', name: 'Fizik II', credits: 4, grade: 'BB', points: 3.0, instructor: 'Prof. Dr. Coşkun AYDIN' },
    { semester: '2023-2024 Bahar', code: 'YDB1004', name: 'İngilizce II', credits: 3, grade: 'AA', points: 4.0, instructor: 'Öğr. Gör. Özcan GÜRSOY' },
]

export const mockFees: Fee[] = [
    { id: '1', semester: '2024-2025 Güz', amount: 480.00, status: 'paid', dueDate: '2024-02-15', paymentDate: '2024-02-12' },
    { id: '2', semester: '2023-2024 Bahar', amount: 480.00, status: 'paid', dueDate: '2023-09-15', paymentDate: '2023-09-10' },
    { id: '3', semester: '2023-2024 Güz', amount: 450.00, status: 'paid', dueDate: '2023-02-15', paymentDate: '2023-02-11' },
]

export const mockLibraryBooks: LibraryBook[] = [
    { id: '1', title: 'Veri Yapıları ve Algoritmalar', author: 'Rifat Çölkesen', borrowDate: '2024-02-01', dueDate: '2024-03-01', status: 'borrowed' },
    { id: '2', title: 'Temel Fizik I', author: 'Raymond Serway', borrowDate: '2024-01-15', dueDate: '2024-02-15', status: 'overdue' },
]

export const mockCafeteriaMenu: CafeteriaMenu[] = [
    { day: 'Pazartesi', date: '2024-12-23', soup: 'Mercimek Çorbası', mainCourse: 'İzmir Köfte', sideDish: 'Pirinç Pilavı', dessert: 'Kemalpaşa Tatlısı', calories: 850 },
    { day: 'Salı', date: '2024-12-24', soup: 'Domates Çorbası', mainCourse: 'Tavuk Sote', sideDish: 'Bulgur Pilavı', dessert: 'Meyve', calories: 720 },
    { day: 'Çarşamba', date: '2024-12-25', soup: 'Yayla Çorbası', mainCourse: 'Kuru Fasulye', sideDish: 'Pirinç Pilavı', dessert: 'Cacık', calories: 910 },
    { day: 'Perşembe', date: '2024-12-26', soup: 'Ezogelin Çorbası', mainCourse: 'Fırın Makarna', sideDish: 'Mevsim Salatası', dessert: 'Sütlaç', calories: 680 },
    { day: 'Cuma', date: '2024-12-27', soup: 'Tarhana Çorbası', mainCourse: 'Balık Tava', sideDish: 'Patates Tava', dessert: 'Helva', calories: 950 },
]

export const mockMakeupEligible: MakeupEligibleCourse[] = [
    { id: '1', code: 'YZG2001', name: 'Diferansiyel Denklemler', instructor: 'Prof. Dr. Yasemin SAĞİROĞLU', grade: 'FF' },
    { id: '2', code: 'YZG2005', name: 'Sayısal Analiz', instructor: 'Prof. Dr. Erhan COŞKUN', grade: 'FD' },
]


