<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-xs-centre text-sm-right">
                <v-btn large router to='/meetups' class="blue lighten-1">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-centre text-sm-left">
                <v-btn large router to='/createmeetup' class="blue lighten-1">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>
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
            <v-flex xs-12>
                <v-carousel style="cursor:pointer">
                    <v-carousel-item v-for="item in items"
                    :key="item.id"
                    :src="item.imageurl"
                    @click.native="loadMeetup(item.id)">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-sm-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data(){
            return {
            };
        },
        methods: {
            loadMeetup(id){
                this.$router.push('/meetups/'+id);
            }
        },
        computed:{
            items(){
                return this.$store.getters.getFeaturedMeetups;
            },
            loading(){
                return this.$store.getters.loading
            }
        }
    }
</script>
<style lang="stylus" scoped>
.title{
    position:absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
}

.v-progress-circular
    margin: 1rem
</style>
