import User from "../models/userModel.js"

export const resgisterUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            profile: {
                public_id: "id",
                url: "url"
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not created successfully"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user registered successfully",
            user
        })
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

        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user loggedin successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const userProfileController = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
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
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

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
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user not found"
            })
        }

        user = await User.findByIdAndDelete(req.params.id);
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

// post and put
