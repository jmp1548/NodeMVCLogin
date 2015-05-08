var _ = require('underscore');
var models = require('../models');

var Adventure = models.Adventure;
var Path = models.Path;
var Post = models.Post;

var profilePage = function(req, res) {

    Adventure.adventureModel.findByUser(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        console.log(docs);
        if(docs)
        //req.session.adventure = adventure.toAPI();
        res.render('profile', {adventures: docs});
    });
};
var pastAdventurePage = function(req, res) {

    Path.pathModel.findByAdventure(req.session.adventure._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        console.log(docs);
        Post.postModel.findByAdventure(req.session.adventure._id, function(err, points) {

                if(err) {
                    console.log(err);
                    return res.status(400).json({error:'An error occurred'}); 
                }
                console.log(points);
        
        res.render('existingadventure', {path: docs, posts: points});
        });
    });
};
var adventurePage = function(req, res) {

    /*Path.pathModel.findByAdventure(req.session.adventure._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        console.log(docs);
        Post.postModel.findByAdventure(req.session.adventure._id, function(err, points) {

                if(err) {
                    console.log(err);
                    return res.status(400).json({error:'An error occurred'}); 
                }
                console.log(points);
        
        res.render('app', {path: docs, posts: points});
        });
    });*/
    res.render('adventure');
};

var adventurePoint = function(req, res) {

    if(!req.body.longitude || !req.body.latitude) {
        return res.status(400).json({error: "Data is needed"});
    }
    
   // console.log(req.session.account.username);
    console.log(req.session);
    
    var pathData = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        adventureid: req.session.adventure._id
    };
    
    var newCoords = new Path.pathModel(pathData);
    
    newCoords.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        //res.json({redirect: '/maker'});
    });
    
};
var adventurePost = function(req, res) {
    //make sure to add post to the body
    if(!req.body.longitude || !req.body.latitude || !req.body.post) {
        return res.status(400).json({error: "Data is needed"});
    }
    
   // console.log(req.session.account.username);
    console.log(req.session);
    
    var pathData = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        content:req.body.post,
        type:"text",
        adventureid: req.session.adventure._id
    };
    
    var newCoords = new Path.pathModel(pathData);
    
    newCoords.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        //res.json({redirect: '/maker'});
    });
    
};

module.exports.profilePage = profilePage;
module.exports.pastAdventurePage = pastAdventurePage;
module.exports.adventurePath=adventurePoint;
module.exports.adventurePost=adventurePost;
module.exports.adventurePage = adventurePage;