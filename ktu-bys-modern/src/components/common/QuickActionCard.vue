<template>
  <v-card class="quick-action-card" :to="to" :href="href" :target="href ? '_blank' : undefined">
    <div class="card-icon-wrapper" :style="{ background: gradientStyle }">
      <v-icon :icon="icon" size="28" color="white" />
    </div>
    
    <v-card-item class="pt-6">
      <v-card-title class="text-body-1 font-weight-bold">
        {{ title }}
      </v-card-title>
      <v-card-subtitle class="text-caption">
        {{ subtitle }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-actions class="pt-0">
      <v-spacer />
      <v-icon color="primary" size="20">mdi-arrow-right</v-icon>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle: string
  icon: string
  color?: string
  to?: string
  href?: string
}>()

const gradientStyle = computed(() => {
  const baseColor = props.color || '#1565C0'
  return `linear-gradient(135deg, ${baseColor} 0%, ${lightenColor(baseColor, 30)} 100%)`
})

function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)
}
</script>

<style scoped>
.quick-action-card {
  border-radius: 16px;
  position: relative;
  overflow: visible;
  padding-top: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.quick-action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(21, 101, 192, 0.15);
}

.card-icon-wrapper {
  position: absolute;
  top: -20px;
  left: 20px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(21, 101, 192, 0.3);
}
</style>
