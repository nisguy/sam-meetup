<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <h2>Create a New Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex>
                <v-layout row>
                    <v-flex xs12>
                        <form @submit.prevent="submit" lazy-validation>
                            <v-layout>
                                <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                :rules="titleRules"
                                required
                                ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                :rules="locationRules"
                                required
                                ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="mb-2">
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-btn raised class="red" @click="pickFile">Upload an Image</v-btn>
                                    <input type="file" @change="filePicked" style="display: none" accept="image/*" ref="imageFile" />
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3>
                                    <img :src="imageurl" height="130px" />
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 offset-sm3 class="mb-2">
                                    <h3>Pick a Date and Time</h3>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-date-picker required v-model="date" class="mb-2"></v-date-picker>
                                    <v-time-picker required v-model="time" height="300px"></v-time-picker>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                :rules="descriptionRules"
                                v-model="description"
                                multi-line
                                required
                                ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12 sm6 offset-sm3>
                                    {{this.$store.getters.User.id.id}}
                                    <v-btn class="info" type="Submit"
                                    :loading="loading"
                                    :disabled="loading">Create
                                    <span slot="loader" class="custom-loader">
                                        <v-icon light>cached</v-icon>
                                    </span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import moment from 'moment'
  export default {
      data(){
          return {
              date:null,
              time:null,
              valid: false,
              title: '',
              titleRules: [
                v => !!v || 'Title is required',
            ],
              location: '',
              locationRules: [
                v => !!v || 'Location is required',
            ],
              imageurl: '',
              image: null,
              imageurlRules: [
                v => !!v || 'Image URL is required',
            ],
              description: '',
              descriptionRules: [
                v => !!v || 'Description is required',
              ]
          };
      },
  created: function () {
    const dateTime = moment()
    this.date = dateTime.format('YYYY-MM-DD')
    this.time = dateTime.format('HH:mm')
   },

  methods: {
      pickFile(){
          this.$refs.imageFile.click()
      },
      filePicked(event){
          const files= event.target.files
          const file = files[0]
          if (file.name.lastIndexOf('.') <= 0){
              return alert('Please add a valid image')
          }
          let fileReader = new FileReader()
          fileReader.addEventListener('load',()=> {
              this.imageurl = fileReader.result
          })
          fileReader.readAsDataURL(file)
          this.image = file
      },
      submit(){
          if (!this.image){
              return alert('Please add an image')
          }
          let meetup= {
              title: this.title,
              location: this.location,
              imageurl: this.imageurl,
              image:this.image,
              description: this.description,
              date: this.getSavableDate.toISOString(),
              creatorId: this.$store.getters.User.id.id
            }
            this.$store.dispatch('addMeetup',meetup);
            this.$router.push("/meetups");
      }
  },
  computed:{
      getSavableDate(){
          if(typeof this.date==='string'){
              const date= new Date(this.date);
              const minutes= this.time.match(/:(\d+)/)[1];
              const hours= this.time.match(/^(\d+)/)[1];
              date.setHours(hours);
              date.setMinutes(minutes);
              return date
          }
      },
      loading(){
        return this.$store.getters.loading
    }
  }
}
</script>
