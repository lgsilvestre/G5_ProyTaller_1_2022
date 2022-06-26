import { Solicitud, SolicitudAceptada } from "../../mongodbConfig.js";

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
async function querySolicitudUsuario(req,res) {
    console.log(" adasdas ",req)
    try {
        const reg=await Solicitud.findOne({usuario:req}); 
        console.log(reg)
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
    //querySolicitudUsuario(req.body.usuario,res)
    try {
        const reg=await Solicitud.findOne({usuario:req.body.usuario}); 
        const reg3=await SolicitudAceptada.findOne({usuario:req.body.usuario})
        if (!reg && !reg3){//no encontro solicitud con ese usuario
            let solicitud = new Solicitud({   
                preguntas: req.body.preguntas,
                mascota: req.body.mascota,
                usuario: req.body.usuario
            });
            await solicitud.save();
        
            res.send(solicitud);
        } else{
            //Si hay solicitud con ese usuario en reg
            const reg2=await Solicitud.findOne({mascota:req.body.mascota}); 
            const reg4=await SolicitudAceptada.findOne({mascota:req.body.mascota}); 
            if(!reg2 && !reg4){
                let solicitud = new Solicitud({   
                    preguntas: req.body.preguntas,
                    mascota: req.body.mascota,
                    usuario: req.body.usuario
                });
                await solicitud.save();
            
                res.send(solicitud);
            }
            else{ //NO crea la solicitud
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }
        }
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
    
    
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

export {getSolicitudes, querySolicitud, postSolicitud, updateSolicitud, removeSolicitud, querySolicitudUsuario}

