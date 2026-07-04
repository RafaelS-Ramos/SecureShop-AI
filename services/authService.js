const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

async function login(email, password) {
    const user = await userModel.findByEmail(email);

    if (!user) {
        throw new Error('Invalid_credentials');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        throw new Error('Invalid_credentials');
    }

    return user;
}

async function register(name, email, password) {
    if (password.length < 8) {
        throw new Error('WEAK_PASSWORD');
    }

    const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            throw new Error('EMAIL_ALREADY_EXISTS');
        }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await userModel.createUser(
        name,
        email,
        hashedPassword,
        "USER"
    );
}

module.exports = {
    login,
    register
};