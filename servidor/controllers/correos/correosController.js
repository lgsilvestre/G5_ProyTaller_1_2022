import nodemailer from 'nodemailer';



//Crear objeto de transporte
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '97marcelo.mg@gmail.com',
    pass: 'isotwqriabcmjycu'
  }
});

function enviarCorreo(mensaje,asunto,destino ){
    

    var mailOptions = {
    from: '97marcelo.mg@gmail.com',
    to: destino,
    subject: asunto,
    text: mensaje
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
    });

}

export {enviarCorreo}