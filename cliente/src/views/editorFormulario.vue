<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl7 >
            <h1 >Editor {{formulario.nombre}}</h1>
            <div v-for="(pregunta,index) in formulario.preguntas" :key="index">
                <v-row>
                    <v-col class="d-flex justify-center">
                        <v-textarea filled :label="'Pregunta '+(index+1)" auto-grow v-model="pregunta.pregunta" :value="pregunta.pregunta"></v-textarea>
                    </v-col>
                </v-row>
            </div>
            <v-btn @click="cambios()">cambiar</v-btn>
        </v-flex>    
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data (){
        return{
            formulario: {},
        }
    },
    
    created() {
        axios.get('/queryFormulario?_id='+this.$route.params.id)
        .then(result => {
            this.formulario = result.data
        })
    },
    methods: {
        cambios(){
            console.log(this.formulario)
            axios.put('/updateFormulario',{_id:this.formulario._id,nombre:this.formulario.nombre,preguntas:this.formulario.preguntas}).then(result=> {
                console.log(result)    
            })
        }
    }
    
}
</script>

<style>
.size{
    display: flex;
    width: 300px;
}
.size2{
    display: flex;
}
.p{
    margin: 0 !important;
    padding: 0 !important;
}
</style>