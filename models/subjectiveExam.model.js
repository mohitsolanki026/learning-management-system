const mongoose = require('mongoose');

const subjectiveExamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'teacher',
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subject',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    allowedStudents: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'student',
    },
    responses: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
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
    endTime: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('subjectiveExam', subjectiveExamSchema);



    // - name
    // - teacherId
    // - subjectId
    // - createdAt
    // - allowedStudents
    // - responses
    // - questions
    // # - scoreboardId
    // - status
    // - endTime