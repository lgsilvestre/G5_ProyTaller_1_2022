<template>
  <v-container fluid>
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
                        <v-btn :to="{name:'Home'}" text>
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
                            @click="dialogoEnviar=true"    
                        >
                            Enviar Solicitud
                        </v-btn>
                    </div>
                </div>
            </v-stepper-content>
        </v-stepper-items>
        </v-stepper>
        <!-- Dialogo de confirmación -->
        <v-dialog v-model="dialogoEnviar" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">¿Estás seguro que deseas enviar esta solicitud de adopción?</v-card-title>
            <v-card-text>
                <div class="text--primary">
                    Aún puede modificar las respuestas, 
                    si desea hacer esto pulse cancelar y será enviado de vuelta a las preguntas. 
                    Por el contrario, si pulsa enviar y no relleno los campos con los requisitios correspondientes, 
                    será enviado de vuelta a las preguntas igualmente
                </div>
                
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" color="grey" text @click="dialogoEnviar=false,nextStep(2)">Cancelar</v-btn>
              <v-btn class="ma-1" color="red" text  @click="enviarRespuestas">Enviar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Snackbar de error o de envío exitoso -->
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
  </v-container>
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
                dialogoEnviar: false,
                snackbar: false,
                snackbarText: "",
                contadorVacias: 0,
                contadorIncompletas:0,
                vertical: true,
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
            async enviarRespuestas(){
                if(this.comprobarRespuestas()){
                    var preguntaRespuesta = []
                    this.formulario.preguntas.forEach(elemento => {
                        preguntaRespuesta.push({"pregunta":elemento.pregunta,"respuesta":elemento.respuesta})
                    });
                    const user = await this.obtenerUsuario()
                    const animalPost = {nombre:this.animal.nombre,edad:this.animal.edad,tipo:this.animal.tipo, id: this.animal._id}
                    
                    await axios.post("/postSolicitud", {
                        preguntas: preguntaRespuesta,
                        mascota: animalPost,
                        usuario: user  
                    });
                    this.dialogoEnviar = false
                    this.snackbarText = "Formulario enviado con éxito"
                    this.snackbar = true
                    this.$router.push('/home');
                }
                else {
                    this.dialogoEnviar = false
                    this.snackbar = true
                    
                    if(this.contadorVacias > 0 && this.contadorIncompletas == 0){
                        
                        if(this.contadorVacias === 1){
                            this.snackbarText = "Una respuesta está vacía"
                        }
                        else{
                            this.snackbarText = "Hay "+ this.contadorVacias + " respuestas que están vacías"
                        }
                    }
                    else if(this.contadorVacias > 0 && this.contadorIncompletas > 0){
                        this.snackbarText = 'Hay '+this.contadorVacias+' respuestas vacias y ' + this.contadorIncompletas + ' respuestas incompletas'
                    }
                    else{
                        this.snackbarText = "Hay "+this.contadorIncompletas +" respuestas que no contienen el mínimo de caracteres requeridos"    
                    }
                    this.contadorVacias = 0
                    this.contadorIncompletas = 0
                    this.nextStep(2)
                }
            },
            async obtenerUsuario(){
                var loggedIn = localStorage.getItem('token')
                const consulta = await axios.get('/queryTokenID?_id='+loggedIn)
                return consulta.data
            },
            comprobarRespuestas(){
                var comprobador = true
                this.formulario.preguntas.forEach(elemento => {
                    if(elemento.respuesta.length == 0){
                        this.contadorVacias = this.contadorVacias+1
                        comprobador = false
                    }
                    else if(elemento.respuesta.length < 9){
                        this.contadorIncompletas = this.contadorIncompletas+1
                        comprobador = false
                    }
                });
                return comprobador
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