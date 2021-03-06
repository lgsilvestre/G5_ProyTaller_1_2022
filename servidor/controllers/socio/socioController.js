import { Socio } from "../../mongodbConfig.js";
//import { enviarWhatsApp } from "../whatsApp/whatsAppController.js";
import {enviarCorreo} from "../correos/correosController.js";
import { enviarWhatsApp } from "../whatsApp/controladorWsp.js";
import * as cron from "node-cron"
async function postSocio(req, res) {
  try {
    let socio = new Socio(req.body);
    console.log(cron)
    
    //envia correo
    enviarCorreo("estimado socio "+socio.nombreCompleto+" le recordamos aportar a la fundacion","aportame adogtame"
    ,socio.correo),
    
    enviarWhatsApp(socio.telefono),

    cron.default.schedule('* * * */30 *', ()=> { 
      enviarCorreo("estimado socio "+socio.nombreCompleto+" le recordamos aportar a la fundacion","aportame adogtame"
      ,socio.correo),
      console.log(socio.telefono),
      enviarWhatsApp(socio.telefono),
      console.log("pasa por aca?")
    })
    await socio.save();
    res.send(socio);
  } catch (e) {
    console.log(e);
    handleError(res, e);
    
  }
}

async function getSocios(req, res) {
  try {
    let socios = await Socio.find();
    res.send(socios);
  } catch (e) {
    handleError(res, e);
  }
}
async function updateSocio(req, res) {
  try {
    console.log(req.body);
    let socio = await Socio.findByIdAndUpdate(req.body._id, req.body);
    res.send(socio);
  } catch (e) {
    handleError(res, e);
  }
}

async function removeSocio(req, res) {
  try {
    let socio = await Socio.findByIdAndRemove(req.params.id);
    res.send(socio);
  } catch (e) {
    handleError(res, e);
  }
}

function handleError(res, err) {
  res.status(500).send(err);
}

export { postSocio, getSocios, updateSocio, removeSocio };
