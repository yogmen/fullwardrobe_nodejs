var collection_images = 'images';

var path = require('path');
var fs = require('fs');
var mongo = require('mongodb');
var formidable = require('formidable');
var im = require('imagemagick');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
    MongoClient = mongo.MongoClient, db;


var url = "mongodb://localhost:27017/fullwardrobedb";
var photoDir = __dirname + '/uploads/fullsize/';
var thumbDir = __dirname + '/uploads/thumbs/';

MongoClient.connect(url, {native_parser: true}, function (err, connection) {
    if (err) {
        console.log("Cannot connect to database " + url);
        process.exit(1);
    }
    db = connection;
});

fs.exists(__dirname + '/uploads', function(exists){
    if(!exists){
        console.log('Creating dir ' + __dirname + '/uploads');
        fs.mkdir(__dirname + '/uploads', function(err){
            if(err){
                console.log('Error creating dir');
                process.exit(1);
            }
        })
    }
});

exports.upload = function(req, res){
	var form = formidable.IncomingForm();
	var images_db = db.collection(collection_images);
	
	form.parse(req, function(err, fields, files){
		if(err){
			console.log('parse');
			res.writeHead(500,{'Content-type':'text/plain'});
			res.end("Something wrong");
			return
		}
		
		fs.readFile(files.image.path, function(err, data){
			var imageName = files.image.name;
			if(!imageName){
				console.log('image name');
				res.writeHead(500,{'Content-type':'text/plain'});
				res.end('Something wrong');
				res.end();
			}else{
				var fullPath = photoDir + imageName;
				var thumbPath = thumbDir + imageName;
				fs.writeFile(fullPath, data, function(err){
					im.resize({
						srcPath: fullPath,
						dstPath: thumbPath,
						width:100
					},function(err, stdout, stderr){
						if(err){
							console.log(err);
							res.writeHead(500,{'Content-type':'text/plain'});
							res.end('Something wrong');
							res.end();
						}else{
							var insertedImage = req.body;
							insertedImage.fileName = imageName;
							insertedImage.thumbName = imageName;
							images_db.insert(insertedImage, function(err, result){
								if(err){
									console.log(err);
									res.writeHead(500,{'Content-type':'text/plain'});
									res.end('Something wrong');
									res.end();
								}else{
									console.log(JSON.stringify(insertedImage));
									res.json(insertedImage);
								}
							});
						}
					});
				});
			}
		});
	});
}

exports.getPhotos = function(req, res, next) {
    var images = db.collection('images');

    images.find().sort({ _id: -1 }).limit(20).toArray(function (err, data) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(data);
    });
};

exports.getPhoto = function (req, res) {
    var id = req.params.id;
    console.log('ID: ' + id);
    db.collection(collection_images, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            console.info(item);
            res.sendfile(path.resolve('./uploads/' + item.fileName));
        });
    });
};