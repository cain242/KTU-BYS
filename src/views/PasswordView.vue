<script setup lang="ts">
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const showSuccessSnackbar = ref(false)

const passwordRules = [
    { text: 'En az 8 karakter', valid: false },
    { text: 'En az bir büyük harf', valid: false },
    { text: 'En az bir küçük harf', valid: false },
    { text: 'En az bir rakam', valid: false },
    { text: 'En az bir özel karakter (@, #, $, vb.)', valid: false },
]

function changePassword() {
    showSuccessSnackbar.value = true
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
}
</script>

<template>
    <v-container fluid class="password-page pa-6">
        <!-- Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">mdi-key-variant</v-icon>
                    <div>
                        <h1 class="text-h4 font-weight-bold">BYS Şifre Değiştirme</h1>
                        <p class="text-subtitle-1 text-medium-emphasis mb-0">
                            Bilgi Yönetim Sistemi şifrenizi güncelleyin
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
                        <v-icon color="primary" class="mr-3">mdi-lock-reset</v-icon>
                        <span class="text-h6 font-weight-bold">Şifre Değiştir</span>
                    </v-card-title>

                    <v-divider />

                    <v-card-text class="pa-5">
                        <v-alert type="info" variant="tonal" class="mb-6" icon="mdi-information">
                            Bu şifre, KTÜ Bilgi Yönetim Sistemine (BYS) giriş yapmak için kullanılır.
                        </v-alert>

                        <v-form>
                            <!-- Current Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock</v-icon>
                                    Mevcut Şifre
                                </label>
                                <v-text-field v-model="currentPassword" variant="outlined" density="comfortable"
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showCurrentPassword = !showCurrentPassword"
                                    placeholder="Mevcut şifrenizi giriniz" />
                            </div>

                            <!-- New Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock-plus</v-icon>
                                    Yeni Şifre
                                </label>
                                <v-text-field v-model="newPassword" variant="outlined" density="comfortable"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showNewPassword = !showNewPassword"
                                    placeholder="Yeni şifrenizi giriniz" />
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-5">
                                <label class="text-body-2 font-weight-medium mb-2 d-block">
                                    <v-icon size="18" class="mr-1">mdi-lock-check</v-icon>
                                    Yeni Şifre (Tekrar)
                                </label>
                                <v-text-field v-model="confirmPassword" variant="outlined" density="comfortable"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                                    placeholder="Yeni şifrenizi tekrar giriniz" />
                            </div>

                            <v-divider class="my-4" />

                            <div class="d-flex justify-end gap-3">
                                <v-btn variant="outlined" color="grey">
                                    <v-icon start>mdi-close</v-icon>
                                    İptal
                                </v-btn>
                                <v-btn color="primary" @click="changePassword">
                                    <v-icon start>mdi-lock-reset</v-icon>
                                    Şifreyi Değiştir
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Password Requirements -->
            <v-col cols="12" md="4">
                <v-card class="requirements-card" elevation="0">
                    <v-card-title class="pa-4">
                        <v-icon color="warning" class="mr-2">mdi-shield-check</v-icon>
                        Şifre Gereksinimleri
                    </v-card-title>
                    <v-divider />
                    <v-card-text class="pa-4">
                        <div v-for="(rule, index) in passwordRules" :key="index" class="d-flex align-center mb-3">
                            <v-icon size="20" :color="rule.valid ? 'success' : 'grey'" class="mr-2">
                                {{ rule.valid ? 'mdi-check-circle' : 'mdi-circle-outline' }}
                            </v-icon>
                            <span class="text-body-2" :class="{ 'text-success': rule.valid }">{{ rule.text }}</span>
                        </div>
                    </v-card-text>
                </v-card>

                <v-card class="mt-4 warning-card" elevation="0">
                    <v-card-text class="pa-4">
                        <v-icon size="48" color="warning" class="mb-3">mdi-alert-circle</v-icon>
                        <h3 class="text-subtitle-1 font-weight-bold mb-2">Önemli Uyarı</h3>
                        <ul class="warning-list">
                            <li>Şifrenizi kimseyle paylaşmayın.</li>
                            <li>Şifrenizi düzenli olarak değiştirin.</li>
                            <li>Kolay tahmin edilebilir şifreler kullanmayın.</li>
                            <li>Şifrenizi başka sitelerde kullanmayın.</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Success Snackbar -->
        <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000">
            <v-icon class="mr-2">mdi-check-circle</v-icon>
            Şifreniz başarıyla değiştirildi!
        </v-snackbar>
    </v-container>
</template>

<style scoped>
.password-page {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
}

.password-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.requirements-card {
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.warning-card {
    border-radius: 16px;
    background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
    border: 1px solid rgba(255, 152, 0, 0.2);
}

.warning-list {
    padding-left: 20px;
    margin: 0;
}

.warning-list li {
    margin-bottom: 6px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 13px;
}
</style>
