<template>
    <v-layout align-center justify-center>
        <loading
        v-if="loading"
        ></loading>
        <v-flex v-if="!loading" xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar dark color="red darken-3">
                    <v-toolbar-title class="flex text-center">
                        Inicio de sesión
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <!-- <v-icon aria-label="My Account" role="img" aria-hidden="false">
                    mdiAccount
                    </v-icon> -->
                    <v-text-field :prepend-inner-icon="icons.mdiDog" v-model="email" color="accent" label="Usuario" outlined>
                    </v-text-field>
                    <v-text-field 
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                    :prepend-inner-icon="icons.mdiLock" 
                    v-model="password" 
                    color="accent" 
                    label="Contraseña"
                    @click:append="show1 = !show1" 
                    outlined
                    :type="show1 ? 'text' : 'password'"
                    ></v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3 justify-center">
                    <v-btn class="button" @click="ingresar()" dark color="red darken-3">Ingresar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import loading from '../components/loading.vue';
import { mdiAccount,mdiLock,mdiDog } from "@mdi/js";
export default {
  components: { loading },
    data (){
        return{
            email:'',
            show1:false,
            password:'',
            errorM:null,
            loading: false,
            icons:{
                mdiAccount,
                mdiLock,
                mdiDog
            }
           
        }
    },
    methods:{
        async ingresar(){
            this.loading = true
            await axios.post('login',{email: this.email, password: this.password})
            .then(respuesta =>{
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push('/home').catch(() => {});
                this.loading = false
            })
            .catch(error =>{
                //console.log(eror);
                this.errorM=null;
                this.loading = false
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
        }
    }
}
</script>

<style>
.button{
    width: 100%;
}

</style>
 
