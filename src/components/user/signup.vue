<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-layout v-if="error">
                    <v-flex>
                        <app-err :error="error" @dismissed="onDismiss" class="mb-3"></app-err>
                    </v-flex>
                </v-layout>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form @submit.prevent="onSubmit" ref="form">
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        :rules="[rules.required]"
                                        v-model="email"
                                        type="email"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        :rules="[rules.required, rules.min]"
                                        v-model="password"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="confirmPassword"
                                        label="Confirm password"
                                        id="confirmPassword"
                                        :rules="[rules.required,rules.emailMatch]"
                                        v-model="confirmPassword"
                                        type="password"
                                        required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn class="info" type="submit"
                                            :loading="loading"
                                            :disabled="loading">Sign Up
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data(){
            return {
                email:'',
                password:'',
                confirmPassword:'',
                rules: {
                    required: value => !!value || 'Required',
                    min: value => value.length >= 6 || 'Too short',
                    emailMatch: () => this.password == this.confirmPassword || 'Emails do not match'
                },
            };
        },
        methods: {
            onSubmit(){
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('createUser',{email: this.email,password: this.password});
                }
            },
            onDismiss(){
                this.$store.dispatch('clearError');
            }
        },
        computed: {
            user(){
                return this.$store.getters.User;
            },
            loading(){
                return this.$store.getters.loading
            },
            error(){
                return this.$store.getters.error
            }
        },
        watch: {
            user(value){
                if (value !== null && value!== undefined){
                    this.$router.push('/');
                }
            }
        }
    }
</script>
