<template>
  <div>
        <v-bottom-navigation
            v-model="value"
            shift
        >
            <v-btn  @click="opcionBoton(1)">Mascotas</v-btn>
            <v-btn  @click="opcionBoton(0)">Administradores</v-btn>
            <v-btn  @click="opcionBoton(2)">Formularios</v-btn>
            <v-btn  @click="opcionBoton(3)">Socios</v-btn>
        </v-bottom-navigation>
    >
    <crudAdmin v-if="opcion == 0"></crudAdmin>
    <crudMascotas v-if="opcion == 1"></crudMascotas>
    <crud-form v-if="opcion==2"></crud-form>
    <crudSocios v-if="opcion == 3"></crudSocios>
  </div>
</template>

<script>
import crudAdmin from "../components/crudA.vue";
import crudMascotas from "../components/crudM.vue";
import CrudForm from '../components/crudForm.vue';
import crudSocios from "./Socios.vue";

export default {
  data() {
    return {
            opcion : 1,
            value: 0
  },
  name: "Crud",
  components: {
    crudAdmin,
    crudMascotas,
    CrudForm
    crudSocios,
  },
  methods: {
        opcionBoton(opcion){
            this.opcion = opcion
    },
</script>

<style>

</style>
</style>
