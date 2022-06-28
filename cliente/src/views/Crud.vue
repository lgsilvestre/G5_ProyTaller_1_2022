<template>
  <div>

    
    <v-bottom-navigation v-model="value" shift class="hideOnPhone">
          <v-btn @click="rutaTest('mascotas')">Mascotas</v-btn>
          <v-btn @click="rutaTest('administradores')">Administradores</v-btn>
          <v-btn @click="rutaTest('formularios')">Formularios</v-btn>
          <v-btn @click="rutaTest('solicitudes')">Solicitudes</v-btn>
          <v-btn @click="rutaTest('solicitudesAceptadas')">Solicitudes aceptadas</v-btn>
          <v-btn @click="rutaTest('socios')">Socios</v-btn>
          <v-btn @click="rutaTest('eventos')">Eventos</v-btn>
    </v-bottom-navigation>

    <v-menu offset-y >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="hideOnDesktop"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('mascotas')">Mascotas</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('administradores')">Administradores</v-btn></v-list-item-title>  
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('formularios')">Formularios</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('solicitudes')">Solicitudes</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('solicitudesAceptadas')">Solicitudes aceptadas</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('socios')">Socios</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn @click="rutaTest('eventos')">Eventos</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    

   

    <crudMascotas v-if="comprobarRuta('mascotas')"></crudMascotas>
    <crudAdmin v-if="comprobarRuta('administradores')"></crudAdmin>
    <crud-form v-if="comprobarRuta('formularios')"></crud-form>
    <crud-solicitudes v-if="comprobarRuta('solicitudes')"></crud-solicitudes>
    <crudSolicitudesAceptadas v-if="comprobarRuta('solicitudesAceptadas')"></crudSolicitudesAceptadas>
    <crudSocios v-if="comprobarRuta('socios')"></crudSocios>
    <crudEventos v-if="comprobarRuta('eventos')"></crudEventos>
  </div>
</template>

<script>
import crudAdmin from "../components/Crud/crudA.vue";
import crudMascotas from "../components/Crud/crudM.vue";
import CrudForm from "../components/Crud/crudForm.vue";
import crudSocios from "./Socios.vue";
import crudEventos from "../components/Crud/crudEventos.vue";
import crudSolicitudes from "../components/Crud/crudSolicitudes.vue";
import crudSolicitudesAceptadas from "../components/Crud/crudSolicitudesAceptadas.vue";

export default {
  data() {
    return {
      value: 0,
      drawer: false,
      group: null,
    };
  },
  name: "Crud",
  components: {
    crudAdmin,
    crudMascotas,
    CrudForm,
    crudSocios,
    crudEventos,
    crudSolicitudes,
    crudSolicitudesAceptadas
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
    else if(this.$route.query.opcion === 'solicitudes'){
      this.value=3
    }
    else if(this.$route.query.opcion === 'solicitudesAceptadas'){
      this.value=4
    }
    else if(this.$route.query.opcion === 'socios'){
      this.value=5
    }
    else if(this.$route.query.opcion === 'eventos'){
      this.value=6
    }
  },
   watch: {
      group () {
        this.drawer = false
      },
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
<style>
.hideOnDesktop {
  display: none !important;
}
.hideOnPhone{
  display: flex !important;
}
@media (max-width: 768px) {
  .hideOnDesktop {
    display: block !important;
  }
  .hideOnPhone{
    display: none !important;
  }
}
</style>