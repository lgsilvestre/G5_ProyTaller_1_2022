<template>
  <v-layout align-center justify-center>
    <loading v-if="loading"></loading>

    <v-data-table
      :headers="headers"
      :items="socios"
      :items-per-page="10"
      class="elevation-1"
      style="width: 100%"
      v-if="!loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Socios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <template>
            <v-btn @click="showEdit" color="red darken-1" dark class="mb-2">
              Nuevo Socio
            </v-btn>
          </template>
          <editSocio
            v-if="dialog"
            :item="editedItem"
            :formTitle="formTitle"
            @save="onSave"
            @close="dialog = false"
          ></editSocio>
        </v-toolbar>
      </template>
      <template v-slot:[`item.fechaInicio`]="{ item }">
        {{ item.fechaInicio | formatDate }}
      </template>
      <template v-slot:[`item.monto`]="{ item }"> {{ item.monto }}$ </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium class="mr-2" @click="editSocio(item)">
          mdi-pencil
        </v-icon>
        <v-icon medium @click="deleteSocio(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-layout>
</template>
<script>
import loading from "../components/Utilidades/Generales/loading.vue";
import editSocio from "../components/Crud/editSocio.vue";
import axios from "axios";

export default {
  components: {
    loading,
    editSocio,
  },
  data: () => ({
    loading: false,
    socios: [],
    headers: [
      {
        text: "Nombre",
        value: "nombreCompleto",
      },
      { text: "Monto", value: "monto" },
      { text: "Fecha inicio", value: "fechaInicio" },
      { text: "Correo", value: "correo" },
      { text: "Telefono", value: "telefono" },
      { text: "Rut", value: "rut" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    dialog: false,
    editedItem: {},
  }),
  computed: {
    formTitle() {
      return this.editedItem._id ? "Editar socio" : "Nuevo socio";
    },
  },
  created: function () {
    this.getSocios();
  },
  methods: {
    async onSave(item) {
      if (!item._id) {
        await axios.post("/postSocio", item);
      } else {
        await axios.put("/updateSocio", item);
      }
      this.getSocios();
      return;
    },
    async getSocios() {
      this.loading = true;
      const response = await axios.get("/getSocios");
      this.socios = response.data;
      this.loading = false;
    },
    async deleteSocio(item) {
      this.loading = true;
      await axios.delete(`/deleteSocio/${item._id}`);
      this.socios = this.socios.filter((i) => i._id !== item._id);
      this.loading = false;
    },
    editSocio(item) {
      this.editedItem = item;
      this.dialog = true;
    },
    showEdit() {
      this.editedItem = {};
      this.dialog = true;
    },
  },
  filters: {
    formatDate(value) {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
    },
  },
};
</script>
