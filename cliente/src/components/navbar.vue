<template>
    <div class="imagen">
        <v-img 
        class="imagen"
        lazy-src="https://imgur.com/3UwmDiJ.png"
        max-height="80"
        max-width="80"
        src="https://imgur.com/3UwmDiJ.png"
        ></v-img>
        <v-tabs
            v-model="tab"
            color="black"
            centered
            slider-color="black"
            icons-and-text
        >
        <v-tab href="#tab-2">
        Adopta
        </v-tab>
        <v-tab href="#tab-3">
        Nosotros
        </v-tab>
        <v-tab href="#tab-4">
        Aportes
        </v-tab>
        <v-tab href="#tab-5">
        Casos Activos
        </v-tab>
        <v-tab href="#tab-6">
        Eventos
        </v-tab>
        
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="i in 5"
                :key="i"
                :value="'tab-' + i"
            >
        </v-tab-item>
    </v-tabs-items>
    </div>
    
  
  
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
      }
    },
  }
</script>

<style>
.imagen{
    display: flex;
    align-items: initial;
    justify-content: initial;
}
</style>