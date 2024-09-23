const mongoose = require('mongoose');

const subjectiveExamResponseSchema = new mongoose.Schema({
    serverUrl: {
        type: String,
        required: true,
    },
    subjectiveExamId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subjectiveExam',
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

module.exports = mongoose.model('subjectiveExamResponse', subjectiveExamResponseSchema);

    // - server url storage
    // - subjectiveExamId
    // - studentId
    // - createdAt
    // - score
    // - status