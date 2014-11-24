var fs = require('fs');
var formidable = require('formidable');
var im = require('imagemagick');
var path = require('path');

var Photo = require('../models/photo');

var photoDir = __dirname + '/uploads/fullsize/';
var thumbDir = __dirname + '/uploads/thumbs/';

fs.exists(__dirname + '/uploads', function(exists){
    if(!exists){
        fs.mkdir(__dirname + '/uploads', function(err){
            if(err){
                console.log(err);
                process.exit(1);
            }
        })
    }
});


exports.upload = function(req, res){
	var form = formidable.IncomingForm();

    form.parse(req, function(err, fields, files){
        if(err){
            console.log('parsing issue');
            res.writeHead(500, {'Content-type':'text/plain'});
            res.write('parsing issue');
            res.end();
            return;
        }
        fs.readFile(files.image.path, function(err, data){
            var imageName = files.image.name;
            if(!imageName){
                console.log('Empty image name');
                return;
            }
            var fullPath = photoDir + imageName;
            var thumbPath = thumbDir + imageName;
            fs.writeFile(fullPath, data, function(err){
                im.resize({
                    srcPath: fullPath,
                    dstPath: thumbPath,
                    width: 100
                }, function(err, stdout, stderr){
                    if(err){
                        console.log(err);
                        res.send(err);
                        return;
                    }
                    var newPhoto = new Photo({
                        'fullsize_name':imageName,
                        'thumbsize_name':imageName    
                    })
                    newPhoto.save(function(err){
                        if(err)
                            console.log(err);
                        console.log(newPhoto);
                        res.json(newPhoto);
                    });
                });
            });
        });
    });
}

exports.getPhotoFull = function(req,res){
    Photo.findById(req.params.photo_id, function(err, photo){
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(photo);
        res.sendFile(path.resolve(photoDir + photo.fullsize_name));
    });
}

exports.getPhotoThumb = function(req,res){
    Photo.findById(req.params.photo_id, function(err, photo){
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(photo);
        res.sendFile(path.resolve(photoDir + photo.thumbsize_name));
    });
}