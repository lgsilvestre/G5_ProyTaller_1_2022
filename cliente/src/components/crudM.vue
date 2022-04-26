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
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.edad"
                        label="Edad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.raza"
                        label="Raza"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.tipo"
                        label="Tipo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <cropper
                        class="cropper"
                        :image="image"
                        :src="selectedFileSrc"
                        @change="handleFileChange"
                        :stencil-props="{
                          aspectRatio: 16 / 9,
                          movable: true,
                          resizable: true,
                        }"
                      />
                      <v-file-input
                        :v-model="selectedFile"
                        accept="image/*"
                        label="Cargar imagen"
                        :src="selectedFileSrc"
                        required
                        @change="setImage"
                        ref="fileInput"
                      ></v-file-input>
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
import { Cropper } from "vue-advanced-cropper";
import Loading from "./loading.vue";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: { Cropper, Loading },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Edad", value: "edad" },
      { text: "Raza", value: "raza" },
      { text: "Tipo", value: "tipo" },
      { text: "Foto", value: "foto" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    mascotas: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      edad: 0,
      raza: "",
      tipo: "",
      foto: "",
    },
    defaultItem: {
      nombre: "",
      edad: 0,
      raza: "",
      tipo: "",
      foto: "",
    },
    indexMascotas: 0,
    selectedFile: null,
    selectedFileSrc: null,
    image: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva mascota" : "Editar mascota";
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
      console.log(item._id);
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
      axios.post("/removeAnimal", { _id: this.mascotas[this.editedIndex]._id });
      this.closeDelete();
    },
    handleFileChange({ canvas }) {
      this.image = canvas.toDataURL();
    },

    close() {
      this.listarMascotas();
      this.dialog = false;
      this.selectedFileSrc = null;
      this.selectedFile = null;
      this.$nextTick(() => {
        if (this.$refs.fileInput) {
          this.$refs.fileInput.reset();
        }
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.listarMascotas();
    },

    async save() {
      this.loading = true;
      if (this.editedIndex > -1) {
        Object.assign(this.mascotas[this.editedIndex], this.editedItem);
        await axios.put("/updateAnimal", {
          _id: this.editedItem._id,
          nombre: this.editedItem.nombre,
          edad: this.editedItem.edad,
          raza: this.editedItem.raza,
          tipo: this.editedItem.tipo,
          foto: this.image,
        });
      } else {
        //Crear mascota
        //this.mascotas.push(this.editedItem)
        await axios.post("/postAnimal", {
          nombre: this.editedItem.nombre,
          edad: this.editedItem.edad,
          raza: this.editedItem.raza,
          tipo: this.editedItem.tipo,
          foto: this.image,
        });
      }
      this.loading = false;
      this.close();
      this.listarMascotas();
    },
    async listarMascotas() {
      let me = this;
      this.loading = true;
      axios
        .get("/getAnimals")
        .then(function (response) {
          me.mascotas = response.data;
          me.indexMascotas = me.mascotas.length;
          me.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setImage(e) {
      const file = e;
      if (!file) {
        this.selectedFileSrc = null;
        return;
      }
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.image = event.target.result;
          this.selectedFileSrc = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
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
