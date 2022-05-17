<template>
  <v-layout align-center justify-center>
    <loading v-if="loading"></loading>
    <v-data-table
      v-if="!loading"
      :headers="headers"
      :items="listaMascotas"
      class="elevation-1 w-100"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mis mascotas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red darken-1"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nueva mascota
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.titulo"
                        label="Titulo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="Descripción"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        class="my-2 px-1"
                        cols="12"
                        sm="6"
                        >
                        <v-date-picker
                            v-model="editedItem.fecha"
                        ></v-date-picker>
                    </v-col>
            
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.foto"
                        label="Foto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="red darken-1" text @click="save"> Guardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
              >�Est�s seguro que deseas borrar esta mascota?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.foto="{ item }">
        <v-img :src="item.foto" max-width="200"></v-img>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from "axios";
import Loading from "./loading.vue";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: { Loading },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: "Titulo", value: "titulo" },
      { text: "Descripción", value: "descripcion" },
      { text: "Fecha", value: "fecha" },
      { text: "Hora", value: "hora" },
      { text: "Foto", value: "foto" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    mascotas: [],
    editedIndex: -1,
    editedItem: {
      titulo: "",
      descripcion: "",
      fecha: "",
      foto: "",
    },
    defaultItem: {
      titulo: "",
      descripcion: "",
      fecha: "",
      foto: "",
    },
    indexMascotas: 0,
    selectedFile: null,
    selectedFileSrc: null,
    image: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo evento" : "Editar evento";
    },
    listaMascotas() {
      //this.listarMascotas()
      return this.mascotas;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.listarMascotas();
  },

  methods: {
    initialize() {
      this.mascotas = [];
    },

    editItem(item) {
      console.log(item.fecha)
      this.editedIndex = this.mascotas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.mascotas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //this.mascotas.splice(this.editedIndex, 1)
      axios.post("/removeEvento", { _id: this.mascotas[this.editedIndex]._id });
      this.closeDelete();
    },

    close() {
        this.dialog = false
        this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
        })
        this.listarMascotas()
    },

    closeDelete() {
      this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      this.listarMascotas();
    },

    async save() {
      //this.loading = true;
      if (this.editedIndex > -1) {
        Object.assign(this.mascotas[this.editedIndex], this.editedItem);
        await axios.put("/updateEvento", {
          _id: this.editedItem._id,
          titulo: this.editedItem.titulo,
          descripcion: this.editedItem.descripcion,
          fecha: this.editedItem.fecha,
          foto: this.editedItem.foto,
        });
      } else {
        //Crear mascota
        console.log(this.editedItem.fecha);
        //this.mascotas.push(this.editedItem)
        await axios.post("/postEvento", {
          titulo: this.editedItem.titulo,
          descripcion: this.editedItem.descripcion,
          fecha: this.editedItem.fecha,
          foto: this.editedItem.foto,
        });
      }
      //this.loading = false;
      this.close();
      this.listarMascotas();
    },
    async listarMascotas() {
      let me = this;
      this.loading = true;
      axios
        .get("/getEventos")
        .then(function (response) {
          me.mascotas = response.data;
          me.indexMascotas = me.mascotas.length;
          me.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.cropper {
  height: 150px;
  width: 200px;
  background: #ddd;
}
.w-100 {
  width: 100%;
}
</style>
