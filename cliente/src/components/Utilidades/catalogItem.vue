<template>
  <v-card class="pa-2 cardItem" shaped max-width="450px" style="margin: 0 auto">
    <v-carousel height="200px">
      <v-carousel-item
        v-for="(foto, i) in item.fotos"
        :key="i"
        :src="foto"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>

    </v-carousel>

    <v-card-title>
      {{ item.nombre }}
    </v-card-title>

    <v-card-subtitle>
      <ul>
        <li>tipo: {{ item.tipo }}</li>
        <li>edad: {{ item.edad }} años</li>
        <li>caso: {{item.caso}}</li>
      </ul>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn v-if="item.caso=='interno'" @click="verificarUsuario(item._id)" color="red lighten-2" text> Adoptame </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
      
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{item.descripcion}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import router from '../../router';

export default {
  props: ["item"],
  data: () => ({
    show: false,
    mostrarBoton: false,
  }),
  methods: {
    verificarUsuario(id){
      if(this.$store.getters.isAuthenticated){
        router.push({
          name:'adopcion',
          params: {id:id},
        })
      }
      else{
        router.push({name:'Login'})
      }
    },
  }
};
</script>

<style>
.cardItem {
  border: 1px solid #ccc;
}
</style>
