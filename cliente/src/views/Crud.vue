<template>
  <div>
    <v-btn @click="changeTab(0)" v-bind:class="{ active: opcion == 0 }">
      Macotas</v-btn
    >
    <v-btn @click="changeTab(1)" v-bind:class="{ active: opcion == 1 }">
      Administradores</v-btn
    >
    <v-btn @click="changeTab(2)" v-bind:class="{ active: opcion == 2 }">
      Socios</v-btn
    >
    <crudAdmin v-if="opcion == 0"></crudAdmin>
    <crudMascotas v-if="opcion == 1"></crudMascotas>
    <crudSocios v-if="opcion == 2"></crudSocios>
  </div>
</template>

<script>
import crudAdmin from "../components/crudA.vue";
import crudMascotas from "../components/crudM.vue";
import crudSocios from "./Socios.vue";

export default {
  data() {
    return {
      opcion: 0,
    };
  },
  name: "Crud",
  components: {
    crudAdmin,
    crudMascotas,
    crudSocios,
  },
  methods: {
    changeTab(tab) {
      this.opcion = tab;
    },
  },
};
</script>
<style>
.active {
  color: red !important;
}
</style>
