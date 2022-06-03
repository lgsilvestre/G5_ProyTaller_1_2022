import { getTest } from "../controllers/tests/test.js";
import {
  getAnimals,
  postAnimal,
  queryAnimal,
  removeAnimal,
  updateAnimal,
  removeFoto,
  postFoto,
} from "../controllers/animal/animalController.js";
import {
  getUsuarios,
  queryUsuario,
  postUsuario,
  login,
  updateUsuario,
  removeUsuario,
} from "../controllers/usuario/usuarioController.js";

import {
  postSocio,
  getSocios,
  updateSocio,
  removeSocio,
} from "../controllers/socio/socioController.js";

import {
  getFormularios,
  queryFormulario,
  postFormulario,
  updateFormulario,
  removeFormulario,
  queryFormularioNombre,
} from "../controllers/formulario/formularioController.js";
import {
  getEventos,
  postEvento,
  queryEvento,
  removeEvento,
  updateEvento,
} from "../controllers/evento/eventoController.js";

//import auth from "../middlewares/auth.js";
//import { AppCheck } from 'firebase-admin/lib/app-check/app-check';

export function routesConfig(app) {
  //Test
  app.get("/test", getTest);

  //Animales
  app.get("/getAnimals", getAnimals);
  app.get("/queryAnimal", queryAnimal);
  app.post("/postAnimal", postAnimal);
  //app.post('/postAnimal',auth.verifyAdministrador,postAnimal);
  app.put("/updateAnimal", updateAnimal);
  app.post("/removeAnimal", removeAnimal);
  app.post("/postFoto", postFoto);
  app.post("/removeFoto", removeFoto);

  //Usuarios
  app.get("/getUsuarios", getUsuarios);
  //app.get('/getUsuarios',auth.verifyAdministrador,getUsuarios);
  app.get("/queryUsuario", queryUsuario);
  //app.get('/getUsuarioByQuery/:query',auth.verifyAdministrador,getUsuarioByQuery);
  app.post("/postUsuario", postUsuario);
  app.post("/login", login);
  app.put("/updateUsuario", updateUsuario);
  app.post("/removeUsuario", removeUsuario);

  //Formularios
  app.get("/getFormularios", getFormularios);
  app.get("/queryFormulario", queryFormulario);
  app.post("/postFormulario", postFormulario);
  app.put("/updateFormulario", updateFormulario);
  app.post("/removeFormulario", removeFormulario);
  app.get("/queryFormularioNombre", queryFormularioNombre);

  //Socios
  app.post("/postSocio", postSocio);
  app.put("/updateSocio", updateSocio);
  app.get("/getSocios", getSocios);
  app.delete("/deleteSocio/:id", removeSocio);

  //Eventos
  app.get("/getEventos", getEventos);
  app.post("/postEvento", postEvento);
  app.get("/queryEvento", queryEvento);
  app.put("/updateEvento", updateEvento);
  app.post("/removeEvento", removeEvento);
}
