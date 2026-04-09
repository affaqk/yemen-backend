import Order from "../models/orderModel.js";

export const createOrder = async (req,res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, taxPrice, shippingCost, totalPrice, orderStatus } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            taxPrice,
            shippingCost,
            totalPrice,
            orderStatus,
            user : req.user.id,
            paidAt : Date.now()
        })

        if(!order){
            return res.status(400).json({
                success : false,
                message : "order not created"
            })
        }

        return res.status(200).json({
            success : true,
            message : "order created successfully",
            order
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}