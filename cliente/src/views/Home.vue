<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <p class="text-center display-4 " v-for="animal in this.animals" :key="animal.nombre">
      {{animal.name}}
    </p>
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
    getAnimals () {
      axios.get("http://localhost:3000/getAnimals").then((result) => {
        this.animals = result.data
      })
    },
  },
}
</script>
