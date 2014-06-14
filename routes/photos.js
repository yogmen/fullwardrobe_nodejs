var collection_images = 'images';

var path = require('path');
var fs = require('fs');
var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
    MongoClient = mongo.MongoClient, db;


var url = "mongodb://localhost:27017/fullwardrobedb";
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
	console.log("Received file:\n" + JSON.stringify(req.files));

	var photoDir = __dirname+"/uploads";
	var photoName = req.files.source.path;
    var lastIndex = photoName.lastIndexOf("/");
    var tmpFileName = photoName.substr(lastIndex + 1);
	
	var images_db = db.collection(collection_images);
	var image = req.body;

	image.fileName = tmpFileName;
	images_db.insert(image, function (err, result) {
	        if (err) {
	            console.log("BLAD: " + err);
				res.send({error:"Not inserted"});
	        }
	        res.json(image);
	    });
};

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