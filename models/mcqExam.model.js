const mongoose = require('mongoose');

const mcqExamSchema = new mongoose.Schema({
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subject',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    allowedStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'student',
    },
    responses: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'mcqResponse',
    },
    questions: {
        type: [Object],
        required: true,
        ref: 'mcqQuestion',
    },
    status: {
        type: String,
        enum: ['active', 'inactive', "expired"],
        default: 'active',
    },
    endTime: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('mcqExam', mcqExamSchema);
// MCQExam:
//     - name
//     - subjectId
//     - createdAt
//     - allowedStudents
//     - responses
//     - question
//         - title
//         - optionA
//         - optionB
//         - optionC
//         - optionD
//         - answer
//     # - scoreboardId
//     - status
//     - endTime