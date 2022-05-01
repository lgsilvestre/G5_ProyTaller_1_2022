import { Formulario } from "../../mongodbConfig.js";

async function getFormularios(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let formularios = await Formulario.find({});

    res.send(formularios);
}

async function queryFormulario(req,res) {
    try {
        const reg=await Formulario.findOne({_id:req.query._id});
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

async function postFormulario(req, res) {

    let formulario = new Formulario({
        nombre: req.body.nombre,
        preguntas: req.body.preguntas
    });

    await formulario.save();

    res.send(formulario);
}

async function updateFormulario(req,res) {
    try {
        const reg = await Formulario.findByIdAndUpdate({_id:req.body._id},
            {nombre: req.body.nombre, preguntas: req.body.preguntas});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

async function removeFormulario(req,res,next) {
    try {
        const reg = await Formulario.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export {getFormularios, queryFormulario, postFormulario, updateFormulario, removeFormulario}

