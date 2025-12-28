<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const route = useRoute()
const { mdAndDown } = useDisplay()

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
    return info[currentView.value] ?? info['announcements']
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
    <v-container fluid :class="['internship-page', mdAndDown ? 'pa-4' : 'pa-6']">
        <!-- Consistent Page Header -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center">
                    <v-icon size="32" color="primary" class="mr-3">{{ pageInfo.icon }}</v-icon>
                    <div>
                        <h1 class="text-h5 text-sm-h4 font-weight-bold">{{ pageInfo.title }}</h1>
                        <p class="text-body-2 text-sm-subtitle-1 text-medium-emphasis mb-0">{{ pageInfo.subtitle }}</p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Content Sections Based on Route -->
        <v-card class="content-card" elevation="0">
            <div v-if="currentView === 'announcements'" class="pa-6">
                <v-alert type="info" variant="tonal" class="mb-6">Henüz güncel bir staj duyurusu
                    bulunmamaktadır.</v-alert>
            </div>

            <div v-if="currentView === 'apply'" class="pa-8">
                <h2 class="text-h6 font-weight-bold mb-6">Yeni Staj Başvurusu</h2>
                <v-form>
                    <v-row>
                        <v-col cols="12" md="6"><v-text-field label="Firma Adı" variant="outlined"
                                density="comfortable" /></v-col>
                        <v-col cols="12" md="6"><v-text-field label="Vergi No" variant="outlined"
                                density="comfortable" /></v-col>
                        <v-col cols="12" md="6"><v-text-field label="Başlangıç Tarihi" type="date"
                                variant="outlined" /></v-col>
                        <v-col cols="12" md="6"><v-text-field label="Bitiş Tarihi" type="date"
                                variant="outlined" /></v-col>
                    </v-row>
                    <v-btn color="primary" block size="large" class="mt-4">Başvuruyu Kaydet</v-btn>
                </v-form>
            </div>

            <div v-if="currentView === 'all-apps'" class="pa-6">
                <v-alert type="warning" variant="tonal" class="mb-6 text-caption">
                    *** ÖNEMLİ: Durumu RED EDİLDİ veya İŞLEME ALINDI olan başvurularınızı düzenlemek için İŞLEM YAP
                    butonuna tıklayınız. ***
                </v-alert>
                <v-data-table :headers="headersAllApps" :items="[]" density="comfortable">
                    <template #no-data>Kayıt bulunamadı.</template>
                </v-data-table>
            </div>

            <div v-if="currentView === 'docs'" class="pa-6">
                <v-data-table :headers="headersDocs" :items="[
                    { no: 1, name: 'Staj Başvuru Formu', desc: 'İşletmeye onaylatılacak form', download: '' },
                    { no: 2, name: 'Devlet Katkısı Formu', desc: 'Ücret alıyorsanız doldurulmalıdır', download: '' },
                    { no: 3, name: 'Sigorta Taahhütnamesi', desc: 'Sağlık durum beyanı', download: '' }
                ]">
                    <template #item.download>
                        <v-btn icon="mdi-download" variant="text" size="small" color="primary" />
                    </template>
                </v-data-table>
            </div>

            <div v-if="currentView === 'faq'" class="pa-8">
                <div v-for="(faq, i) in faqs" :key="i" class="mb-6 pa-5 faq-item rounded-lg">
                    <h3 class="text-subtitle-1 font-weight-bold mb-2 text-primary">{{ faq.q }}</h3>
                    <div class="faq-content text-body-2 text-medium-emphasis" v-html="faq.a"></div>
                </div>
            </div>

            <div v-if="currentView === 'regulations'" class="pa-8">
                <h2 class="text-h6 font-weight-bold mb-4">Staj Mevzuatları</h2>
                <v-list density="comfortable">
                    <v-list-item v-for="n in 3" :key="n" prepend-icon="mdi-file-document-outline"
                        class="mb-2 border rounded-lg">
                        <v-list-item-title>KTÜ Staj Uygulama Esasları v{{ 4 - n }}.0</v-list-item-title>
                        <v-list-item-subtitle>Son güncelleme: 12.0{{ n }}.2023</v-list-item-subtitle>
                        <template #append>
                            <v-btn icon="mdi-download" variant="text" size="small" color="primary" />
                        </template>
                    </v-list-item>
                </v-list>
            </div>

            <div v-if="currentView === 'requests'" class="pa-8">
                <h2 class="text-h6 font-weight-bold mb-4">Staj Talepleri</h2>
                <v-alert type="info" variant="tonal" class="mb-4">Şu an aktif bir talebiniz bulunmamaktadır.</v-alert>
                <v-btn color="primary" prepend-icon="mdi-plus">Yeni Talep Oluştur</v-btn>
            </div>

            <div v-if="currentView === 'finish'" class="pa-12 text-center">
                <v-icon size="64" color="primary" class="mb-4">mdi-check-circle-outline</v-icon>
                <h2 class="text-h6 font-weight-bold mb-2">Staj Sonlandırma</h2>
                <p class="text-medium-emphasis mb-6">Devam eden bir stajınız bulunmadığı için bu işlemi
                    gerçekleştiremezsiniz.</p>
                <v-btn variant="outlined" color="primary" to="/internship/apply">Yeni Başvuru Yap</v-btn>
            </div>
        </v-card>
    </v-container>
</template>

<style scoped>
.internship-page {
    background: linear-gradient(135deg, rgb(var(--v-theme-background)) 0%, rgb(var(--v-theme-surface)) 100%);
    min-height: calc(100vh - 64px);
}

.faq-content :deep(ul) {
    padding-left: 20px;
}

.faq-item {
    background: rgb(var(--v-theme-surface));
    border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    transition: transform 0.2s ease;
}

.faq-item:hover {
    transform: translateX(4px);
    border-color: rgb(var(--v-theme-primary));
}

.faq-content :deep(p) {
    margin-bottom: 8px;
}
</style>
