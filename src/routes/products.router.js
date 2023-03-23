import { Router } from "express";
import ProductsManager from '../dao/mongoManagers/ProductManager.js'
import { productsModel } from "../dao/models/products.model.js";


const productsManager = new ProductsManager()

const router = Router()

router.get('/',async (req, res) => {
    const {limit=10,page=1,title}= req.query
    const productsFilter = await productsModel.paginate({title},{limit,page})
    
    if(!productsFilter){
        res.json({status:'Error'})
    } else {
        res.json({status:'Success', productsFilter})
    }
})

router.get('/:pid',async(req,res)=>{
    const {pid}= req.params
    try {
        const product= await productsManager.getProductsById(pid)
        if(product){
            res.status(200).json({message:'Producto encontrado con exito',product})
        }else{
            res.status(400).json({error: 'No existe producto con ese ID'})
        }
    } catch (error) {
        res.send(error)
    }
})

// Aggregation
router.get('/aggregation',async(req,res)=>{
    const products = await productsModel.aggregate([
        {$match:{ category: 'Electro'}},
        {$group: {
            _id:'$category',
            promedio:{$avg: '$price'},
            cantidad: {$sum:'$price'},
            },
        },
        {
            $sort: { cantidad: 1}
        },
    ])
    res.json({products})
})

router.post('/',async (req, res) => {
    const { title,description,code,price,stock,category,}= req.body
    if(!title || !description || !code || !price || !stock || !category){
        res.json({message:'Values required'})
    } else {
        const newProduct = productsManager.addProduct({
            title,
            description,
            code,
            price,
            stock,
            category
        })
        if(!newProduct){
            res.json({message:'Error'})
        } else {
            res.json({message:'Success', product: newProduct})
        }
    }
})

router.delete('/:pid', async(req,res)=>{
    const {pid}= req.params
    const product= await productsManager.deleteProduct(parseInt(pid))
    res.json({message:'Producto eliminado con exito',product})
})

export default router



