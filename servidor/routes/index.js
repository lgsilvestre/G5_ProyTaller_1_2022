import {getTest} from '../controllers/tests/test.js'
import { getAnimals, postAnimal, getAnimalByQuery } from '../controllers/animal/animalController.js'
import { getUsuarios, getUsuarioByQuery, postUsuario } from '../controllers/usuario/usuarioController.js';

export function routesConfig(app) {

    app.get('/test',
        getTest
    );

    
    app.get('/getAnimals',
        getAnimals
    );

    app.get('/getAnimalByQuery/:query',
        getAnimalByQuery
    );

    app.post('/postAnimal',
        postAnimal
    );


    app.get('/getUsuarios',
        getUsuarios
    );

    app.get('/getUsuarioByQuery/:query',
        getUsuarioByQuery
    );

    app.post('/postUsuario',
        postUsuario
    );

}