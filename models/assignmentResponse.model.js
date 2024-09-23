const mongoose = require('mongoose');

const assignmentResponseSchema = new mongoose.Schema({
    serverUrl: {
        type: String,
        required: true,
        trim: true,
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'assignment',
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'student',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    score:{
        type: Number,
    },
    status:{
        type: String,
        enum: ['checked', 'unchecked'],
        default: 'unchecked',
    },
});

module.exports = mongoose.model('assignmentResponse', assignmentResponseSchema);
    
    
    
    
    
    // - server url storage
    // - assignmentId
    // - studentId
    // - createdAt
    // - score
    // - status