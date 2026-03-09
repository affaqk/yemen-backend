import mongoose from "mongoose";
import validator from "validator"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        maxLength: 20,
        minLength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Enter your email"],
        validate : [validator.isEmail, "Enter valid email"]
    },
    password: {
        type: String,
        minLength: 8,
        required: [true, "Enter your password"],
        select: false
    },
    profile: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    roles : {
        type : String,
        default : "user"
    }
},{
    timestamps : true
})

const User = mongoose.model("User", userSchema);
export default User