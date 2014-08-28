var express = require('express'),
    http = require('http'),
    path = require('path'),
    clothes = require('./routes/clothes'),
	users = require('./routes/users'),
	photos = require('./routes/photos'),
	messages = require('./routes/messages');
 
var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
    app.use(express.json());
});

app.get('/clothes', clothes.findAll);
app.get('/clothes/:id', clothes.findById);
app.post('/clothes', clothes.addClothes);
app.put('/clothes/:id', clothes.updateClothes);
app.delete('/clothes/:id', clothes.deleteClothes);
app.get('/userClothes/:id', clothes.findUserClothes);

app.post('/users', users.addUser);
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.put('/users/:id', users.updateUser);

app.post('/photos', photos.upload);
app.get('/photos', photos.getPhotos);
app.get('/photos/full/:id', photos.getPhotoFull);
app.get('/photos/thumb/:id', photos.getPhotoThumb)

app.get('/messages', messages.findAll);
app.post('/messages', messages.sendMessage);
app.get('/messages:id', messages.getMessage);

app.listen(3000);
console.log('Listening on port 3000...');