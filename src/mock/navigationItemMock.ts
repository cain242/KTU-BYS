export const navigationItems = [
    {
        title: 'Anasayfa',
        icon: 'mdi-home',
        to: '/'
    },
    {
        title: 'Kişisel İşlemler',
        icon: 'mdi-account-circle',
        children: [
            { title: 'Kişisel Bilgiler', icon: 'mdi-account-details', to: '/profile' },
            { title: 'Telefon / E-Posta / HES Kodu', icon: 'mdi-cellphone', to: '/contact' },
            { title: 'BYS Şifre Değiştirme', icon: 'mdi-key-variant', to: '/password' },
            { title: 'Mail Şifre Değiştirme', icon: 'mdi-email-lock', to: '/mail-password' },
        ]
    },
    {
        title: 'Ders İşlemleri',
        icon: 'mdi-book-open-variant',
        children: [
            { title: 'Transkript', icon: 'mdi-file-document-outline', to: '/transcript' },
            { title: 'Vize Notları', icon: 'mdi-clipboard-text-outline', to: '/midterm-grades' },
            { title: 'Ders Programı', icon: 'mdi-calendar-clock', to: '/schedule' },
            { title: 'Bölüm Ders Programı', icon: 'mdi-calendar-month', to: '/department-schedule' },
            { title: 'Devamsızlık', icon: 'mdi-account-check', to: '/attendance' },
            { title: 'Bütünleme', icon: 'mdi-clipboard-check-outline', to: '/makeup-exams' },
            { title: 'Akademik Durum Analizi', icon: 'mdi-chart-bar', to: '/academic-analysis' },
        ]
    },
    {
        title: 'İlişik Kesme Talebi',
        icon: 'mdi-file-cancel-outline',
        to: '/clearance'
    },
    {
        title: 'Staj Yönetim Sistemi',
        icon: 'mdi-briefcase-outline',
        children: [
            { title: 'Duyurular', icon: 'mdi-bullhorn-outline', to: '/internship/announcements' },
            { title: 'İlgili Mevzuatlar', icon: 'mdi-scale-balance', to: '/internship/regulations' },
            { title: 'Staj Başvuru', icon: 'mdi-file-send-outline', to: '/internship/apply' },
            { title: 'Tüm Staj Başvuruları', icon: 'mdi-folder-open-outline', to: '/internship/applications' },
            { title: 'Gerekli Dosyalar', icon: 'mdi-file-download-outline', to: '/internship/documents' },
            { title: 'Talepler', icon: 'mdi-message-text-outline', to: '/internship/requests' },
            { title: 'Staj Sonlandır', icon: 'mdi-check-circle-outline', to: '/internship/complete' },
            { title: 'Sık Sorulan Sorular', icon: 'mdi-help-circle-outline', to: '/internship/faq' },
        ]
    },
    {
        title: 'Burs Başvurusu',
        icon: 'mdi-wallet-outline',
        children: [
            { title: 'Vakıf Bursu Başvurusu', icon: 'mdi-hand-coin-outline', to: '/scholarship/foundation-apply' },
            { title: 'Vakıf Bursu Başvurularım', icon: 'mdi-format-list-bulleted', to: '/scholarship/foundation-list' },
            { title: 'Yemek Bursu Başvurusu', icon: 'mdi-food-outline', to: '/scholarship/meal-apply' },
            { title: 'Yemek Bursu Başvurularım', icon: 'mdi-format-list-checks', to: '/scholarship/meal-list' },
        ]
    },
    {
        title: 'Yemekhane',
        icon: 'mdi-silverware-fork-knife',
        to: '/cafeteria'
    },
    {
        title: 'Spor Sahaları Yönetimi',
        icon: 'mdi-soccer-field',
        children: [
            { title: 'Bakiye Yükle', icon: 'mdi-credit-card-plus-outline', to: '/sports/balance' },
            { title: 'Sahalar', icon: 'mdi-stadium-outline', to: '/sports/availability' },
            { title: 'Rezervasyonlarım', icon: 'mdi-calendar-check-outline', to: '/sports/reservations' },
        ]
    },
    {
        title: 'Kütüphane Borç Ödeme',
        icon: 'mdi-library-outline',
        to: '/library'
    },
    {
        title: 'Eğitim ve Kurs Yönetimi',
        icon: 'mdi-school-outline',
        children: [
            { title: 'Kurs Yönetimi', icon: 'mdi-certificate-outline', to: '/education/courses' },
            { title: 'Başvurularım', icon: 'mdi-clipboard-list-outline', to: '/education/applications' },
            { title: 'Yardım Dökümanı', icon: 'mdi-file-question-outline', to: '/education/help' },
        ]
    },
    {
        title: 'Duyurular',
        icon: 'mdi-bullhorn-outline',
        to: '/announcements'
    },
    {
        title: 'BYS Çıkış',
        icon: 'mdi-logout',
        href: 'https://bys.ktu.edu.tr/bys.aspx'
    },
]