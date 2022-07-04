<template>
    <v-layout align-center justify-center>
        <loading
        v-if="loading"
        ></loading>
        <v-flex  v-if="!loading" xs12 sm8 md6 lg4 xl3 >
            <v-card height="100%" class="mx-auto pa-10 ma-10 backgroundImage">
                <v-toolbar class="mb-8" dark color="red lighten-2">
                    <v-toolbar-title color="black" class="flex text-center">
                        Recuperar contraseña
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>

                    <v-text-field :disabled="codeCreated" class="text-field-style" prepend-inner-icon="mdi-dog" v-model="email" color="red lighten-2" label="Email para recuperar" outlined>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
										<v-text-field :disabled="codeSuccess" v-if="codeCreated" class="text-field-style" prepend-inner-icon="mdi-counter" v-model="code" color="red lighten-2" label="Codigo recibido" outlined>
                    </v-text-field>
										<v-flex class="green--text" v-if="codeCreated && !codeSuccess">
                        Ingrese el codigo enviado a su correo electronico
                    </v-flex>
										<v-text-field v-if="codeSuccess" class="text-field-style" prepend-inner-icon="mdi-dog" v-model="p1" color="red lighten-2" label="Ingrese su nueva contraseña" outlined>
                    </v-text-field>
										<v-text-field v-if="codeSuccess" class="text-field-style" prepend-inner-icon="mdi-dog" v-model="p2" color="red lighten-2" label="Ingrese la contraseña nuevamente" outlined>
                    </v-text-field>
										<v-flex class="red--text" v-if="noCoinciden">
                        {{noCoinciden}}
                    </v-flex>


                </v-card-text>
                <v-card-actions class="px-3 pb-3 justify-center">
                    <v-btn class="button" @click="ingresar()" dark color="red lighten-2">Ingresar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import loading from '../components/Utilidades/Generales/loading.vue';
export default {
  components: { loading },
    data (){
        return{
            email:'',
            errorM:null,
            loading: false,
						code:'',
						codeCreated:false,
						codeSuccess:false,
						codeError:false,
						p1:'',
						p2:'',
						noCoinciden:'',
        }
    },
    methods:{
        async ingresar(){
            this.loading = true
						if (this.codeSuccess){
							if(this.p1 != this.p2){
								this.noCoinciden = "Las contraseñas no coinciden"
								this.loading = false
							}else if(this.p1.length < 8){
								this.noCoinciden = "La contraseña debe tener al menos 8 caracteres"
								this.loading = false
							}else{
								await axios.post("cambiarContrasena",{code:this.code,password:this.p1})
								.then(res => {return res.data})
								.then(data =>{
									if(data){
										this.loading = false
										this.$router.push('/login')
									}else{
										this.errorM = "Error al cambiar contraseña"
										this.loading = false
									}
								})
							}
							return
						}

						if(this.codeCreated){
							await axios.post("compararCodigo",{ code:this.code })
								.then(res => {return res.data})
								.then(data => {
									console.log(data)
									if (data){
										this.codeSuccess = true
										this.codeError = false
									}else{
										this.coreError = true
									}
									this.loading = false
								})
								return
						}

            await axios.post('recuperarContrasena',{email: this.email})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(created =>{
							if(created){
								this.codeCreated = true;
							}else{
								this.errorM='Este no es un mail correcto';
							}
							this.loading = false
							this.errorM=null;
            })
            .catch(() =>{
							//console.log(eror);
							this.errorM=null;
							this.loading = false
							this.errorM='Este no es un mail correcto.';
            });
        }
    }
}
</script>

<style>
.backgroundImage{
    background-size: 100% 100%;
    width: 100%;
    height: 470px;
}
.text-field-style >>> .v-text-field__slot input {
    color: red
}

.button{
    width: 100%;
}

a:link {
  color: rgb(255, 124, 124);
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: rgb(255, 124, 124);
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: red;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: rgb(0, 0, 0);
  background-color: transparent;
  text-decoration: underline;
}

</style>
 
