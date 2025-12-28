<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const route = useRoute()
const { mdAndDown } = useDisplay()

const currentView = computed(() => {
    const path = route.path
    if (path.includes('/courses')) return 'courses'
    if (path.includes('/applications')) return 'applications'
    if (path.includes('/help')) return 'help'
    return 'courses'
})

const pageInfo = computed(() => {
    const info: Record<string, { title: string, icon: string, subtitle: string }> = {
        'courses': { title: 'Kurs Yönetimi', icon: 'mdi-certificate-outline', subtitle: 'Sertifika programları ve online kurs kataloğu' },
        'applications': { title: 'Kurs Başvurularım', icon: 'mdi-clipboard-list-outline', subtitle: 'Başvurduğunuz kursların durum takibi' },
        'help': { title: 'Yardım Dökümanı', icon: 'mdi-file-question-outline', subtitle: 'Sıkça sorulan sorular ve kullanım rehberleri' }
    }
    return info[currentView.value] ?? info['courses']
})

const courses = [
    { name: 'Python Programlama', hours: 40, instructor: 'Dr. Ahmet Yılmaz', price: 'Ücretsiz' },
    { name: 'Veri Bilimi Giriş', hours: 60, instructor: 'Doç. Dr. Ayşe Kaya', price: 'Ücretsiz' },
]
</script>

<template>
    <v-container fluid :class="['education-page', mdAndDown ? 'pa-4' : 'pa-6']">
        <!-- Consistent Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="indigo-darken-2" class="mr-3">{{ pageInfo.icon }}</v-icon>
                    <div>
                        <h1 class="text-h5 text-sm-h4 font-weight-bold">{{ pageInfo.title }}</h1>
                        <p class="text-body-2 text-sm-subtitle-1 text-medium-emphasis mb-0">{{ pageInfo.subtitle }}</p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-card class="content-card pa-0" elevation="0">
            <!-- Courses List -->
            <div v-if="currentView === 'courses'" class="pa-8">
                <v-row>
                    <v-col v-for="course in courses" :key="course.name" cols="12" md="6">
                        <v-card class="inner-card pa-6" elevation="0">
                            <div class="d-flex justify-space-between align-start mb-4">
                                <div>
                                    <h3 class="text-h6 font-weight-bold">{{ course.name }}</h3>
                                    <div class="text-body-2 text-medium-emphasis">{{ course.instructor }}</div>
                                </div>
                                <v-chip color="success" size="small" variant="flat">{{ course.price }}</v-chip>
                            </div>
                            <v-divider class="mb-4" />
                            <div class="d-flex align-center mb-6 text-body-2">
                                <v-icon size="18" color="indigo" class="mr-2">mdi-clock-outline</v-icon>
                                <span>{{ course.hours }} Saat Eğitim</span>
                            </div>
                            <v-btn color="indigo-darken-2" block variant="tonal">Kursa Kaydol</v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </div>

            <!-- Applications List -->
            <div v-if="currentView === 'applications'" class="pa-12 text-center text-medium-emphasis">
                <v-icon size="64" class="mb-4">mdi-clipboard-text-search-outline</v-icon>
                <h3 class="text-h6">Henüz bir kurs başvurunuz bulunmamaktadır.</h3>
            </div>

            <!-- Help Section -->
            <div v-if="currentView === 'help'" class="pa-8">
                <v-alert type="info" variant="tonal" class="mb-6">Sistem kullanımı ile ilgili yardım dökümanlarına bu
                    bölümden ulaşabilirsiniz.</v-alert>
                <v-list class="rounded-lg">
                    <v-list-item prepend-icon="mdi-book-open-page-variant" title="Ders Kayıt Rehberi"
                        append-icon="mdi-chevron-right" link />
                    <v-divider />
                    <v-list-item prepend-icon="mdi-gavel" title="Sınav Kuralları" append-icon="mdi-chevron-right"
                        link />
                </v-list>
            </div>
        </v-card>
    </v-container>
</template>

<style scoped>
.education-page {
    background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.1) 0%, rgb(var(--v-theme-background)) 100%);
    min-height: calc(100vh - 64px);
}
</style>
