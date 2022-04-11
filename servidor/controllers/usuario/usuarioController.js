import { Usuario } from "../../mongodbConfig.js";
import bcrypt from 'bcryptjs';

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

    req.body.clave = await bcrypt.hash(req.body.clave,10);

    let usuario = new Usuario({
        nombreCompleto: req.body.nombreCompleto,
        nombreUsuario: req.body.nombreUsuario,
        email: req.body.email,
        clave: req.body.clave
    });
    

    await usuario.save();

    res.send(usuario);
}

async function login(req,res) {
    try{
        let user = await Usuario.findOne({email:req.body.email});
        if(user){
            let match = await bcrypt.compare(req.body.clave,user.clave);
            if(match){
                res.json('Clave correcta');
            }
            else{
                res.status(404).send({
                    message: 'Clave incorrecta'
                });
            }
        }   
        else{
            res.status(404).send({
                message : 'No existe un usuario con este email'
            });
        }
    } catch(e){
        res.status(500).send({
            message: 'Ocurrio un error'
        });
    }
}

export { getUsuarios, getUsuarioByQuery, postUsuario, login}

