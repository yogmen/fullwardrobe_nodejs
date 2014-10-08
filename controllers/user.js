var User = require('../models/user');

exports.postUser = function (req, res) {
    var user = new User(req.body);
    console.log('USER: ' + req.body);

    user.save(function (err) {
        if (err) {
            res.send(err);
            console.log(err);
        }
        res.send({code: '200', message: 'Saved'});
        console.log('Saved new user: ' + user);
    });
};

exports.getUsers = function (req, res) {
    User.find(function(err, users){
        if(err){
            res.send(err);
            console.log(err);
            //TODO change for internal server error
        }
        res.json(users);
    })
};