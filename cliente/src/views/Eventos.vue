<template>
  <section :class="this.$vuetify.theme.dark ? '' : 'grey lighten-4'">
    <v-row no-gutters>
      <v-col cols="12">
        <SectionsHeroAlt :hero-alt="heroAlt" />
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="12" xl="10" lg="9" md="8" sm="8" class="py-16">
          <v-row>
            <v-col
              v-for="post in 12"
              :key="post"
              cols="12"
              sm="6"
              md="6"
              lg="4"
              xl="3"
            >
              <v-card max-width="450" class="mx-auto" elevation="1">
                <v-img
                  class="white--text align-end"
                  height="200px"
                  src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                >
                </v-img>
                <v-card-subtitle class="pb-0">
                  <v-btn href="#" text small color="primary" class="px-0"
                    >Admin</v-btn
                  >
                  <v-btn text small disabled class="px-0"
                    >October 13, 2020</v-btn
                  >
                </v-card-subtitle>
                <v-card-text
                  class="title font-weight-bold mt-3 pb-0 text--primary"
                  style="line-height: 1.8rem"
                >
                  Check out the new mansion we got for our eSports team!
                </v-card-text>
                <v-card-text class="text--primary">
                  An online streamer, also known as a live streamer, internet
                  streamer, or streamer, is a person who broadcasts themself
                  online through a live stream or pre-recorded video. The scope
                  of online streamers has grown to includ...
                  <v-btn href="#" small text color="primary">Read More</v-btn>
                </v-card-text>

                <v-card-actions>

                  



                  <v-btn icon color="primary">
                    <v-icon>mdi-share-variant</v-icon> </v-btn
                  >
                  <span class="mr-4"></span>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <div class="text-center">
            <div class="text-center">
              <v-container>
                <v-row justify="center">
                  <v-col cols="8">
                    <v-container class="max-width">
                      <v-pagination
                        v-model="page"
                        circle
                        class="my-4"
                        :length="15"
                      ></v-pagination>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
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
      page: 2,   
    }
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