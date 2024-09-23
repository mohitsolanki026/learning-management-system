const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    serverStorageUrl: {
        type: String,
        // required: true,
    },
    access: {
        type: String,
        required: true,
        enum : ['public','pvt'],
    },
});

module.exports = mongoose.model("studyMaterial", studyMaterialSchema);

    // - name
    // - teacherId
    // - server url storage
    // - access
    //     - public
    //     - pvt