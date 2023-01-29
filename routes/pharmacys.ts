import express from 'express'
import { getPharmacies } from '../src/services/pharmacyService'

const router =express.Router()

router.get('/pharmacy',getPharmacies)
    
  


router.post('/',(_req,res)=>{
    res.send('Saving a diary!!')
})

export default router;