import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/sharables/filters/date.js'
import errCmp from '@/sharables/error.vue'
import * as firebase from 'firebase'

Vue.config.productionTip = false
Vue.filter('date',dateFilter)

Vue.component('app-err',errCmp);

new Vue({
  router,
  store,
  created(){
      firebase.initializeApp({
        apiKey: 'AIzaSyC3IFgR4Xv0K-COikI628LluYxkq5WIJl0',
        authDomain: 'axios-5e526.firebaseapp.com',
        databaseURL: 'https://axios-5e526.firebaseio.com',
        projectId: 'axios-5e526',
        storageBucket: 'axios-5e526.appspot.com',
      })
      firebase.auth().onAuthStateChanged((user) => {
        if (user){
            console.log(user.uid)
            this.$store.dispatch('autoSignin',user)
            this.$store.dispatch('fetchUserMeetups')
        }
      })

      this.$store.dispatch('loadMeetups');
  },
  render: h => h(App)
}).$mount('#app')
