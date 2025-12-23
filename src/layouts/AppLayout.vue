<template>
  <v-app>
    <AppNavigation v-model="drawer" />
    <AppBar @toggle-drawer="drawer = !drawer" />
    <v-main class="main-content">
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNavigation from '@/components/common/AppNavigation.vue'
import AppBar from '@/components/common/AppBar.vue'

const drawer = ref(true)
</script>

<style scoped>
.main-content {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
