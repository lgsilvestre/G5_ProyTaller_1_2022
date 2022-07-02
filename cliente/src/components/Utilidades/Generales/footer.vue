<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="color">
        <strong class="subheading">Grupo 5</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon.nombre"
          class="mx-4"
          dark
          icon
          :href = icon.link
          target="_blank"
        >
          <v-icon size="24px" >
            {{ icon.nombre }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Adogtame</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        {nombre:'mdi-facebook',link: "https://www.facebook.com/Adogtame-Curico-382415369001881/"  },
        {nombre:'mdi-instagram',link: "https://www.instagram.com/adogtame.cco/?hl=es"},
      ],
    }),
  }
</script>

<style>
.color{
    background:gray ;
}
</style>