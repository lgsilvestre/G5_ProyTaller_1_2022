<template>
    <div>
        <v-btn  @click="opcionMascotas()">Macotas</v-btn>
        <v-btn  @click="opcionAdmin()">Administradores</v-btn>
        <crudAdmin v-if="opcion==0"></crudAdmin>
        <crudMascotas v-if="opcion==1"></crudMascotas>
    </div>
    
</template>

<script>
import crudAdmin from '../components/crudA.vue';
import crudMascotas from '../components/crudM.vue';

export default {
    data (){
        return{
            opcion : 1
        }
    },
    name: 'Crud',
    components: {
        crudAdmin,
        crudMascotas
    },
    methods:{
        opcionAdmin(){
            let me=this
            me.opcion = 0
        },
        opcionMascotas(){
            let me=this
            me.opcion = 1
        }
    }
}
</script>
