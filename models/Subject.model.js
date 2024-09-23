const mongoose  = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'course',
    },
    teacherIds: {
        type: [mongoose.Schema.Types.ObjectId],
        // required: true,
        ref: 'teacher',
    },
    studyMaterialId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },
});

module.exports = mongoose.model('subject', subjectSchema);
    // - name
    // - semester
    // - course
    // - teacherIds
    // - studyMaterialId