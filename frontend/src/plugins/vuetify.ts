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
    primary: '#63315c',
    secondary: '#d7ac98',
    accent: '#906f47',
  },
}

const myCustomDarkTheme = {
  dark: true,
  colors: {
    background: '#070306',
    surface: '#070306',
    primary: '#ce9cc7',
    secondary: '#673c28',
    accent: '#b8986f',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      myCustomDarkTheme,
      myCustomLightTheme,
    },
  },
})
