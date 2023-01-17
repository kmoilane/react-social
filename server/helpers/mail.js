import nodemailer from "nodemailer";
import user from "../models/user";
require("dotenv").config();

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const mailOptions = (email, subject, message) => {
    return {
        from: "admin@kmoilane.com",
        to: email,
        subject: subject,
        text: message,
    };
};

export const registerSubject = `Welcome to ReactSocial`;

export const registerMessage = (name) => {
    return `
Hey ${name},

We're glad you decided to join our ever growing group of react socials!

You can now login to your account via email and password. We can't wait
to see what you will post and how you will make this community even greater
than it already is.

We wish you happy times on our app!

Best regards, ReactSocial
`;
};
