<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'

defineEmits<{
  'toggle-drawer': []
}>()

const theme = useTheme()
const route = useRoute()
const studentStore = useStudentStore()

const searchQuery = ref('')
const notificationCount = ref(3)
const showSearchMobile = ref(false)

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const currentPageTitle = computed(() => {
  return (route.meta?.title as string) || 'KTÜ Öğrenci Bilgi Sistemi'
})
</script>


<template>
  <v-app-bar elevation="0" class="app-bar">
    <template v-if="!showSearchMobile">
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

      <v-app-bar-title class="app-bar-title">
        <span class="text-subtitle-1 text-sm-h6 font-weight-medium title-text">
          {{ currentPageTitle }}
        </span>
      </v-app-bar-title>

      <v-spacer />

      <!-- Search (Desktop Only) -->
      <div class="d-none d-sm-flex align-center mx-2" style="width: 350px;">
        <v-text-field v-model="searchQuery" density="compact" variant="solo-filled" flat placeholder="Ara..."
          prepend-inner-icon="mdi-magnify" hide-details single-line class="search-field" />
      </div>

      <!-- Search Icon (Mobile Only) -->
      <v-btn icon class="d-flex d-sm-none mr-1" @click="showSearchMobile = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Theme Toggle -->
      <v-btn icon variant="text" class="mr-1" @click="toggleTheme">
        <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        <v-tooltip activator="parent" location="bottom">
          {{ theme.global.current.value.dark ? 'Aydınlık Mod' : 'Karanlık Mod' }}
        </v-tooltip>
      </v-btn>
    </template>

    <!-- Mobile Search Overlay -->
    <template v-else>
      <v-btn icon @click="showSearchMobile = false" class="ml-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field v-model="searchQuery" density="compact" variant="solo-filled" flat placeholder="Ara..."
        prepend-inner-icon="mdi-magnify" hide-details single-line class="flex-grow-1 mx-2" autofocus
        @keyup.enter="showSearchMobile = false" />
      <v-btn icon @click="searchQuery = ''" v-if="searchQuery">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <!-- Notifications -->
    <v-menu :close-on-content-click="false" location="bottom end" offset="10">
      <template #activator="{ props }">
        <v-btn icon variant="text" class="mr-1 mr-sm-2" v-bind="props">
          <v-badge :content="notificationCount" color="error" :model-value="notificationCount > 0">
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
          <v-tooltip activator="parent" location="bottom">Bildirimler</v-tooltip>
        </v-btn>
      </template>

      <v-card width="320" class="notification-card" rounded="lg">
        <v-card-title class="d-flex align-center justify-space-between py-3 px-4">
          <span class="text-subtitle-1 font-weight-bold">Bildirimler</span>
          <v-btn variant="text" size="x-small" color="primary" @click="notificationCount = 0">Hepsini Oku</v-btn>
        </v-card-title>
        <v-divider />
        <v-list class="pa-0">
          <v-list-item v-for="ann in studentStore.announcements.slice(0, 3)" :key="ann.id" :title="ann.title"
            :subtitle="ann.content" lines="two" class="px-4 py-2 border-bottom">
            <template #prepend>
              <v-avatar size="32" :color="ann.isImportant ? 'warning' : 'primary'" variant="tonal" class="mr-3">
                <v-icon size="18">{{ ann.isImportant ? 'mdi-alert' : 'mdi-bullhorn' }}</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-btn block variant="text" class="py-2" to="/announcements">Tümünü Gör</v-btn>
      </v-card>
    </v-menu>

    <!-- User Menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text" class="user-menu-btn d-flex align-center px-1 px-sm-3">
          <v-avatar size="32" size-sm="36" class="mr-0 mr-sm-2">
            <v-img :src="studentStore.student.photoUrl" cover />
          </v-avatar>
          <div class="d-none d-md-flex flex-column text-left">
            <span class="text-body-2 font-weight-medium">{{ studentStore.fullName }}</span>
            <span class="text-caption text-medium-emphasis">{{ studentStore.student.studentNumber }}</span>
          </div>
          <v-icon class="ml-0 ml-sm-1">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list density="compact" class="user-menu-list">
        <v-list-item prepend-icon="mdi-account" to="/profile">
          <v-list-item-title>Profilim</v-list-item-title>
        </v-list-item>
        <v-divider class="my-1" />
        <v-list-item prepend-icon="mdi-logout" class="text-error" href="https://bys.ktu.edu.tr/bys.aspx">
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  background: rgb(var(--v-theme-surface), 0.8) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.search-field {
  width: 100%;
}

.search-field :deep(.v-field) {
  border-radius: 12px !important;
  background: rgba(var(--v-theme-on-surface), 0.05) !important;
  transition: all 0.2s ease;
  height: 42px; /* Standardize height */
}

.search-field :deep(.v-field--focused) {
  background: rgba(var(--v-theme-primary), 0.1) !important;
  box-shadow: 0 0 0 2px rgb(var(--v-theme-primary), 0.2) !important;
}

/* Ensure the 'selection box' (focus indicator) covers everything */
.search-field :deep(.v-field__overlay) {
  border-radius: 12px !important;
}

.search-field :deep(.v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 40px;
}

.user-menu-btn {
  text-transform: none;
  border-radius: 12px;
  padding: 4px 12px;
}

.user-menu-list, .notification-card {
  min-width: 200px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.05);
}

.app-bar-title {
  margin-inline-start: 8px !important;
  flex: 1 1 0% !important;
  min-width: 0 !important;
}

@media (max-width: 600px) {
  .title-text {
    font-size: 0.9rem !important;
    letter-spacing: -0.2px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 120px; /* Even tighter limit to avoid overlap */
  }
  
  .app-bar-title {
    margin-inline-start: 0 !important;
    padding-right: 0 !important;
    max-width: fit-content;
  }
}
</style>
