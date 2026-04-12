import { Error } from "mongoose";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

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

// get single order api

export const getSingleOrder = async () => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        if(!order){
            return res.status(400).json({
                success : false,
                message : "Order not found"
            })
        }

        return res.status(200).json({
            sucess : true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const myOrderDetails = async (req,res) => {
    try {
        const order = await User.find({user : req.user.id});
        if(!order){
            return res.status(400).json({
                success : false,
                message : "Order not found"
            })
        }
        return res.status(200).json({
            success : true,
            order
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find();
        if(!orders){
            return res.status(400).json({
                success : false,
                message : "orders not found"
            })
        }

        let total = 0;
        orders.forEach((order)=>{
            total = total + order.totalPrice
        })

        return res.status(200).json({
            success : true,
            orders,
            total
        })
    } catch (error) {
        return res.status(200).json({
            success : false,
            error
        })
    }
}