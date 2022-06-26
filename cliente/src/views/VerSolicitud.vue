<template>
    <section>
        <Title :datos="datos" />
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg5 xl7 >
                <h1>Usuario: {{usuarioAdoptante.nombreCompleto}}</h1>
                <h1>Email: {{usuarioAdoptante.email}}</h1>
                <h1>Mascota: {{mascota.nombre}}</h1>
                <div v-for="(pregunta,index) in solicitud.preguntas" :key="index">
                    <p class="alineacion">{{pregunta.pregunta}}</p>
                    <v-row class="d-flex justify-center">
                        <v-container fluid>
                            <v-textarea
                                class="form-control no-gray"
                                v-model="pregunta.respuesta"
                                outlined
                                color= "grey"
                                :readonly="true"
                            ></v-textarea>
                        </v-container>
                    </v-row>
                </div >
                <div class="d-flex justify-center separacion">
                    <v-btn @click="aceptarSolicitud">Aceptar solicitud</v-btn>
                    <v-btn @click="preguntaBorrar">Rechazar solicitud</v-btn>
                </div>
                <v-dialog v-model="dialogDelete" max-width="600px">
                    <v-card>
                        <v-card-title class="text-h5">¿Estás seguro que deseas borrar esta solicitud?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="ma-1" color="grey" text @click="closeDelete">Cancelar</v-btn>
                            <v-btn class="ma-1" color="error" text @click="borrarSolicitud">Rechazar</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                
            </v-flex>
            
        </v-layout>
        
    </section>
    
</template>

<script>
import axios from 'axios'
import Title from "../components/Utilidades/Generales/title.vue";
export default {
    components: { Title },
    data (){
        return{
            solicitud: {},
            usuarioAdoptante: {},
            mascota: {},
            snackbar: false,
            snackbarText: '',
            dialogDelete: false,
            preguntaEliminada: '',
            botonActivado: false,
            vertical: true,
            datos: [
                {
                    src: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
                    titulo: " Solicitud de adopcion ",
                },
            ],
        }
    },
    
    created() {
        this.obtenerSolicitud()
        
    },
    methods: {
        async obtenerSolicitud(){
            axios.get('/querySolicitud?_id='+this.$route.params.id)
            .then(result => {
                this.solicitud = result.data
                axios.get('/queryUsuario?_id='+this.solicitud.usuario.id).then(result2 => {
                    this.usuarioAdoptante = result2.data
                    axios.get('/queryAnimal?_id='+this.solicitud.mascota.id).then(result3 => {
                        this.mascota = result3.data
                    })
                })
            })
            
        },
        async borrarSolicitud(){
            axios.post('/removeSolicitud',{'_id': this.solicitud._id})
            this.$router.push('/crud?opcion=solicitudes')
            this.$router.go()
        },
        async borrarSolicitudAceptada(){
            axios.post('/removeSolicitud',{'_id': this.solicitud._id})
            this.$router.push('/crud?opcion=solicitudesAceptadas')
            //this.$router.go()
        },
        preguntaBorrar(){
            this.dialogDelete=true
        },
        closeDelete(){
            this.dialogDelete=false
        },
        async aceptarSolicitud(){
            axios.post('/postSolicitudAceptada',{preguntas: this.solicitud.preguntas, mascota:this.mascota, usuario:this.usuarioAdoptante}).then(
                this.borrarSolicitudAceptada()
            );
        }
    }
    
}
</script>

<style>
.size{
    display: flex;
    width: 300px;
}
.size2{
    display: flex;
}
.p{
    margin: 0 !important;
    padding: 0 !important;
}
.separacion{
    display: grid;
    grid-auto-flow: row;
    justify-content: flex-end;
    column-gap: 10px;
    grid-template-columns: auto auto auto;
    margin-block-end: 30px;
}
.alineacion{
    text-align: left;
    text-justify: inter-word;
    font-weight: bold;
    font-size: 18px;
}
</style>