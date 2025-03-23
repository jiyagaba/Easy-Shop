const express = require("express");
const router = express.Router();
const validateSignup = require("../Middlewares/validateSignup");
const hashPassword = require("../Middlewares/hashPassword");
const db=require("../db")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // ✅ Load environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

router.post("/", async (req, res) => {
    console.log("Seller Registration Route hit", req.body);

    const { sellername, email, password, store_name } = req.body;

    if (!sellername || !email || !password || !store_name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    console.log("Seller Name:", sellername);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Store Name:", store_name);

    try {
        // Check if seller already exists
        const [existingSellers] = await db.execute(
            "SELECT id FROM sellers WHERE sellername = ? OR email = ?",
            [sellername, email]
        );

        if (existingSellers.length > 0) {
            return res.status(400).json({ message: "Seller name or Email already taken" });
        }

        // Generate email verification token
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Insert seller into database
        await db.execute(
            `INSERT INTO sellers (sellername, email, password, store_name) 
            VALUES (?, ?, ?, ?)`,
            [sellername, email, password, store_name]
        );

        const verificationUrl = `${process.env.BASE_URL}/api/seller/register/verify?token=${verificationToken}`;

        // Send verification email
        await transporter.sendMail({
            from: `"Your App" <${process.env.EMAIL}>`,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        });

        res.status(200).json({ message: "Seller registration successful. Please verify your email." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;
