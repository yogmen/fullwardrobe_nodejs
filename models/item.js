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
    owner_id: {
        type: String,
        required: true
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

module.exports = mongoose.model('Item', ItemSchema);