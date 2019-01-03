<template>
    <v-dialog persistent width='350px' v-model="dialog">
        <v-btn fab accent slot="activator"><v-icon>edit</v-icon></v-btn>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-card-title>Edit Meetup</v-card-title>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-card-text>
                                    <v-text-field
                                    name="title"
                                    label="Title"
                                    id="title"
                                    :rules="titleRules"
                                    v-model="editedTitle"
                                    required
                                    ></v-text-field>
                                    <v-text-field
                                    name="description"
                                    label="Description"
                                    id="description"
                                    multi-line
                                    :rules="descriptionRules"
                                    v-model="editedDescription"
                                    required
                                    ></v-text-field>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-card-actions>
                                    <v-btn flat class="info--text darker-1" @click="dialog=false">close</v-btn>
                                    <v-btn flat class="info--text darker-1" @click="editMeetup">Save</v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-dialog>
</template>

<script>
    export default {
        props: ['loaded'],
        data(){
            return {
                dialog: false,
                editedTitle :this.loaded.title,
                editedDescription : this.loaded.description,
                titleRules: [
                  v => !!v || 'Title is required',
                ],
                descriptionRules: [
                  v => !!v || 'Description is required',
                ]
            };
        },
        methods: {
            editMeetup(){
                if (this.editedTitle.trim()=='' || this.editedDescription.trim()==''){
                    return
                }
                const toUpdate = {
                    id: this.loaded.id,
                    title: this.editedTitle,
                    description: this.editedDescription
                }
                this.$store.dispatch('updateChanges',toUpdate)
                this.dialog = false
            }
        }
    }
</script>
