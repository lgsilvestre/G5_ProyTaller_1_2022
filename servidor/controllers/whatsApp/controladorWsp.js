import qrcode from 'qrcode-terminal';
import pkg  from 'whatsapp-web.js';
import fs from 'fs';


let client;


//funcion que inicializa el cliente
const  inicializar =() => {
    console.log('no hay sesion guardada');
    
    client = new pkg.Client({
        authStrategy: new pkg.LocalAuth(  ),
    });
    client.initialize();
    console.log('aca1');
    client.on('qr', qr => {
        console.log(qr);
        qrcode.generate(qr , {small: true});
    });
    console.log('aca2');
    client.on('ready', ( ) => {
        console.log('el cliente esta ready');
    });
    console.log('aca3');
    

    
}




/*
    client.on('authenticated', (session) => {
        
        console.log(session),
        
        //guardar credenciales de la sesion para usarlas despues
        sessionData = session;
        console.log("aki")
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(sessionData),function (err)  {
            if (err){
                console.log(err);
            }
        });
        console.log('autenticado');
        
        
    });
        */
    



function enviarWhatsApp(numero){
    const number = numero;

    // Your message.
    const text = "hola junto con saludarle le recordamos que puede donar a la fundacion y con esto cooperar a salvar a los animalitos que estan en peligro";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);

    console.log('mensaje enviado');

}

export{inicializar,enviarWhatsApp};

