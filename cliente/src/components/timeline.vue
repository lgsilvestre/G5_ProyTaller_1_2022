<template>
  <section id="timeline" class="py-16">
    <v-container>
      <h2 class="text-h3 text-center font-weight-black mb-8">Nuestro Viaje</h2>
      <template>
        <v-timeline>
          <v-timeline-item
            v-for="(year, i) in years"
            :key="i"
            :color="year.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold ${year.color}--text`"
                v-text="year.year"
              ></span>
            </template>
            <div class="py-4">
              <h2
                :class="`headline font-weight-light mb-4 ${year.color}--text`"
              >
                {{year.titulo}}
              </h2>
              <div>
                  {{year.texto}}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </template>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      years: [
        {
          color: 'pink',
          year: '2015',
          titulo: "Inicia Proyecto Adogtame",
          texto: "Inicia la agrupación Adogtame en Curicó gracias a varias fundadoras, una de las principales fue la profesora Karina Garate quien también era partícipe de la protectora de animales San Francisco de Curicó, que conmovida con la casi nula responsabilidad de los propietarios sobre sus mascotas, dedicaba su tiempo libre al rescate de estos mismos. Ella tomó el cargo de presidenta de la agrupación desde el inicio. En reiteradas veces intentaron formalizar la agrupación, pero al pasar de los meses no se pudo cumplir ningún objetivo por falta de motivación y apoyo del mismo grupo de la zona. Con el pasar del tiempo, las mismas personas y comenzaron a tomar conciencia del proyecto y lo que involucraba, siendo presentado a través de redes sociales y carteles en las calles.",
        },  
        {
          color: 'amber',
          year: '2018',
          titulo: "Integrantes y Uniones",
          texto: "Se une al grupo de esta organización la estudiante de medicina veterinaria, María José Castro Araya como secretaria y tesorera y alrededor de esta fecha ingresa la trabajadora social Evelin Vásquez Campos, quien actualmente es la presidenta. ",
        },
        {
          color: 'orange',
          year: '2019',
          titulo: "Formalizacion de Fundacion Adogtame",
          texto: "Esta agrupación toma personalidad jurídica como Fundación, manteniendo su nombre original. Cada una de ellas, trabaja inspiradas por el apoyo hacia los caninos y felinos de la zona de Curicó, funcionando las 24 horas del día los 7 días de la semana.",
        },
        {
          color: 'teal',
          year: '2022', 
          titulo: "Hoy en día la fundación",
          texto: "Está conformada por una familia de mujeres que se dedican a velar por el bienestar de los animales domésticos que han perdido toda protección o que simplemente jamás la habían tenido hasta el momento de su rescate. No obstante, se han presentado casos en los que han debido asistir a otras especies más exóticas.",
        },
      ],
    }
  },
}
</script>