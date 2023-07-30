const fs = require ("fs")

class ProductManager{

    productId = 0

    constructor() {
        this.products = []
        this.path = "src/files/Products.JSON"
    }

    async addProduct({
        title, 
        description, 
        code, 
        price, 
        status = true, 
        stock, 
        category, 
        thumbnail = []
    }){
        try {

            this.productId++

            const newProduct = {
                id: this.productId,
                title, 
                description, 
                code, 
                price, 
                status, 
                stock, 
                category, 
                thumbnail,
            }
            

            if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8")
                this.products = JSON.parse(data)

                const check = this.products.find(product => product.code === code)

                if (check){
                    console.log("Código de producto existente");
                }else{
                    if(!title || !description || !code || !price || !status || !stock || !category){
                        console.log ("Todos los campos deben ser completados!")
                    }else{
                        this.products.push(newProduct)
                        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                        console.log("Producto agregado exitosamente");
                    }
                }
            }else{
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                console.log("Producto agregado exitosamente");
            }

            
        } catch (error) {
            console.log(error);
        }

        
    }


    async getProducts(){
        try {

            if(fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8")
                this.products = JSON.parse(data)
                console.log(this.products)
                return this.products
            }else{
                console.log(this.products)
                return this.products
            }

            
        } catch (error) {
            console.log(error);
        }
        
    }

    async getProductById(id){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            this.products = JSON.parse(data)
            const productById = this.products.find(product => product.id === id)

            if (productById){
                console.log(productById);
                return productById
            }else{
                console.log("Not found");
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            this.products = JSON.parse(data)
            const productIndex = this.products.findIndex(product => product.id === parseInt(id))

            if(productIndex !== -1){
                this.products.splice(productIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                console.log("Producto eliminado exitosamente");
            }else{
                console.log("Producto no encontrado");
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    async updateProduct(id, values){
        try {
            
            const data = await fs.promises.readFile(this.path, "utf-8")
            this.products = JSON.parse(data)

            const productIndex = this.products.findIndex(product => product.id === parseInt(id))
            
            if(productIndex !== -1){

                this.products[productIndex] = {
                    ... this.products[productIndex],
                    ... values
                }
                
                await fs.promises.writeFile(this.path, JSON.stringify(this.products))

                console.log("Producto modificado exitosamente");
            }else{
              console.log("Object with ID or value not found.")
            }
        }catch (error) {
            
        }
    }
}

module.exports = ProductManager;