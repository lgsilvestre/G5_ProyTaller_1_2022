import { SolicitudAceptada } from "../../mongodbConfig.js";

async function getSolicitudAceptadas(req, res) {

    //const testStr = new Test({ text:"Hola mundo" });
    //await testStr.save();
    
    let SolicitudAceptadas = await SolicitudAceptada.find({});

    res.send(SolicitudAceptadas);
}

async function querySolicitudAceptada(req,res) {
    try {
        const reg=await SolicitudAceptada.findOne({_id:req.query._id});
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

async function postSolicitudAceptada(req, res) {
    const reg3=await SolicitudAceptada.findOne({usuario:req.body.usuario})
    let SolicitudAceptadaAux = new SolicitudAceptada({   
        preguntas: req.body.preguntas,
        mascota: req.body.mascota,
        usuario: req.body.usuario
    });

    await SolicitudAceptadaAux.save();

    res.send(SolicitudAceptadaAux);
}

async function removeSolicitudAceptada(req,res,next) {
    try {
        const reg = await SolicitudAceptada.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
}

export {getSolicitudAceptadas, querySolicitudAceptada, postSolicitudAceptada, removeSolicitudAceptada}

