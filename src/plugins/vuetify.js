import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VDialog,
  VForm,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VProgressCircular,
  VDatePicker,
  VTimePicker,
  VIcon,
  VDivider,
  VAlert,
  VGrid,
  VCard,
  VTextField,
  VToolbar,
  transitions,
  VCarousel
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VForm,
    VDivider,
    VDialog,
    VProgressCircular,
    VDatePicker,
    VTextField,
    VCard,
    VCarousel,
    VNavigationDrawer,
    VFooter,
    VList,
    VTimePicker,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  }
})
