<template>
  <v-layout align-center justify-center>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <div v-for="(n,i) in 2" :key="i">
                    <v-stepper-step
                        :complete="e1 > n"
                        :step="n"
                        editable
                    >
                        Paso {{ n }}
                    </v-stepper-step>
                    <v-divider
                        v-if="n !== 2"
                        :key="n"
                    ></v-divider>
                </div>
            </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content
                v-for="n in steps"
                :key="`${n}-content`"
                :step="n"
            >
                
                <div v-if="n==1">
                    <mostrador-formulario :formulario="formulario"></mostrador-formulario>
                    <div class="alineacionBotones">
                        <v-btn text>
                            Cancelar
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="nextStep(n)"
                        >
                            Siguiente
                        </v-btn>
                    </div>
                    
                </div>
                <div v-if="n==2">
                    <p>COMO FUNDACIÓN, TENEMOS EL DERECHO Y OBLIGACIÓN DE PEDIR MATERIAL AUDIOVISUAL (VÍDEOS, FOTOS, ETC) Y REALIZAR VISITAS SIN PREVIO AVISO LAS VECES QUE SE CREA NECESARIO. SI SE CONSIDERA QUE EL PERRO NO ESTÁ EN CONDICIONES ÓPTIMAS, SE PROCEDERÁ A HACER USO DE LA “LEY DE TENENCIA RESPONSABLE” (LEY 21.020). SI EL ADOPTANTE SE RETRACTA DE LA ADOPCIÓN, TENDRÁ QUE SER HOGAR TEMPORAL INDEFINIDAMENTE HASTA QUE SE ENCUENTRE UN NUEVO HOGAR POR SELECCIÓN DE LA FUNDACIÓN Y NO POR TERCEROS</p>
                    <div class="alineacionBotones">
                        <v-btn 
                            @click="nextStep(n)"
                        >
                            Atras
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="mostrarRespuestas()"    
                        >
                            Enviar Solicitud
                        </v-btn>
                    </div>
                </div>
            </v-stepper-content>
        </v-stepper-items>
        </v-stepper>
  </v-layout>
</template>

<script>
import axios from "axios"
import mostradorFormulario from "./mostradorFormulario.vue"
    export default {
        components: {mostradorFormulario },
        data () {
            return {
                e1: 1,
                steps: 2,
                id:0,
                animal:{},
                formulario:{},
            }
        },
        watch: {
            steps (val) {
                if (this.e1 > val) {
                this.e1 = val
                }
            },
        },
        created (){
            this.id=this.$route.params.id
            this.obtenerMascota()
        },
        methods: {
            nextStep (n) {
                if (n === this.steps) {
                this.e1 = 1
                } else {
                this.e1 = n + 1
                }
            },
            async obtenerMascota(){
                axios.get('/queryAnimal?_id='+this.$route.params.id)
                .then(result => {
                    this.animal = result.data
                    axios.get('/queryFormulario?_id='+this.animal.idForm)
                    .then(result2 => {
                        this.formulario = result2.data
                    })
                })
            },
            async mostrarRespuestas(){
                var preguntaRespuesta = []
                this.formulario.preguntas.forEach(elemento => {
                    preguntaRespuesta.push({"pregunta":elemento.pregunta,"respuesta":elemento.respuesta})
                });
                const user = await this.obtenerUsuario()
                const animalPost = {nombre:this.animal.nombre,edad:this.animal.edad,tipo:this.animal.tipo}
                
                await axios.post("/postSolicitud", {
                    preguntas: preguntaRespuesta,
                    mascota: animalPost,
                    usuario: user  
                });
                
            },
            async obtenerUsuario(){
                var loggedIn = localStorage.getItem('token')
                const consulta = await axios.get('/queryTokenID?_id='+loggedIn)
                return consulta.data
            }
        },
    }
</script>


<style>
.alineacionBotones{
    display: grid;
    grid-auto-flow: row;
    justify-content: flex-end;
    column-gap: 10px;
    grid-template-columns: auto auto auto;
    margin-block-end: 20px;
}
</style>