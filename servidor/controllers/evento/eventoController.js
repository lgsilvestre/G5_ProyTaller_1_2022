import { Evento } from "../../mongodbConfig.js";
import {
  uploadString,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../index.js";
import { v4 as uuidv4 } from "uuid";
import { json } from "express";

let path = "images/animals/";

async function getEventos(req, res) {
  let eventos = await Evento.find({});

  res.send(eventos);
}

async function queryEvento(req, res) {
  try {
    const reg = await Evento.findOne({ _id: req.query._id });
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

async function postEvento(req, res) {
  //let id = uuidv4();
  //let storageRef = ref(storage, path + id);
  //await uploadString(storageRef, req.body.foto, "data_url");
  //let url = await getDownloadURL(storageRef);

  let evento = new Evento({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    foto: req.body.foto,
  });

  await evento.save();

  res.send(evento);
}

async function updateEvento(req, res, next) {
  try {
    const photoModified = req.body.foto !== undefined && req.body.foto !== null;
    let url = "";
    if (photoModified) {
      let id = uuidv4();
      let storageRef = ref(storage, path + id);
      await uploadString(storageRef, req.body.foto, "data_url");
      url = await getDownloadURL(storageRef);
    }

    let evento = await Evento.findOne({ _id: req.body._id });

    // if photo is modified, then delete the old photo
    if (photoModified) {
      let id = evento.foto.split("%2F")[2].split("?")[0];
      const desertRef = ref(storage, path + id);
      deleteObject(desertRef);
    }
    // update the animal
    let reg = await Evento.findOneAndUpdate(
      { _id: req.body._id },
      {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        foto: req.body.foto,
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

async function removeEvento(req, res, next) {
  try {
    const reg = await Evento.findByIdAndDelete({ _id: req.body._id });
    // remove the photo
    //let id = reg.foto.split("%2F")[2].split("?")[0];
    //const desertRef = ref(storage, path + id);
    //deleteObject(desertRef);
    res.status(200).json(reg);
  } catch (e) {
    res.status(500).send({
      message: "Ocurrió un error",
    });
    next(e);
  }
}

export { getEventos, queryEvento, postEvento, updateEvento, removeEvento };
