import mongoose from "mongoose";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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
    role : {
        type : String,
        default : "user"
    }
},{
    timestamps : true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {expiresIn : "7d"})
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);
export default User

// 12345678 => ^salt$salt^salt£^&%(*&&**&&&(($^~^)))
// password => ^salt$salt^salt£^&%(*&&**&&&(($^~^)))
//

//(*&&(&^&*()))