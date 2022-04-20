
import { Animal } from '../../mongodbConfig.js'
import { uploadString,ref } from "firebase/storage";
import { storage } from '../../index.js';
import { v4 as uuidv4 } from 'uuid';

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

    let id = uuidv4()
    let storageRef = ref(storage, id);

    await uploadString(storageRef,req.body.foto,'data_url')
    let url = `https://firebasestorage.googleapis.com/v0/b/adogtame-1fa85.appspot.com/o/${id}?alt=media&token=e42595cb-79b1-4c5b-872c-5c76acc6eb5b`

    let animal = new Animal({
        nombre: req.body.nombre,    
        edad: req.body.edad,
        raza: req.body.raza,
        tipo: req.body.tipo,
        foto: url
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

async function removeAnimal(req,res,next) {
    try {
        const reg = await Animal.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export { getAnimals, queryAnimal, postAnimal, updateAnimal, removeAnimal }