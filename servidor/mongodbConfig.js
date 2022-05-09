import mongoose from "mongoose";
import dotnev from "dotenv";
dotnev.config();
const uri = `mongodb+srv://api-mongo-kobal:${process.env.MONGO_PASS}@cluster-api.hdybb.mongodb.net/dbAdogtame?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const TestSchema = new mongoose.Schema({
  text: String,
});

const Test = mongoose.model("Test", TestSchema);

const AnimalSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  raza: String,
  tipo: String,
  foto: String | null,
});

const Animal = mongoose.model("Animal", AnimalSchema);

const UsuarioSchema = new mongoose.Schema({
  rol: { type: String, maxlength: 30 },
  nombreCompleto: String,
  email: String,
  clave: String,
  estado: { type: Number, default: 1 },
});
const Usuario = mongoose.model("Usuario", UsuarioSchema);

const SocioSchema = new mongoose.Schema({
  nombreCompleto: String,
  monto: Number,
  fechaInicio: Date,
  correo: String,
  rut: String,
  telefono: String,
});
const Socio = mongoose.model("Socio", SocioSchema);

const PyRschema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
});

const FormularioSchema = new mongoose.Schema({
    nombre: String,
    preguntas: { type: [PyRschema]}
});
const Formulario = mongoose.model("Formulario",FormularioSchema);

const EventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
  foto: String | null
});
const Evento = mongoose.model("Evento", EventoSchema);

export { Test, Animal, Usuario, Socio,Formulario, Evento };
