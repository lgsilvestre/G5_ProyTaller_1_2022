<template>
    <div class="box">
        <v-img 
            src="https://i.pinimg.com/originals/68/17/dc/6817dccec8fb261cc4adc3ab6fc52cfc.gif" 
            max-height="800"         
            max-width="800"
        ></v-img>
        <!-- <v-progress-circular
            indeterminate
            color="red lighten-2"
            :size="50"
        ></v-progress-circular> -->
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
