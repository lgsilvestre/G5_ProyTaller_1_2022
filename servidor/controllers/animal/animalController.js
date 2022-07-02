import { Animal } from "../../mongodbConfig.js";
import {
  uploadString,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../index.js";
import { v4 as uuidv4 } from "uuid";

let path = "images/animals/";

async function getAnimals(req, res) {
  let animales = await Animal.find({});

  res.send(animales);
}

async function queryAnimal(req, res) {
  try {
    const reg = await Animal.findOne({ _id: req.query._id });
    if (!reg) {
      res.status(404).send({
        message: "El registro no existe",
      });
    } else {
      res.status(200).json(reg);
    }
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

async function postAnimal(req, res) {
  let fotos = [];

  for (let e of req.body.fotos) {
    let id = uuidv4();
    let storageRef = ref(storage, path + id);
    await uploadString(storageRef, e, "data_url");
    let url = await getDownloadURL(storageRef);
    fotos.push(url);
  }

  let animal = new Animal({
    nombre: req.body.nombre,
    edad: req.body.edad,
    raza: req.body.raza,
    tipo: req.body.tipo,
    fotos,
    idForm: req.body.idForm,
    caso: req.body.caso
  });

  await animal.save();

  res.send(animal);
}

async function postFoto(req, res, next) {
  try {
    let id = uuidv4();
    let storageRef = ref(storage, path + id);
    await uploadString(storageRef, req.body.foto, "data_url");
    let url = await getDownloadURL(storageRef);
    let animal = await Animal.findOne({ _id: req.body._id });
    animal.fotos.push(url);
    await animal.save();
    res.send(url);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

async function removeFoto(req, res, next) {
  try {
    let animal = await Animal.findOne({ _id: req.body._id });
    let index = animal.fotos.indexOf(req.body.foto);
    let id = animal.fotos[index].split("%2F")[2].split("?")[0];
    const desertRef = ref(storage, path + id);
    deleteObject(desertRef);
    animal.fotos.splice(index, 1);
    await animal.save();
    res.status(200).json(animal);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

async function updateAnimal(req, res, next) {
  try {
    // update the animal
    let reg = await Animal.findOneAndUpdate(
      { _id: req.body._id },
      {
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        tipo: req.body.tipo,
        idForm: req.body.idForm,
        caso: req.body.caso
      },
      { new: true }
    );

    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

async function removeAnimal(req, res, next) {
  try {
    const reg = await Animal.findByIdAndDelete({ _id: req.body._id });
    // remove photos
    for (let e of reg.fotos) {
      let id = e.split("%2F")[2].split("?")[0];
      const desertRef = ref(storage, path + id);
      deleteObject(desertRef);
    }
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

export {
  getAnimals,
  queryAnimal,
  postAnimal,
  updateAnimal,
  removeAnimal,
  postFoto,
  removeFoto,
};
