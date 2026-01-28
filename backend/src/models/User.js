import mongoose from 'mongoose'

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: "",
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    }
}, 
{timestamps: true} // createdAt, updateAt
) 

// user model
const User = mongoose.model("User", userSchema)

export default User 