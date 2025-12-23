import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const ktuTheme = {
  dark: false,
  colors: {
    primary: '#1565C0',
    'primary-darken-1': '#0D47A1',
    secondary: '#00ACC1',
    'secondary-darken-1': '#00838F',
    accent: '#00BCD4',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-background': '#1A1A2E',
    'on-surface': '#1A1A2E',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'ktuTheme',
    themes: {
      ktuTheme,
    },
  },
  defaults: {
    VBtn: {
      rounded: 'lg',
      elevation: 0,
    },
    VCard: {
      rounded: 'lg',
      elevation: 2,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VTooltip: {
      contentClass: 'bg-secondary',
    },
  },
})

