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
        <v-toolbar-title>Solicitudes de adopción</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
        <v-btn
        fab 
        small 
        plain
        :to="{name:'VerSolicitud', params:{id:item._id}}"
        >
        Ver solicitud
            <v-icon>
                mdi-eye
            </v-icon>
        </v-btn>
        
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
        data: () => ({
            newSolicitud: "",
            headers: [
                { text: 'Usuario', value: 'usuario.nombreCompleto'},
                { text: 'Email usuario', value: 'usuario.email'},
                { text: 'Mascota', value: 'mascota.nombre'},
                { text: 'Tipo mascota', value: 'mascota.tipo'},
                { text: 'Edad mascota', value: 'mascota.edad'},
                { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
                ],
            Solicituds: [],
            editedIndex: -1,
        }),
        computed: {
            listaSolicituds(){
                return this.Solicituds
            }
        },
        created () {
            this.listarSolicitudes()
        },

        methods: {
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