import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config 
//server running karega port pe
const app= express()
const port = process.env.PORT||4000

// middleware
// use fronted backend me request ke liye
app.use(express.json())
// ye backend se fronted me accesss ke liye
app.use(cors())

//db connection
connectDB();

// api endpoints
app.use('/api/food',foodRouter);
//iska use se hum image access kar sakte h database se
app.use("/images",express.static('uploads'))

app.use("/api/user",userRouter);

//inka use cart ko reload karne per hte na
app.use("/api/cart",cartRouter)

//place karne ke liye
app.use("/api/order",orderRouter)



//http method h jo requsting ke liye use hota h delete , insert and any
app.get("/",(req,res)=>{
    res.send("API Working")
})

// run server ke liye
app.listen(port,()=>{
    console.log(`Server Started on http:localhost:${port}`)
})

//mongodb+srv://20rohitsehgal:<db_password>@cluster0.orw4pih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0