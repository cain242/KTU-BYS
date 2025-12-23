<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()

const phone = ref(studentStore.student.phone)
const email = ref(studentStore.student.email)
const personalEmail = ref(studentStore.student.personalEmail)
const showSuccessSnackbar = ref(false)

function saveChanges() {
    showSuccessSnackbar.value = true
}
</script>

<template>
    <v-container fluid class="contact-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">mdi-cellphone</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Telefon / E-Posta</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            İletişim bilgilerinizi güncelleyin
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <!-- Contact Info Card -->
            <v-col cols="12" md="8">
                <v-card class="contact-card" elevation="0">
                    <v-card-title class="d-flex align-center pa-5">
                        <v-icon color="primary" class="mr-3">mdi-account-details</v-icon>
                        <span class="text-h6 font-weight-bold">İletişim Bilgileri</span>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-form>
                            <!-- Phone Number -->
                            <div class="mb-6">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-phone</v-icon>
                                    Cep Telefonu
                                </label>
                                <v-text-field v-model="phone" variant="outlined" density="comfortable"
                                    placeholder="5XX XXX XX XX" prepend-inner-icon="mdi-phone"
                                    hint="Türkiye cep telefonu numaranızı giriniz" persistent-hint />
                            </div>

                            <!-- KTU Email (Read Only) -->
                            <div class="mb-6">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-email</v-icon>
                                    KTÜ E-Posta
                                </label>
                                <v-text-field :model-value="email" variant="outlined" density="comfortable" readonly
                                    disabled prepend-inner-icon="mdi-email-lock" bg-color="grey-lighten-4"
                                    hint="Bu alan değiştirilemez" persistent-hint />
                            </div>

                            <!-- Personal Email -->
                            <div class="mb-6">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-email-outline</v-icon>
                                    Kişisel E-Posta
                                </label>
                                <v-text-field v-model="personalEmail" variant="outlined" density="comfortable"
                                    placeholder="ornek@email.com" prepend-inner-icon="mdi-email-outline"
                                    hint="Kişisel e-posta adresinizi giriniz" persistent-hint />
                            </div>

                            <v-divider class="my-4" />

                            <div class="d-flex justify-end gap-3">
                                <v-btn variant="outlined" color="grey">
                                    <v-icon start>mdi-close</v-icon>
                                    İptal
                                </v-btn>
                                <v-btn color="primary" @click="saveChanges">
                                    <v-icon start>mdi-content-save</v-icon>
                                    Kaydet
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Info Card -->
            <v-col cols="12" md="4">
                <v-card class="info-card" elevation="0">
                    <v-card-text class="pa-5">
                        <v-icon size="48" color="info" class="mb-4">mdi-information</v-icon>
                        <h3 class="text-h6 font-weight-bold mb-3">Bilgilendirme</h3>
                        <ul class="info-list">
                            <li>Cep telefonu numaranız SMS bildirimleri için kullanılacaktır.</li>
                            <li>KTÜ e-posta adresiniz sistem tarafından otomatik oluşturulmuştur ve değiştirilemez.</li>
                            <li>Kişisel e-posta adresiniz şifre sıfırlama işlemlerinde kullanılacaktır.</li>
                        </ul>
                    </v-card-text>
                </v-card>

                <v-card class="mt-4 current-info-card" elevation="0">
                    <v-card-title class="pa-4">
                        <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
                        Mevcut Bilgiler
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pa-4">
                        <div class="d-flex align-center mb-3">
                            <v-icon size="20" color="primary" class="mr-2">mdi-phone</v-icon>
                            <span class="text-body-2">{{ studentStore.student.phone }}</span>
                        </div>
                        <div class="d-flex align-center mb-3">
                            <v-icon size="20" color="primary" class="mr-2">mdi-email</v-icon>
                            <span class="text-body-2">{{ studentStore.student.email }}</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-icon size="20" color="primary" class="mr-2">mdi-email-outline</v-icon>
                            <span class="text-body-2">{{ studentStore.student.personalEmail }}</span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Success Snackbar -->
        <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000">
            <v-icon class="mr-2">mdi-check-circle</v-icon>
            Bilgileriniz başarıyla güncellendi!
        </v-snackbar>
    </v-container>
</template>

<style scoped>
.contact-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.contact-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.info-card {
    border-radius: 16px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid rgba(21, 101, 192, 0.1);
}

.current-info-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.info-list {
    padding-left: 20px;
    margin: 0;
}

.info-list li {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
}
</style>
