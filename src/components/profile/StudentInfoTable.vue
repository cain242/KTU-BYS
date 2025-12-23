<template>
  <v-card class="info-table-card">
    <v-card-title class="d-flex align-center pa-4">
      <v-icon color="primary" class="mr-2">mdi-account-details</v-icon>
      <span>{{ title }}</span>
    </v-card-title>

    <v-divider />

    <v-table density="comfortable" class="info-table">
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td class="label-cell text-medium-emphasis">
            <v-icon :icon="item.icon" size="18" class="mr-2" />
            {{ item.label }}
          </td>
          <td class="value-cell font-weight-medium">
            <template v-if="item.type === 'chip'">
              <v-chip :color="item.chipColor" size="small">
                {{ item.value }}
              </v-chip>
            </template>
            <template v-else-if="item.type === 'link'">
              <a :href="item.href" class="text-primary">{{ item.value }}</a>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import type { InfoItem } from '@/types/profile'

defineProps<{
  title: string
  items: InfoItem[]
}>()
</script>

<style scoped>
.info-table-card {
  border-radius: 16px;
  overflow: hidden;
}

.info-table {
  background: transparent;
}

.info-table tr {
  transition: background 0.2s ease;
}

.info-table tr:hover {
  background: rgba(21, 101, 192, 0.04);
}

.label-cell {
  width: 200px;
  white-space: nowrap;
  padding: 16px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.value-cell {
  padding: 16px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.info-table tr:last-child .label-cell,
.info-table tr:last-child .value-cell {
  border-bottom: none;
}
</style>
