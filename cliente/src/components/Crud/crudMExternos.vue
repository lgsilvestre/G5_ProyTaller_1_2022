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
          <v-toolbar-title>Casos externos</v-toolbar-title>
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
                Nuevo caso externo
              </v-btn>
              
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>

              <v-stepper v-model="e1"
                non-linear
              >
                <v-stepper-header>
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                    editable
                  >
                    Informacion general

                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                    editable
                  >
                    Imagenes

                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">

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
                    <v-col cols="8" sm="4" md="4">
                      <v-select
                        :items="tiposFormularios"
                        label="Tipo"
                        v-model="editedItem.tipo"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="16" sm="10" md="8">
                      <v-textarea
                        v-model="editedItem.descripcion"
                        color="teal"
                      >
                        <template v-slot:label>
                          <div>
                            Descripción <small>(opcional)</small>
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    
                  </v-row>

                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                        <v-row justify="center" align="center">
                          <v-col
                            cols="6"
                            v-for="(item, index) in editedItem.fotos"
                            :key="index"
                          >
                            <v-btn color="warning" @click="removeFoto(item)"
                              >Eliminar</v-btn
                            >
                            <v-img
                              contain
                              :src="item"
                              max-height="100"
                              max-width="200"
                            ></v-img>
                          </v-col>
                          <v-col cols="6">
                            <v-btn color="primary" dark block @click="addFoto">
                              Agregar foto
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    </v-container>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>

                  
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
                >¿Estás seguro que deseas borrar esta mascota?</v-card-title
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
        <v-icon medium class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon medium @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.fotos="{ item }">
        <v-carousel height="200px" class="carousel">
          <v-carousel-item
            v-for="(foto, i) in item.fotos"
            :key="i"
            :src="foto"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialogCropper"
      transition="dialog-bottom-transition"
      max-width="500px"
    >
      <v-card>
        <v-card-title> Agregar imagen </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeCropper()">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="postFoto()">
            Guardar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";
import { Cropper } from "vue-advanced-cropper";
import Loading from "../Utilidades/Generales/loading.vue";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: { Cropper, Loading },
  data() {
    return {
      e1: null,
      tiposFormularios: [],
      idFormularios: [],
      dialog: false,
      dialogDelete: false,
      dialogCropper: false,
      loading: false,
      headers: [
        { text: "Nombre", value: "nombre" },
        { text: "Edad", value: "edad" },
        { text: "Raza", value: "raza" },
        { text: "Tipo", value: "tipo" },
        { text: "Fotos", value: "fotos" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      mascotas: [],
      editedIndex: -1,
      editedItem: {
        nombre: "",
        edad: 0,
        raza: "",
        tipo: "",
        fotos: [],
        idForm: "",
        caso: "externo",
        descripcion: ""
      },
      defaultItem: {
        nombre: "",
        edad: 0,
        raza: "",
        tipo: "",
        fotos: [],
        idForm: "",
        caso: "externo",
        descripcion: ""
      },
      indexMascotas: 0,
      selectedFile: null,
      selectedFileSrc: null,
      image: null,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo caso externo" : "Editar caso externo";
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
    this.listarFormularios();
  },

  methods: {
    initialize() {
      this.mascotas = [];
    },

    addFoto() {
      this.dialogCropper = true;
    },

 

    async postFoto() {
      this.loading = true;
      this.dialogCropper = false;
      if (this.editedItem._id != undefined) {
        let res = await axios.post("postFoto", {
          foto: this.image,
          _id: this.editedItem._id,
        });
        this.editedItem.fotos.push(res.data);
      } else {
        this.editedItem.fotos.push(this.image);
      }
      this.selectedFile = null;
      this.selectedFileSrc = null;
      this.image = null;

      if (this.$refs.fileInput) {
        this.$refs.fileInput.reset();
      }
      this.loading = false;
    },

    closeCropper() {
      this.dialogCropper = false;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.reset();
      }
    },

    async removeFoto(foto) {
      this.loading = true;
      if (this.editedItem._id != undefined) {
        let fotoIndex = this.editedItem.fotos.indexOf(foto);
        await axios.post("removeFoto", {
          foto: foto,
          _id: this.editedItem._id,
        });
        this.editedItem.fotos.splice(fotoIndex, 1);
      } else {
        let fotoIndex = this.editedItem.fotos.indexOf(foto);
        this.editedItem.fotos.splice(fotoIndex, 1);
      }
      this.loading = false;
    },

    editItem(item) {
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
        this.idFormularios.forEach((element) => {
          if (this.editedItem.tipo == element.nombre) {
            this.editedItem.idForm = element.id;
          }
        });
        await axios.put("/updateAnimal", {
          _id: this.editedItem._id,
          nombre: this.editedItem.nombre,
          edad: this.editedItem.edad,
          raza: this.editedItem.raza,
          tipo: this.editedItem.tipo,
          idForm: "",
          caso: "externo",
          descripcion: this.editedItem.descripcion,
        });
      } else {
        //Crear mascota
        //this.mascotas.push(this.editedItem)
        await axios.post("/postAnimal", {
          nombre: this.editedItem.nombre,
          edad: this.editedItem.edad,
          raza: this.editedItem.raza,
          tipo: this.editedItem.tipo,
          fotos: this.editedItem.fotos,
          idForm: "",
          caso: "externo",
          descripcion: this.editedItem.descripcion,
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
          let mascotasAux =[]
          me.mascotas.forEach(element => {
            if(element.caso=="externo"){
              mascotasAux.push(element);
            }
          });
          me.mascotas = mascotasAux;
          me.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async listarFormularios() {
      var me = this;
      axios
        .get("/getFormularios")
        .then(function (response) {
          response.data.forEach((element) => {
            me.tiposFormularios.push(element.nombre);
            me.idFormularios.push({ id: element._id, nombre: element.nombre });
          });
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
.carousel {
  max-width: 400px;
}
</style>
