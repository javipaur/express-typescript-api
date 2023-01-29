import express from 'express'

import eventRouter from '../src/routes/events'
import pharmacyRouter from '../src/routes/pharmacys'


const app =express()
app.use(express.json())

const PORT = process.env.PORT || 4000;

app.get('/ping',(_req,res)=>{
    console.log('someone pinged here!!!')
    res.send('pong')
})

app.use('/',(_req,res)=>{res.send('La pagina de incio')})
app.use('/events',eventRouter)
app.use('/pharmacy',pharmacyRouter)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})