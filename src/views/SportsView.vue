<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { smAndDown, mdAndDown } = useDisplay()

// Balance state
const balance = ref(100)
const loadAmount = ref(20)

// Reservation dialog state
const reservationDialog = ref(false)
const selectedField = ref<typeof allFields.value[0] | null>(null)
const reservationForm = ref({
    date: '',
    startTime: '',
    endTime: '',
    paymentMethod: 'balance' as 'balance' | 'card'
})
const reservationLoading = ref(false)

// Cancel confirmation dialog
const cancelDialog = ref(false)
const cancellingReservation = ref<typeof reservations.value[0] | null>(null)

// Snackbar for notifications
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

// View routing
const currentView = computed(() => {
    const path = route.path
    if (path.includes('/balance')) return 'balance'
    if (path.includes('/fields')) return 'fields'
    if (path.includes('/availability')) return 'availability'
    if (path.includes('/reservations')) return 'reservations'
    return 'fields'
})

const pageInfo = computed(() => {
    const info: Record<string, { title: string, icon: string, subtitle: string }> = {
        'balance': { title: 'Bakiye Yükle', icon: 'mdi-credit-card-plus-outline', subtitle: 'Spor sahası rezervasyonları için bakiye yönetimi' },
        'fields': { title: 'Sahalar', icon: 'mdi-stadium-outline', subtitle: 'Kampüs içi spor tesisleri ve rezervasyon oluşturma' },
        'availability': { title: 'Sahalar', icon: 'mdi-stadium-outline', subtitle: 'Haftalık doluluk durumu ve rezervasyon oluşturma' },
        'reservations': { title: 'Rezervasyonlarım', icon: 'mdi-calendar-check-outline', subtitle: 'Aktif ve geçmiş saha rezervasyonlarınız' }
    }
    return info[currentView.value] ?? info['fields']
})

// Field type filters
const fieldTypes = ['Tümü', 'Futbol', 'Voleybol', 'Tenis', 'Basketbol', 'Masa Tenisi', 'Salon', 'Fitnes']
const selectedFieldType = ref('Tümü')

// Reservation filters
const reservationFilterType = ref('Tümü')
const reservationFilterName = ref('')
const reservationFilterDateStart = ref('')
const reservationFilterDateEnd = ref('')

// Sports fields data - defaultDuration in minutes (most are fixed 60 min)
const allFields = ref([
    { id: 1, name: 'KTÜ FUTBOL SAHASI', type: 'Futbol', startTime: '09:00', endTime: '22:00', status: 'Aktif', price: 20, defaultDuration: 60 },
    { id: 2, name: 'Sahil Rekreasyon Alanı Kort', type: 'Tenis', startTime: '09:00', endTime: '22:00', status: 'Aktif', price: 15, defaultDuration: 60 },
    { id: 3, name: 'Saha 2 GECE', type: 'Basketbol', startTime: '17:00', endTime: '22:00', status: 'Aktif', price: 10, defaultDuration: 60 },
    { id: 4, name: 'Saha A (merkez)', type: 'Voleybol', startTime: '09:00', endTime: '17:00', status: 'Aktif', price: 10, defaultDuration: 60 },
    { id: 5, name: 'Salon', type: 'Salon', startTime: '12:00', endTime: '22:00', status: 'Aktif', price: 15, defaultDuration: 60 },
    { id: 6, name: 'Saha 1 GÜNDÜZ', type: 'Basketbol', startTime: '09:00', endTime: '17:00', status: 'Aktif', price: 10, defaultDuration: 60 },
    { id: 7, name: 'Saha 1 GECE', type: 'Basketbol', startTime: '17:00', endTime: '22:00', status: 'Aktif', price: 10, defaultDuration: 60 },
    { id: 8, name: 'Masa Tenisi 1', type: 'Masa Tenisi', startTime: '14:00', endTime: '22:00', status: 'Aktif', price: 5, defaultDuration: 30 },
    { id: 9, name: 'Masa Tenisi 2', type: 'Masa Tenisi', startTime: '14:00', endTime: '22:00', status: 'Aktif', price: 5, defaultDuration: 30 },
    { id: 10, name: 'Masa Tenisi 3', type: 'Masa Tenisi', startTime: '09:00', endTime: '22:00', status: 'Aktif', price: 5, defaultDuration: 30 },
    { id: 11, name: 'Masa Tenisi 4', type: 'Masa Tenisi', startTime: '09:00', endTime: '17:00', status: 'Aktif', price: 5, defaultDuration: 30 },
    { id: 12, name: 'Halı Saha', type: 'Futbol', startTime: '14:00', endTime: '22:00', status: 'Aktif', price: 25, defaultDuration: 60 },
    { id: 13, name: 'Kampüs Tenis Kort GÜNDÜZ', type: 'Tenis', startTime: '09:00', endTime: '17:00', status: 'Aktif', price: 15, defaultDuration: 60 },
    { id: 14, name: 'Kampüs Tenis Kort GECE', type: 'Tenis', startTime: '17:00', endTime: '22:00', status: 'Aktif', price: 15, defaultDuration: 60 },
    { id: 15, name: 'TATO FUTBOL SAHASI GÜNDÜZ', type: 'Futbol', startTime: '09:00', endTime: '17:00', status: 'Aktif', price: 20, defaultDuration: 60 },
    { id: 16, name: 'VOLEYBOL SAHASI', type: 'Voleybol', startTime: '14:00', endTime: '17:00', status: 'Aktif', price: 10, defaultDuration: 60 },
    { id: 17, name: 'Fitnes', type: 'Fitnes', startTime: '08:00', endTime: '22:00', status: 'Aktif', price: 10, defaultDuration: 30 },
])

const filteredFields = computed(() => {
    if (selectedFieldType.value === 'Tümü') return allFields.value
    return allFields.value.filter(f => f.type === selectedFieldType.value)
})

// Helper to get current week date for mock data
const getCurrentWeekDate = (dayOffset: number) => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + dayOffset)
    const day = monday.getDate().toString().padStart(2, '0')
    const month = (monday.getMonth() + 1).toString().padStart(2, '0')
    const year = monday.getFullYear()
    return `${day}.${month}.${year}`
}

// Reservations data - using current week dates for testing
const reservations = ref([
    { id: 1, fieldId: 1, fieldType: 'Futbol', fieldName: 'KTÜ FUTBOL SAHASI', date: getCurrentWeekDate(0), startTime: '17:00', duration: 60, reservationDate: getCurrentWeekDate(-1), approvalDate: '02:19:19', status: 'Onaylandı', confirmCode: 'SHA8FFS1BFZAG8J6LB18M6P66', paymentCode: '', paymentMethod: 'balance' as const, cancelled: false, approved: true, price: 20 },
    { id: 2, fieldId: 8, fieldType: 'Masa Tenisi', fieldName: 'Masa Tenisi 1', date: getCurrentWeekDate(2), startTime: '14:00', duration: 30, reservationDate: getCurrentWeekDate(-1), approvalDate: '10:30:00', status: 'Onaylandı', confirmCode: 'MASATENIS2024ABC', paymentCode: '', paymentMethod: 'balance' as const, cancelled: false, approved: true, price: 5 },
    { id: 3, fieldId: 17, fieldType: 'Fitnes', fieldName: 'Fitnes', date: getCurrentWeekDate(4), startTime: '18:00', duration: 30, reservationDate: getCurrentWeekDate(-2), approvalDate: '', status: 'İptal edildi', confirmCode: '', paymentCode: 'PAY123456789ABC', paymentMethod: 'card' as const, cancelled: true, approved: false, price: 10 },
])

