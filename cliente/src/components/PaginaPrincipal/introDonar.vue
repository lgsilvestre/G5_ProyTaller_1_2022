<template>
  <section class="red darken-3 white--text py-16">
    <v-container>
      <v-row>
        <v-col class="text-center">
          <h2 class="text-h4 text-md-h3 text-center font-weight-black">
            Otra forma de aportar 
          </h2>
          <div
            class="text-h5 text-md-h4 text-center font-weight-black py-3 mb-10"
          >
            Aquí encontraras otras 2 formas de ayudar
          </div>
        </v-col>
      </v-row>
      <v-row align="center"
      justify="center">
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          sm="4"
          class="text-center"
        >
          <v-avatar
            size="80"
            class="display-1 white font-weight-bold black--text mb-5"
            style="opacity: 1.15"
            >{{ card.callout }}</v-avatar>
          <div class="title text-uppercase mt-1 mb-4" v-text="card.title"></div>

          <p v-text="card.text"></p>
          <v-row no-gutters>
            <v-col cols="12"> </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-btn x-large rounded color="white black--text mx-auto mt-10 px-16" to=/aportes>
          <v-icon dark left> mdi-check-bold </v-icon>Donar Ahora
        </v-btn>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: 'Aporte voluntario',
          subtitle: 'Best Productivity',
          text: 'En la sección donar se encuentra nuestros datos para realizar una transferencia Bancaria recuerda que puedes donar la cantidad que tu desees, Para ayudar a cuidar de ellos que lo necesitan. ',
          callout: '1',
        },
        {
          title: 'Unete a nosotros',
          subtitle: 'Special Offers',
          text: 'Háblanos por nuestras redes sociales que se encuentran en la parte inferior de la página y cuéntanos tus intenciones para unirte a nuestra comunidad Adogtame.',
          callout: '2',
        },
      ],
    }
  },
}
</script>