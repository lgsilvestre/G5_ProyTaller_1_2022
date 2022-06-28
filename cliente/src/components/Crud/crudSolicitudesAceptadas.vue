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
        <v-toolbar-title>Solicitudes de adopción aceptadas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
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
                axios.get('/getSolicitudAceptadas').then(result => {
                    this.Solicituds = result.data
                }).catch(function(error){
                    console.log(error)
                });
            }
        },
    }
</script>