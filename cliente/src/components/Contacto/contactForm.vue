<template>
  <v-form action="https://formsubmit.co/fundacion.adogtame@gmail.com" method="POST">
    <v-row class="mb-n6">
      <v-col><v-text-field label="Nombre" name="nombre" dense outlined></v-text-field></v-col>
      <v-col><v-text-field label="Email" name="email" dense outlined></v-text-field></v-col>
    </v-row>

    <v-row class="mb-n6">
      <v-col
        ><v-text-field label="Asunto" name="Asunto" dense outlined></v-text-field
      ></v-col>
    </v-row>
    <v-row class="mb-n6">
      <v-col>
        <v-textarea 
          name="mensaje"
          dense
          label="Mensaje"
          auto-grow
          outlined
          rows="8"
          row-height="20"
          :rules="['Required']"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn type="submit" value= "" class="my-3 red darken-3" >Enviar</v-btn>
        <input type="hidden" name="_next" value="https://adogtamecurico.com/home">
      </v-col>
    </v-row>
  </v-form>
</template>