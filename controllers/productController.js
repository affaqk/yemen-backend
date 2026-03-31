import Product from "../models/productModel.js";
import ApiFeatures from "../util/ApiFeatures.js"

// create product 
export const createProducts = async (req, res) => {
    try {
        console.log("inside create product");
        
        const product = await Product.create(req.body)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not created"
            })
        }

        return res.status(201).json({
            success: true,
            message: "product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const apiFunctionality = new ApiFeatures(Product.find(), req.query).search().filter().pagination()
        const products = await apiFunctionality.query
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "products not found"
            })
        }

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

// to edit the product detail

export const updateProductController = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product not found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators : true
        })

        return res.status(200).json({
            success : true,
            message : "product updated successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const deleteProductController = async (req,res) => {
    try{
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product not found"
            })
        }

        product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success : true,
            message : "Product deleted successfully"
        })
    } catch(error){
        return res.status(500).json({
            success : false,
            error
        })
    }
}