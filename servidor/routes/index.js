import {getTest} from '../controllers/tests/test.js'
import { getAnimals, postAnimal, queryAnimal, removeAnimal, updateAnimal } from '../controllers/animal/animalController.js'
import { getUsuarios, queryUsuario, postUsuario, login, updateUsuario, removeUsuario } from '../controllers/usuario/usuarioController.js';
import auth from '../middlewares/auth.js';
import { getFormularios, postFormulario, queryFormulario, removeFormulario, updateFormulario } from '../controllers/formulario/formularioController.js';
//import { AppCheck } from 'firebase-admin/lib/app-check/app-check';

export function routesConfig(app) {

    //Test
    app.get('/test',getTest);

    //Animales
    app.get('/getAnimals',getAnimals);
    app.get('/queryAnimal',queryAnimal);
    app.post('/postAnimal',postAnimal);
    //app.post('/postAnimal',auth.verifyAdministrador,postAnimal);
    app.put('/updateAnimal', updateAnimal);
    app.post('/removeAnimal', removeAnimal);

    //Usuarios
    app.get('/getUsuarios',getUsuarios);
    //app.get('/getUsuarios',auth.verifyAdministrador,getUsuarios);
    app.get('/queryUsuario',queryUsuario);
    //app.get('/getUsuarioByQuery/:query',auth.verifyAdministrador,getUsuarioByQuery);
    app.post('/postUsuario',postUsuario);
    app.post('/login',login);
    app.put('/updateUsuario', updateUsuario);
    app.post('/removeUsuario', removeUsuario);

    //Formularios
    app.get('/getFormularios', getFormularios);
    app.get('/queryFormulario', queryFormulario);
    app.post('/postFormulario', postFormulario);
    app.put('/updateFormulario', updateFormulario);
    app.post('/removeFormulario', removeFormulario);
    
}