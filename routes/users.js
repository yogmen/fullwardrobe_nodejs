var collection_users = 'users';

var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('fullwardrobedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'users' database");
        db.collection(collection_users, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

var populateDB = function() {
 
    var users = 
    {
		first_name: 'Ted',
		last_name: "Kowalsky",
		login: "tkowalski",
		phone_number: "+48513222000"
    };
 
    db.collection(collection_users, function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};