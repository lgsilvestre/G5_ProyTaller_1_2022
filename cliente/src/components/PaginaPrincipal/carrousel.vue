<template>
  <section id="hero">
    <v-carousel
      height="calc(100vh - 300px)"
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
        class="gradient-fill"
      >
        <v-container fill-height>
          <div style="max-width: 600px">
            <div
              class="text-md-h3 mb-3 text-sm-h3 text-h5 font-weight-black white--text"
            >
              {{ carousel.heading.toUpperCase() }}
            </div>
            <p class="mb-5 white--text">{{ carousel.subHeading }}</p>

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
          src: 'https://i.imgur.com/DPQaB5D.jpg',
          heading: 'Cuando un hombre se apiade de todas las criaturas vivientes, sólo entonces será noble.',
          subHeading:
            '(Buda)',
        },
        {
          src: 'https://i.imgur.com/2lny3qw.jpg',
          heading: 'Hasta que uno no ha amado a un animal, parte de su alma permanece dormida.',
          subHeading:
            '(France, Anatole)',
        },
        {
          src: 'https://i.imgur.com/PwgW0uQ.jpg0',
          heading: 'Todos los animales excepto el hombre saben que el máximo de la vida es disfrutarla.',
          subHeading:
            '(Butler, Samuel)',
        },
        {
          src: 'https://i.imgur.com/qREXXde.jpg',
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
    rgba(5, 11, 31, 0.4)
  );
}
</style>