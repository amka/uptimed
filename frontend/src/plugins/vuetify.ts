/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#fcf8fb',
    surface: '#fcf8fb',
    primary: '#fde074',
    secondary: '#98b204',
    accent: '#e184b3',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#070306',
    surface: '#070306',
    primary: '#e9c648',
    secondary: '#e1fb4b',
    accent: '#7b1e4d',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomDarkTheme,
      myCustomLightTheme,
    },
  },
})
