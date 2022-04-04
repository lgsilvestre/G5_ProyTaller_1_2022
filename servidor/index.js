import express from 'express'
import cors from 'cors'
const app = express()
import {routesConfig} from './routes/index.js'
import dotenv from 'dotenv'
dotenv.config()
app.use(express.json())

// disable cors for all routes

app.use(cors({origin: '*'}))

app.set('port',process.env.port || 3000)

routesConfig(app)

app.listen(app.get('port'), () => {
  console.log('server on port' + app.get('port'));
})
