import { Router } from "express";
import { messagesModel} from '../dao/models/messages.model.js'

const router = Router()

router.get('/', async(req,res)=>{
    res.render('chat',{})
})

router.get('/showMsgs', async(req,res)=>{
    try {
        const messages = await messagesModel.find()
        res.send(messages)
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async(req,res)=>{
    const message= req.body
    const response = await messagesModel.create(message)
    res.send(response)
})

export default router

