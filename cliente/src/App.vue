<template>
  <v-app>
    <navbar class="mb-r"></navbar>
    
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
  created(){
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style>
  .mb-r{
    margin-bottom: 2.5rem !important;
  }
</style>
