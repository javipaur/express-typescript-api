import express from 'express'
import { getPharmacies } from '../services/pharmacyService'

const router =express.Router()

router.get('/',getPharmacies)
    
  


router.post('/',(_req,res)=>{
    res.send('Saving a diary!!')
})

export default router;