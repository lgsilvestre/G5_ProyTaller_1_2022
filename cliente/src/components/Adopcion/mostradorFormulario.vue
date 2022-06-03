<template>
    <div>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg5 xl7 >
                <div v-for="(pregunta,index) in formulario.preguntas" :key="index">
                    <p class="alineacion">{{pregunta.pregunta}}</p>
                    <v-row class="d-flex justify-center">
                        <v-container fluid>
                            <v-textarea
                                v-model="pregunta.respuesta"
                                outlined
                                color="#BD1C2B"
                                :label="'Respuesta '+(index+1)"
                            ></v-textarea>
                        </v-container>
                    </v-row>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        props: {
            formulario: Object,
        },
        data (){
            return{
            }
        },
    }
    
</script>

<style>

.alineacion{
    text-align: left;
    text-justify: inter-word;
    font-weight: bold;
    font-size: 18px;
}
.alineacionBotones{
    display: grid;
    grid-auto-flow: row;
    justify-content: flex-end;
    column-gap: 10px;
    grid-template-columns: auto auto auto;
    margin-block-end: 20px;
}

</style>