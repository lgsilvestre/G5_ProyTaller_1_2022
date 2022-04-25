<template>
  <v-card
    class="pa-2"
    max-width="450px"
    style="margin: 0 auto"
  >
    <v-img
      :src="item.foto"
      height="200px"
    ></v-img>

    <v-card-title>
      {{item.nombre}}
    </v-card-title>

    <v-card-subtitle>
        <ul>
            <li>{{item.raza}}</li>
            <li>{{item.tipo}}</li>
            <li>{{item.edad}} años</li>
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

        <v-card-text> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit officia quibusdam quod doloremque necessitatibus neque totam voluptatem architecto quas cum eius, dicta optio. Ut voluptates corporis maiores nisi unde aliquid? </v-card-text>
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