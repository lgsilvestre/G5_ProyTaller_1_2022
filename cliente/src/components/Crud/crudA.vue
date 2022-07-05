<template>
  <v-data-table
    :headers="headers"
    :items="listaadmins"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mis administradores</v-toolbar-title>
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
              Nuevo administrador
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
                      v-model="editedItem.nombreCompleto"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.clave"
                      label="Clave"
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
            <v-card-title class="text-h5">¿Estás seguro que deseas borrar esta admin?</v-card-title>
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
        medium
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
        data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Nombre', value: 'nombreCompleto' },
            { text: 'Rol', value: 'rol' },
            { text: 'Email', value: 'email' },
            { text: 'Actions', value: 'actions', sortable: false },
            ],
        admins: [],
        editedIndex: -1,
        editedItem: {
            nombreCompleto: '',
            rol: '',
            email: '',
            clave: ''
        },
        defaultItem: {
            nombreCompleto: '',
            rol: '',
            email: '',
            clave: ''
        },
        indexAdmin: 0
        }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      listaadmins(){
          //this.listarAdmins()

          
          return this.admins
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
      this.listarAdmins()
    },

    methods: {
      initialize () {
          this.admins = []
      },

      editItem (item) {
        console.log(item._id)
        this.editedIndex = this.admins.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true        
      },

      deleteItem (item) {
        this.editedIndex = this.admins.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        //this.admins.splice(this.editedIndex, 1)
        axios.post('/removeUsuario',{'_id': this.admins[this.editedIndex]._id})
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.listarAdmins()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.listarAdmins()
      },

      save () {
        //this.listarAdmins()
        if (this.editedIndex > -1) { //Editar admin
          Object.assign(this.admins[this.editedIndex], this.editedItem)
          axios.put('/updateUsuario',{'_id': this.editedItem._id,'nombreCompleto':this.editedItem.nombreCompleto,'email':this.editedItem.email,'rol':this.editedItem.rol})
        } else { //Crear admin
          //this.admins.push(this.editedItem)
          axios.post('/postUsuario',{'rol':'admin','nombreCompleto':this.editedItem.nombreCompleto,'email':this.editedItem.email,'clave': this.editedItem.clave})
          
        }
        this.close()
      },
      async listarAdmins(){
            
            let me=this
            axios.get('/getUsuarios').then(function (response){
                me.admins = response.data
                me.indexAdmin = me.admins.length
                var soloAdmins = []
                me.admins.forEach(m => {
                    if(m.rol == "admin"){
                        soloAdmins.push(m)
                    }
                me.admins = soloAdmins


                });
            }).catch(function(error){
                console.log(error)
            });
        }
    },
    }
</script>