import fs, { existsSync } from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async addCart(products) {
        try {
            console.log(products)
            const carts = await this.getCarts()
            let id = carts.length === 0
                ? 1
                : carts[carts.length - 1].id + 1
            const cart = { id, ...products }
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return cart
        } catch (error) {
            return error
        }
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, 'utf-8')
                const cartsJS = JSON.parse(carts)
                return cartsJS
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async getCartById(idCart) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find((p) => p.id === parseInt(idCart))
            return cart
        } catch (error) {
            return error
        }
    }
}

