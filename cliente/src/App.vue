<template>
  <v-app>
    <navbar></navbar>
    
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from './components/footer.vue';

import navbar from './components/navbar.vue';

export default {
  components: { navbar, Footer},
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
