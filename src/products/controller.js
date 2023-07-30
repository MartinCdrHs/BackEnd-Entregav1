const ProductManager = require("../productManager")
const {Router} = require("express")

const router = Router()
const manager = new ProductManager()

router.get("/", async (req, res) => {

    try {
        const products = await manager.getProducts()

        const { limit } = req.query
        if (limit){
            const productFilter = products.slice(0, limit)
            return res.json({message: productFilter})
        }

        res.json({message: products})
    } catch (error){}
})

router.get("/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const product = await manager.getProductById(parseInt(pid))
        return res.json({product})
    } catch (error) {
        
    }
})

router.post("/", async (req, res) => {
    try {
        const {title, description, code, price, status, stock, category, thumbnail} = req.body
        
        await manager.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
          });
        res.json({message: "Product created"})

    } catch (error) {
        console.log(error)
    }
})


router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const {
            title,
            description, 
            code, 
            price, 
            status, 
            stock, 
            category, 
            thumbnail
        } = req.body

        const boolean = status === "true"

        const values = {
            title, 
            description, 
            code, 
            price, 
            status: boolean, 
            stock, 
            category, 
            thumbnail,
        }

        console.log(pid)
        console.log(values);

        

        await manager.updateProduct(pid, values)

        return res.json({message: "Product updated"})


    } catch (error) {
        console.log(error)
    }
})

router.delete("/:pid", async (req, res)=>{
   try {
    
    const {pid} = req.params

    await manager.deleteProduct(pid)

    return res.json({message: "Product deleted"})

   } catch (error) {
    console.log(error);
   }
})

module.exports = router