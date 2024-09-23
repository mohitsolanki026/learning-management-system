const mongoose  = require('mongoose');

const transactionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    amount: {
        type: Number,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
    },
    type: {
        type: String,
        required: true,
        enum: ['credit', 'debit'],
        default: 'credit',
    },
    referenceId: {
        type: String,
        // required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
});

module.exports = mongoose.model('transaction', transactionSchema);

// Transaction:
//     - studentId
//     - createdAt
//     - courseId
//     - amount
//     - referenceId