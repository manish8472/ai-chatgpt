import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constansts.js";
export const getAllUsers = async (req, res, next) => {
    // get all users
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "Ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error", couse: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    // User signup
    try {
        const { name, email, password } = req.body;
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(401).send("User already Resistered");
        }
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "Ok", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error", couse: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    // User signup
    try {
        // user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }
        //create token and store cookie
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "Ok", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error", couse: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    // User signup
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ message: "Ok", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error", couse: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    // User signup
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "Ok", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Error", couse: error.message });
    }
};
//# sourceMappingURL=user.controllers.js.map