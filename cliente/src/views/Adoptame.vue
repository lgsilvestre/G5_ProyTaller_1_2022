<template>
    <div>
        <Title :datos="datos" />
        <stepper-adopcion></stepper-adopcion>
        <!-- <formulario></formulario> -->
        
    </div>
    
</template>

<script>
import StepperAdopcion from '../components/Adopcion/stepperAdopcion.vue'
import formulario from '../components/Crud/crudForm.vue'
import Title from '../components/Utilidades/Generales/title.vue'
export default {
  components: { formulario,Title, StepperAdopcion },
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
