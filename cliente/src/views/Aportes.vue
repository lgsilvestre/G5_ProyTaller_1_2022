<template id="aportes">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card style="margin-top: 20px" >
        <v-img
          src="https://2.bp.blogspot.com/-DqHwkD4_FQ8/T4ycFeIr0PI/AAAAAAAAIw8/NeoSIEdYcDs/s1600/PAISAJES+CON+PERROS+(2).jpg"
          height="400px"
        >
        <div div class="text-xs-center"  >
            
            <h1 class="red white--text" >Donaciones
      
            </h1>    
            
            <p class="white--text">Cuenta Rut - Banco estado 
            </p>
            <p class="white--text">19.503.538-5
            </p>
            <p class="white--text">Maria Jose Castro
            </p>
            <p class="white--text">adogtame.curico2015@gmail.com
            </p>
            <p class="white--text">Asunto: Nombre + Apellido
            </p>

          </div>
        
        </v-img>

        
      </v-card>
    </v-flex>


    <v-card
    class="mx-auto"
    max-width="344"
    style="margin-top: 100px; margin-bottom: 20px"
    >
    <v-card-text >
      <div>Word of the Day</div>
      <p class="text-h4 text--primary">
        el·ee·mos·y·nar·y
      </p>
      <p>adjective</p>
      <div class="text--primary">
        relating to or dependent on charity; charitable.<br>
        "an eleemosynary educational institution."
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="reveal = true"
      >
        Learn More
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Origin
          </p>
          <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
  </v-layout>  

</template>

<style>
#aportes{
background:url("https://www.pngall.com/wp-content/uploads/10/Cute-Pet-PNG-Images.png");
width:100%;			    /* El tamaño se establece en 100% */                     
height:100%;			/* El tamaño se establece en 100% */
position:sticky;
background-size:100% 100%;}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>

<script>
  export default {
    data: () => ({
      reveal: false,
    }),
  }
</script>