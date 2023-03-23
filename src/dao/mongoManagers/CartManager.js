import { cartModel } from "../models/carts.model.js";

export default class CartManager {
    async getCarts() {
        try {
            const carts = await cartModel.find()
            if (!carts) {
                return `No existen carts en el sistema`
            } else {
                return carts
            }
        } catch (error) {
            return error
        }
    }

    async addCart(objCart) {
        try {
            const newCart = await cartModel.create(objCart)
            return newCart
        } catch (error) {
            return error
        }
    }

    async addProductsToCart(objProd) {
        try {

        } catch (error) {
            console.log(error)
        }

    }

    async updateQuantity(cid, _id, quantity) {
        try {
            const cart = await cartModel.findById(cid)
            const productIndex = cart.products.findIndex(product => product.product.toString() === _id)
            if (productIndex >= 0){
                cart.products[productIndex].quantity += quantity;
                cart.save()
                return cart
            } else {
                return 'Producto no encontrado'
            }
        } catch (error) {
            console.log(error) 
        }
    }

    async deleteProductToCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid)
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid)
            cart.products = await cartModel.deleteOne(productIndex)
            cart.save()
            return cart            
        } catch (error) {
            console.log(error) 
        }
    }

    async getCartById(idCart) {
        try {
            const carts = await cartModel.find()
            const cart = await cartModel.findById(parseInt(idCart))
            return cart
        } catch (error) {
            return error
        }
    }

}