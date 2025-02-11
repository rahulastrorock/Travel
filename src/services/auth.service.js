const { getUserCollection } = require('../utils/connection.utils');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { generateToken } = require('../utils/jwt.utils');
const crypto = require('crypto');

class AuthService {
    async register(userData) {
        try {
            const User = await getUserCollection();
            
            // Check if user exists
            const existingUser = await User.collection.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash password
            const hashedPassword = await hashPassword(userData.password);

            // Create user using collection.insertOne
            const result = await User.collection.insertOne({
                ...userData,
                password: hashedPassword,
            });

            // Get created user
            const user = await User.collection.findOne({ _id: result.insertedId });
            
            // Generate token
            const token = generateToken(user._id);
            
            return { user, token };
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        const User = await getUserCollection();
        // Update projection to include username and _id and role
        const user = await User.collection.findOne(
            { email },
            { projection: { email: 1, password: 1, username: 1,role :1, _id: 1 } }
        );
        
        if (!user || !await comparePassword(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        // Generate bearer token
        const token = generateToken(user._id);

        // Return user details and token
        return { 
            user: {
                email: user.email,
                username: user.username,
                role: user.role,
                _id: user._id
            },
            token 
        };
    }

    async requestPasswordReset(email) {
        try {
            const User = await getUserCollection();
            const user = await User.collection.findOne({ email });
            if (!user) throw new Error('Email not registered');

            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 3600000; // 1 hour

            // Update user document with reset token
            await User.collection.updateOne(
                { email },
                { 
                    $set: {
                        resetPasswordToken: resetToken,
                        resetPasswordExpiry: resetTokenExpiry
                    }
                }
            );

            return resetToken;
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(token, newPassword) {
        try {
            const User = await getUserCollection();
            const user = await User.collection.findOne({
                resetPasswordToken: token,
                resetPasswordExpiry: { $gt: Date.now() }
            });
            
            if (!user) throw new Error('Invalid or expired token');

            const hashedPassword = await hashPassword(newPassword);

            // Update password and clear reset token
            await User.collection.updateOne(
                { _id: user._id },
                {
                    $set: { password: hashedPassword },
                    $unset: { 
                        resetPasswordToken: "",
                        resetPasswordExpiry: ""
                    }
                }
            );

            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();