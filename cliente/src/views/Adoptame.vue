<template>
    <div>
        <p>holaa</p>
        <formulario></formulario>
        
    </div>
    
</template>

<script>
import formulario from '../components/crudForm.vue'
export default {
  components: { formulario },
  data() {
    return {
      datos: [
        {
          src: 'https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg',
          titulo: ' Nosotros ',
        },
      ],
    }
  }  
}
</script>
