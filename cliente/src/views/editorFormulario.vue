<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl7 >
            <h1 >Editor {{formulario.nombre}}</h1>
            <div v-for="(pregunta,index) in formulario.preguntas" :key="index">
                <v-row>
                    <v-col class="d-flex justify-center">
                        <v-textarea filled :label="'Pregunta '+(index+1)" auto-grow v-model="pregunta.pregunta" :value="pregunta.pregunta"></v-textarea>
                        <v-btn 
                        fab 
                        small 
                        plain
                        @click="dialogDelete=true , preguntaEliminada=pregunta"
                        >
                            <v-icon>
                                mdi-delete
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                
            </div>
            <div>
                <v-btn :disabled="!botonActivado" color="red" @click="cambios()">Guardar cambios</v-btn>
                <v-btn color="red" @click="agregarPregunta()">Agregar Pregunta</v-btn>
            </div>
            
        </v-flex>
        <v-snackbar :vertical="vertical" v-model="snackbar" timeout="5000" top>
            <span>¡{{ snackbarText }}!</span>
            <template v-slot:action="{ attrs }">
                <v-btn
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                cerrar
                </v-btn>
            </template>
        </v-snackbar>
        <v-dialog 
            v-model="dialogDelete" 
            max-width="600px" 
            :retain-focus="false"
            hide-overlay
            >
                <v-card>
                    <v-card-title class="text-h5">¿Estás seguro que deseas borrar esta pregunta?</v-card-title>
                    <v-card-text>Pregunta: {{preguntaEliminada.pregunta}}</v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-1" color="" text @click="dialogDelete=false">Cancelar</v-btn>
                    <v-btn class="ma-1" color="error" text @click="eliminarPregunta(preguntaEliminada)">Eliminar</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog> 
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data (){
        return{
            formulario: {},
            snackbar: false,
            snackbarText: '',
            dialogDelete: false,
            preguntaEliminada: '',
            botonActivado: false,
            vertical: true,
        }
    },
    
    created() {
        axios.get('/queryFormulario?_id='+this.$route.params.id)
        .then(result => {
            this.formulario = result.data
        })
    },
    methods: {
        cambios(){
            var noExisteVacio = true
            this.formulario.preguntas.forEach(element => {
                if(element.pregunta.length<=3){
                    noExisteVacio = false
                    this.snackbarText = "Queda una o más preguntas por rellenar, recuerde que la pregunta debe tener un largo minimo de 3 caracteres"
                    this.snackbar=true
                }    
            });
            if(noExisteVacio){
                axios.put('/updateFormulario',{_id:this.formulario._id,nombre:this.formulario.nombre,preguntas:this.formulario.preguntas}).then(result=> {
                    this.snackbarText = "Cambios ingresados con éxito"
                    this.snackbar = true
                    return result
                })
            }
            
        },
        agregarPregunta(){
            var nuevaPregunta = {pregunta:'',respuesta:''}
            this.formulario.preguntas.push(nuevaPregunta)
            this.botonActivado = true
        },
        eliminarPregunta(pregunta){
            this.dialogDelete=false
            if(this.preguntaEliminada.pregunta.length!=0){
                this.formulario.preguntas = this.formulario.preguntas.filter((item) => item !== pregunta);
                axios.put('/updateFormulario',{_id:this.formulario._id,nombre:this.formulario.nombre,preguntas:this.formulario.preguntas}).then(result=> {
                    this.snackbarText = "Pregunta eliminada con éxito"
                    this.snackbar = true
                    return result
                })
            }
            else{
                this.formulario.preguntas = this.formulario.preguntas.filter((item) => item !== pregunta);    
            }
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