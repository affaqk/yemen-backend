import express from "express";
import { isAuthenticatedUser } from "../util/userAuth.js";
import { createOrder } from "../controllers/OrderControllers.js";
const orderRouter = express.Router()

orderRouter.post("/create-order", isAuthenticatedUser, createOrder);
export default orderRouter;