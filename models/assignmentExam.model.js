const mongoose = require('mongoose');

const assignmentExamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subject',
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'teacher',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    allowedStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'student',
    },
    responses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'assignmentExamResponse',
    },
    questions: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', "expired"],
        default: 'active',
    },
    deadline: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('assignmentExam', assignmentExamSchema);

    // - name
    // - subjectId
    // - teacherId
    // - createdAt
    // - allowedStudents
    // - responses
    // - questions
    // # - scoreboardId
    // - status
    // - deadline
