import express from "express";
import { createProducts, deleteProductController, getAllProducts, getProductDetail, updateProductController } from "../controllers/productController.js";

const productsRouter = express.Router()

productsRouter.post("/create-product", createProducts)
productsRouter.get("/get-all-products", getAllProducts);
productsRouter.get("/product-detail/:id", getProductDetail)
productsRouter.put("/update-product/:id", updateProductController);
productsRouter.delete("/delete-product/:id", deleteProductController)
export default productsRouter

// post ( to set the data in database and save that data in database )
// get ( to retrieve the data from database )
// put / patch ( put is use to update the data from database, patch will also update the product but it will update whole product)
// delete ( to delete something from database)