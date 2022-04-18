<template>
  <v-card
    class="pa-2"
    outlined
    tile
    max-width="350px"
    style="margin: 0 auto"
  >
    <v-img
      :src="item.Imagen"
      height="200px"
    ></v-img>

    <v-card-title>
      {{item.Nombre}}
    </v-card-title>

    <v-card-subtitle>
        <ul>
            <li>{{item.Raza}}</li>
            <li>{{item.Especie}}</li>
            <li>{{item.Edad}}</li>
        </ul>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="red lighten-2"
        text
      >
        Adoptame
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text> {{item.Descripcion}} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
    props: ['item'],
    data: () => ({
        show: false,
    }),
}
</script>