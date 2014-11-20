var fs = require('fs');
var formidable = require('formidable');
var im = require('imagemagick');

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
}

exports.getPhotos = function(req,res,next){
    
}

exports.getPhotoFull = function(req,res){
    
}

exports.getPhotoThumb = function(req,res){
    
}