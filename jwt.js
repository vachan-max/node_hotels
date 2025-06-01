const jwt = require('jsonwebtoken');
require('dotenv').config();

const authmiddlewear = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "unauthorized" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(401).json({ error: "invalid token" });
    }
};

const generateToken = (userdata) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(userdata, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { authmiddlewear, generateToken };
