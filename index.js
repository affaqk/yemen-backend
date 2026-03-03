import express from "express";
const app = express();
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import productsRouter from "./routes/productRoutes.js";

dotenv.config()
app.use(express.json())

Connection()

app.use("/api/v1/products", productsRouter)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

// http://localhost:8000/api/v1/products/create-product