const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Notifications: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'notification',
    // },
});

module.exports = mongoose.model('admin', adminSchema);