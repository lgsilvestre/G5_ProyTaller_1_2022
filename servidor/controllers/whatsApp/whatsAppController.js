const qrcode = require('qrcode-terminal');
const {Client} =require('whatsapp-web.js');

const client = new Client();

client.initialize();

client.on('qr', qr => {
  qrcode.generate(qr, {small:true});
});

client.on('ready', ( ) => {
  console.log('el cliente esta ready');

  const number = "+56956130137";

  // Your message.
  const text = "hola junto con saludarle le recordamos que puede donar a la fundacion y con esto cooperar a salvar a los animalitos que estan en peligro";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number.substring(1) + "@c.us";

 // Sending message.
  client.sendMessage(chatId, text);

  console.log('mensaje enviado');
})

