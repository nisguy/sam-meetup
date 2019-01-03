import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGuard'
import Home from './components/Home.vue';
import Meetups from './components/meetups/meetups.vue';
import Meetup from './components/meetups/meetup.vue';
import createMeetup from './components/meetups/createMeetups.vue';
import Profile from './components/user/user.vue';
import signIn from './components/user/signin.vue'
import signUp from './components/user/signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props:true,
      component: Meetup
    },
    {
      path: '/createmeetup',
      name: 'createMeetup',
      component: createMeetup,
      beforeEnter: authGuard
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/signin',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    }
],mode:"history"
})
