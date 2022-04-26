import { Usuario } from "../../mongodbConfig.js";
import bcrypt from 'bcryptjs';
import token from '../../services/token.js';

async function getUsuarios(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let usuarios = await Usuario.find({});

    res.send(usuarios);
}

async function queryUsuario(req,res) {
    try {
        const reg=await Usuario.findOne({_id:req.query._id});
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

async function postUsuario(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    req.body.clave = await bcrypt.hash(req.body.clave,10);

    let usuario = new Usuario({
        rol: req.body.rol,
        nombreCompleto: req.body.nombreCompleto,
        email: req.body.email,
        clave: req.body.clave
    });
    

    await usuario.save();

    res.send(usuario);
}

async function updateUsuario(req,res) {
    try {
        const reg = await Usuario.findByIdAndUpdate({_id:req.body._id},{nombreCompleto: req.body.nombreCompleto,
            rol: req.body.rol,
            email: req.body.email,
            clave: req.body.clave});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

async function login(req,res) {
    try{
        let user = await Usuario.findOne({email:req.body.email});
        if(user){
            let match = await bcrypt.compare(req.body.password,user.clave);
            if (match){
                let tokenReturn = await token.encode(user._id);
                res.status(200).json({user,tokenReturn});
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

async function removeUsuario(req,res,next) {
    try {
        const reg = await Usuario.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export { getUsuarios, queryUsuario, postUsuario, login, updateUsuario, removeUsuario}

