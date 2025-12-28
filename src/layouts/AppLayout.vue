<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import AppNavigation from '@/components/common/AppNavigation.vue'
import AppBar from '@/components/common/AppBar.vue'

const { mdAndDown } = useDisplay()
const theme = useTheme()
const drawer = ref(!mdAndDown.value)

const currentTheme = computed(() => theme.global.name.value)
</script>

<template>
  <v-app :theme="currentTheme">
    <AppNavigation v-model="drawer" />
    <AppBar @toggle-drawer="drawer = !drawer" />
    <v-main class="main-content">
      <v-container fluid :class="mdAndDown ? 'pt-0 px-2 pb-4' : 'pt-2 px-6 pb-6'">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.main-content {
  background: linear-gradient(135deg, rgb(var(--v-theme-background)) 0%, rgb(var(--v-theme-surface)) 100%);
  min-height: 100vh;
  overflow-y: auto; /* Ensure main content is scrollable */
  overflow-x: hidden;
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