const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        trim: true,
        min: 3,
        max: 20,
    },
    photo: {
        type: String,
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'subject',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
});

module.exports = mongoose.model("teacher", teacherSchema);

// Teacher: 
//     - employee id
//     - fname, lname
//     - email
//     - password
//     - photo