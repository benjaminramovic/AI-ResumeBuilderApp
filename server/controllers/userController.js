import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "Please provide name, email and password!"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User with this email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({name, email, password: hashedPassword})

        const token = generateToken(newUser._id)
        newUser.password = undefined

        return res.status(201).json({
            message: "User registered successfully",
            token,
            nuser: newUser
        })
       
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}