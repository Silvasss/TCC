import mongoose from "mongoose";
import bcrypt from "bcrypt"


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cidade: {
        type: String,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
})


User.pre("save", async function (next) {
    const passwordHash = await bcrypt.hash(this.password, 12)

    this.password = passwordHash

    next()
})


export default mongoose.model("User", User)