const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const notificationSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    userId: {               // foreign key , no direct reference
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Notification', notificationSchema);
