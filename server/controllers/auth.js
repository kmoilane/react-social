import User from "../models/user";
import { hashPassword, comparePasswords } from "../helpers/auth";
import {
    transporter,
    mailOptions,
    registerSubject,
    registerMessage,
} from "../helpers/mail";
import jwt from "jsonwebtoken";
import { json, response } from "express";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
    console.log("REGISTER ENDOPOINT =>", req.body);
    const { name, email, password, confirmPassword, secret } = req.body;
    const exist = await User.findOne({ email });

    if (!name) {
        return res.json({
            error: "Name is required",
        });
    }
    if (!email) {
        return res.json({
            error: "Email is required",
        });
    }
    if (exist) {
        return res.json({
            error: "Email is taken",
        });
    }
    if (!password || password.length < 6) {
        return res.json({
            error: "Password is required and has to be at least 6 characters long",
        });
    }
    if (confirmPassword !== password) {
        return res.json({
            error: "Passwords don't match",
        });
    }
    if (!secret) {
        return res.json({
            error: "Answer to your security questin is required",
        });
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, secret });
    try {
        await user.save();
        transporter.sendMail(
            mailOptions(email, registerSubject, registerMessage(name)),
            function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent: ${info.response}`);
                }
            }
        );
        return res.json({
            ok: true,
        });
    } catch (err) {
        console.log("REGISTER FAILED => ", err);
        return res.json({
            error: "Error. Try Again",
        });
    }
};

/*
 ** In login we first try to find the matching email/user from the database.
 ** If user is found, we then compare the passwords. If they match, we sign
 ** a JWT token for the user, and return it together with user object, whose
 ** password we have set to undefined so that we don't leak it to client.
 ** In other scenarios we return status 400 with an error message.
 */

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({
                error: "User not found",
            });

        const match = await comparePasswords(password, user.password);
        if (!match)
            return res.json({
                error: "Incorrect password",
            });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        return err.json({
            error: "Error, try again",
        });
    }
};

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);
        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
};

export const forgotPassword = async (req, res) => {
    const { email, newPassword, confirmNewPassword, secret } = req.body;

    if (!email) {
        res.json({
            error: "Whos password are you trying to change? Email is required :)",
        });
    }
    if (!newPassword || newPassword.length < 6) {
        return res.json({
            error: "New password is required and needs to be at least 6 characters long",
        });
    }
    if (newPassword !== confirmNewPassword) {
        return res.json({
            error: "Oops, there must be a typo in one of the password fields, cuz they're not matching!",
        });
    }
    if (!secret) {
        return res.json({
            error: "Secret is required to verify this is your user",
        });
    }

    const user = await User.findOne({ email, secret });
    if (!user) {
        return res.json({
            error: "We can't verify you with given data",
        });
    }

    try {
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashed });
        return res.json({
            success: "Password changed successfully!",
        });
    } catch (err) {
        return res.json({
            error: err,
        });
    }
};
