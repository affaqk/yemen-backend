import Product from "../models/productModel.js";
import ApiFeatures from "../util/ApiFeatures.js"

// create product 
export const createProducts = async (req, res) => {
    try {
        
        // const product = await Product.create(req.body)

        const { title, description, price, category, stock } = req.body;
        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            images : {
                public_id : "1",
                url : "data:image/jpeg;base64,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HvaD8lHkwSld7VLA7viYfUIPjszt4heiQcV9fDk5Rf1On/wY/wB1Wn8k8PO2gpD308R/yoPlPCMampZOkp5TG4ixtYhw4Oa4Frh3hZ5nOTiI/pDD3wQfuL6K/kZhn9m0f6tD+6n8i8M/s2j/AFaH91B89N50sQGmaA98I+RCvs51K4bW0zu+N4/ZkC+gP5H4da3+z6S3D6PF+6rDuQuFn/l1L/gxj0CDiVPzuz/XpYXHflfIzyDsyyVNztx/zlG9vayVr/g5jfVdWl5vcKdtw+n8GBvpZRJOazB3f0Fg7nyj0eg0WLnWoztjqW/oRH0lWToucTDXnrVBaeD45BfvcAWjzWYqeZrCXezHLF9iZ/8AnLljJeYyh+rVVTe90Lv/AFhBLHLKgd/Tafxka39ohWsQ5YUMLM7qqN3BsbmyOd3NaT9yxsvMRF9SvkH2omO9C1RjzDHdiQ/Vf9dBHPOvS/1eo8o/31Q/nZg+rSzHvMY9CVK/3DO/tIfqv+ur8HMPGPbxB7vswtb6ucg1+fnbfrko2jgXTE/9oYPVYSu5yMQk0a+OEX/m2C9uBMhd8LLpUPMZRD2qqqd3GJt//GVlKTmdwpmpjlk+3M/0ZZBwGuxaoqPy08ktzsc9xb4NvlHgpmD8np6ggRwySfZabea+k8P5F4dB+TooQeJbmPm65Wciia0Wa0NHAAAfBBy3kTzfzx2dKBC3blGrj32XUoYg1oaNgCrRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q=="
            }
        })
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