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
	
	form.parse(req, function(err, fields, files){
		if(err){
			console.log('parsing issue');
			res.writeHead(500,{'Content-type':'text/plain'});
			res.write('prasing issue');
			res.end();
			return;
		}
		
		fs.readFile(files.image.path, function(err, data){
			var imageName = files.image.name;
			if(!imageName){
				console.log('image issue');
				res.writeHead(500,{'Content-type':'text/plain'});
				res.write('parsing issue');
				res.end();
				return;
			}
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
						res.write('resizing issue');
						res.end();
						return;
					}

				});
			});
		});
	});
}

exports.getPhotos = function(req,res,next){
    
}

exports.getPhotoFull = function(req,res){
    
}

exports.getPhotoThumb = function(req,res){
    
}