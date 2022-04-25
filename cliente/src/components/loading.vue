<template>
    <div class="box">
        <v-img 
            src="@/assets/dog-icon.png" 
            max-height="60"         
            max-width="60"
        ></v-img>
        <v-progress-circular
            indeterminate
            color="purple"
            :size="50"
        ></v-progress-circular>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
