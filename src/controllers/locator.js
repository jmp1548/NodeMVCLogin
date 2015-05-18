var _ = require('underscore');
var models = require('../models');

var Locator = models.Locator;

var makerPage = function(req, res) {

    Locator.locatorModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        console.log(docs);
        
        res.render('app', {locations: docs});
    });
};

var locations = function(req, res) {

    if(!req.body.longitude || !req.body.latitude) {
        return res.status(400).json({error: "Data is needed"});
    }
    
   // console.log(req.session.account.username);
    console.log(req.session);
    
    var locationData = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        username: req.session.account.username,
        owner: req.session.account._id
    };
    
    var newCoords = new Locator.locatorModel(locationData);
    
    newCoords.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/profile'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = locations;