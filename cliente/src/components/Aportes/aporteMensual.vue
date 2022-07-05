<template>
  
  <section :class="$vuetify.theme.dark ? 'black' : 'white'" class="py-16">
    <edit-socio
        v-if="dialog"
        :item="editedItem"
        :formTitle="formTitle"
        @save="onSave"
        @close="dialog = false"
    ></edit-socio>
    <v-container>
      <v-row>
        <v-col>
          <v-row no-gutters>
            <v-col class="text-center">
              <h2
                class="text-h4 text-md-h3 text-center font-weight-black text-capitalize mb-4"
              >
                Inscripción Aporte Mensual
              </h2>

              <p class="my-10 title">
                Puedes elegir distintos montos de adopción, nosotros nos encargaremos
                 de recordarte la donación mensual a través de distintos medios, todos
                  nuestros compañeros perrunos y gatunos te lo agradecerán 
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row class="mx-auto" style="max-width: 1200px">
        <v-col v-for="(plan, ix) in plans" :key="`plan-${ix}`" cols="12" md="4">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 24 : plan.elevation"
              :color="plan.color"
              max-width="400"
              :class="hover ? 'zoom' : 'notzoom'"
              class="mx-auto transition-swing"
            >
              <h3
                class="text-h4 text-center font-weight-black white--text pt-5"
                v-text="plan.plan"
              ></h3>
              <v-card-text
                class="text-center subtitle-1 white--text py-2"
                v-text="plan.description"
              ></v-card-text>
              <v-card-subtitle
                class="text-h5 font-weight-black text-center white--text pt-0"
                >{{ planDuration === 'monthly' ? plan.monthly : plan.yearly }}
                <span class="subtitle-1"
                  >por {{ planDuration === 'monthly' ? 'mes' : 'year' }}</span
                ></v-card-subtitle
              >
              <v-list>
                <v-list-item
                  v-for="(feature, ik) in plan.features"
                  :key="`feature-${ik}`"
                  dense
                >
                  <v-list-item-icon>
                    <v-img
                      class="imagen"
                      max-height="20"
                      max-width="20"
                      :src= "feature.icon"
                    ></v-img>  
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-capitalize"
                      v-text="feature.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    color="primary"
                    large
                    block
                    rounded
                    class="mx-auto my-3"
                    @click="donacion(plan.monthly)"
                  >
                    Donar
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-card></v-hover
          >
        </v-col>
      </v-row>
    </v-container>
    
  </section>
</template>

<script>
import axios from 'axios';
import editSocio from '../Crud/editSocio.vue';
export default {
  components: { editSocio },
  data() {
    return {
      planDuration: 'monthly',
      dialog: false,
      editedItem: {},
      plans: [
        {
          plan: 'Básico',
          elevation: 0,
          color: '#BD1C2B',
          description: 'Plan básico de donación mensual',
          monthly: '$5.000',
          features: [
            {
              icon: 'https://i.imgur.com/90C5Lo7.png',
              text: 'Recuerdo por vía correo electrónico',
            },
            {
              icon: 'https://i.imgur.com/SdMSvw3.png',
              text: 'Recuerdo por vía whatsapp ',
            },
            {
              icon: 'https://i.imgur.com/IL4Pd9H.png',
              text: 'nos ayudas con el alimento',
            },
          ],
        },
        {
          plan: 'Avanzado',
          elevation: 16,
          color: ' orange darken-3',
          description: 'Plan avanzado de donación mensual ',
          monthly: '$10.000',

          features: [
            {
              icon: 'https://i.imgur.com/90C5Lo7.png',
              text: 'Recuerdo por vía correo electrónico',
            },
            {
              icon: 'https://i.imgur.com/SdMSvw3.png',
              text: 'Recuerdo por vía whatsapp ',
            },
            {
              icon: 'https://i.imgur.com/IL4Pd9H.png',
              text: 'nos ayudas con un set de vacunas',
            },
          ],
        },
        {
          plan: 'Personalizado',
          elevation: 0,
          color: 'green darken-2',
          description: 'Plan personalizado de donación mensual',
          monthly: '$Tu eliges',
          features: [
            {
              icon: 'https://i.imgur.com/90C5Lo7.png',
              text: 'Recuerdo por vía correo electrónico',
            },
            {
              icon: 'https://i.imgur.com/SdMSvw3.png',
              text: 'Recuerdo por vía whatsapp ',
            },
            {
              icon: 'https://i.imgur.com/IL4Pd9H.png',
              text: 'Elige un monto a donar',
            },
          ],
        },
      ],
    }
  },
  computed: {
    formTitle() {
      return this.editedItem._id ? "Editar socio" : "Nuevo socio";
    },
  },
  methods: {
    donacion(monto){
      if(monto!='$Tu eliges'){
        this.editedItem = {monto:monto.slice(1)}
      }
      this.dialog=true
    },
    async onSave(item) {
      if (!item._id) {
        await axios.post("/postSocio", item);
      } else {
        await axios.put("/updateSocio", item);
      }
      return;
    },

  }
}
</script>

<style scoped>
.zoom {
  transform: scale(1.025) translate(0, -10px);
  transition: transform 0.2s;
}
.notzoom {
  transition: transform 0.2s;
}
</style>