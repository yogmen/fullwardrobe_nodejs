var Message = require('../models/message');
var User = require('../models/user');

exports.sendMessage = function (req, res) {
    var message = new Message(req.body);
    console.log('MESSAGE: ' + req.body);

    message.save(function (err) {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.send({code: '200', message: 'Saved'});
        console.log('Saved new message: ' + message);
    });
};

exports.getMessage = function (req, res) {
    Message.findById(req.params.message_id, function(err, message) {
        if(err) {
            res.send(err);
        }
        res.json(message);
    })
};

exports.getMessages = function (req, res) {

    var from = req.query.from;
    var deleted = req.query.deleted;
    var readed = req.query.readed;

    if(from && deleted && readed) {

    } else if(from && deleted) {

    } else if (from && readed) {

    } else if(deleted && readed) {
        Message.find({to: req.user.email, deleted: deleted, readed: readed}, function (err, messages) {
            if(err) {
                res.send(err);
            }
            res.json(messages);
        });
    } else if(deleted){
        Message.find({to: req.user.email, deleted: deleted}, function(err, messages) {
            if(err) {
                req.send(err);
            }
            res.json(messages);
        })
    } else if(readed){
        Message.find({to: req.user.email, readed: readed}, function(err, messages) {
            if(err) {
                req.send(err);
            }
            res.json(messages);
        });
    } else if(from){
        Message.find({to: req.user.email, from: from}, function(err, messages) {
            if(err) {
                req.send(err);
            }
            res.json(messages);
        });
    }
};



exports.updateMessage = function (req, res) {

};

function findUser(userEmail, callback) {
    User.findOne({email: userEmail}, function(err, user) {
        if(err) {
            return "";
        }
        if(user) {
            return callback(user._id);
        }
    });
}