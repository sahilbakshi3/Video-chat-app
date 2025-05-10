import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const {email, password, fullName} = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "Email already exists, please use a different one" });
        }

        const idx = Math.floor(Math.random() * 100) +1;
        const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${idx}.png`

        const newUser =  await User.create({
            email, 
            fullName,
            password,
            profilePic: randomAvatar,
        })

        // TODO => create a new user in stream as well.


        const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 100,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.status(201).json({success:true, user:newUser})

    } catch (error) {
        console.log("Error in sign up controller", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }

}

export async function login(req, res) {
    res.send("login Route");
}

export async function logout(req, res) {
    res.send("logout Route");
}