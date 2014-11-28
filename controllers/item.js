var Item = require('../models/item');
var User = require('../models/user');

exports.sendItem =function (req,res){
    var item = new Item(req.body);
    console.log("ITEM: " + item);

    item.save(function(err) {
        if(err) {
            res.send(err);
            console.log(err);
        }
        res.send({code: '200', message: 'Saved'});
        console.log('Saved new item: ' + item);
    })
}

exports.getItem = function (req,res){
    Item.findById(req.params.item_id, function(err, item) {
        if(err) {
            res.send(err);
        }
        res.json(item);
    })
}

exports.getItems = function (req,res){
    var allowedParams = [
        'item_type',
        'item_sex',
        'size',
        'color',
        'owner',
        'is_active'
        ]
    
    var query = {};
    
    for(param in req.query) {
        if(allowedParams.indexOf(param) !== -1){
            query[param] = req.query[param];
        }
    }
    
    console.log(query);
    
    Item.find(query, function(err, items){
        if(err)
            res.send(err);
        res.json(items);
    });
}

exports.updateItem = function (req,res){
    Item.findByIdAndUpdate(req.params.item_id, req.body, function(err, result){
        if(err)
            res.send(err);
        res.json(result);
    });
}