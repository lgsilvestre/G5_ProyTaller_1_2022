import {getTest} from '../controllers/tests/test.js'
import { getAnimals, postAnimal, getAnimalByQuery } from '../controllers/animal/animalController.js'
import { getUsuarios, getUsuarioByQuery, postUsuario, login } from '../controllers/usuario/usuarioController.js';
import auth from '../middlewares/auth.js';

export function routesConfig(app) {

    //Test
    app.get('/test',getTest);

    //Animales
    app.get('/getAnimals',getAnimals);
    app.get('/getAnimalByQuery/:query',getAnimalByQuery);
    app.post('/postAnimal',auth.verifyAdministrador,postAnimal);

    //Usuarios
    app.get('/getUsuarios',auth.verifyAdministrador,getUsuarios);
    app.get('/getUsuarioByQuery/:query',auth.verifyAdministrador,getUsuarioByQuery);
    app.post('/postUsuario',postUsuario);
    app.post('/login',login);

}