
import { Animal } from '../../mongodbConfig.js'


async function getAnimals(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let animales = await Animal.find({});

    res.send(animales);
}

async function getAnimalByQuery(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    console.log("getAnimalById");
    
    let queryObj = JSON.parse(req.params.query)

    let resQuery = await Animal.find(queryObj);
    res.status(200).send(resQuery);
   
}

async function createAnimal(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();

    console.log(req.body);
    
    let animal = new Animal({
        name: req.body.name,
        age: req.body.age,
        breed: req.body.breed
    });

    await animal.save();

    res.send(animal);
}

export { getAnimals, getAnimalByQuery, createAnimal }