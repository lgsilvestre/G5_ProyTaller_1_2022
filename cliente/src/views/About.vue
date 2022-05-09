<template>
  <div >
    <Title :datos="datos" />

    <team :our-team="ourTeam"></team>

        <v-row no-gutters>
          <v-col cols="12" md="6" align-self="center">
            <v-img
              max-height="800"
              src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              lazy-src="pexels-canva-studio-3277806.jpg"
            >
            </v-img>
          </v-col>
          <v-col cols="12" md="6" align-self="center">
            <div class="pa-lg-16 pa-md-10 px-4 py-16">
              <h2 class="text-h3 text-center font-weight-black">En todas partes</h2>
              <h3
                class="text-h5 text-uppercase font-weight-thin text-center my-8"
              >
                Adoptar un acto de AMOR que culmina cuando son tus hijos los que te adoptan a tí
              </h3>
              <p>
                Fundación Adogtame Curicó no trabaja en un lugar en específico como sede central,
                está más bien en todos lados. Las dos trabajan en conjunto, ya sea durante las jornadas 
                de rescate, en las de adopción y toma de decisiones en casos específicos. Cabe mencionar
                que esta fundación funciona sin fines de lucro, por lo que es sustentada a través de aportes 
                voluntarios, rifas, donaciones de dinero, alimentos, cobijas y medicamentos. Atreves de socios
                conmovidos por la ardua labor que se realiza en cada acto de amor a los “hermanos menores”,
                los animales. Además, algunos de estos voluntarios apoyan a esta fundación en las diversas
                jornadas, como las de adopción o eventos a los cuales son invitados. Entre esos eventos se
                encuentran las charlas educativas de tenencia responsables de mascotas realizadas principalmente en colegios.
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="flex-row-reverse">
          <v-col cols="12" md="6" align-self="center">
            <v-img
              max-height="800"
              src="https://images.ecestaticos.com/H8vy10Joc8MAXBy_4CgYB6bZMMk=/0x0:2121x1414/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F3c7%2Fe00%2F3e1%2F3c7e003e1dc57b90e0801dd7a786ef5b.jpg"
              lazy-src="pexels-rfstudio-3810792.jpg"
            >
            </v-img>
          </v-col>
          <v-col cols="12" md="6" align-self="center">
            <div class="pa-lg-16 pa-md-10 px-4 py-16">
              <h2 class="text-h3 text-center font-weight-black">Ante la adversidad</h2>
              <h3
                class="text-h5 text-uppercase font-weight-thin text-center my-8"
              >
                La adversidad tiene el don de despertar talentos
              </h3>
              <p>
                La mayor dificultad y constante que tienen es conseguir hogares temporales buenos
                y que cumplan requisitos mínimos para mantener a la mascota, pues sin ellos no pueden
                tomar casos. Todos los días se encuentran animalitos en situación calle, ya sean canino
                s o felinos, pero es por periodos de tiempo en que a veces nos encuentran colapsadas,
                pues es mucho más cuando nos encontramos con camadas de caninos y gente que todos los
                días les habla pidiendo ayuda por el aumento del abandono en ciertas poblaciones y 
                villas de Curicó, también fuera de este, los Niches, Sarmiento, Molina, etc.
              </p>
            </div>
          </v-col>
        </v-row>

    
    <timeline></timeline>
  </div>
</template>

<script>
import Team from '../components/team.vue'
import timeline from '../components/timeline.vue'
import Title from '../components/title.vue'
export default {
  components: { timeline, Team, Title},
  
  Teamsetup() {
    
  },
  data() {
    return {
      datos: [
        {
          src: 'https://s1.eestatic.com/2022/03/23/curiosidades/mascotas/659444577_222934316_1024x576.jpg',
          titulo: ' Nosotros ',
        },
      ],
      ourTeam: [
        {
          name: 'Evelin Vásquez',
          position: 'presidenta',
          photo: 'https://statics-cuidateplus.marca.com/cms/styles/ratio_1_1/azblob/perros-ninos.jpg.webp?itok=T6UgG91q',
        },
        {
          name: 'Luis Silvestre',
          position: 'Profesor',
          photo: 'https://pbs.twimg.com/profile_images/1139584742/luisTwitter_400x400.jpg',
        },
        
      ],
    }
  },
}

</script>

<style >
  .about{
    display: flex;
    justify-content: center;

  }
  .m-1{
    margin:1rem;
  }
  .w-80{
    width: 70%;
  }
  .center{
    margin: 0 auto;
  }
  .text-black{
    color: black;
  }
  
  


</style>
