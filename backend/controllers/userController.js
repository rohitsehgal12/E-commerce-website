import userModel from "../models/userModel.js";
// use authentication ke liye
import jwt from "jsonwebtoken"
// edit bcrypt
import bcrypt from "bcrypt"
// edit validator
import validator from "validator"


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Does not Exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials(pass not matched)" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }

}













// iske use karke hum data base me token through data pahuchaenge
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //check is user already exists
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already Exists " })
        }
        //validating email format & strong password 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter a valid email" })
        }
        //strong password ke liye 
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hasing user password  bcrypt se 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        // iska use karke hum database me add kar rhe h
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }

}

export { loginUser, registerUser }

