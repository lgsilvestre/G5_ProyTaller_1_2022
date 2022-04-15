<template>
  <div class="home">
    <v-card
    max-width="80%"
    class="mx-auto"
    >
      <carrousel></carrousel>
    </v-card>

    <div class="m-4">
      <h1 >¿QUIÉNES SOMOS?</h1>
      <p>Somos una fundación de rescate y esterilización de animales en situación 
      de calle o maltrato en la provincia de Curico </p>
    </div>
    
    <!-- <p class="text-center display-4 " v-for="animal in this.animals" :key="animal.nombre">
      {{animal.name}}
    </p> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import Carrousel from '../components/carrousel.vue';

export default {
  name: 'Home',
  components: {
    Carrousel
  },
  data: function () {
    return {
      animals: [],
    }
  },
  created: function () {
    // this.getAnimals()
  },

  methods: {
    // getAnimals () {
    //   axios.get("http://localhost:3000/getAnimals").then((result) => {
    //     this.animals = result.data
    //   })
    // },
  },
}
</script>

<style >

  h1 {
    text-align: center;
  }
  p{
    text-align: center;
  }
  .m-4{
    margin-top: 4rem;
  }

</style>