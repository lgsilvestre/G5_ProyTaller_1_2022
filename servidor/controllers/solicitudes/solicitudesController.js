import { Solicitud } from "../../mongodbConfig.js";

async function getSolicitudes(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let Solicitudes = await Solicitud.find({});

    res.send(Solicitudes);
}

async function querySolicitud(req,res) {
    try {
        const reg=await Solicitud.findOne({_id:req.query._id});
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

async function postSolicitud(req, res) {

    let solicitud = new Solicitud({   
        preguntas: req.body.preguntas,
        mascota: req.body.mascota,
        usuario: req.body.usuario
    });

    await solicitud.save();

    res.send(solicitud);
}

async function updateSolicitud(req,res) {
    try {
        const reg = await Solicitud.findByIdAndUpdate({_id:req.body._id},
            {   preguntas: req.body.preguntas,
                mascota: req.body.mascota,
                usuario: req.body.usuario});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

async function removeSolicitud(req,res,next) {
    try {
        const reg = await Solicitud.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export {getSolicitudes, querySolicitud, postSolicitud, updateSolicitud, removeSolicitud}

