<template>
    <v-alert
          value="true"
          dismissible
          type="error"
          @input="closed"
        >
          {{error.message}}
        </v-alert>
</template>

<script>
export default {
    props: ['error'],
    methods:{
        closed(){
            this.$emit('dismissed')
        }
    }
}
</script>
