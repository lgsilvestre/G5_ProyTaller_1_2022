
import mongoose from 'mongoose';
import dotnev from 'dotenv';
dotnev.config();
const uri = `mongodb+srv://api-mongo-kobal:${process.env.mongoPass}@cluster-api.hdybb.mongodb.net/dbAdogtame?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const TestSchema = new mongoose.Schema({
    text: String
});

const Test = mongoose.model('Test', TestSchema);

const AnimalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
});

const Animal = mongoose.model('Animal', AnimalSchema);

const UsuarioSchema = new mongoose.Schema({
     rol: { type:String,maxlength:30},
     nombreCompleto: String,
     nombreUsuario: String,
     email: String,
     clave: String,    
     estado: { type:Number, default:1}
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);



export {Test,Animal,Usuario};
