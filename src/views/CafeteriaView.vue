<script setup lang="ts">
import { ref } from 'vue'
import { mockCafeteriaMenu } from '@/mock/mockData'

const activeDay = ref(new Date().toLocaleDateString('tr-TR', { weekday: 'long' }))

// Fallback to Monday if today is not in the list (e.g. weekend)
if (!mockCafeteriaMenu.find(m => m.day === activeDay.value)) {
    activeDay.value = 'Pazartesi'
}
</script>

<template>
    <v-container fluid class="cafeteria-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="success" class="mr-3">mdi-silverware-fork-knife</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Yemekhane</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            Haftalık yemek listesi ve kalori bilgileri
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Menu Navigation -->
        <v-tabs v-model="activeDay" bg-color="transparent" color="success" class="mb-6" grow>
            <v-tab v-for="menu in mockCafeteriaMenu" :key="menu.day" :value="menu.day">
                {{ menu.day }}
            </v-tab>
        </v-tabs>

        <v-window v-model="activeDay">
            <v-window-item v-for="menu in mockCafeteriaMenu" :key="menu.day" :value="menu.day">
                <v-row>
                    <v-col cols="12" md="8">
                        <v-card class="menu-card" elevation="0">
                            <v-card-title class="pa-6 d-flex justify-space-between align-center">
                                <span class="text-h5 font-weight-bold">{{ menu.day }} Menüsü</span>
                                <v-chip color="success" variant="tonal">{{ menu.date }}</v-chip>
                            </v-card-title>
                            <v-divider />
                            <v-card-text class="pa-0">
                                <v-list lines="two" class="bg-transparent">
                                    <v-list-item prepend-icon="mdi-bowl-mix-outline">
                                        <template #title>Çorba</template>
                                        <template #subtitle>{{ menu.soup }}</template>
                                    </v-list-item>
                                    <v-divider inset />
                                    <v-list-item prepend-icon="mdi-food-variant">
                                        <template #title>Ana Yemek</template>
                                        <template #subtitle>{{ menu.mainCourse }}</template>
                                    </v-list-item>
                                    <v-divider inset />
                                    <v-list-item prepend-icon="mdi-food-apple-outline">
                                        <template #title>Yardımcı Yemek</template>
                                        <template #subtitle>{{ menu.sideDish }}</template>
                                    </v-list-item>
                                    <v-divider inset />
                                    <v-list-item prepend-icon="mdi-cookie-outline">
                                        <template #title>Tatlı / Meyve</template>
                                        <template #subtitle>{{ menu.dessert }}</template>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-card class="nutrition-card text-center pa-8" elevation="0">
                            <v-avatar color="success" size="80" class="mb-4">
                                <v-icon color="white" size="40">mdi-fire</v-icon>
                            </v-avatar>
                            <div class="text-h4 font-weight-bold mb-1">{{ menu.calories }}</div>
                            <div class="text-overline mb-4">Toplam Kalori</div>
                            <p class="text-body-2 text-medium-emphasis">
                                Bu menü bir yetişkinin günlük enerji ihtiyacının yaklaşık %35'ini karşılamaktadır.
                            </p>
                        </v-card>

                        <v-card class="mt-4 pa-6 info-card" elevation="0">
                            <h3 class="text-subtitle-1 font-weight-bold mb-3">Yemekhane Bilgileri</h3>
                            <div class="d-flex align-center mb-2">
                                <v-icon size="18" color="success" class="mr-2">mdi-clock-outline</v-icon>
                                <span class="text-body-2">Öğle: 11:30 - 13:30</span>
                            </div>
                            <div class="d-flex align-center">
                                <v-icon size="18" color="success" class="mr-2">mdi-clock-outline</v-icon>
                                <span class="text-body-2">Akşam: 17:00 - 18:30</span>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-window-item>
        </v-window>
    </v-container>
</template>

<style scoped>
.cafeteria-page {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    min-height: 100vh;
}

.menu-card {
    border-radius: 20px;
    border: 1px solid rgba(34, 197, 94, 0.1);
}

.nutrition-card {
    border-radius: 20px;
    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
    border: 1px solid rgba(34, 197, 94, 0.1);
}

.info-card {
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
