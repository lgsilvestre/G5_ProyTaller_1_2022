<template>
  <div>
    <v-bottom-navigation v-model="value" shift>
      <v-btn @click="rutaTest('mascotas')">Mascotas</v-btn>
      <v-btn @click="rutaTest('administradores')">Administradores</v-btn>
      <v-btn @click="rutaTest('formularios')">Formularios</v-btn>
      <v-btn @click="rutaTest('socios')">Socios</v-btn>
      <v-btn @click="rutaTest('eventos')">Eventos</v-btn>
    </v-bottom-navigation>
    <crudMascotas v-if="comprobarRuta('mascotas')"></crudMascotas>
    <crudAdmin v-if="comprobarRuta('administradores')"></crudAdmin>
    <crud-form v-if="comprobarRuta('formularios')"></crud-form>
    <crudSocios v-if="comprobarRuta('socios')"></crudSocios>
    <crudEventos v-if="comprobarRuta('eventos')"></crudEventos>
  </div>
</template>

<script>
import crudAdmin from "../components/crudA.vue";
import crudMascotas from "../components/crudM.vue";
import CrudForm from "../components/crudForm.vue";
import crudSocios from "./Socios.vue";
import crudEventos from "../components/crudEventos.vue";

export default {
  data() {
    return {
      value: 0,
    };
  },
  name: "Crud",
  components: {
    crudAdmin,
    crudMascotas,
    CrudForm,
    crudSocios,
    crudEventos,
  },
  created(){
    if(this.$route.query.opcion === 'mascotas'){
      this.value=0
    }
    else if(this.$route.query.opcion === 'administradores'){
      this.value=1
    }
    else if(this.$route.query.opcion === 'formularios'){
      this.value=2
    }
    else if(this.$route.query.opcion === 'socios'){
      this.value=3
    }
    else if(this.$route.query.opcion === 'eventos'){
      this.value=4
    }
  },
  methods: {
    rutaTest(ruta){
      if(this.$route.query.opcion !== ruta){
        this.$router.push({ path: 'crud', query: { opcion: ruta }})
      }
    },
    comprobarRuta(ruta){
      if(this.$route.query.opcion === ruta){
        return true
      }
      else{
        return false
      }
    }
  },
};
</script>
