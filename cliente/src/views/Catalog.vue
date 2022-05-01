<template>
    <v-layout align-center justify-center>
        <loading
            v-if="loading"
        ></loading>
        <v-container v-if="!loading"
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
    </v-layout>
</template>

<script>
import CatalogItem from '../components/catalogItem.vue';
import axios from 'axios'
import Loading from '../components/loading.vue';
export default {
    name: 'Catalog',
    components: {
        CatalogItem,
        Loading
    },
    data: function () {
        return {
            items: [],
            loading: true,
        }
    },
    created: function () {
        axios.get('/getAnimals')
        .then(result => {
            this.items = result.data;
            this.loading = false
        })
    },
}
</script>