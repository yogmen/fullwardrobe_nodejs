/**
 * Created by robert on 07/10/14.
 */

var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
    fullsize_name: {
        type: String,
        required: true
    },
    thumbsize_name: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Photo', PhotoSchema);