<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Map routes to view components or content sections
const currentView = computed(() => {
  const path = route.path
  if (path.includes('/announcements')) return 'announcements'
  if (path.includes('/regulations')) return 'regulations'
  if (path.includes('/apply')) return 'apply'
  if (path.includes('/applications')) return 'all-apps'
  if (path.includes('/documents')) return 'docs'
  if (path.includes('/requests')) return 'requests'
  if (path.includes('/complete')) return 'finish'
  if (path.includes('/faq')) return 'faq'
  return 'announcements'
})

const pageInfo = computed(() => {
  const info: Record<string, { title: string, icon: string, subtitle: string }> = {
    'announcements': { title: 'Staj Duyuruları', icon: 'mdi-bullhorn-outline', subtitle: 'Staj süreci ile ilgili güncel haberler' },
    'regulations': { title: 'İlgili Mevzuatlar', icon: 'mdi-scale-balance', subtitle: 'Staj uygulama esasları ve yönetmelikler' },
    'apply': { title: 'Staj Başvurusu', icon: 'mdi-file-send-outline', subtitle: 'Yeni staj başvurusu oluşturma' },
    'all-apps': { title: 'Tüm Staj Başvuruları', icon: 'mdi-folder-open-outline', subtitle: 'Başvuru geçmişi ve durum takibi' },
    'docs': { title: 'Gerekli Dosyalar', icon: 'mdi-file-download-outline', subtitle: 'Staj için gerekli temel dökümanlar' },
    'requests': { title: 'Talepler', icon: 'mdi-message-text-outline', subtitle: 'Staj süreci ile ilgili ek talepler' },
    'finish': { title: 'Staj Sonlandır', icon: 'mdi-check-circle-outline', subtitle: 'Tamamlanan stajları sonlandırma işlemleri' },
    'faq': { title: 'Sık Sorulan Sorular', icon: 'mdi-help-circle-outline', subtitle: 'Staj süreci hakkında merak edilenler' }
  }
  return info[currentView.value]
})

// FAQ Data from official screenshots
const faqs = [
  {
    q: '1. Staj durumları ve işleyiş sırası nasıldır?',
    a: `
      <ul>
        <li><b>Hazırlanıyor:</b> Başvurunuzu tamamlamadıysanız bu durumdadır.</li>
        <li><b>İşleme Alındı:</b> Başvuru tarafınızca tamamlandı. Komisyon üyesi işlemi bekliyor.</li>
        <li><b>Staj kabul edildi:</b> Stajınızın sigorta girişi için mediko işlemi bekliyor.</li>
        <li><b>Staj başarılı sonlandırıldı:</b> Staj süreciniz bitmiştir.</li>
      </ul>
    `
  },
  { q: '2. Talep sistemi nasıl çalışmaktadır?', a: 'Talep oluşturduğunuzda talebinizin durumu \'beklemede\' olarak etiketlenir. Komisyon onaylayınca \'Onaylandı\' olur.' },
  { q: '3. Kabul edilmiş stajımı nasıl iptal ederim?', a: 'Talepler sekmesinden veya başvurularım sayfasından iptal talebi oluşturabilirsiniz.' }
]

const headersAllApps = [
  { title: 'Staj No', key: 'id' },
  { title: 'Kurum', key: 'company' },
  { title: 'Başlangıç', key: 'startDate' },
  { title: 'Bitiş', key: 'endDate' },
  { title: 'Durum', key: 'status' },
  { title: 'İşlem', key: 'actions', sortable: false }
]

const headersDocs = [
  { title: 'No', key: 'no' },
  { title: 'Dosya Adı', key: 'name' },
  { title: 'Açıklama', key: 'desc' },
  { title: 'İndir', key: 'download', sortable: false }
]
</script>

<template>
  <v-container fluid class="internship-page pa-6">
    <!-- Consistent Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-icon size="32" color="primary" class="mr-3">{{ pageInfo.icon }}</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold">{{ pageInfo.title }}</h1>
            <p class="text-subtitle-1 text-medium-emphasis mb-0">{{ pageInfo.subtitle }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Content Sections Based on Route -->
    <v-card class="content-card" elevation="0">
      <div v-if="currentView === 'announcements'" class="pa-6">
        <v-alert type="info" variant="tonal" class="mb-6">Henüz güncel bir staj duyurusu bulunmamaktadır.</v-alert>
      </div>

      <div v-if="currentView === 'apply'" class="pa-8">
        <h2 class="text-h6 font-weight-bold mb-6">Yeni Staj Başvurusu</h2>
        <v-form>
          <v-row>
            <v-col cols="12" md="6"><v-text-field label="Firma Adı" variant="outlined" density="comfortable" /></v-col>
            <v-col cols="12" md="6"><v-text-field label="Vergi No" variant="outlined" density="comfortable" /></v-col>
            <v-col cols="12" md="6"><v-text-field label="Başlangıç Tarihi" type="date" variant="outlined" /></v-col>
            <v-col cols="12" md="6"><v-text-field label="Bitiş Tarihi" type="date" variant="outlined" /></v-col>
          </v-row>
          <v-btn color="primary" block size="large" class="mt-4">Başvuruyu Kaydet</v-btn>
        </v-form>
      </div>

      <div v-if="currentView === 'all-apps'" class="pa-6">
         <v-alert type="warning" variant="tonal" class="mb-6 text-caption">
          *** ÖNEMLİ: Durumu RED EDİLDİ veya İŞLEME ALINDI olan başvurularınızı düzenlemek için İŞLEM YAP butonuna tıklayınız. ***
        </v-alert>
        <v-data-table :headers="headersAllApps" :items="[]" density="comfortable">
          <template #no-data>Kayıt bulunamadı.</template>
        </v-data-table>
      </div>

      <div v-if="currentView === 'docs'" class="pa-6">
        <v-data-table :headers="headersDocs" :items="[]">
          <template #no-data>İndirilecek döküman bulunamadı.</template>
        </v-data-table>
      </div>

      <div v-if="currentView === 'faq'" class="pa-8">
        <div v-for="(faq, i) in faqs" :key="i" class="mb-8 p-4 bg-light-blue rounded">
          <h3 class="text-subtitle-1 font-weight-bold mb-2 text-primary">{{ faq.q }}</h3>
          <div class="faq-content text-body-2" v-html="faq.a"></div>
        </div>
      </div>

      <!-- Add other views (regulations, requests, finish) as needed -->
      <div v-if="['regulations', 'requests', 'finish'].includes(currentView)" class="pa-12 text-center">
        <v-icon size="64" color="grey-lighten-2">mdi-timer-sand</v-icon>
        <p class="mt-4 text-medium-emphasis">Bu bölüm için kayıtlı veri bulunamadı.</p>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.internship-page {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: calc(100vh - 64px);
}

.content-card {
  border-radius: 20px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.bg-light-blue {
  background-color: #f1f8ff;
  border-left: 4px solid var(--v-theme-primary);
}

.faq-content :deep(ul) {
  padding-left: 20px;
}
</style>
