var	collections_messages = 'messages';

var	mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('fullwardrobedb', server);

db.open(function (err, db) {
	if(!err){
		console.log("Connected to 'messages' database");
		db.collection(collections_messages, {strinc:true}, function (err, collection) {
			if(err){
				console.log("The 'messages' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});
	}
});

exports.findAll = function(req, res) {
    db.collection(collections_messages, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.sendMessage = function(req, res) {
    var message = req.body;
	// user.creation_date = new Date();
    console.log('Saving message: ' + JSON.stringify(user));
    db.collection(collection_users, function(err, collection) {
        collection.insert(message, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

var populateDB = function () {
    var message = 
    {
		from_id: 'Ted',
		to_id: "Kowalsky",
		title: "tkowalski",
		content: "+48513222000",
		is_unread: true,
		sent_timestamp: "2014-01-10"
    };
 
    db.collection(collections_messages, function(err, collection) {
        collection.insert(message, {safe:true}, function(err, result) {});
    });
};