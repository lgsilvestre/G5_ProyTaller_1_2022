import express from 'express'
import cors from 'cors'
const app = express()
import {routesConfig} from './routes/index.js'
import dotenv from 'dotenv'
import * as functions from 'firebase-functions';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAUrDNYdpt34y3WwMvOFupbNx4k9uCMOV4",
  authDomain: "adogtame-1fa85.firebaseapp.com",
  projectId: "adogtame-1fa85",
  storageBucket: "adogtame-1fa85.appspot.com",
  messagingSenderId: "86803290675",
  appId: "1:86803290675:web:a222b99c9dfd47344c6146"
};

dotenv.config()
app.use(express.json())

// disable cors for all routes

app.use(cors({origin: '*'}))

//app.set('port',process.env.port || 3000)

routesConfig(app)

/*
app.listen(app.get('port'), () => {
  console.log('server on port' + app.get('port'));
})
*/

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const storage = getStorage(appFirebase);

export const appNode = functions.https.onRequest(app)
