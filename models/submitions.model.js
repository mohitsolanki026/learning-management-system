const mongoose = require('mongoose');

const submitionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    pendingAssignmentId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'assignmentExam',
    },
    submittedAssignmentId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'assignmentResponse',
    },
    pendingMcqExamId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'mcqExam',
    },
    submittedMcqExamId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'mcqExamResponse',
    },
    pendingSubjectiveExamId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'subjectiveExam',
    },
    submittedSubjectiveExamId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'subjectiveExamResponse',
    },
    
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('submition', submitionSchema);