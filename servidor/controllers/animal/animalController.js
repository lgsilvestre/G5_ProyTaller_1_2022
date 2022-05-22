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
  });

  await animal.save();

  res.send(animal);
}

async function updateAnimal(req, res, next) {
  try {
    const photoModified = req.body.foto !== undefined && req.body.foto !== null;
    let url = "";
    if (photoModified) {
      let id = uuidv4();
      let storageRef = ref(storage, path + id);
      await uploadString(storageRef, req.body.foto, "data_url");
      url = await getDownloadURL(storageRef);
    }

    let animal = await Animal.findOne({ _id: req.body._id });

    // if photo is modified, then delete the old photo
    if (photoModified) {
      let id = animal.foto.split("%2F")[2].split("?")[0];
      const desertRef = ref(storage, path + id);
      deleteObject(desertRef);
    }
    // update the animal
    let reg = await Animal.findOneAndUpdate(
      { _id: req.body._id },
      {
        nombre: req.body.nombre,
        edad: req.body.edad,
        raza: req.body.raza,
        tipo: req.body.tipo,
        foto: photoModified ? url : animal.foto,
        idForm: req.body.idForm,
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
    // remove the photo
    let id = reg.fotos[0].split("%2F")[2].split("?")[0];
    const desertRef = ref(storage, path + id);
    deleteObject(desertRef);
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

export { getAnimals, queryAnimal, postAnimal, updateAnimal, removeAnimal };
