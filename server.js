var express = require('express'),
    clothes = require('./routes/clothes');
 
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



app.listen(3000,'192.168.1.106');
console.log('Listening on port 3000...');