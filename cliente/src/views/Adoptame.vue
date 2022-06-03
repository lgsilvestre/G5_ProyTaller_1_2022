<template>
    <div>
        <Title :datos="datos" />
        <formulario></formulario>
        
    </div>
    
</template>

<script>
import formulario from '../components/crudForm.vue'
import Title from '../components/title.vue'
export default {
  components: { formulario,Title },
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
