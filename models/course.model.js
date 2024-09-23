const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    subjectIdList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'subject',
    },
    semesterCount: {
        type: Number,
        required: true,
    },
    enrolledStudentIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'student',
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('course', courseSchema);

    // - name
    // - subjectIdList
    // - semesterCount
    // - enrolledStudentIds
    // - price