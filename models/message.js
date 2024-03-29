/**
 * Created by robert on 07/10/14.
 */

var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message_content: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        default: 'regular'
    },
    price: {
        type: String
    },
    item_to_exchange: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    },
    readed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Message', MessageSchema);