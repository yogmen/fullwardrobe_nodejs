var express = require('express'),
    http = require('http'),
    path = require('path'),
    clothes = require('./routes/clothes'),
	users = require('./routes/users');
	photos = require('./routes/photos')
 
var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.multipart({
        uploadDir:__dirname +  '/uploads',
        keepExtensions: true
    }));
    app.use(express.static(path.join(__dirname, './uploads')));
});

app.get('/clothes', clothes.findAll);
app.get('/clothes/:id', clothes.findById);
app.post('/clothes', clothes.addClothes);
//app.put('/clothes/:id', clothes.updateWine);
//app.delete('/clothes/:id', clothes.deleteWine);

app.post('/users', users.addUser);
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.put('/users/:id', users.updateUser);

app.post('/photos', photos.addPhoto);
app.get('/photos', photos.getPhotos);
app.get('/photos/:id', photos.getPhoto);

app.listen(3000,'192.168.1.8');
console.log('Listening on port 3000...');