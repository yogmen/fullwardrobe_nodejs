var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    item_type: {
        type: String,
        required: true
    },
    item_sex: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    photos_id: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
    
});

module.exports = mongoose.model('Item', ItemSchema);