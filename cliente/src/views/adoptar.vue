<template>
    <div>
        <Title class="separacion" :datos="datos" />
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg5 xl7 >
                <div class="separacion" v-for="(pregunta,index) in formulario.preguntas" :key="index">
                    <p class="alineacion">{{pregunta.pregunta}}</p>
                    <v-row class="d-flex justify-center">
                        <v-container fluid>
                            <v-textarea
                                v-model="respuestas[index]"
                                outlined
                                color="#BD1C2B"
                                :label="'Respuesta '+(index+1)"
                            ></v-textarea>
                        </v-container>
                    </v-row>
                </div>
                <div class="alineacionBotones">
                    <v-btn color="#BD1C2B">
                        <v-icon>
                            mdi-arrow-left
                        </v-icon>
                        Anterior 
                    </v-btn>
                    <v-btn color="#BD1C2B" @click="mostrarRespuestas">
                        siguiente 
                        <v-icon>
                            mdi-arrow-right
                        </v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'
import Title from '../components/Utilidades/Generales/title.vue'
    export default {
        components: { Title },
        data (){
            return{
                id:0,
                animal:{},
                formulario:{},
                respuestas:[],
                datos: [
                    {
                    src: 'https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg',
                    titulo: 'Formulario de adopción'
                    },
                ],
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
                        for (let index = 0; index < this.formulario.preguntas.length; index++) {
                            this.respuestas[index]=''
                        }
                    })
                })
            },
            mostrarRespuestas(){
                console.log(this.respuestas)
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
    font-size: 18px;
}
.alineacionBotones{
    display: grid;
    grid-auto-flow: row;
    justify-content: flex-end;
    column-gap: 10px;
    grid-template-columns: auto auto auto;
    margin-block-end: 20px;
}

</style>