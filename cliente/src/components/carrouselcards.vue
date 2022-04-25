<template>
    <div >
      <v-flex>
        <v-carousel hide-delimiters style="box-shadow: 0px 0px">
          <v-carousel-item v-for="i in 2" :key="i">
            <v-layout row>
              <v-flex  v-for="j in 3" :key="j">
                <v-card>
                  <catalog-item :item="j"></catalog-item>
                  <v-card-title primary-title>
                    <div>
                      
                    
                      
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