<template>
    <div >
        <v-carousel hide-delimiter-background cycle height="500px" width="400px">
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
            ></v-carousel-item>
        </v-carousel>
    </div>
  
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://i.imgur.com/Fpx4gI8.png',
          },
          {
            src: 'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1604535480782-13fb81ac9927?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1619326229465-1942c876e17c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          },
        ],
      }
    },
  }
</script>

<style>
.carrou{
    display: flex;
    justify-content: center;
}

</style>