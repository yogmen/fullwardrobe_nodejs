var collection_clothes = 'clothes';

var mongo = require('mongodb');
 
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('fullwardrobedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'clothes' database");
        db.collection(collection_clothes, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'clothes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.addClothes = function(req, res) {
    var clothes = req.body;
    console.log('Adding clothes: ' + JSON.stringify(clothes));
    db.collection(collection_clothes, function(err, collection) {
        collection.insert(clothes, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving clothes: ' + id);
    db.collection(collection_clothes, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(item);
            }
        });
    });
};

exports.findAll = function(req, res) {
    db.collection(collection_clothes, function(err, collection) {
        collection.find().toArray(function(err, items) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(items));
                res.send(items);
            }
        });
    });
}

exports.updateClothes = function(req, res) {
    var id = req.params.id;
    var clothes = req.body;
    console.log('Updating clothes: ' + id);
    console.log(JSON.stringify(clothes));
    db.collection(collection_clothess, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, clothes, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating clothes: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(clothes);
            }
        });
    });
}

exports.deleteClothes = function(req, res) {
    var id = req.params.id;
    console.log('Deleting clothes: ' + id);
    db.collection(collection_clothes, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {
 
    var clothes = 
    {
		title: "Some sample title",
		description: "This is very long sample description with really long content",
		category: "Jeans",
		location:{
			latitude: "54.32323213",
			longitude: "55.324545345"
		},
		post_date: "05.05.2014",
		owner: "rmszala"
    };
 
    db.collection(collection_clothes, function(err, collection) {
        collection.insert(clothes, {safe:true}, function(err, result) {});
    });
 
};