<template>
    <v-app>
        <v-navigation-drawer app temporary v-model="drawer">
            <v-list>
                <v-list-tile v-for="item in menuItems" :to="item.link">
                    <v-list-tile-action>
                        <v-icon left>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{item.title}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="isAuthenticated">
                    <v-list-tile-action>
                        <v-icon left>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Logout</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark class="red darken-2">
            <v-toolbar-side-icon @click="drawer=!drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
            <v-toolbar-title style="cursor:pointer"><router-link tag="span" to="/">DevMeetups</router-link></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only" v-for="item in menuItems">
                <v-btn flat :to="item.link"><v-icon left>{{item.icon}}</v-icon>{{item.title}}</v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-xs-only" v-if="isAuthenticated">
                <v-btn flat @click="logout"><v-icon left>exit_to_app</v-icon>Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <main>
            <router-view></router-view>
        </main>
    </v-app>
</template>
<script>
    export default{
        data(){
            return{
                drawer: false,
            }
        },
        methods: {
            logout(){
                this.$router.push('/');
                this.$store.dispatch('logout');
            }
        },
        computed: {
            menuItems () {
                let menuItems = [
                    {icon:'face', title:'Sign up',link:'/signup'},
                    {icon:'lock_open', title:'Sign in',link:'/signin'}
                ]
                if (this.isAuthenticated){
                    menuItems= [
                        {icon:'supervisor_account', title:'View Meetups',link:'/meetups'},
                        {icon:'room', title:'Organize Meetups',link:'/createmeetup'},
                        {icon:'person', title:'Profile',link:'/profile'},
                    ]
                }
                return menuItems;
            },
            isAuthenticated(){
                return this.$store.getters.User !== null && this.$store.getters.User !== undefined ;
            }
        }
    }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
