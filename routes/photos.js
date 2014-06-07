var path = require('path');
var fs = require('fs'),
    MongoClient = require('mongodb').MongoClient, db;


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

exports.addPhoto = function(req,res,next){
    console.log('Starting upload file');
    
    var file = req.files.file,
        filePath = req.files.file.path,
        lastIndex = filePath.lastIndexOf("/"),
        tmpFileName = filePath.substr(lastIndex + 1),
        image = req.body,
        images = db.collection('images');
    
    image.fileName = tmpFileName;
    console.log('New file: ' + tmpFileName);
    
    images.insert(image, function (err, result) {
        if (err) {
            console.log(err);
            return next(err);
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
    var fileName = req.params.id;
    res.sendfile(path.resolve('./uploads/' + fileName));
};