import express from "express";
import { isAdmin, isAuthenticatedUser } from "../util/userAuth.js";
import { createOrder, getAllOrders, getSingleOrder, myOrderDetails } from "../controllers/OrderControllers.js";
const orderRouter = express.Router()

orderRouter.post("/create-order", isAuthenticatedUser, createOrder);
orderRouter.get("/order-details/:id", isAuthenticatedUser, isAdmin("admin"), getSingleOrder);
orderRouter.get("/my-order", isAuthenticatedUser, myOrderDetails);
orderRouter.get("/all-orders", isAuthenticatedUser, isAdmin("admin"), getAllOrders)
export default orderRouter;