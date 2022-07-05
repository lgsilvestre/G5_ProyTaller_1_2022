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
  fotos: Array,
  idForm: String,
  caso: String,
  descripcion : String
});

const Animal = mongoose.model("Animal", AnimalSchema);

const UsuarioSchema = new mongoose.Schema({
  rol: { type: String, maxlength: 30 },
  nombreCompleto: String,
  email: { type: String, unique: true },
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
  respuesta: String,
});

const FormularioSchema = new mongoose.Schema({
  nombre: String,
  preguntas: { type: [PyRschema] }
});
const Formulario = mongoose.model("Formulario", FormularioSchema);

const SolicitudesSchema = new mongoose.Schema({
  preguntas: { type: [PyRschema] },
  mascota: Object,
  usuario: Object
});
const Solicitud = mongoose.model("Solicitud", SolicitudesSchema);

const EventoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: String,
  hora: String,
  foto: String | null,
});
const Evento = mongoose.model("Evento", EventoSchema);

const SolicitudAceptada = mongoose.model("SolicitudAceptada",SolicitudesSchema);

const RecoverSchema = new mongoose.Schema({
  email: String,
  code: String
});
const Recover = mongoose.model("Recover", RecoverSchema);

export {
  Test,
  Animal,
  Usuario,
  Socio,
  Formulario,
  Evento,
  Solicitud,
  SolicitudAceptada,
  Recover,
};
