<template>
  <v-data-table
    :headers="headers"
    :items="listaSolicituds"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mis Solicituds</v-toolbar-title>
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
            <v-card>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="8"
                        md="10"
                    >
                        <v-text-field
                        v-model="newSolicitud"
                        label="Nombre"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">¿Estás seguro que deseas borrar esta solicitud?</v-card-title>
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
        small 
        plain
        :to="{name:'VerSolicitud', params:{id:item._id}}"
        >
            <v-icon>
                mdi-eye
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
            newSolicitud: "",
            headers: [
                { text: 'Usuario', value: 'usuario'},
                { text: 'Mascota', value: 'mascota'},
                { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
                ],
            Solicituds: [],
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
            listaSolicituds(){
                return this.Solicituds
            }
        },
        created () {
            this.initialize()
            this.listarSolicitudes()
        },

        methods: {
            initialize () {
            },

            deleteItem (item) {
                this.editedIndex = this.Solicituds.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm () {
                axios.post('/removeSolicitud',{'_id': this.Solicituds[this.editedIndex]._id})
                this.closeDelete()
            },

            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                this.listarSolicitudes()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
                this.listarSolicitudes()
            },

            async listarSolicitudes(){
                axios.get('/getSolicitudes').then(result => {
                    this.Solicituds = result.data
                }).catch(function(error){
                    console.log(error)
                });
            }
        },
    }
</script>