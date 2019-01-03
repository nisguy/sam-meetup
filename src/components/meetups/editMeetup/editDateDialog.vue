<template>
    <v-dialog persistent v-model="editDialog" width='350px'>
        <v-btn raised class="info--text darker-1" slot="activator">Edit Date</v-btn>
            <v-card>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-title><strong>Edit Meetup Date</strong></v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-date-picker v-model="editedDate" style="width:100%" actions>
                                <template scope="{save,cancel}">
                                    <v-btn flat class="info--text darker-1" @click="editDialog=false">Cancel</v-btn>
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
                            </v-date-picker>
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
                editDialog: false,
                editedDate: null
            }
        },
        methods: {
            saveChanges(){
                const newDate = new Date(this.loaded.date)
                const newDay = new Date(this.editedDate).getUTCDate()
                const newMonth = new Date(this.editedDate).getUTCMonth()
                const newYear = new Date(this.editedDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateChanges',{
                    id: this.loaded.id,
                    date: newDate
                })
                this.editDialog = false
            }
        },
        created(){
            // const pickerDate = new Date(this.loaded.date)
            // this.editedDate = pickerDate.getUTCFullYear()+'-'+pickerDate.getUTCMonth()+'-'+pickerDate.getUTCDate()
            this.editedDate = new Date(this.loaded.date).toISOString().substr(0,10)﻿
        },
        computed: {
            loading(){
              return this.$store.getters.loading
          }
        }
    }
</script>
