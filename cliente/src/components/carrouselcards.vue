<template>
  <div>
    <v-flex>
      <v-carousel>
        <template v-for="(item, index) in items">
          <v-carousel-item
            v-if="(index + 1) % columns === 1 || columns === 1"
            :key="index"
          >
            <v-row class="flex-nowrap" style="height: 100%">
              <template v-for="(n, i) in columns">
                <template v-if="+index + i < items.length">
                  <v-col :key="i">
                    <v-row class="fill-height" align="center" justify="center">
                      <!-- <div class="display-3">{{+index + i }}</div> -->
                      <catalog-item :item="items[+index + i]"></catalog-item>
                    </v-row>
                  </v-col>
                </template>
              </template>
            </v-row>
          </v-carousel-item>
        </template>
      </v-carousel>
    </v-flex>
  </div>
</template>

<script>
import CatalogItem from "../components/catalogItem.vue";
import axios from "axios";
export default {
  name: "Catalog",
  components: {
    CatalogItem,
  },

  data() {
    return {
      items: [],
    };
  },
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.xl) {
        return 4;
      }

      if (this.$vuetify.breakpoint.lg) {
        return 3;
      }

      if (this.$vuetify.breakpoint.md) {
        return 2;
      }

      return 1;
    },
  },
  created: function () {
    axios.get("/getAnimals").then((result) => {
      this.items = result.data;
    });
  },
};
</script>

<style>
.carrou {
  display: flex;
  justify-content: center;
}
</style>
