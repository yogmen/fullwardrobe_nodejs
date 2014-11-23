var User = require('../models/user');

exports.postUser = function (req, res) {
    var user = new User(req.body);
    console.log('USER: ' + req.body);

    user.save(function (err) {
        if (err) {
            res.send(err);
            console.log(err);
            return;
        }
        res.json(user);
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

exports.getUser = function (req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if(err) {
            res.send(err);
        }
        res.json(user);
    })
};