<template>
    <v-dialog persistent v-model="registerDialog" max-width="300px">
        <v-btn class="red" slot="activator">{{ isRegistered? 'Deregister': 'Register'}}</v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title><strong>Register for Meetup?</strong></v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always change your decision later on.</v-card-text>
                    </v-flex>
                </v-layout><v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn class="red--text darken-1" @click="registerDialog=false">Cancel</v-btn>
                            <v-btn class="green--text darken-1" @click="registerMeetup">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['loaded'],
        data(){
            return {
                registerDialog: false,
            }
        },
        methods: {
            registerMeetup(){
                if (this.isRegistered) {
                    this.$store.dispatch('deregisterMeetup', this.loaded.id);
                }else {
                    this.$store.dispatch('registerMeetup',this.loaded.id)
                }
                this.registerDialog = false
            }
        },
        computed: {
            isRegistered(){
              return this.$store.getters.User.registeredMeetups.findIndex(meetup => {
                  return meetup === this.loaded.id
              }) >= 0
            },
            loading(){
                return this.$store.getters.loading
            }
        }
    }
</script>
