
import { Animal } from '../../mongodbConfig.js'


async function getAnimals(req, res) {
    
    let animales = await Animal.find({});

    res.send(animales);
}

async function queryAnimal(req,res) {
    try {
        const reg=await Animal.findOne({_id:req.query._id});
        if (!reg){
            res.status(404).send({
                message: 'El registro no existe'
            });
        } else{
            res.status(200).json(reg);
        }
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

async function postAnimal(req, res) {

    console.log(req.body);
    
    let animal = new Animal({
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        tipo: req.body.tipo
    });

    await animal.save();

    res.send(animal);
}

async function updateAnimal(req,res) {
    try {
        const reg = await Animal.findByIdAndUpdate({_id:req.body._id},{nombre:req.body.nombre,edad:req.body.edad,raza:req.body.raza,tipo:req.body.tipo});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export { getAnimals, queryAnimal, postAnimal, updateAnimal }