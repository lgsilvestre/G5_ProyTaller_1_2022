<template>
  <div>
    <Title class="separacion" :datos="datos" />
    <v-layout align-center justify-center>
      <loading v-if="loading"></loading>
      <v-container v-if="!loading" class="mb-6">
        <v-row>
          <v-col sm="12" md="3">
            <v-card class="elevation-1" style="position: sticky; top: 76px">
              <v-card-title primary-title>
                <h3 class="mb-0">Busca tu mascota</h3>
              </v-card-title>
              <v-card-text>
                <h5>Animalitos de la busqueda: {{ this.filter().length }}</h5>

                <div class="search-content">
                  <h3>Nombre</h3>
                  <v-text-field
                    v-model="filterOptions.nombre"
                    label="Nombre de la mascota"
                    solo
                  ></v-text-field>
                </div>

                <div class="search-content">
                  <h3>Tipo</h3>
                  <v-select
                    v-model="filterOptions.especie"
                    :items="especies"
                    label="Nombre de la especie/tipo"
                    solo
                  ></v-select>
                </div>

                <div class="search-content">
                  <h3>Raza</h3>
                  <v-text-field
                    v-model="filterOptions.raza"
                    label="Nombre de la raza"
                    solo
                  ></v-text-field>
                </div>

                <div class="search-content">
                  <h3>Edad</h3>
                  <h4>Edad seleccionada: {{ filterOptions.edad }}</h4>
                  <v-range-slider
                    v-model="filterOptions.edad"
                    :max="getMaxAge()"
                    min="1"
                  ></v-range-slider>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="9">
            <v-row justify="start">
              <v-col
                v-for="(item, index) in filter()"
                :key="index"
                md="4"
                sm="12"
              >
                <catalogItem :item="item" class="bg"></catalogItem>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import CatalogItem from "../components/Utilidades/catalogItem.vue";
import axios from "axios";
import Loading from "../components/Utilidades/Generales/loading.vue";
import Title from "../components/Utilidades/Generales/title.vue";
export default {
  name: "Catalog",
  components: {
    CatalogItem,
    Loading,
    Title,
  },
  data: function () {
    return {
      items: [],
      loading: true,
      especies: [{
        text: "Cualquiera",
        value: "",
      }],
      filterOptions: {
        nombre: "",
        especie: "",
        raza: "",
        edad: [1, 1],
      },
      datos: [
        {
          src: "https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg",
          titulo: "Animalitos en Adopción",
        },
      ],
    };
  },
  created: function () {

    axios.get("/getAnimals").then(async (result) => {
      this.items = result.data;
      this.filterOptions.edad = [1, this.getMaxAge()];

      let formularios = await axios.get("/getFormularios")

      let resEspecies = formularios.data.map(f => {
        return {
          text: f.nombre,
          value: f.nombre
        }
      })
      this.especies = this.especies.concat(resEspecies)

      this.loading = false;
    });
  },
  methods: {
    filter: function () {
      return this.items.filter((item) => {
        return (
          item.nombre
            .toLowerCase()
            .includes(this.filterOptions.nombre.toLowerCase()) &&
          item.raza
            .toLowerCase()
            .includes(this.filterOptions.raza.toLowerCase()) &&
          item.tipo
            .toLowerCase()
            .includes(this.filterOptions.especie.toLowerCase()) &&
          item.edad >= this.filterOptions.edad[0] &&
          item.edad <= this.filterOptions.edad[1]
        );
      });
    },
    getMaxAge: function () {
      return Math.max(...this.items.map((item) => item.edad));
    },
  },
};
</script>

<style>
.search-content {
  padding: 10px;
}
.search-content h3 {
  margin-bottom: 10px;
}
.bg {
  background-color: #352d2d;
}
</style>
