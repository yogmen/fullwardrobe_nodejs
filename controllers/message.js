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

exports.getMessages = function(req, res) {
    var allowedParams = [
        'deleted',
        'readed',
        'from'
    ];

    var query = {
        to: req.user.email
    };

    for(param in req.query) {
        if(allowedParams.indexOf(param) !== -1) {
            query[param] = req.query[param];
        }
    }

    console.log(query);

    Message.find(query, function (err, messages) {
        if(err) {
            res.send(err);
        }
        res.json(messages);
    })
};

exports.updateMessage = function (req, res) {

    var readed = req.query.deleted;
    var deleted = req.query.readed;

    Message.findById(req.params.message_id, function(err, message) {
        if(err) {
            res.send(err);
        }
//        if(readed) {
            message.readed = readed;
//        }
//        if(deleted) {
            message.deleted = deleted;
//        }
        message.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({code: '200', message: 'Saved'});
        })
    });
};