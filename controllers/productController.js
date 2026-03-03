import Product from "../models/productModel.js";

// create product 
export const createProducts = async (req, res) => {
    try {
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
        const products = await Product.find()
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
