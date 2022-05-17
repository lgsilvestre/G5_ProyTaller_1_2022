
const TWILIO_ID = 'AC03ebb0eaa68c0df713e0dcb33f9ebed5'
const TWILIO_SK = 'ac0e078484739e78ae96fd5c8c6ed1f7'

const client = require('twilio')(TWILIO_ID,TWILIO_SK);

client.messages
  .create({
     from: 'whatsapp:+14155238886',
     body: `Hola le recordamos sobre la donacion hacia la fundacion Adogtame con lo cual estaria ayudando a muchos animalitos`,
     to: 'whatsapp:+56956130137'
   })
  .then(message => console.log(message.sid));