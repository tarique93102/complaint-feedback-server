const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// comments schema
var commentSchema = new Schema({
    commentText: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// complaint schema
var complaintSchema = new Schema({
    headText: {
        type: String,
        default: ''
    },
    descriptionText: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateUpdated: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'open'
    },
    comments: [commentSchema]
});

// create model based on the schema
var Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint; 