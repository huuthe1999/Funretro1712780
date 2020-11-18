const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content_context: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    created: {
        type: String,
        default: new Date().toLocaleString()
    },
    column_header: {
        type: Array,
        default: [
            {
                _id: mongoose.Types.ObjectId(),
                name: "Went Well",
                type: "0",
                vote: Number,
                comment: []
            },
            {
                _id: mongoose.Types.ObjectId(),
                type: "1",
                name: "To improve",
                vote: Number,
                comment: []
            },
            {
                _id: mongoose.Types.ObjectId(),
                type: "2",
                name: "Action Items",
                vote: Number,
                comment: []
            }
        ]
    }

}, { timeStamp: true });


module.exports = mongoose.model('Board', BoardSchema);
