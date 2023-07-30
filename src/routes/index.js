const productsController = require("../products/controller")
const cartsController = require("../carts/controller")

const router = (app) => {
    app.use("/products", productsController)
    app.use ("/carts", cartsController)
}



module.exports = router