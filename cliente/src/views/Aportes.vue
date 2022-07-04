<template>
  <section>
    <Title :datos="datos" />
    <v-row no-gutters>
      <v-col cols="12">
        <v-container class="py-16">
          <v-card class="mx-auto" max-width="544">
            <v-card-text>
              <p class="text-h4 text--primary">Datos bancarios</p>
              <div class="text-h6 text--primary">
                <br />
                Cuenta Rut - Banco Estado <br />
                19.503.538-5 <br />
                Maria Jose Castro <br />
                adogtame.curico2015@gmail.com <br />
                Asunto: Nombre + Apellido <br /><br />
              </div>
               <v-img
             
                height="100"
                src="https://i.imgur.com/DZaobyH.png"
              ></v-img>
            </v-card-text>
          </v-card>
          <h2
            class="text-h4 text-md-h3 text-center font-weight-black text-capitalize"
          >
            <br />
            ¿en que se invierte tu dinero?
          </h2>
          <p class="text-h6 text-uppercase font-weight-light text-center my-16">
            Podrás encontrar en las distintas cosas que se invierte tu dinero
            donado
          </p>
          <v-row>
            <v-col
              v-for="(card, index) in cards"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              xl="2"
              class="text-center"
            >
              <v-avatar size="80" class="mb-5" color="#BD1C2B">
                <v-img
                  class="imagen"
                  max-height="55"
                  max-width="55"
                  align-items="center"
                  :src="card.icon"
                ></v-img>
              </v-avatar>
              <div
                class="title text-uppercase mt-1 mb-4"
                v-text="card.title"
              ></div>
              <p v-text="card.text"></p>
              <v-row no-gutters>
                <v-col cols="12"> </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <aporte-mensual></aporte-mensual>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import aporteMensual from "../components/Aportes/aporteMensual.vue";
import Title from "../components/Utilidades/Generales/title.vue";
export default {
  components: { aporteMensual, Title },
  data() {
    return {
      datos: [
        {
          src: "https://images.unsplash.com/photo-1444212477490-ca407925329e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228",
          titulo: " Aportes ",
        },
      ],
      heroAlt: [
        {
          src: "pexels-ekaterina-bolovtsova-4048767.jpg",
          heading: " Services ",
        },
      ],
      cards: [
        {
          title: "Vacunas",
          text: "Con el dinero donado nos encargamos de que cada mascota que será adoptada reciba sus vacunas.",
          icon: "https://i.imgur.com/IQ6Qj8k.png",
        },
        {
          title: "Alimento",
          text: "Nos preocupamos de que cada mascota se alimente de manera correcta para su desarrollo.",
          icon: "https://i.imgur.com/kptWcHE.png",
        },
        {
          title: "Veterinario",
          text: "Nos preocupamos de todos los gastos médicos que tenga la mascota.",
          icon: "https://i.imgur.com/B1CK1os.png",
        },
        {
          title: "Diversion",
          text: "La diversión de los pequeños es importante para nosotros como juguetes o golosinas.",
          icon: "https://i.imgur.com/n3WJzh8.png",
        },
        {
          title: "Cuidados",
          text: "Cuidados como pelaje y según raza de cada uno requiere cuidados distintos.",
          icon: "https://i.imgur.com/827ygzI.png",
        },
        {
          title: "Transporte",
          text: "Nos preocupamos de que cada mascota sea transportada a un lugar seguro.",
          icon: "https://i.imgur.com/4iQ2Myp.png",
        },
      ],
    };
  },
  head() {
    return {
      title: "Services",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Infographic hypotheses influencer user experience Long madel ture gen-z paradigm shift client partner network product seilans solve management influencer analytics leverage virality. incubator seed round massmarket. buyer agile development growth hacking business-to-consumer ecosystem",
        },
      ],
    };
  },
};
</script>
