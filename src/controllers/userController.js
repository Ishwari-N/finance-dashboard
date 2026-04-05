const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Validation: Check if the user sent all required info
        if (!name || !email || !password) {
            return res.status(400).json({ 
                error: "Please provide name, email, and password." 
            });
        }

        // 2. Call the service to save the user
        const newUser = await userService.createUser(name, email, password, role);

        // 3. Send back the success response
        res.status(201).json({
            message: "User registered successfully!",
            user: newUser
        });

    } catch (err) {
        console.error("Registration Error:", err);

        // Handle unique constraint error (e.g., email already exists)
        if (err.code === '23505') {
            return res.status(400).json({ error: "Email already registered." });
        }

        res.status(500).json({ error: "Something went wrong on our end." });
    }
};

module.exports = {
    register
};