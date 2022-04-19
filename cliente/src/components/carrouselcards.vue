<template>
    <div >
<v-flex>
  <v-carousel hide-delimiters style="box-shadow: 0px 0px">
    <v-carousel-item v-for="i in 2" :key="i">
      <v-layout row>
        <v-flex sm4 v-for="j in 6" :key="j" pl-2 pr-2>
          <v-card>
            <catalog-item :item="i"></catalog-item>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Card {{i}}-{{j}}</h3>
                <div> Card text </div>
                
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-carousel-item>
  </v-carousel>
</v-flex>
    </div>
  
</template>

<script>
import CatalogItem from '../components/catalogItem.vue';
import axios from 'axios'
export default {
    name: 'Catalog',
    components: {
        CatalogItem
    },
    data: function () {
        return {
            items: []
        }
    },
    created: function () {
        console.log('Catalog created');
        axios.get('/getAnimals')
            .then(result => {
                this.items = result.data;
            })
    },
}
</script>

<style>
.carrou{
    display: flex;
    justify-content: center;
}

</style>