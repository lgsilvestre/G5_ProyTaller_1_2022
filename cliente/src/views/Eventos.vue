<template>

  <section :class="this.$vuetify.theme.dark ? '' : 'grey lighten-4'">
    <Title :datos="datos" />
    <v-row no-gutters>
      <v-col cols="12">
        <SectionsHeroAlt :hero-alt="heroAlt" />
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-col
              v-for="item in eventos"
              :key="item"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <v-card max-width="450" height="100%" class="mx-auto" elevation="1">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="item.foto"
                >
                </v-img>
                <v-card-subtitle class="pb-0">
                  <v-btn text small disabled class="px-0"
                    >{{item.fecha}}</v-btn
                  >
                  <v-btn text small disabled class="px-0"
                    >{{item.hora}}</v-btn
                  >
                </v-card-subtitle>
                <v-card-text
                  class="title font-weight-bold mt-3 pb-0 text--primary"
                  style="line-height: 1.8rem"
                >
                  {{item.titulo}}
                </v-card-text>
                
                <v-card-text class="text--primary">
                  {{item.descripcion}}
                </v-card-text>

              </v-card>
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Title from '../components/title.vue'
import axios from "axios";
export default {
  components: { Title },
  data() {
    return {
      eventos: [],
      indexeventos: 0,
      datos: [
        {
          src: 'https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg',
          titulo: ' Eventos ',
        },
      ],
      heroAlt: [
        {
          src: 'pexels-andrea-piacquadio-3884440.jpg',
          heading: ' Blog ',
        },
      ],
      posts: [
        {
          id: '',
          title: 'Hello World',
          postImage: '',
          publishedOn: '',
          lastUpdated: '',
          author: '',
          tags: '',
          category: '',
          excerpt: '',
          content: '',
        },
      ],
    }
  },
  created() {
    this.initialize();
    this.listareventos();
  },
  methods: {
    initialize() {
      this.eventos = [];
    },
    async listareventos() {
      let me = this;
      //this.loading = true;
      axios
        .get("/getEventos")
        .then(function (response) {
          me.eventos = response.data;
          me.indexeventos = me.eventos.length;
          //me.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  head() {
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Infographic hypotheses influencer user experience Long madel ture gen-z paradigm shift client partner network product seilans solve management influencer analytics leverage virality. incubator seed round massmarket. buyer agile development growth hacking business-to-consumer ecosystem',
        },
      ],
    }
  },
}
</script>