<template>
    <section>
        <Title :datos="datos" />
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg5 xl7 >
                <h1>Usuario: {{solicitud.usuario}}</h1>
                <h1>Mascota: {{solicitud.mascota}}</h1>
                <div v-for="(preguntas,index) in solicitud.preguntas" :key="index">
                    <v-row class="d-flex justify-center">
                        <v-col class="d-flex justify-center">
                            <h3>Pregunta: {{ preguntas.pregunta }} </h3>
                        </v-col>
                        <v-col class="d-flex justify-center">
                            <h3>Respuesta: {{ preguntas.respuesta }}</h3>
                        </v-col>
                    </v-row>
                </div>
                <div>
                    <v-row class="d-flex justify-center">
                        <v-btn>Aceptar solicitud</v-btn>
                        <v-btn>Rechazar solicitud</v-btn>
                    </v-row>
                    
                </div>
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
        this.obtenerFormulario()
        
    },
    methods: {
        async obtenerFormulario(){
            axios.get('/querySolicitud?_id='+this.$route.params.id)
            .then(result => {
                this.solicitud = result.data
            })
        },
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
</style>