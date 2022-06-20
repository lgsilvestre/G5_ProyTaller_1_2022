<template>
    <div>
        <Title class="separacion" :datos="datos" />
        <stepper-adopcion></stepper-adopcion>
    </div>
</template>

<script>
import StepperAdopcion from '../components/Adopcion/stepperAdopcion.vue'
import Title from '../components/Utilidades/Generales/title.vue'
    export default {
        components: { Title, StepperAdopcion },
        data (){
            return{
                datos: [
                    {
                    src: 'https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg',
                    titulo: 'Formulario de adopción'
                    },
                ],
            }
        },
    }
    
</script>
