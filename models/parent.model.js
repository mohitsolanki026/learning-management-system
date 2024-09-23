const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    studentIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
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

module.exports = mongoose.model('parent', parentSchema);