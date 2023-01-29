import express from 'express'
import { getEventsJimmyJazz } from '../services/eventService'

const router =express.Router()

router.get('/',getEventsJimmyJazz)
    
  


router.post('/',(_req,res)=>{
    res.send('Saving a diary!!')
})

export default router;