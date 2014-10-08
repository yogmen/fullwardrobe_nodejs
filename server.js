var express = require('express');
var logger = require('morgan');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var clothes = require('./routes/clothes');
var users = require('./routes/users');
var photos = require('./routes/photos');
var messages = require('./routes/messages');

var authController = require('./controllers/auth');
var messageController = require('./controllers/message');
var userController = require('./controllers/user');

var app = express();
var router = express.Router();
mongoose.connect('mongodb://localhost:27017/fullwardrobedb');

router.route('/messages')
    .post(authController.isAuthenticated, messageController.sendMessage);

router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

app.use(passport.initialize());
app.use(logger('dev'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

app.use('/api', router);

app.get('/clothes', clothes.findAll);
app.get('/clothes/:id', clothes.findById);
app.post('/clothes', clothes.addClothes);
app.put('/clothes/:id', clothes.updateClothes);
app.delete('/clothes/:id', clothes.deleteClothes);
app.get('/userClothes/:id', clothes.findUserClothes);

app.post('/photos', photos.upload);
app.get('/photos', photos.getPhotos);
app.get('/photos/full/:id', photos.getPhotoFull);
app.get('/photos/thumb/:id', photos.getPhotoThumb)

app.listen(3000);
console.log('Listening on port 3000...');