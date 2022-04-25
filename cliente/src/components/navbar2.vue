<template>
    <div>
        <v-navigation-drawer v-model="drawer" fixed app temporary>
            <v-list dense>
                <v-list-item-group v-for="(item, i) in existeUser" :key="i" color="primary">
                    <v-list-item @click="filtroMethod(item)" :to="item.to">
                        <v-list-item-action>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title.toUpperCase()" />
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

    <v-app-bar fixed app hide-on-scroll height="64" elevate-on-scroll>
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
        <v-img 
            class="imagen"         
            max-height="55"         
            max-width="55"         
            src="https://imgur.com/3UwmDiJ.png"         
        ></v-img>
        <v-spacer />

        <template v-for="(name, menuitem) in existeUser">
            <v-btn
            :key="menuitem"
            tile
            plain
            class="py-8 hidden-sm-and-down"
            :to="name.to"
            @click="filtroMethod(name) "
            >
            {{ name.title }}
            </v-btn>
            
        </template>
        <v-spacer />
        <v-btn icon @click="changeThemeColor">
            <v-icon>{{
                $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
            }}</v-icon>
        </v-btn>
    </v-app-bar>
</div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-folder-home-outline',
          title: 'Home',
          to: '/home',
        },
        {
          icon: 'mdi-cash-usd',
          title: 'Adoptame',
          to: '/adoptame',
        },
        {
          icon: 'mdi-account',
          title: 'Nosotros',
          to: '/about',
        },
        {
          icon: 'mdi-folder-image',
          title: 'Aportes',
          to: '/aportes',
        },
        {
          icon: 'mdi-contacts',
          title: 'Casos Activos',
          to: '/casosActivos',
        },
        {
          icon: 'mdi-blogger',
          title: 'Eventos',
          to: '/eventos',
        },
        {
            icon: '',
            title: 'Crud Mascotas',
            to: '/crudMascotas',
            requieredAuth: true,
        },
        {
            icon: '',
            title: 'Salir',
            to: '/login',
            requieredAuth: true,
        },
        {
            icon:'',
            title: 'Login',
            to: '/login',
            requieredAuth: false,
        }
      ],
    }
  },
  computed:{
    existeUser (){
      let routes = this.items
      let privatedRoutes
      if(this.$store.getters.isAuthenticated){
          privatedRoutes = this.items.filter(items => items.requieredAuth == false);
          routes = routes.filter(function(item) {
              return !privatedRoutes.includes(item); 
          })
      }
      else{
          privatedRoutes = this.items.filter(items => items.requieredAuth == true);
          routes = routes.filter(function(item) {
              return !privatedRoutes.includes(item); 
          })
      }
      return routes;    
    }
  },
  methods: {
    changeThemeColor() {
      if (this.$vuetify.theme.dark === true) {
        this.$vuetify.theme.dark = false
      } else {
        this.$vuetify.theme.dark = true
      }
    },
    filtroMethod(menuitem){
      if(menuitem.title === 'Salir'){
        this.$store.dispatch("salir");
      }
    },
  },
}
</script>

<style>
.pointer{
  cursor: pointer;
  opacity: 0.77;
  transition: 0.3s;
  margin-left: 20px;
}
.pointer:hover{
  opacity: 1;
}

</style>