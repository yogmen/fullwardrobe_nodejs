var express = require('express'),
    clothes = require('./routes/clothes'),
	users = require('./routes/users');
	photos = require('./routes/photos')
 
var app = express();

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/clothes', clothes.findAll);
//app.get('/clothes/:id', clothes.findById);
// app.post('/clothes', clothes.addWine);
//app.put('/clothes/:id', clothes.updateWine);
//app.delete('/clothes/:id', clothes.deleteWine);

app.post('/users', users.addUser);
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.put('/users/:id', users.updateUser);

app.post('photos', photos.uploadFile);

app.listen(3000,'192.168.1.106');
console.log('Listening on port 3000...');