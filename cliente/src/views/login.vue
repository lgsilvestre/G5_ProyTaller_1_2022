<template>
    <v-layout align-center justify-center>
        <loading
        v-if="loading"
        ></loading>
        <v-flex  v-if="!loading" xs12 sm8 md6 lg5 xl3 >
            <v-card class="mx-auto pa-10 ma-10 backgroundImage">
                <v-toolbar dark color="red lighten-2">
                    <v-toolbar-title color="black" class="flex text-center">
                        Inicio de sesión
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field class="text-field-style" prepend-inner-icon="mdi-dog" v-model="email" color="red lighten-2" label="Usuario" outlined>
                    </v-text-field>
                    <v-text-field 
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                    prepend-inner-icon="mdi-lock" 
                    v-model="password" 
                    color="red lighten-2" 
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
                    <v-btn class="button" @click="ingresar()" dark color="red lighten-2">Ingresar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
import loading from '../components/loading.vue';
export default {
  components: { loading },
    data (){
        return{
            email:'',
            show1:false,
            password:'',
            errorM:null,
            loading: false,
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
.backgroundImage{
    background-image: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://i.imgur.com/1FFnAXe.png");
    background-size: 100% 100%;
    width: 100%;
    height: 400px;
}
.text-field-style >>> .v-text-field__slot input {
    color: red
}

.button{
    width: 100%;
}

</style>
 
