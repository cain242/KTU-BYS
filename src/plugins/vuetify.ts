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

const ktuDarkTheme = {
  dark: true,
  colors: {
    primary: '#42A5F5',
    'primary-darken-1': '#1E88E5',
    secondary: '#26C6DA',
    'secondary-darken-1': '#00ACC1',
    accent: '#00BCD4',
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
    info: '#29B6F6',
    background: '#121212',
    surface: '#1E1E1E',
    'on-primary': '#000000',
    'on-secondary': '#000000',
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'ktuTheme',
    themes: {
      ktuTheme,
      ktuDarkTheme,
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
  },
})
