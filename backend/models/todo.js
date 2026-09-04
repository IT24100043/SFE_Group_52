const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    UserId: {
        type: String,
        required: true,
        ref: 'User'
    },

    Topic: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        required: true
    },

    Start_Date: {
        type: Date,
        default: Date.now
    },

    End_Date: {
        type: Date,
        required: true
    },

    Priority: {
        type: String,
        required: true
    },

    Done: {
        type: Boolean,
        default: false,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);