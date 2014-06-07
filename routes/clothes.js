var collection_clothes = 'clothes';

var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('fullwardrobedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'clothes' database");
        db.collection(collection_clothes, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.addClothes = function(req, res) {
    var clothes = req.body;
    console.log('Adding clothes: ' + JSON.stringify(user));
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
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection(collection_clothes, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

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