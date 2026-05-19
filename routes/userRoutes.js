import express from "express";
import { changeUserRole, combineData, deleteUserProfileController, getAllUsers, getUserRole, loginUserController, logoutUser, resetPasswordController, resetPasswordRequestController, resgisterUserController, updatePasswordController, updateUserProfileController, userProfileController } from "../controllers/userController.js";
import { isAuthenticatedUser, isAdmin } from "../util/userAuth.js";
const userRouter = express.Router();

userRouter.post("/register-user", resgisterUserController);
userRouter.post("/login-user", loginUserController);
userRouter.get("/user-profile", isAuthenticatedUser, userProfileController)
userRouter.put("/update-profile", isAuthenticatedUser, updateUserProfileController);
userRouter.delete("/delete-profile", isAuthenticatedUser, deleteUserProfileController);
userRouter.get("/get-all-users", isAuthenticatedUser, getAllUsers)
userRouter.get("/logout", isAuthenticatedUser, logoutUser);
userRouter.post("/reset-password-request", resetPasswordRequestController);
userRouter.put("/reset-password/:token", resetPasswordController);
userRouter.put("/update-password", isAuthenticatedUser, updatePasswordController)
userRouter.get("/combine-data", isAuthenticatedUser, combineData)
userRouter.get("/get-user-role", isAuthenticatedUser, getUserRole)
userRouter.put("/change-user-role/:id", isAuthenticatedUser, isAdmin("admin"), changeUserRole)

export default userRouter

