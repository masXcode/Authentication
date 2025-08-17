import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import usersRouters from './routers/users.routers.js'




const app = express()
app.use(express.json())



// cors sittings
const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
}
app.use(cors())

dotenv.config() // to use secret data in .env

// routers 
app.use('/api', usersRouters)


// connecting with dataBase
const connectDB = async (DB_uri) =>{
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(DB_uri)
        console.log('successful connection with DataBase')
    }
    catch(error){
        console.log(`error connecting with dataBase: ${error}`)
        process.exit(1)
    }
}   

connectDB(process.env.DB_uri)



app.listen(process.env.port, console.log(`server is running...`))