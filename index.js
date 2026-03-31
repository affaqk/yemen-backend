import express from "express";
const app = express();
import dotenv from "dotenv";
import Connection from "./db/conn.js";
import productsRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config()
app.use(express.json())
app.use(cookieParser())

Connection()

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", userRouter)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})

// http://localhost:8000/api/v1/products/create-product