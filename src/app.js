const express = require("express")
const router = require("./routes")



const port = 8080
const app = express()

app.use(express.json())

router(app)

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})





