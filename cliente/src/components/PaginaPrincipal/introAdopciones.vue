<template>
  <section id="intro" class="py-16">
    <v-container>
      <v-responsive class="max-auto mx-auto text-center" max-width="600">
        <v-avatar color="#BD1C2B" size="70" class="mb-8">    
            <v-img
                class="imagen"
                max-height="55"
                max-width="55"
                src="https://imgur.com/3UwmDiJ.png"
            ></v-img>
        </v-avatar>
        <h2 class="text-h4 text-md-h3 text-center font-weight-black mb-7">
          Como adoptar a tu mascota 
        </h2>
        <p class="title font-weight-light">
          A nosotros nos llena el corazón cuando una mascota es adoptada, 
          obtiene un hogar donde ser cuidado y tener todo el amor que se merece. 
          <strong>Recuerda leer la sección de Tenencia responsable antes de adoptar.</strong>
          Con estos sencillos pasos iniciaras tu solicitud de adopción 
        </p>
      </v-responsive>

      <v-row class="pt-12">
        <v-col v-for="card in cards" :key="card.title" cols="12" md="4">
          <v-row no-gutters>
            <v-col :cols="card.callout ? 9 : 12">
              <div class="pr-2">
                <div class="text--disabled" v-text="card.subtitle"></div>
                <h4
                  class="text-uppercase mt-1 mb-4"
                  style="letter-spacing: 0.15em"
                  v-text="card.title"
                ></h4>
                <p v-text="card.text"></p>
              </div>
            </v-col>
            <v-col v-if="card.callout" cols="2">
              <span
                class="text-h3 grey--text font-weight-bold pr-8"
                style="opacity: 0.1"
                >{{ card.callout }}</span
              >
            </v-col>
          </v-row>
        </v-col>
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
          title: 'Iniciar sesión',
          subtitle: 'inicio',
          text: 'Para poder adoptar debes registrarte e iniciar sesión, así nosotros podremos llevar un seguimiento de tu mascota.',
          callout: '01',
        },
        {
          title: 'Sección catalogo',
          subtitle: 'Elegir',
          text: 'En esta sección encontraras todos nuestros mascotas que están esperando un hogar elije la que desees y presiona adoptar.',
          callout: '02',
        },
        {
          title: 'Formularios y contratos',
          subtitle: 'Información',
          text: "Rellena los formularios y lee detalladamente el contrato. Tu solicitud llegara a nosotros y nos pondremos en contacto contigo.",
          callout: '03',
        },
      ],
    }
  },
}
</script>