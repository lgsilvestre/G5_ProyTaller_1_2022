<template>
  <v-app>
    <!-- <navbar class="mb-r"></navbar> -->
    <navbar-2 class="mb-r"></navbar-2>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from './components/footer.vue';
// import navbar from './components/navbar.vue';
import Navbar2 from './components/navbar2.vue';

export default {
  components: { Footer, Navbar2},
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
    margin-bottom: 2.2rem !important;
  }
</style>
