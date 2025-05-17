import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import 'dotenv/config'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'
import path from 'path'



//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//midlewares
app.use(express.json())
app.use(cors())

//endpoints api
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})


app.get('/', (req, res)=> {
    res.send('hello from backend   ')
})

app.listen(port, ()=>console.log("server Started ", port))