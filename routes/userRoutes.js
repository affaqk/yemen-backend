import express from "express";
import { deleteUserProfileController, loginUserController, resgisterUserController, updateUserProfileController, userProfileController } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post("/register-user", resgisterUserController);
userRouter.post("/login-user", loginUserController);
userRouter.get("/user-profile/:id", userProfileController)
userRouter.put("/update-profile/:id", updateUserProfileController);
userRouter.delete("/delete-profile/:id", deleteUserProfileController)
export default userRouter

