const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { generateToken } = require('../utils/jwt.utils');

class AuthService {
  async register(userData) {
    const hashedPassword = await hashPassword(userData.password);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    const token = generateToken(user._id);
    return { user, token };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !await comparePassword(password, user.password)) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken(user._id);
    return { user, token };
  }
}

module.exports = new AuthService();