// Balance transaction history
const transactions = ref([
    { id: 1, amount: 10, date: '12.06.2025 00:14:29', status: '', code: '', type: 'Bakiye Kullanıldı' },
    { id: 2, amount: 40, date: '07.01.2025 10:23:52', status: 'Onaylandı', code: 'Bod0IcnIOKE74eK0o03a17b80s0b3e208', type: 'Bakiye Yükleme' },
    { id: 3, amount: 20, date: '29.12.2024 18:54:43', status: '', code: '', type: 'Bakiye Kullanıldı' },
    { id: 4, amount: 60, date: '29.12.2024 05:03:14', status: 'Onaylandı', code: '4c15n00caNat48orda788caddb089215c', type: 'Bakiye Yükleme' },
])

// Field type icons
const getFieldIcon = (type: string) => {
    const icons: Record<string, string> = {
        'Futbol': 'mdi-soccer',
        'Voleybol': 'mdi-volleyball',
        'Tenis': 'mdi-tennis',
        'Basketbol': 'mdi-basketball',
        'Masa Tenisi': 'mdi-table-tennis',
        'Salon': 'mdi-home-city',
        'Fitnes': 'mdi-dumbbell',
    }
    return icons[type] || 'mdi-stadium'
}

// Generate random confirmation code
const generateConfirmCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 20; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

// Format current date
const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

const formatDateTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${formatDate(date)} ${hours}:${minutes}:${seconds}`
}

// Open reservation dialog
const openReservationDialog = (field: typeof allFields.value[0]) => {
    selectedField.value = field
    reservationForm.value = {
        date: '',
        startTime: '',
        endTime: '',
        paymentMethod: 'balance'
    }
    reservationDialog.value = true
}

// Calculate total duration in minutes from start and end time
const totalDuration = computed(() => {
    if (!reservationForm.value.startTime || !reservationForm.value.endTime) return 0

    const startParts = reservationForm.value.startTime.split(':').map(Number)
    const endParts = reservationForm.value.endTime.split(':').map(Number)
    const startH = startParts[0] ?? 0
    const startM = startParts[1] ?? 0
    const endH = endParts[0] ?? 0
    const endM = endParts[1] ?? 0

    const startMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM

    return endMinutes - startMinutes
})

// Calculate number of slots based on duration
const calculatedSlots = computed(() => {
    if (!selectedField.value || totalDuration.value <= 0) return 0
    return Math.ceil(totalDuration.value / selectedField.value.defaultDuration)
})

// Calculate reservation cost (price per slot * number of slots)
const reservationCost = computed(() => {
    if (!selectedField.value || calculatedSlots.value <= 0) return 0
    return selectedField.value.price * calculatedSlots.value
})

// Check if balance is sufficient
const isBalanceSufficient = computed(() => {
    return balance.value >= reservationCost.value
})

// Convert time string to minutes for comparison
const timeToMinutes = (time: string) => {
    const parts = time.split(':').map(Number)
    const h = parts[0] ?? 0
    const m = parts[1] ?? 0
    return h * 60 + m
}

// Check if duration is a multiple of slot duration
const isDurationValid = computed(() => {
    if (!selectedField.value || totalDuration.value <= 0) return false
    return totalDuration.value % selectedField.value.defaultDuration === 0
})

// Check if times are within field operating hours
const isWithinFieldHours = computed(() => {
    if (!selectedField.value || !reservationForm.value.startTime || !reservationForm.value.endTime) return false

    const fieldStartMins = timeToMinutes(selectedField.value.startTime)
    const fieldEndMins = timeToMinutes(selectedField.value.endTime)
    const reserveStartMins = timeToMinutes(reservationForm.value.startTime)
    const reserveEndMins = timeToMinutes(reservationForm.value.endTime)

    return reserveStartMins >= fieldStartMins && reserveEndMins <= fieldEndMins
})



// Create reservation
const createReservation = async () => {
    if (!selectedField.value) return

    // Validate form
    if (!reservationForm.value.date || !reservationForm.value.startTime || !reservationForm.value.endTime) {
        showSnackbar('Lütfen tarih, başlangıç ve bitiş saati seçin', 'error')
        return
    }

    if (!isDurationValid.value) {
        showSnackbar(`Süre ${selectedField.value.defaultDuration} dakikanın katı olmalıdır`, 'error')
        return
    }

    if (!isWithinFieldHours.value) {
        showSnackbar(`Seçilen saatler saha çalışma saatleri (${selectedField.value.startTime} - ${selectedField.value.endTime}) dışında!`, 'error')
        return
    }

    // Check balance if paying with balance
    if (reservationForm.value.paymentMethod === 'balance' && !isBalanceSufficient.value) {
        showSnackbar('Yetersiz bakiye! Lütfen bakiye yükleyin veya kart ile ödeyin.', 'error')
        return
    }

    reservationLoading.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const now = new Date()
    const confirmCode = generateConfirmCode()
    const paymentCode = reservationForm.value.paymentMethod === 'card' ? 'PAY' + generateConfirmCode() : ''

    // Create new reservation
    const newReservation = {
        id: reservations.value.length + 1,
        fieldId: selectedField.value.id,
        fieldType: selectedField.value.type,
        fieldName: selectedField.value.name,
        date: reservationForm.value.date.split('-').reverse().join('.'),
        startTime: reservationForm.value.startTime,
        endTime: reservationForm.value.endTime,
        duration: totalDuration.value,
        slots: calculatedSlots.value,
        reservationDate: formatDate(now),
        approvalDate: now.toTimeString().slice(0, 8),
        status: 'Onaylandı',
        confirmCode,
        paymentCode,
        paymentMethod: reservationForm.value.paymentMethod,
        cancelled: false,
        approved: true,
        price: reservationCost.value
    }

    reservations.value.unshift(newReservation)

    // Deduct balance if paying with balance
    if (reservationForm.value.paymentMethod === 'balance') {
        balance.value -= reservationCost.value

        // Add transaction
        transactions.value.unshift({
            id: transactions.value.length + 1,
            amount: reservationCost.value,
            date: formatDateTime(now),
            status: '',
            code: '',
            type: 'Bakiye Kullanıldı'
        })
    }

    reservationLoading.value = false
    reservationDialog.value = false
    showSnackbar('Rezervasyon başarıyla oluşturuldu!', 'success')
}

// Open cancel confirmation
const openCancelDialog = (reservation: typeof reservations.value[0]) => {
    cancellingReservation.value = reservation
    cancelDialog.value = true
}

// Cancel reservation
const cancelReservation = async () => {
    if (!cancellingReservation.value) return

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    const reservation = reservations.value.find(r => r.id === cancellingReservation.value!.id)
    if (reservation) {
        reservation.cancelled = true
        reservation.status = 'İptal edildi'

        // Refund if paid with balance
        if (reservation.paymentMethod === 'balance') {
            balance.value += reservation.price

            // Add refund transaction
            transactions.value.unshift({
                id: transactions.value.length + 1,
                amount: reservation.price,
                date: formatDateTime(new Date()),
                status: 'İade',
                code: '',
                type: 'Bakiye İadesi'
            })
        }

        showSnackbar('Rezervasyon iptal edildi.', 'info')
    }

    cancelDialog.value = false
    cancellingReservation.value = null
}

// Load balance
const loadBalance = async () => {
    if (loadAmount.value <= 0) {
        showSnackbar('Geçerli bir tutar girin', 'error')
        return
    }

    // Simulate payment
    await new Promise(resolve => setTimeout(resolve, 1000))

    balance.value += loadAmount.value

    transactions.value.unshift({
        id: transactions.value.length + 1,
        amount: loadAmount.value,
        date: formatDateTime(new Date()),
        status: 'Onaylandı',
        code: generateConfirmCode(),
        type: 'Bakiye Yükleme'
    })

    showSnackbar(`${loadAmount.value} ₺ bakiye yüklendi!`, 'success')
    loadAmount.value = 20
}

// Show snackbar notification
const showSnackbar = (text: string, color: string) => {
    snackbarText.value = text
    snackbarColor.value = color
    snackbar.value = true
}

// ============ AVAILABILITY HEAT-MAP ============
// Days of the week
const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const weekDaysFull = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']

// Get current week dates
const getWeekDates = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

    const dates = []
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        dates.push(d)
    }
    return dates
}

const weekDates = getWeekDates()

// Availability status types
type AvailabilityStatus = 'free' | 'occupied' | 'maintenance'

// Generate mock availability data for all fields
const generateAvailability = () => {
    const availability: Record<number, AvailabilityStatus[]> = {}

    allFields.value.forEach(field => {
        availability[field.id] = []
        for (let day = 0; day < 7; day++) {
            // Generate random status
            const rand = Math.random()
            let status: AvailabilityStatus

            if (field.status === 'Bakımda') {
                status = 'maintenance'
            } else if (rand < 0.6) {
                status = 'free'
            } else if (rand < 0.85) {
                status = 'occupied'
            } else {
                status = 'maintenance'
            }

            availability[field.id]!.push(status)
        }
    })

    return availability
}

const fieldAvailability = ref(generateAvailability())



const getAvailabilityBgClass = (status: AvailabilityStatus) => {
    const classes: Record<AvailabilityStatus, string> = {
        'free': 'bg-success-lighten-4',
        'occupied': 'bg-error-lighten-4',
        'maintenance': 'bg-grey-lighten-2'
    }
    return classes[status]
}

// Compact field list for heat-map (max ~12 fields)
const heatmapFields = computed(() => {
    return allFields.value.slice(0, 12)
})

// ============ REAL-TIME CONFLICT FLASH ============
// Track cells that are currently flashing (simulating real-time conflicts)
const flashingCells = ref<Set<string>>(new Set())

// Simulate real-time conflict detection (in production this would be WebSocket)
const simulateConflict = () => {
    // Pick a random field and day to flash
    const randomField = heatmapFields.value[Math.floor(Math.random() * heatmapFields.value.length)]
    if (!randomField) return

    const randomDay = Math.floor(Math.random() * 7)
    const cellKey = `${randomField.id}-${randomDay}`
    const fieldStatus = fieldAvailability.value[randomField.id]

    // Only flash if it was free (simulating someone just booked it)
    if (fieldStatus && fieldStatus[randomDay] === 'free') {
        // Add flashing class
        flashingCells.value.add(cellKey)

        // Update availability to occupied
        fieldStatus[randomDay] = 'occupied'

        // Show notification
        showSnackbar(`${randomField.name} - ${weekDaysFull[randomDay]} slotu başka biri tarafından rezerve edildi!`, 'warning')

        // Remove flash after animation completes
        setTimeout(() => {
            flashingCells.value.delete(cellKey)
        }, 1500)
    }
}

// Check if a cell is flashing
const isCellFlashing = (fieldId: number, dayIdx: number) => {
    return flashingCells.value.has(`${fieldId}-${dayIdx}`)
}

// Start simulating conflicts every 15-30 seconds (for demo purposes)
let _conflictInterval: ReturnType<typeof setInterval> | null = null
if (typeof window !== 'undefined') {
    _conflictInterval = setInterval(() => {
        if (currentView.value === 'availability' && Math.random() > 0.5) {
            simulateConflict()
        }
    }, 20000) // Every 20 seconds
}

// Per-field schedule image URLs (placeholder paths - to be updated with actual images)
const getFieldScheduleImage = (fieldId: number) => {
    return `/images/schedules/field-${fieldId}.png`
}

// For highlighting reservations when navigating from elsewhere
const highlightedReservationId = ref<number | null>(null)

// Handle cell click - only allow booking free cells
const handleCellClick = (field: typeof allFields.value[0], dayIdx: number, status: string) => {
    if (status === 'free' && !isCellFlashing(field.id, dayIdx)) {
        openReservationDialog(field)
    }
}

// Watch for route changes to handle highlighting

const checkHighlightQuery = () => {
    if (route.query.highlight) {
        highlightedReservationId.value = parseInt(route.query.highlight as string)
        // Scroll to the highlighted row after a short delay
        setTimeout(() => {
            const highlightedRow = document.querySelector('.highlighted-reservation')
            if (highlightedRow) {
                highlightedRow.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }, 100)
        // Clear highlight after 3 seconds
        setTimeout(() => {
            highlightedReservationId.value = null
            // Clear query param without reload
            router.replace({ query: {} })
        }, 3000)
    }
}

// Check on mount and when route changes
onMounted(() => {
    checkHighlightQuery()
    setupStickyHeader()
})

watch(() => route.query.highlight, () => {
    checkHighlightQuery()
})

// Sticky header implementation using Intersection Observer and scroll
const stickyHeaderActive = ref(false)
const originalHeaderRef = ref<HTMLElement | null>(null)
const clonedHeaderRef = ref<HTMLElement | null>(null)

const setupStickyHeader = () => {
    // Wait for next tick to ensure DOM is ready
    setTimeout(() => {
        const thead = document.querySelector('.heatmap-table thead') as HTMLElement
        if (!thead) return

        originalHeaderRef.value = thead

        // Create observer to detect when header scrolls out of view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Header is out of view, activate sticky clone
                    stickyHeaderActive.value = !entry.isIntersecting

                    if (stickyHeaderActive.value && !clonedHeaderRef.value) {
                        createStickyClone()
                    } else if (!stickyHeaderActive.value && clonedHeaderRef.value) {
                        removeStickyClone()
                    }
                })
            },
            {
                threshold: 0,
                rootMargin: '-64px 0px 0px 0px' // Account for app bar height
            }
        )

        observer.observe(thead)

        // Cleanup on unmount
        const cleanup = () => {
            observer.disconnect()
            removeStickyClone()
        }

        // Store cleanup function
        if (typeof window !== 'undefined') {
            (window as any).__stickyHeaderCleanup = cleanup
        }
    }, 100)
}

const createStickyClone = () => {
    const thead = originalHeaderRef.value
    if (!thead || clonedHeaderRef.value) return

    // Clone the header
    const clone = thead.cloneNode(true) as HTMLElement
    clone.classList.add('sticky-header-clone')

    // Get the scroll container to sync horizontal scroll
    const scrollContainer = document.querySelector('.heatmap-scroll-container') as HTMLElement

    // Insert clone before the table
    const table = document.querySelector('.heatmap-table') as HTMLElement
    if (table && table.parentElement) {
        table.parentElement.insertBefore(clone, table)
        clonedHeaderRef.value = clone

        // Sync horizontal scroll between original container and clone
        if (scrollContainer) {
            const syncScroll = () => {
                if (clone) {
                    const cells = clone.querySelectorAll('th')
                    const originalCells = thead.querySelectorAll('th')
                    cells.forEach((cell, index) => {
                        if (originalCells[index]) {
                            ; (cell as HTMLElement).style.minWidth = `${originalCells[index].offsetWidth}px`
                        }
                    })
                    clone.scrollLeft = scrollContainer.scrollLeft
                }
            }

            scrollContainer.addEventListener('scroll', syncScroll)
            syncScroll() // Initial sync

                // Store for cleanup
                ; (clone as any).__scrollSync = () => {
                    scrollContainer.removeEventListener('scroll', syncScroll)
                }
        }
    }
}

const removeStickyClone = () => {
    if (clonedHeaderRef.value) {
        // Clean up scroll sync
        if ((clonedHeaderRef.value as any).__scrollSync) {
            ; (clonedHeaderRef.value as any).__scrollSync()
        }
        clonedHeaderRef.value.remove()
        clonedHeaderRef.value = null
    }
}

// Cleanup on component unmount
watch(currentView, () => {
    if (currentView.value !== 'availability') {
        removeStickyClone()
    }
})
</script>

<template>
    <div class="sports-page-root" :class="mdAndDown ? 'pa-0' : 'pa-1'">
        <!-- Page Header - Simplified to avoid nested layout margins -->
        <div v-if="currentView !== 'availability'" class="page-header-simple" :class="[mdAndDown ? 'pa-2' : 'pa-4']"
            style="margin-top: -8px;">
            <div class="d-flex align-center">
                <v-avatar color="deep-orange" :size="mdAndDown ? 32 : 40" class="mr-3">
                    <v-icon color="white" :size="mdAndDown ? 18 : 24">{{ pageInfo?.icon }}</v-icon>
                </v-avatar>
                <div>
                    <h1 class="text-h6 text-sm-h5 font-weight-bold" style="white-space: normal; line-height: 1.2;">{{
                        pageInfo?.title }}</h1>
                    <p class="text-body-2 text-medium-emphasis mb-0 d-none d-sm-block">{{ pageInfo?.subtitle }}</p>
                </div>
            </div>
        </div>

        <!-- ============ BALANCE SECTION ============ -->
        <template v-if="currentView === 'balance'">
            <!-- Hero Balance Card with Gradient -->
            <v-card class="balance-hero-card mb-6" elevation="4">
                <div class="balance-hero-gradient">
                    <v-row align="center" no-gutters>
                        <v-col cols="12" md="5">
                            <div class="pa-6">
                                <div class="text-overline text-white-50 mb-1">MEVCUT BAKİYE</div>
                                <div class="balance-amount">{{ balance }} ₺</div>
                                <div class="text-caption text-white-50 mt-2">
                                    <v-icon size="14" class="mr-1">mdi-information-outline</v-icon>
                                    Son güncelleme: {{ new Date().toLocaleDateString('tr-TR') }}
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" md="7">
                            <div class="pa-6 balance-load-section">
                                <div class="text-subtitle-2 font-weight-bold mb-3 text-white">Hızlı Yükleme</div>
                                <div class="d-flex flex-wrap gap-2 mb-4">
                                    <v-chip v-for="amount in [20, 50, 100, 200]" :key="amount"
                                        :variant="loadAmount === amount ? 'flat' : 'outlined'"
                                        :color="loadAmount === amount ? 'white' : undefined"
                                        :class="loadAmount === amount ? 'text-deep-orange' : 'text-white'" size="large"
                                        @click="loadAmount = amount">
                                        {{ amount }} ₺
                                    </v-chip>
                                </div>
                                <v-row dense>
                                    <v-col cols="6">
                                        <v-text-field v-model.number="loadAmount" label="Özel Tutar" type="number"
                                            variant="solo" density="compact" suffix="₺" hide-details
                                            bg-color="rgba(255,255,255,0.15)" class="balance-input" />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn color="white" size="large" block
                                            class="text-deep-orange font-weight-bold"
                                            prepend-icon="mdi-credit-card-plus" @click="loadBalance">
                                            Yükle
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card>

            <!-- Info Alert -->
            <v-alert type="info" variant="tonal" class="mb-4" density="compact" border="start">
                <template #prepend>
                    <v-icon>mdi-information</v-icon>
                </template>
                <span class="text-body-2">Yüklediğiniz tutarların geri iadesi için <strong>Sağlık Kültür ve Spor Daire
                        Başkanlığı</strong>'na başvurmanız gerekmektedir.</span>
            </v-alert>

            <!-- Transaction History -->
            <v-card class="content-card" elevation="0">
                <v-card-title class="d-flex align-center justify-space-between pa-4">
                    <div class="d-flex align-center">
                        <v-avatar color="deep-orange-lighten-4" size="36" class="mr-3">
                            <v-icon color="deep-orange">mdi-history</v-icon>
                        </v-avatar>
                        <div>
                            <div class="text-subtitle-1 font-weight-bold">İşlem Geçmişi</div>
                            <div class="text-caption text-medium-emphasis">{{ transactions.length }} işlem</div>
                        </div>
                    </div>
                </v-card-title>

                <v-divider />

                <!-- Mobile: Card view -->
                <template v-if="smAndDown">
                    <div class="pa-4">
                        <v-card v-for="tx in transactions" :key="tx.id" variant="outlined"
                            class="mb-3 transaction-card">
                            <v-card-text class="d-flex align-center pa-3">
                                <v-avatar
                                    :color="tx.type === 'Bakiye Yükleme' ? 'success' : tx.type === 'Bakiye İadesi' ? 'info' : 'warning'"
                                    size="40" class="mr-3">
                                    <v-icon color="white">{{ tx.type === 'Bakiye Yükleme' ? 'mdi-arrow-down' : tx.type
                                        === 'Bakiye İadesi' ? 'mdi-undo' : 'mdi-arrow-up' }}</v-icon>
                                </v-avatar>
                                <div class="flex-grow-1">
                                    <div class="font-weight-bold">{{ tx.type }}</div>
                                    <div class="text-caption text-medium-emphasis">{{ tx.date }}</div>
                                </div>
                                <div class="text-right">
                                    <div class="text-h6 font-weight-bold"
                                        :class="tx.type === 'Bakiye Yükleme' || tx.type === 'Bakiye İadesi' ? 'text-success' : 'text-warning'">
                                        {{ tx.type === 'Bakiye Yükleme' || tx.type === 'Bakiye İadesi' ? '+' : '-' }}{{
                                            tx.amount }} ₺
                                    </div>
                                    <v-chip v-if="tx.status" color="success" size="x-small" variant="flat">{{ tx.status
                                        }}</v-chip>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </template>

                <!-- Desktop: Enhanced Table view -->
                <v-table v-else density="comfortable" class="transactions-table">
                    <thead>
                        <tr>
                            <th>İşlem Türü</th>
                            <th>Tutar</th>
                            <th>Tarih</th>
                            <th>Durum</th>
                            <th>İşlem Kodu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tx in transactions" :key="tx.id" class="transaction-row">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar
                                        :color="tx.type === 'Bakiye Yükleme' ? 'success' : tx.type === 'Bakiye İadesi' ? 'info' : 'warning'"
                                        size="32" class="mr-2">
                                        <v-icon size="16" color="white">{{ tx.type === 'Bakiye Yükleme' ?
                                            'mdi-arrow-down' : tx.type
                                                === 'Bakiye İadesi' ? 'mdi-undo' : 'mdi-arrow-up' }}</v-icon>
                                    </v-avatar>
                                    {{ tx.type }}
                                </div>
                            </td>
                            <td>
                                <span class="font-weight-bold"
                                    :class="tx.type === 'Bakiye Yükleme' || tx.type === 'Bakiye İadesi' ? 'text-success' : 'text-warning'">
                                    {{ tx.type === 'Bakiye Yükleme' || tx.type === 'Bakiye İadesi' ? '+' : '-' }}{{
                                        tx.amount }} ₺
                                </span>
                            </td>
                            <td class="text-medium-emphasis">{{ tx.date }}</td>
                            <td>
                                <v-chip v-if="tx.status" color="success" size="small" variant="flat">{{ tx.status
                                    }}</v-chip>
                                <span v-else class="text-medium-emphasis">-</span>
                            </td>
                            <td>
                                <code v-if="tx.code" class="text-caption">{{ tx.code.slice(0, 12) }}...</code>
                                <span v-else class="text-medium-emphasis">-</span>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </template>

        <!-- ============ FIELDS SECTION ============ -->
        <template v-if="currentView === 'fields'">
            <!-- Filter Card with Dropdown -->
            <v-card class="content-card mb-4" elevation="0">
                <v-card-text class="py-3">
                    <v-row dense align="center">
                        <v-col cols="12" sm="6" md="4" lg="3">
                            <v-select v-model="selectedFieldType" label="Saha Türü Seçin" :items="fieldTypes"
                                variant="outlined" density="compact" hide-details prepend-inner-icon="mdi-stadium" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Mobile: Card Layout -->
            <template v-if="smAndDown">
                <v-card v-for="field in filteredFields" :key="field.id" class="content-card mb-3" elevation="0">
                    <v-card-text class="pa-3">
                        <div class="d-flex align-center justify-space-between mb-2">
                            <div class="d-flex align-center">
                                <v-avatar :color="'deep-orange-lighten-4'" size="32" class="mr-2">
                                    <v-icon :icon="getFieldIcon(field.type)" color="deep-orange" size="18" />
                                </v-avatar>
                                <div>
                                    <div class="text-subtitle-2 font-weight-medium">{{ field.name }}</div>
                                    <div class="text-caption text-medium-emphasis">{{ field.type }}</div>
                                </div>
                            </div>
                            <v-chip color="success" size="x-small" variant="tonal">{{ field.status }}</v-chip>
                        </div>
                        <div class="d-flex align-center justify-space-between">
                            <div class="text-caption">
                                <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>
                                {{ field.startTime }} - {{ field.endTime }}
                                <span class="ml-2 font-weight-bold text-deep-orange">{{ field.price }} ₺</span>
                            </div>
                            <v-btn color="deep-orange" size="default" variant="tonal" prepend-icon="mdi-calendar-plus"
                                @click="openReservationDialog(field)">
                                Rezervasyon
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </template>

            <!-- Desktop: Table Layout -->
            <v-card v-else class="content-card" elevation="0">
                <v-table density="compact" class="sports-table">
                    <thead>
                        <tr>
                            <th>Saha Adı</th>
                            <th>Saha Türü</th>
                            <th>Açılış Saati</th>
                            <th>Kapanış Saati</th>
                            <th>Kullanım Durumu</th>
                            <th class="text-center">Rezervasyon</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="field in filteredFields" :key="field.id">
                            <td class="font-weight-medium">{{ field.name }}</td>
                            <td>{{ field.type }}</td>
                            <td>{{ field.startTime }}</td>
                            <td>{{ field.endTime }}</td>
                            <td><v-chip color="success" size="small" variant="tonal">{{ field.status }}</v-chip></td>
                            <td class="text-center">
                                <v-btn color="deep-orange" size="default" variant="tonal"
                                    prepend-icon="mdi-calendar-plus" @click="openReservationDialog(field)">
                                    Rezervasyon
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </template>

        <!-- ============ AVAILABILITY HEAT-MAP SECTION ============ -->
        <template v-if="currentView === 'availability'">
            <!-- Heat Map Grid with Integrated Legend -->
            <v-card class="content-card sticky-card mt-n2" elevation="0">
                <v-card-title
                    class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between px-3 border-bottom gap-2"
                    style="padding-top: 8px; padding-bottom: 8px;">
                    <div class="d-flex align-center">
                        <v-avatar color="deep-orange" size="28" class="mr-2">
                            <v-icon color="white" size="16">mdi-stadium-outline</v-icon>
                        </v-avatar>
                        <div class="text-subtitle-1 font-weight-bold">Program</div>
                    </div>

                    <div class="d-flex align-center flex-wrap gap-3 ml-0 ml-sm-auto">
                        <div class="d-flex align-center gap-1">
                            <div class="heatmap-legend-dot bg-success" style="width: 8px; height: 8px;"></div>
                            <span class="text-caption font-weight-medium">Müsait</span>
                        </div>
                        <div class="d-flex align-center gap-1">
                            <div class="heatmap-legend-dot bg-error" style="width: 8px; height: 8px;"></div>
                            <span class="text-caption font-weight-medium">Dolu</span>
                        </div>
                        <div class="d-flex align-center gap-1">
                            <div class="heatmap-legend-dot bg-grey" style="width: 8px; height: 8px;"></div>
                            <span class="text-caption font-weight-medium">Bakım</span>
                        </div>
                    </div>
                </v-card-title>

                <div class="heatmap-wrapper">
                    <div class="heatmap-scroll-container">
                        <table class="heatmap-table">
                            <thead>
                                <tr>
                                    <th class="heatmap-header-cell field-name-cell">Saha</th>
                                    <th v-for="(day, idx) in weekDays" :key="idx" class="heatmap-header-cell day-cell">
                                        <div class="text-caption font-weight-bold">{{ day }}</div>
                                        <div class="text-caption text-medium-emphasis">{{ weekDates[idx].getDate() }}/{{
                                            weekDates[idx].getMonth() + 1 }}</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="field in heatmapFields" :key="field.id" class="heatmap-row">
                                    <td class="field-name-cell">
                                        <div class="field-name-content">
                                            <v-avatar :color="'deep-orange-lighten-4'" size="20"
                                                class="mr-1 flex-shrink-0">
                                                <v-icon :icon="getFieldIcon(field.type)" color="deep-orange"
                                                    size="12" />
                                            </v-avatar>
                                            <div class="field-name-text">
                                                <div class="font-weight-medium">{{ field.name }}</div>
                                                <div class="text-caption text-medium-emphasis d-none d-md-block">{{
                                                    field.type }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td v-for="(status, dayIdx) in fieldAvailability[field.id]" :key="dayIdx"
                                        class="heatmap-cell"
                                        :class="[getAvailabilityBgClass(status), { 'conflict-flash': isCellFlashing(field.id, dayIdx) }]"
                                        @click="handleCellClick(field, dayIdx, status)"
                                        :style="{ cursor: status === 'free' && !isCellFlashing(field.id, dayIdx) ? 'pointer' : 'default' }">
                                        <v-tooltip
                                            :text="status === 'free' ? 'Rezervasyon için tıkla' : status === 'occupied' ? 'Dolu' : 'Bakımda'"
                                            location="top">
                                            <template #activator="{ props }">
                                                <div v-bind="props" class="heatmap-cell-inner">
                                                    <v-icon v-if="status === 'maintenance'" size="16"
                                                        color="grey-darken-1">mdi-wrench</v-icon>
                                                </div>
                                            </template>
                                        </v-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Quick Stats -->
                <v-divider />
                <v-card-text class="py-3">
                    <v-row dense>
                        <v-col cols="6" sm="3">
                            <div class="text-center">
                                <div class="text-h5 font-weight-bold text-success">{{ heatmapFields.length * 7 - 20 }}
                                </div>
                                <div class="text-caption">Müsait Slot</div>
                            </div>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <div class="text-center">
                                <div class="text-h5 font-weight-bold text-amber-darken-2">{{reservations.filter(r =>
                                    !r.cancelled).length}}</div>
                                <div class="text-caption">Sizin Rez.</div>
                            </div>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <div class="text-center">
                                <div class="text-h5 font-weight-bold text-error">15</div>
                                <div class="text-caption">Dolu</div>
                            </div>
                        </v-col>
                        <v-col cols="6" sm="3">
                            <div class="text-center">
                                <div class="text-h5 font-weight-bold text-grey">5</div>
                                <div class="text-caption">Bakım</div>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>

        <!-- ============ RESERVATIONS SECTION ============ -->
        <template v-if="currentView === 'reservations'">
            <!-- Stats Row -->
            <v-row class="mb-4">
                <v-col cols="6" md="3">
                    <v-card class="stats-card pa-4" variant="outlined">
                        <div class="d-flex align-center">
                            <v-avatar color="success-lighten-4" size="48" class="mr-3">
                                <v-icon color="success" size="24">mdi-check-circle</v-icon>
                            </v-avatar>
                            <div>
                                <div class="text-h5 font-weight-bold">{{reservations.filter(r => r.approved &&
                                    !r.cancelled).length}}</div>
                                <div class="text-caption text-medium-emphasis">Aktif</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6" md="3">
                    <v-card class="stats-card pa-4" variant="outlined">
                        <div class="d-flex align-center">
                            <v-avatar color="error-lighten-4" size="48" class="mr-3">
                                <v-icon color="error" size="24">mdi-cancel</v-icon>
                            </v-avatar>
                            <div>
                                <div class="text-h5 font-weight-bold">{{reservations.filter(r => r.cancelled).length}}
                                </div>
                                <div class="text-caption text-medium-emphasis">İptal</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6" md="3">
                    <v-card class="stats-card pa-4" variant="outlined">
                        <div class="d-flex align-center">
                            <v-avatar color="deep-orange-lighten-4" size="48" class="mr-3">
                                <v-icon color="deep-orange" size="24">mdi-cash</v-icon>
                            </v-avatar>
                            <div>
                                <div class="text-h5 font-weight-bold">{{reservations.filter(r =>
                                    !r.cancelled).reduce((sum, r) => sum + (r.price || 0), 0)}} ₺</div>
                                <div class="text-caption text-medium-emphasis">Harcanan</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="6" md="3">
                    <v-card class="stats-card pa-4" variant="outlined">
                        <div class="d-flex align-center">
                            <v-avatar color="info-lighten-4" size="48" class="mr-3">
                                <v-icon color="info" size="24">mdi-calendar-multiple</v-icon>
                            </v-avatar>
                            <div>
                                <div class="text-h5 font-weight-bold">{{ reservations.length }}</div>
                                <div class="text-caption text-medium-emphasis">Toplam</div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Filter Card -->
            <v-card class="content-card mb-4" elevation="0">
                <v-card-text class="py-3">
                    <div class="d-flex align-center mb-2">
                        <v-icon color="deep-orange" class="mr-2">mdi-filter-variant</v-icon>
                        <span class="text-subtitle-2 font-weight-bold">Filtrele</span>
                    </div>
                    <v-row dense align="center">
                        <v-col cols="6" sm="3" md="2">
                            <v-select v-model="reservationFilterType" label="Saha Türü" :items="fieldTypes"
                                variant="outlined" density="compact" hide-details />
                        </v-col>
                        <v-col cols="6" sm="3" md="2">
                            <v-text-field v-model="reservationFilterName" label="Saha Adı" variant="outlined"
                                density="compact" hide-details prepend-inner-icon="mdi-magnify" />
                        </v-col>
                        <v-col cols="6" sm="3" md="2">
                            <v-text-field v-model="reservationFilterDateStart" label="Başlangıç" type="date"
                                variant="outlined" density="compact" hide-details />
                        </v-col>
                        <v-col cols="6" sm="3" md="2">
                            <v-text-field v-model="reservationFilterDateEnd" label="Bitiş" type="date"
                                variant="outlined" density="compact" hide-details />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Mobile: Enhanced Card Layout -->
            <template v-if="smAndDown">
                <v-card v-for="res in reservations" :key="res.id" class="reservation-card mb-3"
                    :class="{ 'highlighted-reservation': highlightedReservationId === res.id }" variant="outlined">
                    <v-card-text class="pa-4">
                        <div class="d-flex justify-space-between align-start mb-3">
                            <div class="d-flex align-center">
                                <v-avatar color="deep-orange-lighten-4" size="40" class="mr-3">
                                    <v-icon color="deep-orange">{{ getFieldIcon(res.fieldType) }}</v-icon>
                                </v-avatar>
                                <div>
                                    <div class="text-subtitle-1 font-weight-bold">{{ res.fieldName }}</div>
                                    <div class="text-caption text-medium-emphasis">{{ res.fieldType }}</div>
                                </div>
                            </div>
                            <v-chip :color="res.cancelled ? 'error' : (res.approved ? 'success' : 'warning')"
                                size="small" :variant="res.cancelled ? 'flat' : 'tonal'">
                                {{ res.status }}
                            </v-chip>
                        </div>

                        <v-divider class="my-3" />

                        <v-row dense class="text-body-2">
                            <v-col cols="6">
                                <div class="text-caption text-medium-emphasis">Tarih</div>
                                <div class="font-weight-medium">{{ res.date }}</div>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-caption text-medium-emphasis">Saat</div>
                                <div class="font-weight-medium">{{ res.startTime }} ({{ res.duration }} dk)</div>
                            </v-col>
                            <v-col cols="6" class="mt-2">
                                <div class="text-caption text-medium-emphasis">Ücret</div>
                                <div class="font-weight-bold text-deep-orange">{{ res.price || 0 }} ₺</div>
                            </v-col>
                            <v-col cols="6" class="mt-2">
                                <div class="text-caption text-medium-emphasis">Ödeme</div>
                                <div class="font-weight-medium">{{ res.paymentMethod === 'card' ? 'Kart' : 'Bakiye' }}
                                </div>
                            </v-col>
                        </v-row>

                        <v-btn v-if="!res.cancelled" color="error" size="small" variant="tonal" block class="mt-4"
                            prepend-icon="mdi-cancel" @click="openCancelDialog(res)">
                            Rezervasyonu İptal Et
                        </v-btn>
                    </v-card-text>
                </v-card>
            </template>

            <!-- Desktop: Enhanced Table Layout -->
            <v-card v-else class="content-card" elevation="0">
                <v-card-title class="d-flex align-center pa-4">
                    <v-avatar color="deep-orange-lighten-4" size="36" class="mr-3">
                        <v-icon color="deep-orange">mdi-calendar-check</v-icon>
                    </v-avatar>
                    <div>
                        <div class="text-subtitle-1 font-weight-bold">Rezervasyonlarım</div>
                        <div class="text-caption text-medium-emphasis">{{ reservations.length }} kayıt</div>
                    </div>
                </v-card-title>

                <v-divider />

                <v-table density="comfortable" class="reservations-table">
                    <thead>
                        <tr>
                            <th>Saha</th>
                            <th>Tarih & Saat</th>
                            <th>Süre</th>
                            <th>Ücret</th>
                            <th>Durum</th>
                            <th>Ödeme</th>
                            <th class="text-center">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="res in reservations" :key="res.id" class="reservation-row"
                            :class="{ 'highlighted-reservation': highlightedReservationId === res.id }">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar color="deep-orange-lighten-4" size="32" class="mr-2">
                                        <v-icon color="deep-orange" size="16">{{ getFieldIcon(res.fieldType) }}</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="font-weight-medium">{{ res.fieldName }}</div>
                                        <div class="text-caption text-medium-emphasis">{{ res.fieldType }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="font-weight-medium">{{ res.date }}</div>
                                <div class="text-caption text-medium-emphasis">{{ res.startTime }}</div>
                            </td>
                            <td>{{ res.duration }} dk</td>
                            <td>
                                <span class="font-weight-bold text-deep-orange">{{ res.price || 0 }} ₺</span>
                            </td>
                            <td>
                                <v-chip :color="res.cancelled ? 'error' : (res.approved ? 'success' : 'warning')"
                                    size="small" :variant="res.cancelled ? 'flat' : 'tonal'">
                                    {{ res.status }}
                                </v-chip>
                            </td>
                            <td>
                                <v-chip size="small" variant="outlined">
                                    {{ res.paymentMethod === 'card' ? 'Kart' : 'Bakiye' }}
                                </v-chip>
                            </td>
                            <td class="text-center">
                                <v-btn v-if="!res.cancelled" color="error" size="small" variant="tonal"
                                    icon="mdi-cancel" @click="openCancelDialog(res)" />
                                <v-chip v-else color="grey" size="small" variant="flat">İptal</v-chip>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </template>
    </div>

    <!-- Reservation Dialog -->
    <v-dialog v-model="reservationDialog" max-width="600" :fullscreen="smAndDown" persistent>
        <v-card>
            <v-card-title class="d-flex align-center">
                <v-icon color="deep-orange" class="mr-2">mdi-calendar-plus</v-icon>
                Rezervasyon Oluştur
            </v-card-title>
            <v-card-text v-if="selectedField">
                <v-alert type="info" variant="tonal" density="compact" class="mb-4">
                    <strong>{{ selectedField.name }}</strong> için rezervasyon
                </v-alert>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="reservationForm.date" label="Tarih" type="date" variant="outlined"
                            density="compact" />
                    </v-col>
                    <v-col cols="6" sm="3">
                        <v-text-field v-model="reservationForm.startTime" label="Başlangıç" type="time"
                            variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="6" sm="3">
                        <v-text-field v-model="reservationForm.endTime" label="Bitiş" type="time" variant="outlined"
                            density="compact" />
                    </v-col>
                </v-row>

                <!-- Slot info -->
                <v-alert type="info" variant="tonal" density="compact" class="mb-4">
                    <div class="d-flex align-center justify-space-between flex-wrap gap-2">
                        <div>
                            <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
                            Saha saatleri: <strong>{{ selectedField.startTime }} - {{ selectedField.endTime }}</strong>
                        </div>
                        <div class="d-flex align-center gap-3">
                            <div>
                                <v-icon size="small" class="mr-1">mdi-timer-sand</v-icon>
                                Her slot: <strong>{{ selectedField.defaultDuration }} dk</strong>
                            </div>
                            <v-divider vertical class="mx-1 d-none d-sm-flex" />
                            <div>
                                <v-icon size="small" class="mr-1">mdi-cash-multiple</v-icon>
                                Ücret/Slot: <strong>{{ selectedField.price }} ₺</strong>
                            </div>
                        </div>
                    </div>
                </v-alert>

                <!-- Duration and cost summary -->
                <v-card v-if="totalDuration > 0" variant="outlined" class="mb-4 pa-3">
                    <v-row dense>
                        <v-col cols="4" class="text-center">
                            <div class="text-caption text-medium-emphasis">Süre</div>
                            <div class="text-h6 font-weight-bold">{{ totalDuration }} dk</div>
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <div class="text-caption text-medium-emphasis">Slot Sayısı</div>
                            <div class="text-h6 font-weight-bold">{{ calculatedSlots }}</div>
                        </v-col>
                        <v-col cols="4" class="text-center">
                            <div class="text-caption text-medium-emphasis">Ücret</div>
                            <div class="text-h6 font-weight-bold text-deep-orange">{{ reservationCost }} ₺</div>
                        </v-col>
                    </v-row>

                    <!-- Duration validation error -->
                    <v-alert v-if="!isDurationValid && totalDuration > 0" type="warning" variant="tonal"
                        density="compact" class="mt-2">
                        <v-icon size="small" class="mr-1">mdi-alert</v-icon>
                        Süre {{ selectedField.defaultDuration }} dakikanın katı olmalıdır!
                    </v-alert>

                    <!-- Field hours validation error -->
                    <v-alert v-if="!isWithinFieldHours && totalDuration > 0" type="error" variant="tonal"
                        density="compact" class="mt-2">
                        <v-icon size="small" class="mr-1">mdi-clock-alert</v-icon>
                        Seçilen saatler saha çalışma saatleri ({{ selectedField.startTime }} - {{ selectedField.endTime
                        }})
                        dışında!
                    </v-alert>
                </v-card>

                <v-row dense>
                    <v-col cols="12">
                        <v-radio-group v-model="reservationForm.paymentMethod" inline hide-details>
                            <v-radio label="Bakiye ile Öde" value="balance" />
                            <v-radio label="Kart ile Öde" value="card" />
                        </v-radio-group>
                    </v-col>
                </v-row>

                <!-- Schedule Image Link -->
                <v-card variant="outlined" class="mt-4 pa-3">
                    <a :href="getFieldScheduleImage(selectedField.id)" target="_blank"
                        class="schedule-image-link-inline">
                        <v-icon color="deep-orange" class="mr-2">mdi-clock-outline</v-icon>
                        <div>
                            <div class="text-subtitle-2 font-weight-medium">Haftalık Saha Programı</div>
                            <div class="text-caption text-medium-emphasis">Bu sahanın detaylı programını görüntüleyin
                            </div>
                        </div>
                        <v-icon color="grey" class="ml-auto">mdi-open-in-new</v-icon>
                    </a>
                </v-card>

                <v-divider class="my-4" />

                <div class="d-flex justify-space-between align-center">
                    <div>
                        <div class="text-caption text-medium-emphasis">Toplam Tutar</div>
                        <div class="text-h5 font-weight-bold text-deep-orange">{{ reservationCost }} ₺</div>
                    </div>
                    <div v-if="reservationForm.paymentMethod === 'balance'">
                        <div class="text-caption text-medium-emphasis">Mevcut Bakiye</div>
                        <div class="text-h6" :class="isBalanceSufficient ? 'text-success' : 'text-error'">{{ balance }}
                            ₺
                        </div>
                    </div>
                </div>

                <v-alert v-if="reservationForm.paymentMethod === 'balance' && !isBalanceSufficient" type="error"
                    variant="tonal" density="compact" class="mt-4">
                    Yetersiz bakiye! Lütfen bakiye yükleyin veya kart ile ödeyin.
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="reservationDialog = false">İptal</v-btn>
                <v-btn color="deep-orange" variant="flat" :loading="reservationLoading"
                    :disabled="reservationForm.paymentMethod === 'balance' && !isBalanceSufficient"
                    @click="createReservation">
                    Rezervasyon Yap
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Cancel Confirmation Dialog -->
    <v-dialog v-model="cancelDialog" max-width="400">
        <v-card>
            <v-card-title class="text-error">
                <v-icon class="mr-2">mdi-alert-circle</v-icon>
                Rezervasyonu İptal Et
            </v-card-title>
            <v-card-text>
                <p>Bu rezervasyonu iptal etmek istediğinize emin misiniz?</p>
                <p v-if="cancellingReservation?.paymentMethod === 'balance'" class="text-success">
                    <v-icon size="16">mdi-check-circle</v-icon>
                    {{ cancellingReservation?.price }} ₺ bakiyenize iade edilecektir.
                </p>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn variant="text" @click="cancelDialog = false">Vazgeç</v-btn>
                <v-btn color="error" variant="flat" @click="cancelReservation">İptal Et</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="3000">
        {{ snackbarText }}
        <template #actions>
            <v-btn variant="text" @click="snackbar = false">Kapat</v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped>
.sports-page {
    background: linear-gradient(135deg, rgba(var(--v-theme-warning), 0.03) 0%, rgb(var(--v-theme-background)) 100%);
    min-height: calc(100vh - 64px);
}

.content-card {
    border-radius: 12px;
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.sticky-card {
    overflow: visible !important;
}

.sports-table {
    background: rgb(var(--v-theme-surface));
}

.sports-table th {
    background: rgba(var(--v-theme-surface-variant), 0.5) !important;
    font-weight: 600 !important;
    white-space: nowrap;
}

.gap-1 {
    gap: 4px;
}

.gap-2 {
    gap: 8px;
}

.gap-3 {
    gap: 12px;
}

/* Heat-map styles */
.heatmap-wrapper {
    position: relative;
    padding: 8px;
}

/* Sticky header clone - JS-generated */
.sticky-header-clone {
    position: fixed;
    top: 64px;
    /* Below app bar */
    left: 0;
    right: 0;
    z-index: 150;
    background: rgb(var(--v-theme-surface));
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
    overflow-y: hidden;
    display: table-header-group;
    width: 100%;
}

.sticky-header-clone tr {
    display: table-row;
}

.sticky-header-clone th {
    display: table-cell;
    padding: 6px 4px;
    text-align: center;
    background: rgb(var(--v-theme-surface)) !important;
    border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
    white-space: nowrap;
}

@media (max-width: 600px) {
    .sticky-header-clone {
        top: 56px;
        /* Mobile app bar height */
    }
}

/* Make "Saha" column sticky horizontally in the clone */
.sticky-header-clone th.field-name-cell {
    position: sticky !important;
    left: 0;
    z-index: 160;
    background: rgb(var(--v-theme-surface)) !important;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}


.heatmap-scroll-container {
    overflow-x: auto;
    overflow-y: visible;
    /* Critical: allows sticky to work with page scroll */
    -webkit-overflow-scrolling: touch;
}

@media (max-width: 600px) {
    .heatmap-wrapper {
        padding: 0;
    }
}

.heatmap-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 3px;
    table-layout: fixed;
}

.heatmap-header-cell {
    padding: 6px 4px;
    /* Balanced padding for readability */
    text-align: center;
    background: rgb(var(--v-theme-surface)) !important;
    /* Solid background for sticky */
}

/* Table header styling (non-sticky, cloned by JS when needed) */
.heatmap-table thead th {
    padding: 6px 4px;
    text-align: center;
    background: rgb(var(--v-theme-surface)) !important;
    border-bottom: 2px solid rgba(var(--v-theme-primary), 0.3);
    z-index: 1;
}

/* Corner cell */
.heatmap-table thead th.field-name-cell {
    position: sticky;
    left: 0;
    z-index: 2;
    background: rgb(var(--v-theme-surface)) !important;
}

/* Mobile-responsive heat-map - improved sizing */
@media (max-width: 600px) {
    .heatmap-scroll-container {
        padding: 8px;
    }

    .heatmap-table {
        border-spacing: 4px;
        font-size: 12px;
        min-width: 500px;
        /* Force horizontal scroll instead of squeezing */
    }

    .heatmap-header-cell {
        padding: 8px 4px;
    }

    .heatmap-header-cell .text-caption {
        font-size: 11px !important;
        font-weight: 600;
    }

    .field-name-cell {
        min-width: 90px;
        max-width: 110px;
        padding: 4px 6px;
        position: sticky;
        left: 0;
        background: rgb(var(--v-theme-surface));
        z-index: 10;
    }

    .field-name-cell .text-caption {
        font-size: 11px !important;
    }

    .day-cell {
        min-width: 48px;
    }

    .heatmap-cell-inner {
        min-height: 40px;
        font-size: 14px;
    }

    .heatmap-cell:hover {
        transform: none;
        /* Disable hover scale on mobile */
    }

    .heatmap-cell:active {
        transform: scale(0.95);
    }
}

.field-name-cell {
    min-width: 140px;
    max-width: 180px;
    padding: 8px;
    text-align: left;
}

.field-name-content {
    display: flex;
    align-items: flex-start;
}

.field-name-text {
    font-size: 11px;
    line-height: 1.4;
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

/* Mobile: better field name visibility */
@media (max-width: 600px) {
    .field-name-content {
        flex-direction: column;
        align-items: flex-start;
    }

    .field-name-content .v-avatar {
        margin-bottom: 2px;
    }

    .field-name-text {
        font-size: 9px;
        line-height: 1.3;
    }

    .field-name-text .font-weight-medium {
        white-space: normal;
        word-break: break-word;
        display: block;
    }
}

.day-cell {
    min-width: 50px;
    width: calc((100% - 150px) / 7);
}

.heatmap-row:hover {
    background: rgba(var(--v-theme-primary), 0.05);
}

.heatmap-cell {
    padding: 0;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
}

.heatmap-cell-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    border-radius: 6px;
}

.heatmap-cell:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Conflict flash animation */
@keyframes conflict-flash {

    0%,
    100% {
        background-color: rgb(var(--v-theme-error-lighten-4));
        transform: scale(1);
    }

    50% {
        background-color: rgb(var(--v-theme-error));
        transform: scale(1.05);
    }
}

.heatmap-cell.conflict-flash {
    animation: conflict-flash 0.5s ease-in-out 3;
}

.heatmap-legend-dot {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

/* Availability background colors */
.bg-success-lighten-4 {
    background-color: rgba(76, 175, 80, 0.3) !important;
}

.bg-error-lighten-4 {
    background-color: rgba(244, 67, 54, 0.3) !important;
}

.bg-grey-lighten-2 {
    background-color: rgba(189, 189, 189, 0.4) !important;
}

/* Schedule image link */
.schedule-image-link {
    display: block;
    border: 2px dashed rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
}

.schedule-image-link:hover {
    border-color: rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.05);
}

/* Schedule image in dialog */
.schedule-image-link-inline {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
}

.schedule-image-link-inline:hover {
    color: rgb(var(--v-theme-primary));
}


/* Highlighted reservation row */
@keyframes highlight-pulse {

    0%,
    100% {
        background-color: transparent;
    }

    50% {
        background-color: rgba(255, 193, 7, 0.3);
    }
}

.highlighted-reservation {
    animation: highlight-pulse 0.8s ease-in-out 3;
    background-color: rgba(255, 193, 7, 0.15) !important;
}

/* Balance Hero Card */
.balance-hero-card {
    overflow: hidden;
    border-radius: 16px;
}

.balance-hero-gradient {
    background: linear-gradient(135deg, #FF5722 0%, #E64A19 50%, #D84315 100%);
    color: white;
}

.balance-amount {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.text-white-50 {
    color: rgba(255, 255, 255, 0.7) !important;
}

.balance-load-section {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 0 12px 12px 0;
}

@media (max-width: 960px) {
    .balance-load-section {
        border-radius: 0 0 12px 12px;
    }

    .balance-amount {
        font-size: 2.5rem;
    }
}

.balance-input :deep(.v-field) {
    background: rgba(255, 255, 255, 0.2) !important;
}

.balance-input :deep(.v-field__input),
.balance-input :deep(.v-field__suffix) {
    color: white !important;
}

/* Stats Cards */
.stats-card {
    border-radius: 12px;
    transition: all 0.3s ease;
}

.stats-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Transaction Card */
.transaction-card {
    border-radius: 12px;
    transition: all 0.2s ease;
}

.transaction-card:hover {
    border-color: rgb(var(--v-theme-primary)) !important;
}

/* Reservation Card */
.reservation-card {
    border-radius: 12px;
    transition: all 0.2s ease;
}

.reservation-card:hover {
    border-color: rgb(var(--v-theme-deep-orange)) !important;
    box-shadow: 0 4px 12px rgba(255, 87, 34, 0.1);
}

/* Table improvements */
.transactions-table,
.reservations-table {
    background: rgb(var(--v-theme-surface));
}

.transactions-table th,
.reservations-table th {
    background: rgba(var(--v-theme-surface-variant), 0.5) !important;
    font-weight: 600 !important;
}

.transaction-row:hover,
.reservation-row:hover {
    background: rgba(var(--v-theme-primary), 0.05);
}
</style>