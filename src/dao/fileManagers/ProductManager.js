import fs from 'fs'

export default class ProductManager {
  constructor(path) {
    this.path = path
  }

  async getProducts(limit) {
    if (fs.existsSync(this.path)) {
      const productos = await fs.promises.readFile(this.path, 'utf-8')
      if (limit === 'max') {
        return JSON.parse(productos)
      } else {
        return JSON.parse(productos).slice(0, limit)
      }
    } else {
      return []
    }
  }

  async getProductsById(idProduct) {
    try {
      const productos = await this.getProducts()
      const producto = productos.find((p) => p.id === parseInt(idProduct))
      return producto
    } catch (error) {
      return error
    }
  }

  async addProduct(product) {
    try {
      const {title, description, code, price, stock, category, thumbnails}= product
      if(!title || !description || !code || !price || !stock || !category ){
        return 
      }
      const producto = {
        id: await this.#generarId(),
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status: true
      }

      const productos = await this.getProducts()
      productos.push(producto)
      await fs.promises.writeFile(this.path, JSON.stringify(productos))
      return producto
    } catch (error) {
      return error
    }
  }

  async updateProduct(idProduct, change) {
    try {
      const productos = await this.getProducts()
      const indexProducto = productos.findIndex((p) => p.id === idProduct)
      if (indexProducto === -1) throw new Error("Producto no encontrado")
      const productoActualizado = { ...productos[indexProducto], ...change }
      productos.splice(indexProducto, 1, productoActualizado)
      await fs.promises.writeFile(this.path, JSON.stringify(productos))
      return productoActualizado
    } catch (error) {
      return error
    }
  };

  async deleteProduct(id) {
    try {
      const productos = await this.getProducts()
      const indexProducto = productos.findIndex((p) => p.id === id)
      if (indexProducto === -1) throw new Error('Producto no encontrado')
      productos.splice(indexProducto, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(productos))
      return id
    } catch (error) {
      return error
    }

  };

  async #generarId() {
    const productos = await this.getProducts()
    let id = productos.length === 0
      ? 1
      : productos[productos.length - 1].id + 1
    return id
  }

}


