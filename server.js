var express = require('express');
var logger = require('morgan');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var multipart = require('connect-multiparty');

//var clothes = require('./routes/clothes');
//var photos = require('./routes/photos');

var authController = require('./controllers/auth');
var messageController = require('./controllers/message');
var userController = require('./controllers/user');
var itemController = require('./controllers/item');
var photoController = require('./controllers/photo');

var app = express();
var router = express.Router();
var multipartMiddleware = multipart();
mongoose.connect('mongodb://localhost:27017/fullwardrobedb');

/** PHOTO OPERATIONS **/
router.route('/photos')
    .post(authController.isAuthenticated, photoController.upload);
/** ITEM OPERATIONS **/
router.route('/items')
    .post(authController.isAuthenticated, itemController.sendItem)
    .get(authController.isAuthenticated, itemController.getItems);

router.route('/item/:item_id')
    .get(authController.isAuthenticated, itemController.getItem);

/** MESSAGE OPERATIONS **/
router.route('/messages')
    .post(authController.isAuthenticated, messageController.sendMessage)
    .get(authController.isAuthenticated, messageController.getMessages);

router.route('/message/:message_id')
    .get(authController.isAuthenticated, messageController.getMessage)
    .put(authController.isAuthenticated, messageController.updateMessage);

/** USER OPERATIONS **/
router.route('/users')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUser);

app.use(passport.initialize());
app.use(logger('dev'));
app.use(multipartMiddleware);
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));


app.use('/api', router);

//app.get('/clothes', clothes.findAll);
//app.get('/clothes/:id', clothes.findById);
//app.post('/clothes', clothes.addClothes);
//app.put('/clothes/:id', clothes.updateClothes);
//app.delete('/clothes/:id', clothes.deleteClothes);
//app.get('/userClothes/:id', clothes.findUserClothes);
//
//app.post('/photos', photos.upload);
////app.get('/photos', photos.getPhotos);
////app.get('/photos/full/:id', photos.getPhotoFull);
////app.get('/photos/thumb/:id', photos.getPhotoThumb)

app.listen(3000);
console.log('Listening on port 3000...');