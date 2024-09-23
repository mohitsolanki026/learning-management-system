const admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');

const authAdmin = async (req, res, next) => {
    try {
        if(!req.header('Authorization')) throw new Error("Token not found");
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token) throw new Error("Token not found");
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedData) throw new Error("Invalid Token");
        const adminData = await admin.findOne({ _id: decodedData.id });
        if (!adminData) {
            throw new Error();
        }
        req.admin = adminData;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Please authenticate', error: error?.name});
    }
}

module.exports = authAdmin;