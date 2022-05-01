<template>
    <div>
        <v-bottom-navigation
            v-model="value"
            shift
        >
            <v-btn  @click="opcionBoton(1)">Macotas</v-btn>
            <v-btn  @click="opcionBoton(0)">Administradores</v-btn>
            <v-btn  @click="opcionBoton(2)">Formularios</v-btn>
        </v-bottom-navigation>
        <crudAdmin v-if="opcion==0"></crudAdmin>
        <crudMascotas v-if="opcion==1"></crudMascotas>
        <crud-form v-if="opcion==2"></crud-form>
    </div>
    
</template>

<script>
import crudAdmin from '../components/crudA.vue';
import CrudForm from '../components/crudForm.vue';
import crudMascotas from '../components/crudM.vue';

export default {
    data (){
        return{
            opcion : 1,
            value: 0
        }
    },
    name: 'Crud',
    components: {
        crudAdmin,
        crudMascotas,
        CrudForm
    },
    methods:{
        opcionBoton(opcion){
            this.opcion = opcion
        },
    }
}
</script>

<style>

</style>
