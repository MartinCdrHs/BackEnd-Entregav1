const {Router} = require("express")
const fs = require ("fs")
const router = Router()

const path = "src/files/Carts.JSON"


router.get("/:cid", async (req, res)=>{
    try {
        const data = await fs.promises.readFile(path,"utf-8")
        let carts = JSON.parse(data)

        const {cid} = req.params
        
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(cid))
       
        if(cartIndex !== -1){
            products = carts[cartIndex].products
            return res.json({message: "Cart found", cart : products})
        }else{
            console.log("Cart not found");
            return res.json({message: "Cart not found"})
        }
        
        
    } catch (error) {
        console.log(error);
    }

})


let cartId = 0

router.post("/", async (req, res)=> {
    
    try {
        cartId++

        const newCart = {
            id: cartId,
            products : []
        }

        let carts = []

        if (fs.existsSync(path)){

            const data = await fs.promises.readFile(path, "utf-8")
            
            carts = JSON.parse(data)

            carts.push(newCart)

            await fs.promises.writeFile(path,JSON.stringify(carts))
            console.log("Carrito generado exitosamente");
        }else{
            carts.push(newCart)
            await fs.promises.writeFile(path,JSON.stringify(carts))
            console.log("Carrito generado exitosamente");
        }
        return res.json({message: "New cart created successfully"})
        
    } catch (error) {
        console.log(error)
        return res.json({message: "Failed to create new cart"})
    }
})


router.post("/:cid/product/:pid", async (req, res)=>{
    try {
        const data = await fs.promises.readFile(path,"utf-8")
        let carts = JSON.parse(data)

        const {cid, pid} = req.params
        
        const cartIndex = carts.findIndex(cart => cart.id === parseInt(cid))
       
        if(cartIndex !== -1){
            const cart = carts[cartIndex]
            const pIndex = cart.products.findIndex(prod => prod.id === parseInt(pid))

            if(pIndex !== -1){
                cart.products[pIndex].quantity++
            }else{
                const newProduct = {
                    id: parseInt(pid),
                    quantity: 1
                }

                cart.products.push(newProduct)
            }

            await fs.promises.writeFile(path, JSON.stringify(carts))

            return res.json({message: "Product added successfully"})

            
        }else{
            console.log("Cart not found");
            return res.json({message: "Cart not found"})
        }
        
        
    } catch (error) {
        console.log(error);
    }

})

module.exports = router