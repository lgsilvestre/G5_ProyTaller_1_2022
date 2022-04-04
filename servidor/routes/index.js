import {getTest} from '../controllers/tests/test.js'
import { getAnimals, createAnimal, getAnimalByQuery } from '../controllers/animal/animalController.js'

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
        createAnimal
    );


}