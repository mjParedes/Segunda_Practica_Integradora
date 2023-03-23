import { productsModel } from "../models/products.model.js";

export default class ProductsManager{
    async getProducts(){
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(objProduct){
        try {
            const newProd= await productsModel.create(objProduct)
            return newProd
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsById(idProd){
        try {
            if(idProd){
                const foundProduct= await productsModel.findById(idProd)
                return foundProduct
            } else{
                return 'Producto inexistente'
            }
        } catch (error) {
            console.log(error.mesage)
        }
    }

    async deleteProduct(idProd){
        try {
            if(idProd){
                const deleteProduct= await productsModel.deleteOne(idProd)
                return deleteProduct.id 
            } else{
                return 'Producto no encontrado'
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}