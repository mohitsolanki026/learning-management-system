const mongoose = require('mongoose');

const mcqExamResponseSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'student',
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'mcqExam',
    },
    responses: {
        type: [String],
        required: true,
    },
    score:{
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('mcqExamResponse', mcqExamResponseSchema);