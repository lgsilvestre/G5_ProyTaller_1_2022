<template>
    <div>
        <v-container
            class="grey lighten-3 mb-6"
            >
            <v-row 
                justify="start"
            >
                <v-col
                v-for="(item,index) in items" 
                :key="index"
                md="4"
                sm="12"
                >
                    <catalogItem :item="item"></catalogItem>
                </v-col>
            </v-row>
        </v-container>
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
                console.log(result.data)
            })
    },
}
</script>