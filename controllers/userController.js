import User from "../models/userModel.js"
import { sendToken } from "../util/jwtToken.js";
import { sendEmail } from "../util/sendMail.js";
import crypto from "crypto"

export const resgisterUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            profile: {
                public_id: "id",
                url: "data:image/jpeg;base64,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"
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not created successfully"
            })
        }

        sendToken(user, 200, res)
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}


export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password cannot be empty"
            })
        };

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        let passwordMatched = await user.comparePassword(password)

        if(!passwordMatched){
            return res.status(400).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        sendToken(user, 200, res)

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const userProfileController = async (req, res) => {
    try {
        
        // const { id } = req.params;
        // const user = await User.findById(id).select("-password")
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateUserProfileController = async (req, res) => {
    try {
        // let user = await User.findById(req.params.id);
        // if (!user) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "User not found"
        //     })
        // }
        // user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

         let user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }

}

export const deleteUserProfileController = async (req,res) => {
    try {
        // let user = await User.findById(req.params.id);
        // if(!user){
        //     return res.status(400).json({
        //         success : false,
        //         message : "user not found"
        //     })
        // }

        // user = await User.findByIdAndDelete(req.params.id);
        let user = await User.findByIdAndDelete(req.user._id)
        
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "user deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const logoutUser = async (req,res) => {
    try {
        res.cookie("token", null, {
            expires : new Date(Date.now()),
            httpOnly : true
        })

        return res.status(200).json({
            success : true,
            message : "User loggedout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const resetPasswordRequestController = async (req,res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }

        let resetToken = user.resetPassword();
        console.log(resetToken);
        await user.save({validateBeforeSave : false})
        
        const resetPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`
        const message = `if you want to reset your password click on above link ${resetPasswordUrl}`;

        console.log(resetPasswordUrl);
        console.log(message);
        
        await sendEmail({
            email : user.email,
            subject : "Reset Password Request",
            message
        })

        res.status(200).json({
            success : true,
            message : `Email sent successfully to ${user.email}`
        })
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        console.log(req.params.token);
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire : { $gt : Date.now()}
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid token or its been expired"
            })
        }

        const { password, confirmPassword } = req.body;
        if( password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password doesnt match to each other"
            })
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        sendToken(user, 200, res)
    } catch (error) {
        return res.status(500).json({
            success : false,
            error
        })
    }
}

export const updatePasswordController = async (req,res) => {
    try { 
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = await User.findById(req.user._id).select("+password");
        const isPasswordMatched = await user.comparePassword(oldPassword);

        if(!isPasswordMatched){
            return res.status(400).json({
                success : false,
                message : "Old password is incorrect"
            })
        }

        if( newPassword !== confirmNewPassword ){
            return res.status(400).json({
                success : false,
                message : "Password doesnt match to each other"
            })
        }

        user.password = newPassword;
        await user.save();
        sendToken(user, 200, res)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success : false,
            error
        })
    }
}

// post and put
