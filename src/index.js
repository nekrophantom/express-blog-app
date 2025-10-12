import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoute from './routes/index.route.js'

dotenv.config()

const app = new express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1', indexRoute)

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`);
})