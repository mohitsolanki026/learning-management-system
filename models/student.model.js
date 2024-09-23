const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    motherName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // min: 3,
        // max: 20,
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
    mobile: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // unique: true,
    },
    dob: {
        type: Date,
        required: true,
        trim: true,
        // unique: true,
    },
    category: {
        type: String,
        enum: ['general', 'obc', 'sc', 'st', 'other'],
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    rollNo: {
        type: String,
        trim: true,
        // required: true,
        unique: true,
    },
    academicSession: {
        type: String,
        trim: true,
        lowercase: true,
    },
    course: {
        type: String,
        trim: true,
        lowercase: true,
    },
    currentSem: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending', 'blocked', 'deleted', 'suspended', 'graduated', 'dropped', 'transferred', 'other'],
    },
    feeDetails: {
        type: [mongoose.Schema.Types.ObjectId],
        trim: true,
        lowercase: true,
    },
    attendancePresentDates: {
        type: [String],
        trim: true,
        lowercase: true,
    },
    submition:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'submition',
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);

// Student:
//     - fname, lname
//     - photo
//     - mother's name
//     - email
//     - password
//     - mobile
//     - gender
//     - dob
//     - category
//     - address1, address2
//     - roll no.
//     - academic session
//     - course
//     - currentSem
//     - status
//     - fee details
//     - attendancePresentDates