<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { navigationItems } from '@/mock/navigationItemMock'
import ktuLogo from '@/assets/Photos/ktu-logo.png'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { mdAndDown } = useDisplay()
const route = useRoute()
const rail = ref(false)
const openedGroups = ref<string[]>([])

// Check if any child of a parent item is currently active
const isChildActive = (item: typeof navigationItems[0]) => {
  if (!item.children) return false
  return item.children.some(child => route.path === child.to)
}

// Expand a specific group and exit rail mode
const expandGroup = (groupTitle: string) => {
  rail.value = false
  // Use nextTick to wait for the v-list-group components to render
  nextTick(() => {
    openedGroups.value = [groupTitle]
  })
}

// Close drawer on small screens after navigation
watch(mdAndDown, (isMobileOrTablet) => {
  if (isMobileOrTablet) rail.value = false
})
</script>

<template>
  <v-navigation-drawer 
    :model-value="modelValue" 
    @update:model-value="$emit('update:modelValue', $event)" 
    :rail="!mdAndDown && rail"
    :temporary="mdAndDown"
    class="nav-drawer"
  >
    <!-- Logo Section -->
    <div class="logo-section" :class="rail ? 'pa-2' : 'pa-4'">
      <div class="d-flex align-center" :class="{ 'justify-center': rail }">
        <div class="logo-icon-wrapper">
          <v-img :src="ktuLogo" :width="rail ? 32 : 40" :height="rail ? 32 : 40" contain />
        </div>
        <div v-if="!rail" class="ml-3">
          <div class="text-h6 font-weight-bold logo-text">KTÜ</div>
          <div class="text-caption logo-subtext">Bilgi Yönetim Sistemi</div>
        </div>
      </div>
    </div>

    <v-divider class="mb-2" />

    <!-- Navigation Items -->
    <v-list density="compact" nav class="px-2" v-model:opened="openedGroups">
      <template v-for="item in navigationItems" :key="item.title">
        <!-- Items with children -->
        <template v-if="item.children">
          <!-- Normal mode: Show group with children -->
          <v-list-group v-if="!rail" :value="item.title">
            <template #activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" class="nav-item" />
            </template>
            <v-list-item 
              v-for="child in item.children" 
              :key="child.title" 
              :to="child.to" 
              :prepend-icon="child.icon"
              :title="child.title" 
              class="nav-child-item"
              @click="mdAndDown && $emit('update:modelValue', false)"
            />
          </v-list-group>

          <!-- Rail mode: Show only the parent icon (acting as an expander) -->
          <v-list-item 
            v-else 
            :prepend-icon="item.icon" 
            :title="item.title" 
            class="nav-item"
            :class="{ 'nav-item--child-active': isChildActive(item) }"
            @click="expandGroup(item.title)"
          >
            <v-tooltip activator="parent" location="right">{{ item.title }}</v-tooltip>
          </v-list-item>
        </template>

        <!-- Items without children -->
        <v-list-item 
          v-else 
          :to="item.to" 
          :href="item.href" 
          :prepend-icon="item.icon" 
          :title="item.title"
          class="nav-item"
          @click="mdAndDown && $emit('update:modelValue', false)"
        >
          <v-tooltip v-if="rail" activator="parent" location="right">{{ item.title }}</v-tooltip>
        </v-list-item>
      </template>
    </v-list>

    <template #append v-if="!mdAndDown">
      <v-divider />
      <div class="pa-2">
        <v-btn block variant="text" @click="rail = !rail" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.nav-drawer {
  background: linear-gradient(180deg, rgb(var(--v-theme-surface)) 0%, rgb(var(--v-theme-background)) 100%) !important;
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.logo-section {
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.05) 0%, rgba(var(--v-theme-secondary), 0.05) 100%);
  border-radius: 0 0 16px 0;
}

.logo-icon-wrapper {
  padding: 4px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.1);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.logo-text {
  color: rgb(var(--v-theme-primary)) !important;
  line-height: 1.2;
}

.logo-subtext {
  color: rgba(var(--v-theme-on-surface), 0.6) !important;
  line-height: 1.2;
}

.nav-item {
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  color: rgba(var(--v-theme-on-surface), 0.8) !important;
}

.nav-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

.nav-item--child-active {
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.15) 0%, rgba(var(--v-theme-secondary), 0.1) 100%) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-item--child-active :deep(.v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-child-item {
  border-radius: 8px;
  margin-left: 0 !important;
  padding-left: 8px !important;
  font-size: 0.875rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

:deep(.v-list-group__items) {
  --indent-padding: 0px !important;
  padding-left: 0 !important;
}

:deep(.v-list-group__items .v-list-item) {
  padding-inline-start: 25px !important;
}

:deep(.v-list-item--active) {
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.15) 0%, rgba(var(--v-theme-secondary), 0.1) 100%) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

:deep(.v-list-item--active .v-icon) {
  color: rgb(var(--v-theme-primary)) !important;
}

:deep(.v-list-item-title) {
  white-space: normal !important;
  word-break: break-word !important;
  line-height: 1.2 !important;
  font-size: 0.9rem !important;
}

:deep(.v-list-item) {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}
</style>
