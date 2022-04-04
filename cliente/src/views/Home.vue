<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <p>{{}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data: function () {
    return {
      animals: [],
    }
  },
  created: function () {
    this.getAnimals()
  },
  
  methods: {
    async getAnimals () {
      const get = await axios.get(
        'localhost:3000' +
          '/getAnimals' 
      ,{
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      
      this.animals = get.data
      console.log(get)
    },
  },
}
</script>
