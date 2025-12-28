<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const route = useRoute()
const { mdAndDown } = useDisplay()

const currentView = computed(() => {
    const path = route.path
    if (path.includes('/foundation-apply')) return 'foundation-apply'
    if (path.includes('/foundation-list')) return 'foundation-list'
    if (path.includes('/meal-apply')) return 'meal-apply'
    if (path.includes('/meal-list')) return 'meal-list'
    return 'foundation-apply'
})

const pageInfo = computed(() => {
    const info: Record<string, { title: string, icon: string, subtitle: string }> = {
        'foundation-apply': { title: 'Vakıf Bursu Başvurusu', icon: 'mdi-hand-coin-outline', subtitle: 'KTÜ Vakfı burs başvuru formu' },
        'foundation-list': { title: 'Vakıf Bursu Başvurularım', icon: 'mdi-format-list-bulleted', subtitle: 'Vakıf bursu başvuru geçmişi' },
        'meal-apply': { title: 'Yemek Bursu Başvurusu', icon: 'mdi-food-outline', subtitle: 'Ücretsiz yemek bursu başvuru formu' },
        'meal-list': { title: 'Yemek Bursu Başvurularım', icon: 'mdi-format-list-checks', subtitle: 'Yemek bursu başvuru geçmişi' }
    }
    return info[currentView.value] ?? info['foundation-apply']
})
</script>

<template>
    <v-container fluid :class="['scholarship-page', mdAndDown ? 'pa-4' : 'pa-6']">
        <!-- Consistent Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="amber-darken-3" class="mr-3">{{ pageInfo.icon }}</v-icon>
                    <div>
                        <h1 class="text-h5 text-sm-h4 font-weight-bold">{{ pageInfo.title }}</h1>
                        <p class="text-body-2 text-sm-subtitle-1 text-medium-emphasis mb-0">{{ pageInfo.subtitle }}</p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-card class="content-card pa-0" elevation="0">
            <div v-if="currentView === 'foundation-apply'" class="pa-8">
                <h2 class="text-h6 font-weight-bold mb-6">Burs Başvuru Formu</h2>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6"><v-text-field label="Baba Mesleği" variant="outlined"
                                density="comfortable" /></v-col>
                        <v-col cols="12" md="6"><v-text-field label="Anne Mesleği" variant="outlined"
                                density="comfortable" /></v-col>
                        <v-col cols="12" md="6"><v-text-field label="Aylık Gelir" variant="outlined"
                                density="comfortable" suffix="₺" /></v-col>
                        <v-col cols="12" md="6"><v-select label="Kardeş Sayısı" :items="['0', '1', '2', '3+']"
                                variant="outlined" density="comfortable" /></v-col>
                    </v-row>
                    <v-btn color="amber-darken-3" block size="large" class="mt-4">Başvuruyu Tamamla</v-btn>
                </v-form>
            </div>

            <div v-if="currentView === 'meal-apply'" class="pa-12 text-center">
                <v-icon size="64" color="success" class="mb-4">mdi-food-apple-outline</v-icon>
                <h2 class="text-h5 font-weight-bold mb-2">Yemek Bursu Başvurusu</h2>
                <p class="text-body-1 text-medium-emphasis mb-8">Ücretsiz yemek bursu başvurusu yapmak için aşağıdaki
                    butona tıklayınız.</p>
                <v-divider class="mb-8" />
                <v-btn color="success" size="large" class="px-12">Hemen Başvur</v-btn>
            </div>

            <div v-if="currentView.includes('list')" class="pa-8 text-center text-medium-emphasis">
                <v-icon size="48" class="mb-2">mdi-clipboard-text-search-outline</v-icon>
                <p>Henüz kayıtlı bir başvurunuz bulunmamaktadır.</p>
            </div>
        </v-card>
    </v-container>
</template>

<style scoped>
.scholarship-page {
    background: linear-gradient(135deg, rgba(var(--v-theme-warning), 0.05) 0%, rgb(var(--v-theme-background)) 100%);
    min-height: calc(100vh - 64px);
}
</style>
