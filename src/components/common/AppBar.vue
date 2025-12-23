<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'

defineEmits<{
  'toggle-drawer': []
}>()

const route = useRoute()
const studentStore = useStudentStore()

const searchQuery = ref('')
const notificationCount = ref(3)

const currentPageTitle = computed(() => {
  return (route.meta?.title as string) || 'KTÜ Öğrenci Bilgi Sistemi'
})
</script>


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
    <v-text-field v-model="searchQuery" density="compact" variant="solo-filled" flat placeholder="Ara..."
      prepend-inner-icon="mdi-magnify" hide-details single-line class="search-field mr-4" style="max-width: 300px" />

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
        <v-btn v-bind="props" variant="text" class="user-menu-btn d-flex align-center">
          <v-avatar size="36" class="mr-2">
            <v-img :src="studentStore.student.photoUrl" cover />
          </v-avatar>
          <div class="d-none d-md-flex flex-column text-left">
            <span class="text-body-2 font-weight-medium">{{ studentStore.fullName }}</span>
            <span class="text-caption text-medium-emphasis">{{ studentStore.student.studentNumber }}</span>
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
