<template>
    <v-container>
        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                     :size="70"
                     :width="7"
                     color="purple"
                     indeterminate
                     :loaded="loading">
                </v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout v-if="!loading">
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3 class="red--text">{{loaded.title}}</h3>
                        <v-spacer></v-spacer>
                        {{loaded}}
                        <template v-if="isCreator">
                            <edit-meetup-dialog :loaded="loaded"></edit-meetup-dialog>
                        </template>
                    </v-card-title>
                    <v-card-media
                    :src="loaded.imageurl"
                    height="350px"
                    ></v-card-media>
                    <v-card-text>
                        <div>
                            <div class="info--text mb-2">{{loaded.date | date}} - {{loaded.location}}
                            <edit-date-dialog v-if="isCreator" :loaded="loaded"></edit-date-dialog>
                            <edit-time-dialog v-if="isCreator" :loaded="loaded"></edit-time-dialog>
                            </div>
                            <p>{{loaded.description}}</p>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <register-dialog v-if="isAuthenticated && !isCreator" :loaded="loaded"></register-dialog>
                        <v-btn class="red"
                               v-if="isCreator"
                               :loading="loading"
                               :disabled="loading"
                               @click="deleteMeetup">Delete Meetup
                            <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import editMeetup from './editMeetup/editMeetupDialog'
    import editDate from './editMeetup/editDateDialog'
    import editTime from './editMeetup/editTimeDialog'
    import registerDialog from './editMeetup/registerDialog'
    export default {
        props: ['id'],
        methods : {
            deleteMeetup () {
                this.$store.dispatch('deleteMeetup', this.id)
                this.$router.push('/meetups')
            }
        },
        computed:{
            loaded () {
                return this.$store.getters.getLoadedMeetup(this.id)
            },
            isAuthenticated(){
                return this.$store.getters.User !== null && this.$store.getters.User !== undefined
            },
            isCreator(){
                if (!this.isAuthenticated){
                    return false
                }
                return this.$store.getters.User.id===this.loaded.creator
            },
            loading(){
                return this.$store.getters.loading
            },
        },
        components: {
            'edit-meetup-dialog': editMeetup,
            'edit-date-dialog': editDate,
            'edit-time-dialog': editTime,
            'register-dialog': registerDialog
            }
    }
</script>
