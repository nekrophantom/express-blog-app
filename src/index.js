import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoute from './routes/index.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = new express()
const PORT = process.env.PORT

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1', indexRoute)

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
})