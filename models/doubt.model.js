const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'student',
    },
    query: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    replies: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        // required: true,
        enum: ['pending', 'resolved'],
        default: 'pending',
    },
});

module.exports = mongoose.model('doubt', doubtSchema);

    // - studentId
    // - query
    // - createdAt
    // - teacherId
    // - replies