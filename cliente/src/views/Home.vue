<template>
  <div class="home">
    <v-card
    max-width="100%"
    class="mx-auto"
    >
      <carrousel></carrousel>
    </v-card>
    <div class="m-4">
      <h1 >“Con tus acciones escribes mi destino, respetando mi vida o ignorando mi sufrimiento”</h1>
      <br>
    </div>
    <carrouselcards></carrouselcards>
    <intro-adopciones></intro-adopciones>
    <intro-donar></intro-donar>

    
    <!-- <p class="text-center display-4 " v-for="animal in this.animals" :key="animal.nombre">
      {{animal.name}}
    </p> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import Carrousel from '../components/PaginaPrincipal/carrousel.vue';
import Carrouselcards from '../components/PaginaPrincipal/carrouselcards.vue';
import IntroAdopciones from '../components/PaginaPrincipal/introAdopciones.vue';
import IntroDonar from '../components/PaginaPrincipal/introDonar.vue';

export default {
  name: 'Home',
  components: {
    Carrousel,
    Carrouselcards,
    IntroAdopciones,
    IntroDonar
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