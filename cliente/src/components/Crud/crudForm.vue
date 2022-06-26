<template>
  <v-data-table
    :headers="headers"
    :items="listaFormularios"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mis formularios</v-toolbar-title>
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
                @click="dialogCrear=true"
                >
                Nuevo Formulario
                </v-btn>
             </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Nuevo formulario</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="8"
                        md="10"
                    >
                        <v-text-field
                        v-model="newFormulario"
                        label="Nombre"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog=false, newFormulario = ''"
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
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">¿Estás seguro que deseas borrar este formulario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="grey" text @click="closeDelete">Cancelar</v-btn>
              <v-btn class="ma-1" color="error" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-btn
        fab 
        medium 
        plain
        :to="{name:'EditorFormulario', params:{id:item._id}}"
        >
            <v-icon>
                mdi-pencil
            </v-icon>
        </v-btn>
        <v-btn
        fab 
        small 
        plain
        @click="deleteItem(item)"
        >
            <v-icon>
                mdi-delete
            </v-icon>
        </v-btn>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            newFormulario: "",
            headers: [
                { text: 'Tipo Formulario', value: 'nombre' },
                { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
                ],
            formularios: [],
            editedIndex: -1,
        }),

        watch: {
            dialog(val) {
                val || this.close();
            },
            dialogDelete(val) {
                val || this.closeDelete();
            },
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            listaFormularios(){
                return this.formularios
            }
        },
        created () {
            this.initialize()
            this.listarFormularios()
        },

        methods: {
            initialize () {
                this.admins = []
            },

            deleteItem (item) {
                this.editedIndex = this.formularios.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                axios.post('/removeFormulario',{'_id': this.formularios[this.editedIndex]._id})
                this.closeDelete()
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                this.listarFormularios()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
                this.listarFormularios()
            },

            save () {
                axios.post('/postFormulario',{'nombre':this.newFormulario}).then( async result1 => {
                    await axios.get('/queryFormularioNombre',{params:{nombre: this.newFormulario}}).then(result => {
                        this.$router.push({name:'EditorFormulario', params:{id:result.data}})
                    }).catch(function(error){
                        console.log(error)
                    }); 
                    return result1
                })
                this.close()
            },
            async listarFormularios(){
                axios.get('/getFormularios').then(result => {
                    this.formularios = result.data;
                }).catch(function(error){
                    console.log(error)
                });
            }
        },
    }
</script>