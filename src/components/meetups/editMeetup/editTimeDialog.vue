<template>
    <v-dialog persistent v-model="editTDialog" width='350px'>
        <v-btn raised class="info--text darker-1" slot="activator">Edit Time</v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title><strong>Edit Meetup Time</strong></v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-time-picker v-model="editedTime" style="width:100%" actions>
                                <template scope="{save,cancel}">
                                    <v-btn flat
                                    class="info--text darker-1"
                                    @click="editTDialog=false">Cancel</v-btn>
                                    <v-btn flat
                                    class="info--text darker-1"
                                    @click="saveChanges"
                                    :loading="loading"
                                    :disabled="loading">Save
                                    <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                    </v-btn>
                                </template>
                            </v-time-picker>
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
                editTDialog: false,
                editedTime: null
            }
        },
        methods: {
            saveChanges(){
                const newDate = new Date(this.loaded.date)//new Date(this.loaded.date)
                const minutes= this.editedTime.match(/:(\d+)/)[1];
                const hours= this.editedTime.match(/^(\d+)/)[1];
                newDate.setHours(hours)
                newDate.setMinutes(minutes)
                this.$store.dispatch('updateChanges',{
                    id: this.loaded.id,
                    date: newDate
                })
                this.editDialog = false
            }
        },
        created(){
            // const pickerTime = new Date(this.loaded.date)
            // this.editedTime = pickerTime.getHours()+':'+pickerTime.getMinutes()
            this.editedTime = new Date()
        },
        computed: {
            loading(){
              return this.$store.getters.loading
          }
        }
    }
</script>
