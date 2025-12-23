<template>
  <v-app-bar elevation="0" class="app-bar">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />

    <v-app-bar-title class="d-flex align-center">
      <span class="text-h6 font-weight-medium">
        {{ currentPageTitle }}
      </span>
    </v-app-bar-title>

    <v-spacer />

    <!-- Search -->
    <v-text-field
      v-model="searchQuery"
      density="compact"
      variant="solo-filled"
      flat
      placeholder="Ara..."
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
      class="search-field mr-4"
      style="max-width: 300px"
    />

    <!-- Theme Toggle -->
    <v-btn icon variant="text" @click="toggleTheme" class="mr-2">
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      <v-tooltip activator="parent" location="bottom">
        {{ isDark ? 'Açık Mod' : 'Koyu Mod' }}
      </v-tooltip>
    </v-btn>

    <!-- Notifications -->
    <v-btn icon variant="text" class="mr-2">
      <v-badge :content="notificationCount" color="error" :model-value="notificationCount > 0">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
      <v-tooltip activator="parent" location="bottom">Bildirimler</v-tooltip>
    </v-btn>

    <!-- User Menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text" class="user-menu-btn">
          <v-avatar size="36" color="primary" class="mr-2">
            <span class="text-body-2 font-weight-medium text-white">
              {{ studentStore.student.firstName[0] }}{{ studentStore.student.lastName[0] }}
            </span>
          </v-avatar>
          <div class="d-none d-md-block text-left">
            <div class="text-body-2 font-weight-medium">{{ studentStore.fullName }}</div>
            <div class="text-caption text-medium-emphasis">{{ studentStore.student.studentNumber }}</div>
          </div>
          <v-icon class="ml-1">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list density="compact" class="user-menu-list">
        <v-list-item prepend-icon="mdi-account" to="/profile">
          <v-list-item-title>Profilim</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cog">
          <v-list-item-title>Ayarlar</v-list-item-title>
        </v-list-item>
        <v-divider class="my-1" />
        <v-list-item prepend-icon="mdi-logout" class="text-error">
          <v-list-item-title>Çıkış Yap</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useStudentStore } from '@/stores/studentStore'

defineEmits<{
  'toggle-drawer': []
}>()

const route = useRoute()
const theme = useTheme()
const studentStore = useStudentStore()

const searchQuery = ref('')
const notificationCount = ref(3)

const isDark = computed(() => theme.global.current.value.dark)

const currentPageTitle = computed(() => {
  return (route.meta?.title as string) || 'KTÜ Öğrenci Bilgi Sistemi'
})

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'ktuTheme' : 'ktuDarkTheme'
}
</script>

<style scoped>
.app-bar {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.search-field {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
}

.search-field :deep(.v-field) {
  border-radius: 12px;
}

.user-menu-btn {
  text-transform: none;
  border-radius: 12px;
  padding: 4px 12px;
}

.user-menu-list {
  min-width: 200px;
  border-radius: 12px;
}
</style>
