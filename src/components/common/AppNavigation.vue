<script setup lang="ts">
import { ref } from 'vue'
import { navigationItems } from '@/mock/navigationItemMock'
import ktuLogo from '@/assets/Photos/ktu-logo.png'

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const rail = ref(false)
</script>

<template>
  <v-navigation-drawer :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" :rail="rail"
    permanent class="nav-drawer">
    <!-- Logo Section -->
    <div class="logo-section pa-4">
      <div class="d-flex align-center">
        <div class="logo-icon">
          <v-img :src="ktuLogo" width="32" height="32" />
        </div>
        <div v-if="!rail" class="ml-3">
          <div class="text-h6 font-weight-bold text-primary">KTÜ</div>
          <div class="text-caption text-medium-emphasis">Bilgi Yönetim Sistemi</div>
        </div>
      </div>
    </div>

    <v-divider class="mb-2" />

    <!-- Navigation Items -->
    <v-list density="compact" nav class="px-2">
      <template v-for="item in navigationItems" :key="item.title">
        <!-- Items with children -->
        <v-list-group v-if="item.children" :value="item.title">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" class="nav-item" />
          </template>
          <v-list-item v-for="child in item.children" :key="child.title" :to="child.to" :prepend-icon="child.icon"
            :title="child.title" class="nav-child-item" />
        </v-list-group>

        <!-- Items without children -->
        <v-list-item v-else :to="item.to" :prepend-icon="item.icon" :title="item.title" class="nav-item" />
      </template>
    </v-list>

    <template #append>
      <v-divider />
      <div class="pa-2">
        <v-btn block variant="text" @click="rail = !rail" :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.nav-drawer {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.logo-section {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%);
  border-radius: 0 0 16px 0;
}

.logo-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ffffff 0%, #89f1ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon .v-icon {
  color: white !important;
}

.nav-item {
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(21, 101, 192, 0.08);
}

.nav-child-item {
  border-radius: 8px;
  margin-left: 0;
  padding-left: 16px !important;
  font-size: 0.875rem;
}

:deep(.v-list-group__items) {
  --indent-padding: 0px !important;
}

:deep(.v-list-item--active) {
  background: linear-gradient(135deg, rgba(21, 101, 192, 0.15) 0%, rgba(0, 188, 212, 0.1) 100%) !important;
  color: #1565C0;
}

:deep(.v-list-item--active .v-icon) {
  color: #1565C0;
}
</style>
