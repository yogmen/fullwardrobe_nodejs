var Message = require('../models/message');

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