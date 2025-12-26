<script setup lang="ts">
import { mockMakeupEligible } from '@/mock/mockData'

const headers = [
    { title: 'Ders Kodu', key: 'code' },
    { title: 'Ders Adı', key: 'name' },
    { title: 'Öğretim Üyesi', key: 'instructor' },
    { title: 'Harf Notu', key: 'grade' },
    { title: 'İşlem', key: 'actions', sortable: false },
]

function applyForMakeup(courseName: string) {
    alert(`${courseName} için bütünleme sınavı başvurunuz alınmıştır.`)
}
</script>

<template>
    <v-container fluid class="makeup-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="orange-darken-2" class="mr-3">mdi-clipboard-check-outline</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Bütünleme İşlemleri</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            Bütünleme sınavı başvuruları ve uygun dersleriniz
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Info Alert -->
        <v-alert type="info" variant="tonal" class="mb-6" icon="mdi-information">
            Bütünleme sınavına, yarıyıl sonu sınavına girme hakkı olup da sınava girmeyen veya girip de başarısız olan (FF, FD) öğrenciler başvurabilir.
        </v-alert>

        <!-- Eligible Courses Table -->
        <v-card rounded="lg" elevation="0" class="makeup-table-card">
            <v-card-title class="pa-5 font-weight-bold">
                <v-icon color="orange-darken-2" class="mr-2">mdi-book-alert-outline</v-icon>
                Bütünleme Sınavına Uygun Dersler
            </v-card-title>
            <v-divider />
            <v-data-table :headers="headers" :items="mockMakeupEligible" class="makeup-table">
                <template #item.grade="{ item }">
                    <v-chip color="error" size="small" variant="tonal">
                        {{ item.grade }}
                    </v-chip>
                </template>
                <template #item.actions="{ item }">
                    <v-btn color="primary" size="small" variant="flat" @click="applyForMakeup(item.name)">
                        Başvur
                    </v-btn>
                </template>
                <template #no-data>
                    <div class="pa-8 text-center">
                        <v-icon size="48" color="success" class="mb-2">mdi-check-all</v-icon>
                        <p class="text-body-1">Bütünleme sınavına uygun dersiniz bulunmamaktadır.</p>
                    </div>
                </template>
            </v-data-table>
        </v-card>

        <!-- Application History -->
        <v-card rounded="lg" elevation="0" class="mt-6 history-card">
            <v-card-title class="pa-5 font-weight-bold">
                <v-icon color="blue" class="mr-2">mdi-history</v-icon>
                Başvuru Geçmişi
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-8 text-center text-medium-emphasis">
                Henüz bir başvuru kaydınız bulunmamaktadır.
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.makeup-page {
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    min-height: 100vh;
}

.makeup-table-card, .history-card {
    border-radius: 20px;
    border: 1px solid rgba(251, 140, 0, 0.1);
}

.makeup-table {
    border-radius: 0 0 20px 20px;
}
</style>
