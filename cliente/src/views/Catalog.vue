<template>
    <div>
        <v-container
            class="grey lighten-5 mb-6"
            >
            <v-row 
                justify="start"
            >
                <v-col
                v-for="(item,index) in items" 
                :key="index"
                md="3"
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
export default {
    name: 'Catalog',
    components: {
        CatalogItem
    },
    data: function () {
        return {
            items: [
                {
                    Nombre: 'Coddy',
                    Descripcion: 'Perro entretenido con mucha energia y ganas de jugar',
                    Imagen: 'https://i.imgur.com/Fpx4gI8.png',
                    Raza: 'Pitbull',
                    Especie: 'Perro',
                    Edad: '3 meses'
                },


            ]
        }
    },
    created: function () {
        console.log('Catalog created');
        //axios.get("getAnimals");
    },
}
</script>