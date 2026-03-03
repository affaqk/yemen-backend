import express from "express";
import { createProducts, getAllProducts, getProductDetail } from "../controllers/productController.js";

const productsRouter = express.Router()

productsRouter.post("/create-product", createProducts)
productsRouter.get("/get-all-products", getAllProducts);
productsRouter.get("/product-detail/:id", getProductDetail)
export default productsRouter