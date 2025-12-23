<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccessSnackbar = ref(false)

function changeMailPassword() {
    showSuccessSnackbar.value = true
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}
</script>

<template>
    <v-container fluid class="mail-password-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">mdi-email-lock</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">Mail Şifre Değiştirme</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            KTÜ e-posta hesabınızın şifresini güncelleyin
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <!-- Password Change Form -->
            <v-col cols="12" md="8">
                <v-card class="password-card" elevation="0">
                    <v-card-title class="d-flex align-center pa-5">
                        <v-icon color="primary" class="mr-3">mdi-email-edit</v-icon>
                        <span class="text-h6 font-weight-bold">Mail Şifresini Değiştir</span>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-alert type="info" variant="tonal" class="mb-6" icon="mdi-email">
                            <div class="d-flex align-center">
                                <span>E-Posta Adresi: </span>
                                <strong class="ml-2">{{ studentStore.student.email }}</strong>
                            </div>
                        </v-alert>

                        <v-form>
                            <!-- Current Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock</v-icon>
                                    Mevcut Mail Şifresi
                                </label>
                                <v-text-field v-model="currentPassword" variant="outlined" density="comfortable"
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showCurrentPassword = !showCurrentPassword"
                                    placeholder="Mevcut mail şifrenizi giriniz" />
                            </div>

                            <!-- New Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock-plus</v-icon>
                                    Yeni Mail Şifresi
                                </label>
                                <v-text-field v-model="newPassword" variant="outlined" density="comfortable"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showNewPassword = !showNewPassword"
                                    placeholder="Yeni mail şifrenizi giriniz" />
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock-check</v-icon>
                                    Yeni Mail Şifresi (Tekrar)
                                </label>
                                <v-text-field v-model="confirmPassword" variant="outlined" density="comfortable"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                                    placeholder="Yeni mail şifrenizi tekrar giriniz" />
                            </div>

                            <v-divider class="my-4" />

                            <div class="d-flex justify-end gap-3">
                                <v-btn variant="outlined" color="grey">
                                    <v-icon start>mdi-close</v-icon>
                                    İptal
                                </v-btn>
                                <v-btn color="primary" @click="changeMailPassword">
                                    <v-icon start>mdi-email-sync</v-icon>
                                    Şifreyi Değiştir
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
                        <v-icon size="48" color="primary" class="mb-4">mdi-email-outline</v-icon>
                        <h3 class="text-h6 font-weight-bold mb-3">KTÜ Mail Hakkında</h3>
                        <p class="text-body-2 mb-4">
                            KTÜ öğrenci mail hesabınız, üniversite ile resmi iletişiminiz için kullanılır.
                        </p>
                        <v-list density="compact" class="bg-transparent">
                            <v-list-item class="px-0">
                                <template #prepend>
                                    <v-icon color="success" size="20">mdi-check</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">Webmail: mail.ktu.edu.tr</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="px-0">
                                <template #prepend>
                                    <v-icon color="success" size="20">mdi-check</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">IMAP/SMTP desteği</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="px-0">
                                <template #prepend>
                                    <v-icon color="success" size="20">mdi-check</v-icon>
                                </template>
                                <v-list-item-title class="text-body-2">Sınırsız depolama</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <v-card class="mt-4 help-card" elevation="0">
                    <v-card-title class="pa-4">
                        <v-icon color="info" class="mr-2">mdi-help-circle</v-icon>
                        Yardım
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pa-4">
                        <p class="text-body-2 mb-3">
                            Şifrenizi unuttuysanız veya mail hesabınıza erişemiyorsanız:
                        </p>
                        <v-btn block color="info" variant="tonal" class="mb-2">
                            <v-icon start>mdi-phone</v-icon>
                            BİDB: (0462) 377 30 00
                        </v-btn>
                        <v-btn block color="primary" variant="tonal">
                            <v-icon start>mdi-email</v-icon>
                            bidb@ktu.edu.tr
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Success Snackbar -->
        <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000">
            <v-icon class="mr-2">mdi-check-circle</v-icon>
            Mail şifreniz başarıyla değiştirildi!
        </v-snackbar>
    </v-container>
</template>

<style scoped>
.mail-password-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.password-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.info-card {
    border-radius: 16px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid rgba(21, 101, 192, 0.1);
}

.help-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
