import Jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        }

        //check existing user
        const existingUSer = await userModel.findOne({ email });
        if (existingUSer) {
            return res.status(400).send({
                success: false,
                message: "User is already exist please login"
            })
        }
        // hash password and save user detail
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({
            name, email, phone, address, password: hashedPassword
        }).save()
        return res.status(201).send({
            success: true,
            message: "User registred successfully",
            user
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while register data",
            error
        })
    }

}

//login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email does not exists"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(400).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = Jwt.sign({ _id: user.id }, process.env.SECRET_KEY, { expiresIn: "8d" })
        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while login",
            error
        })
    }
}

//test
export const testController = (req, res) => {
    return res.status(200).send({
        success: true,
        message: "test user"
    })
}