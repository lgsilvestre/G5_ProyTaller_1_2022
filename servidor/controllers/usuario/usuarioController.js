import { Recover, Usuario } from "../../mongodbConfig.js";
import bcrypt from 'bcryptjs';
import token from '../../services/token.js';
import { enviarCorreo } from "../correos/correosController.js";

async function getUsuarios(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let usuarios = await Usuario.find({});

    res.send(usuarios);
}
async function queryTokenID(req,res){
    try {
        let tokenReturn = await token.decode(req.query._id);
        if (!tokenReturn){
            res.status(404).send({
                message: 'El registro no existe'
            });
        } else{
            res.status(200).json({id:tokenReturn._id,email:tokenReturn.email,nombreCompleto:tokenReturn.nombreCompleto,rol:tokenReturn.rol});
        }
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
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
                let tokenReturn = await token.encode(user._id,user.rol);
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

async function recuperarContrasena(req,res){
    const user = await Usuario.findOne({email:req.body.email});
    if(user){
        const code = generateCode();
        var recover = await Recover.findOne({email:req.body.email});
        if(!recover){
            recover = await Recover.create({code:code,email:req.body.email});
        }else{
            recover.code = code;
            recover.save();
        }
        enviarCorreo(
            `Hola ${user.nombreCompleto},\n\n
            Se ha solicitado una nueva contraseña para tu cuenta.\n\n
            Su codigo de recuperacion es: ${code}\n\n`,
            `Recuperacion de contraseña`,
            user.email
        )
        console.log(code)
        res.send(true);
    }else{
        res.send(false);
    }
}

async function compararCodigo(req, res){
    let code = req.body.code;
    let recover = await Recover.findOne({code});
    if(recover){
        res.send(true);
        return
    }
    res.send(false);
}

async function cambiarContrasena(req,res){
    let code = req.body.code;
    let recover = await Recover.findOne({code});
    if(recover){
        let user = await Usuario.findOne({email:recover.email});
        if(user){
            user.clave = await bcrypt.hash(req.body.password,10);
            user.save();
            recover.remove();
            res.send(true);
            return
        }
    }
    res.send(false);
}

function generateCode(){
    // generate a random code with 6 letters
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

export {
  getUsuarios,
  queryUsuario,
  postUsuario,
  login,
  updateUsuario,
  removeUsuario,
  queryTokenID,
  recuperarContrasena,
  compararCodigo,
  cambiarContrasena,
};

