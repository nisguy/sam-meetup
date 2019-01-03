import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      loadedMeetups: [],
      user: null,
      error: null,
      loading: false,
  },
  mutations: {
      setLoadedMeetups(state, meetups){
          state.loadedMeetups = meetups;
      },
      addMeetup(state,payload){
          state.loadedMeetups.push(payload);
      },
      setUser(state,userDetails){
          state.user= userDetails
      },
      isLoading(state,payload){
          state.loading= payload
      },
      setError(state,payload){
          state.error = payload
      },
      clearError(state){
          state.error = null
      },
      updateMeetup(state,payload){
          let target = state.loadedMeetups.find(element => element.id == payload.id)
          if (payload.title){
              target.title = payload.title
          }
          if (payload.description){
              target.description = payload.description
          }
          if (payload.date){
              target.date = payload.date
          }
      },
      setRegisteredMeetup (state, payload){
          state.user.registeredMeetups.push(payload.id)
          state.user.fbKey[payload.id] = payload.key
      },
      setDeregisteredMeetup(state, payload){
          const registeredMeetups = state.user.registeredMeetups
          registeredMeetups.splice((registeredMeetups.findIndex(element => element == payload)), 1)
          Reflect.deleteProperty(state.user.fbKey, payload)
      },
      deleteMeetup (state, payload) {
          state.loadedMeetups.splice(state.loadedMeetups.findIndex(element => {
              element.id === payload
          }), 1)

      }
  },
  actions: {
      registerMeetup ({commit,getters}, payload) {
          const chosenMeetup = getters.getAllMeetups.find(element => element.id === payload)
          commit('isLoading', true)
          firebase.database().ref('users/'+ getters.User.id.id).child('/registrations').push(payload)
              .then(data => {
                  commit('isLoading',false)
                  commit('setRegisteredMeetup', {id: payload, key:data.key})
              })
              .catch(err => {
                  commit('isLoading',false)
                  console.log(err)
              })
      },
      deregisterMeetup({commit, getters}, payload){
          const user = getters.User
          if (!user.fbKey){
              return;
          }
          commit('isLoading', true)
          const key = user.fbKey[payload]
          firebase.database().ref('users/'+ user.id.id + '/registrations/').child(key).remove()
              .then(() => {
                  commit('isLoading', false)
                  commit('setDeregisteredMeetup', payload)
              })
              .catch(err => {
                  commit('isLoading', false)
                  console.log(err)
              })
      },
      fetchUserMeetups ({commit, getters}) {
          const user = getters.User.id
          firebase.database().ref('users/' + user + '/registrations').once('value')
              .then(data => {
                  const registeredMeetups = []
                  const swappedPairs = {}
                  const dataPairs = data.val()
                  for (let key in dataPairs){
                      registeredMeetups.push(dataPairs[key])
                      swappedPairs[dataPairs[key]] = key
                  }
                  const updatedUser = {
                      id: getters.User,
                      registeredMeetups : registeredMeetups,
                      fbKey: swappedPairs
                  }
                  commit('setUser', updatedUser)
              })
      },
      addMeetup({commit},payload){
          var post= {
              title: payload.title,
              location: payload.location,
              description: payload.description,
              date: payload.date,
              creatorId: payload.creatorId
            }
          commit('isLoading',true);
          let key
          let imageUrl
          firebase.database().ref('meetups').push(post)
          .then(data => {
              commit('isLoading',false);
              key = data.key;
              return key
          })
          .then(key => {
              let filename = payload.image.name
              let ext = filename.slice(filename.lastIndexOf('.'))
              return firebase.storage().ref('meetups/'+ key +'.'+ ext).put(payload.image);
          })
          .then(filedata => {
              return filedata.ref.getDownloadURL()
          })
          .then((imageUrl) => {
              return firebase.database().ref('meetups').child(key).update({imageurl: imageUrl})
          })
          .then(()=> {
              commit('addMeetup',{
                  ...post,
                  id: key,
                  imageurl: payload.imageurl
              });
          })
          .catch(err => {
              commit('isLoading',false);
              console.log(err);
          })
      },
      loadMeetups ({commit}) {
          commit('isLoading', true)
          firebase.database().ref('meetups').once('value')
          .then(data => {
              const meetups = []
              const obj = data.val();
              for (let key in obj){
                  meetups.push({
                      id: key,
                      title: obj[key].title,
                      location: obj[key].location,
                      imageurl: obj[key].imageurl,
                      description: obj[key].description,
                      date: obj[key].date,
                      creator: obj[key].creatorId
                  })
              }
              commit('setLoadedMeetups',meetups)
              commit('isLoading',false);
          })
          .catch(err => {
              commit('isLoading',false);
              console.log(err)
          })
      },
      deleteMeetup ({commit}, payload) {
          firebase.database().ref('meetups').child(payload).remove()
              .then(() => {
                  commit('deleteMeetup', payload)
              })
      },
      createUser({commit},userData){
          commit('clearError');
          commit('isLoading',true);
          firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password)
          .then(user=> {
              commit('isLoading',false);
              const userDetails = {
                  id: user.uid,
                  registeredMeetups : [],
                  fbKey : {}
              }
              commit('setUser',userDetails);
          })
          .catch(err => {
              commit('isLoading',false);
              commit('setError',err);
          })
      },
      signIn({commit},userData){
          commit('clearError');
          commit('isLoading',true);
          firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
          .then(user=>{
              console.log(user.user.uid)
              commit('isLoading',false);
              const userDetails = {
                  id: user.user.uid,
                  registeredMeetups: [],
                  fbKey : {}
              }
              commit('setUser',userDetails);
          })
          .catch(err=> {
              commit('isLoading',false);
              console.log(err);
              commit('setError',err);
          });
      },
      clearError({commit}){
          commit('clearError')
      },
      autoSignin({commit},payload){
          commit('setUser',{id:payload.uid, registeredMeetups: [], fbKey: {}})
      },
      logout({commit}){
          firebase.auth().signOut()
          commit('setUser',null)
      },
      updateChanges({commit},payload){
          const updateObj = {}
          if (payload.title){
              updateObj.title = payload.title
          }
          if (payload.description){
              updateObj.description = payload.description
          }
          if (payload.date){
              updateObj.date = payload.date
          }
          commit('isLoading',true)
          firebase.database().ref('meetups').child(payload.id).update(updateObj)
          .then(()=> {
              commit('isLoading',false)
              commit('updateMeetup',payload)
          })
          .catch(err => {
              commit('isLoading',false)
              console.log(err);
          })
      }
  },
  getters: {
      getAllMeetups(state){
          return state.loadedMeetups.sort((meetupA, meetupB) => {
              return meetupA.date > meetupB.date
          });
      },
      getFeaturedMeetups(state, getters){
          return getters.getAllMeetups.slice(0,5);
      },
      getLoadedMeetup(state){
          return ((meetupId)=> {
              return state.loadedMeetups.find(element=> element.id == meetupId);
          });
      },
      User(state){
          return state.user
      },
      loading(state){
          return state.loading
      },
      error(state){
          return state.error
      }
  }
})
