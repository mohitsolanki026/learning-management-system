const mongoose = require('mongoose');

const recordedLectureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    serverStorageUrl: {
        type: String,
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('recordedLecture', recordedLectureSchema);
    
    // RecordedLecture:
    // - name
    // - server storage url
    // - teacherId
    // - subjectId
    // - createdAt