const User = require('../models/user');
const bcrypt = require('bcryptjs');

// 01. User Registration //
//-----------------------//
exports.User_Registration = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // --- Validate Required Fields --- //
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email, and password"
            });
        }

        // --- Validate Email (@gmail.com) --- //
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Email must be a valid @gmail.com address"
            });
        }

        // --- Check Email already exists --- //
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // --- Password Validation (Length >= 8) --- //
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        // --- Hash Password --- //
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // --- Save User --- //
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            newUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 02. User Login //
//----------------//
exports.User_Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- Validate Required Fields --- //
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // --- Check if User exists --- //
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // --- Validate Password --- //
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({
            message: "Login successful",
            existingUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
