<template>
  <section id="hero">
    <v-carousel
      height="calc(100vh - 64px)"
      dark
      cycle
      show-arrows-on-hover
      draggable="true"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(carousel, carindex) in carouselsData"
        :key="carindex"
        :src="carousel.src"
      >
        <v-container fill-height>
          <div style="max-width: 600px">
            <div
              class="text-md-h2 mb-3 text-sm-h3 text-h5 font-weight-black white--text"
            >
              {{ carousel.heading.toUpperCase() }}
            </div>
            <p class="mb-5 white--text">{{ carousel.subHeading }}</p>
            <v-btn :x-large="$vuetify.breakpoint.smAndUp" class="my-3 red darken-3"
              to=/About>Conócenos</v-btn
            >
            <span class="mx-2 my-4"></span>

          </div>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      carouselsData: [
        {
          src: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
          heading: 'Cuando un hombre se apiade de todas las criaturas vivientes, sólo entonces será noble.',
          subHeading:
            '(Buda)',
        },
        {
          src: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          heading: 'Hasta que uno no ha amado a un animal, parte de su alma permanece dormida.',
          subHeading:
            '(France, Anatole)',
        },
        {
          src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
          heading: 'Todos los animales excepto el hombre saben que el máximo de la vida es disfrutarla.',
          subHeading:
            '(Butler, Samuel)',
        },
        {
          src: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          heading: 'Los perros no son toda tu vida, pero hacen tu vida completa.',
          subHeading:
            '(Roger Caras)',
        },
      ],
    }
  },
}
</script>

<style>
.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to right,
    rgba(41, 11, 3, 0.75),
    rgba(5, 11, 31, 0.65)
  );
}
</style>