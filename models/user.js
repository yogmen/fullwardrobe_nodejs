/**
 * Created by robert on 07/10/14.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    is_active:{
        type: Boolean,
        default: true
    },
    last_login:{
        type: Date
    },
    user_height:{
        type: String
    },
});

UserSchema.pre('save', function (callback) {
    var user = this;
    if(!user.isModified('password'))
        return callback();

    bcrypt.genSalt(5, function(err, salt) {
        if(err)
            return callback(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err)
                return callback(err);
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);