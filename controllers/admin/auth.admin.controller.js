const admin = require('../../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const schemas = require('../../validations/joi.validation');
const routes = {};

routes.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const error = schemas.auth.validate({ email, password }).error;

        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const adminData = await admin.findOne({ email });
        if (adminData) {
            return res.status(409).json({ message: 'Admin already exists' });
        }
        const cryptoPassword = await bcrypt.hash(password, 10);
        const newAdmin = new admin({ email, password:cryptoPassword });
        await newAdmin.save();
        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {error} = schemas.auth.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const adminData = await admin.findOne({ email });
        if (!adminData) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const isMatch = await bcrypt.compare(password, adminData.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ id: adminData._id }, process.env.JWT_SECRET, { expiresIn: '9h' });
        
        return res.status(200).json({ token }); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = routes;