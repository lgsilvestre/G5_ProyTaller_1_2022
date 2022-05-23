<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl7 >
            <h1 class="separacion">Formulario de adopción de un {{formulario.nombre}}</h1>
            <div class="separacion" v-for="(pregunta,index) in formulario.preguntas" :key="index">
                <p class="alineacion">{{pregunta.pregunta}}</p>
                <v-row class="d-flex justify-center">
                    <v-container fluid>
                        <v-textarea
                            outlined
                            color="#BD1C2B"
                            :label="'Respuesta '+(index+1)"
                        ></v-textarea>
                    </v-container>
                </v-row>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
    export default {
        data (){
            return{
                id:0,
                animal:{},
                formulario:{}
            }
        },
        created (){
            this.id=this.$route.params.id
            this.obtenerMascota()
        },
        methods:{
            async obtenerMascota(){
                axios.get('/queryAnimal?_id='+this.$route.params.id)
                .then(result => {
                    this.animal = result.data
                    axios.get('/queryFormulario?_id='+this.animal.idForm)
                    .then(result2 => {
                        this.formulario = result2.data
                    })
                })
            }
        }
          
    }
    
</script>

<style>
.separacion{
    margin-block-end: 50px;
}
.alineacion{
    text-align: left;
    text-justify: inter-word;
    font-weight: bold;
}

</style>