<template>
  <v-card class="announcement-card" :class="{ 'important': announcement.isImportant }">
    <div class="card-accent" :style="{ background: categoryGradient }" />
    
    <v-card-item>
      <template #prepend>
        <v-avatar :color="categoryColor" size="40">
          <v-icon color="white" size="20">{{ categoryIcon }}</v-icon>
        </v-avatar>
      </template>

      <v-card-title class="text-body-1 font-weight-bold">
        {{ announcement.title }}
        <v-icon v-if="announcement.isImportant" color="warning" size="18" class="ml-1">
          mdi-alert-circle
        </v-icon>
      </v-card-title>

      <v-card-subtitle>
        <v-icon size="14" class="mr-1">mdi-calendar</v-icon>
        {{ formattedDate }}
      </v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-body-2 text-medium-emphasis pt-0">
      {{ announcement.content }}
    </v-card-text>

    <v-card-actions v-if="announcement.link">
      <v-spacer />
      <v-btn 
        variant="text" 
        color="primary" 
        size="small"
        :href="announcement.link" 
        target="_blank"
      >
        Detaylar
        <v-icon end size="16">mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Announcement } from '@/types'

const props = defineProps<{
  announcement: Announcement
}>()

const categoryColor = computed(() => {
  switch (props.announcement.category) {
    case 'general': return 'primary'
    case 'academic': return 'info'
    case 'financial': return 'warning'
    case 'event': return 'success'
    default: return 'grey'
  }
})

const categoryGradient = computed(() => {
  switch (props.announcement.category) {
    case 'general': return 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)'
    case 'academic': return 'linear-gradient(135deg, #0288D1 0%, #4FC3F7 100%)'
    case 'financial': return 'linear-gradient(135deg, #F57C00 0%, #FFB74D 100%)'
    case 'event': return 'linear-gradient(135deg, #388E3C 0%, #81C784 100%)'
    default: return 'linear-gradient(135deg, #757575 0%, #BDBDBD 100%)'
  }
})

const categoryIcon = computed(() => {
  switch (props.announcement.category) {
    case 'general': return 'mdi-bullhorn'
    case 'academic': return 'mdi-book-open-variant'
    case 'financial': return 'mdi-currency-try'
    case 'event': return 'mdi-calendar-star'
    default: return 'mdi-information'
  }
})

const formattedDate = computed(() => {
  const date = new Date(props.announcement.date)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<style scoped>
.announcement-card {
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.announcement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.announcement-card.important {
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.card-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}
</style>
