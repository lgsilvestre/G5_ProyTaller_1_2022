import { Usuario } from "../../mongodbConfig.js";

async function getUsuarios(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let usuarios = await Usuario.find({});

    res.send(usuarios);
}

async function getUsuarioByQuery(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let queryObj = JSON.parse(req.params.query)

    let resQuery = await Usuario.find(queryObj);
    res.status(200).send(resQuery);
   
}

async function postUsuario(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();

    console.log(req.body);

    let usuario = new Usuario({
        nombreCompleto: req.body.nombreCompleto,
        nombreUsuario: req.body.nombreUsuario,
        email: req.body.email,
        clave: req.body.clave
    });
    

    await usuario.save();

    res.send(usuario);
}

export { getUsuarios, getUsuarioByQuery, postUsuario }

