<script setup lang="ts">
import { ref } from 'vue'
import { useStudentStore } from '@/stores/studentStore'

const studentStore = useStudentStore()

const reasonType = ref('graduation')
const specificReason = ref('')
const phone = ref(studentStore.student.phone)
const email = ref(studentStore.student.personalEmail)
const acceptAlumni = ref(true)

function submitRequest() {
  alert('Talebiniz Öğrenci İşleri Daire Başkanlığına iletilmiştir.')
}
</script>

<template>
  <v-container fluid class="clearance-page pa-6">
    <!-- Standard Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">mdi-file-cancel-outline</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold">İlişik Kesme Talebi</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">
              Mezuniyet veya kayıt dondurma öncesi resmi başvuru süreci
            </p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Official Form Content in a Premium Card -->
    <v-card class="clearance-card pa-0" elevation="0">
      <div class="form-header px-6 py-4">
        <h2 class="text-h6 font-weight-bold mb-0">İlişik Kesme Formu</h2>
      </div>
      
      <v-divider />

      <v-card-text class="pa-8">
        <!-- Reason Radio Group -->
        <v-radio-group v-model="reasonType" inline class="mb-6" hide-details>
          <v-radio label="Mezuniyet Sebebi ile İlişik Kesme" value="graduation" color="primary" class="mr-8"></v-radio>
          <v-radio label="Kendi İsteğim ile İlişik Kesme" value="personal" color="primary"></v-radio>
        </v-radio-group>

        <!-- Formal Text Block -->
        <v-card class="formal-text-card mb-8 pa-6" border elevation="0">
          <p class="font-weight-bold mb-3">Öğrenci İşleri Daire Başkanlığına;</p>
          <p class="mb-3 text-body-1">
            Üniversiteniz <strong>{{ studentStore.student.faculty }} / {{ studentStore.student.department }} / {{ studentStore.student.program }}</strong> programından ilişiğimin kesilmesini istiyorum.
          </p>
          <p class="font-weight-bold mb-0 text-primary">
            Buradan yaptığım talebin kendi bilgim ve isteğimle olduğunu ve oluşabilecek her türlü hukuki sonuçtan sorumlu olduğumu kabul ve beyan ediyorum
          </p>
        </v-card>

        <!-- Form Rows -->
        <v-row class="form-row align-center mb-6">
          <v-col cols="12" md="3" class="text-subtitle-1 font-weight-bold">İlişik Kesme Sebebi</v-col>
          <v-col cols="12" md="9">
            <v-textarea
              v-model="specificReason"
              variant="outlined"
              density="comfortable"
              hide-details
              placeholder="Varsa özel açıklamanızı buraya yazınız..."
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row class="form-row align-center mb-6">
          <v-col cols="12" md="3" class="text-subtitle-1 font-weight-bold">Cep Telefonu</v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              variant="outlined"
              density="comfortable"
              hide-details
              placeholder="5XX"
              prefix="+90 ("
              suffix=")"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row align-center mb-8">
          <v-col cols="12" md="3" class="text-subtitle-1 font-weight-bold">Mezuniyet E-Posta</v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              variant="outlined"
              density="comfortable"
              hide-details
              prepend-inner-icon="mdi-email-outline"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-divider class="mb-8" />

        <!-- Alumni Consent -->
        <v-checkbox
          v-model="acceptAlumni"
          color="primary"
          class="mb-8"
          hide-details
        >
          <template #label>
            <span class="text-body-2 text-medium-emphasis">
              Bilgilerimin <strong>Karadeniz Teknik Üniversitesi</strong> mezun bilgi sistemine aktarılmasını ve üniversite bülteni, iş fırsatları gibi kariyerim ile ilgili konularda tarafıma bilgilendirme yapılmasını onaylıyorum.
            </span>
          </template>
        </v-checkbox>

        <!-- Submit -->
        <div class="d-flex">
          <v-btn
            color="primary"
            size="large"
            class="px-12 text-none"
            elevation="2"
            prepend-icon="mdi-send"
            @click="submitRequest"
          >
            Talebi Öğrenci İşlerine İlet
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.clearance-page {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: calc(100vh - 64px);
}

.clearance-card {
  border-radius: 20px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%);
  color: var(--v-theme-primary);
}

.formal-text-card {
  background-color: #f8fafc;
  border-color: #e2e8f0 !important;
  border-radius: 12px;
}

:deep(.v-field--variant-outlined) {
  --v-field-border-color: #e2e8f0;
  border-radius: 12px;
}

:deep(.v-field--focused) {
  --v-field-border-color: var(--v-theme-primary);
}

.form-row {
  min-height: 80px;
}
</style>
