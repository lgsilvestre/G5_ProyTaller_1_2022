

<template>
  <v-data-table
    :headers="headers"
    :items="listaMascotas"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mis mascotas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.edad"
                      label="Edad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.raza"
                      label="Raza"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.tipo"
                      label="Tipo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <vue-cropper 
                    :v-show="selectedFile" ref="cropper" :src="selectedFileSrc" 
                    :aspectRatio="16/9" :initialAspectRatio="16/9" :autoCropArea="1"
                    :zoomable="false" preview=".preview"
                    >
                    </vue-cropper>
                    <v-file-input
                      :v-model="selectedFile"
                      accept="image/*"
                      label="File input"
                      @change="setImage"
                      required
                    ></v-file-input>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="red darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Estás seguro que deseas borrar esta mascota?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';
    export default {
        components: { VueCropper},
        data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Nombre', value: 'nombre' },
            { text: 'Edad', value: 'edad' },
            { text: 'Raza', value: 'raza' },
            { text: 'Tipo', value: 'tipo' },
            { text: 'Foto', value: 'foto' },
            { text: 'Actions', value: 'actions', sortable: false },
            ],
        mascotas: [],
        editedIndex: -1,
        editedItem: {
            nombre: '',
            edad: 0,
            raza: '',
            tipo: '',
            foto: '',
        },
        defaultItem: {
            nombre: '',
            edad: 0,
            raza: '',
            tipo: '',
            foto: '',
        },
        indexMascotas: 0,
        selectedFile: null,
        selectedFileSrc: null,
        }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      listaMascotas(){
          //this.listarMascotas()

          
          return this.mascotas
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
      this.listarMascotas()
    },

    methods: {
      initialize () {
          this.mascotas = []
      },

      editItem (item) {
        console.log(item._id)
        this.editedIndex = this.mascotas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true        
      },

      deleteItem (item) {
        this.editedIndex = this.mascotas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //this.mascotas.splice(this.editedIndex, 1)
        axios.post('/removeAnimal',{'_id': this.mascotas[this.editedIndex]._id})
        this.closeDelete()
      },

      close () {
        this.listarMascotas()
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.listarMascotas()
      },

      save () {
        //this.listarMascotas()
        this.$refs.cropper.getCroppedCanvas()
          .toBlob(blob => {
            // send blob as json to server
            blobToBase64(blob)
              .then(blob=>{
                  if (this.editedIndex > -1) { //Editar mascota
                    Object.assign(this.mascotas[this.editedIndex], this.editedItem)
                    axios.put('/updateAnimal',{'_id': this.editedItem._id,'nombre':this.editedItem.nombre,'edad':this.editedItem.edad,'raza':this.editedItem.raza, 'tipo':this.editedItem.tipo, 'foto':blob})
                  } else { //Crear mascota
                    //this.mascotas.push(this.editedItem)
                    axios.post('/postAnimal',{'nombre':this.editedItem.nombre,'edad':this.editedItem.edad,'raza':this.editedItem.raza, 'tipo':this.editedItem.tipo, 'foto':blob})
                  }
                  this.close()
              })
          })
        
      },
      async listarMascotas(){
            
            let me=this
            axios.get('/getAnimals').then(function (response){
                me.mascotas = response.data
                me.indexMascotas = me.mascotas.length
            }).catch(function(error){
                console.log(error)
            });
        },
        setImage(e) {
          const file = e
          if (!file){
            this.selectedFileSrc = null;
            this.$refs.cropper.replace(null);
            return;
          } 
          if (file.type.indexOf('image/') === -1) {
            alert('Please select an image file');
            return;
          }
          if (typeof FileReader === 'function') {
            const reader = new FileReader();
            reader.onload = (event) => {
              this.selectedFileSrc = event.target.result;
              // rebuild cropperjs with the updated source
              this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
          } else {
            alert('Sorry, FileReader API not supported');
          }
    },
    },
    }

const blobToBase64 = blob => {
  const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result);
  };
});
};
</script>

