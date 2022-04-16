<template>
    <div class="navbar">
      <v-row>
        <v-col cols=3>
          <v-img 
          class="imagen"         
          lazy-src="https://imgur.com/3UwmDiJ.png"         
          max-height="80"         
          max-width="80"         
          src="https://imgur.com/3UwmDiJ.png"         
          ></v-img>
        </v-col>
        <v-col cols=12 md=6 align-self="center">
          <v-row class="items" justify="space-between">
            <router-link to="/home">Home</router-link>
            <router-link to="/adoptame">Adoptame</router-link> 
            <router-link to="/about">Nosotros</router-link> 
            <router-link to="/aportes">Aportes</router-link> 
            <router-link to="/casosActivos">Casos Activos</router-link> 
            <router-link to="/eventos">Eventos</router-link> 
            <router-link v-if="existeUser"  @click.native="salir" to="/login">Salir</router-link>
            <router-link v-if="!existeUser" to="/registro">Registrarse</router-link>
            <router-link v-if="!existeUser" to="/login">Login</router-link>
            <v-img 
            src="@/assets/whatsapplogo.png" 
            max-height="35"         
            max-width="35"
            class="pointer"
            ></v-img>
          </v-row>
          
        </v-col>
      </v-row>
    </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed:{
      existeUser: function() {
        return this.$store.getters.isAuthenticated;
      },
    },
    methods:{
      salir(){
        this.$store.dispatch("salir");
      }
    }

  }
</script>

<style>
.navbar{
  background: #F8F8FF;
}
.pointer{
  cursor: pointer;
  opacity: 0.77;
  transition: 0.3s;
}
.pointer:hover{
  opacity: 1;
}
.items a{
  color: black !important;
  text-decoration: none;
  vertical-align: middle;
  margin-top: 5px;
  transition: 0.3s;
}
.items a:hover{
  color: red !important;
}

.router-link-active{
  text-decoration: underline !important;
  text-underline-offset: 10px;
}
</style>