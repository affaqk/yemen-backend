import express from "express";
import { deleteUserProfileController, loginUserController, logoutUser, resetPasswordController, resetPasswordRequestController, resgisterUserController, updatePasswordController, updateUserProfileController, userProfileController } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../util/userAuth.js";
const userRouter = express.Router();

userRouter.post("/register-user", resgisterUserController);
userRouter.post("/login-user", loginUserController);
userRouter.get("/user-profile/:id", isAuthenticatedUser, userProfileController)
userRouter.put("/update-profile/:id", isAuthenticatedUser, updateUserProfileController);
userRouter.delete("/delete-profile/:id", isAuthenticatedUser, deleteUserProfileController);
userRouter.get("/logout", isAuthenticatedUser, logoutUser);
userRouter.post("/reset-password-request", resetPasswordRequestController);
userRouter.post("/reset-password/:token", resetPasswordController);
userRouter.post("/update-password/:id", updatePasswordController)

export default userRouter

