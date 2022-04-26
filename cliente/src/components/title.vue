<template>
    <div>
        <v-img
            v-for="(item, i) in datos"
            :key="i"
            width="100%"
            height="30vh"
            :src="item.src"
            class="gradient-fill"
            dark
        >
        <v-container fill-height>
            <v-row>
            <v-col>
                <h1
                class="text-md-h3 text-sm-h3 text-h4 text-center"
                >
                {{ item.titulo.toUpperCase() }}
                </h1>
            </v-col>
            </v-row>
        </v-container>
        </v-img>
    </div>
</template>

<script>
export default {
  props: {
    datos: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.gradient-fill .v-responsive__content {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to right,
    rgba(3, 12, 41, 0.7),
    rgba(5, 11, 31, 0.7)
  );
}
</style>