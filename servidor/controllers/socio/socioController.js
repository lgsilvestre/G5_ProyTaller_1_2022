import { Socio } from "../../mongodbConfig.js";

async function postSocio(req, res) {
  try {
    let socio = new Socio(req.body);
    await socio.save();
    res.send(socio);
  } catch (e) {
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
