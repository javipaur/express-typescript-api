import express from 'express'
import { getEventsJimmyJazz } from '../src/services/eventService'

const router =express.Router()

router.get('/events',getEventsJimmyJazz)
    
  


router.post('/',(_req,res)=>{
    res.send('Saving a diary!!')
})

export default router;