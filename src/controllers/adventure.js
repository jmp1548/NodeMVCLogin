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
        if(docs[0] !='undefined'){
           var adventure=docs[0];
           //console.log(adventure);
           
           //req.session.adventure = adventure.toAPI();
           }
        res.render('profile', {adventures: docs});
        
    });
};
var explorePage = function(req, res) {

    Adventure.adventureModel.findByArea(44, 77, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        console.log(docs);
        if(docs[0] !='undefined'){
           var adventure=docs[0];
           console.log(adventure);
           
           //req.session.adventure = adventure.toAPI();
           }
        res.render('explore', {adventures: docs});
        
    });
};

//added map page
var mapPage = function(req, res){
    res.render('map');
}

var pastAdventurePage = function(req, res) {
     
            
    var adventureid = req.params.id || 0;
    if(adventureid!=0){
                Path.pathModel.findByAdventure(adventureid, function(err, docs) {
            
                    if(err) {
                        console.log(err);
                        return res.status(400).json({error:'An error occurred'}); 
                    }
                
                
                    console.log(docs);
                    Post.postModel.findByAdventure(adventureid, function(err, points) {
            
                            if(err) {
                                console.log(err);
                                return res.status(400).json({error:'An error occurred'}); 
                            }
                            console.log(points);
                    req.session.adventure._id=adventureid.toAPI();
                    res.render('existingadventure', {path: docs, posts: points, adventure:adventureid});
                    });
                });
       }  
      
};
var adventurePage = function(req, res) {
    res.render('adventure');
};
var adventureStart = function(req, res) {
   
    if(!req.body.longitude || !req.body.latitude || !req.body.title) {
        return res.status(400).json({error: "Data is needed "+req.body.longitude+"  "+ req.body.latitude+"  "+req.body.title});
    }
    
   // console.log(req.session.account.username);
    console.log(req.session);
    
    var startData = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        title: req.body.title,
        userid: req.session.account._id
    };
    
    var newCoords = new Adventure.adventureModel(startData);
    
    newCoords.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
    req.session.adventure = newCoords.toAPI();
    console.log("showing adventure");
    console.log(req.session);
        res.json({});
    });
    
};
var adventurePoint = function(req, res) {

     //make sure to add post to the body
    if(!req.body.longitude || !req.body.latitude) {
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
        console.log(newCoords);
        
    });
    res.json({msg:"path made"});
    
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
    
    
    var newCoords = new Post.postModel(pathData);
    
    newCoords.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

       
    });
     res.json({msg: 'post made'});
};


module.exports.mapPage = mapPage;
module.exports.profilePage = profilePage;
module.exports.pastAdventurePage = pastAdventurePage;
module.exports.adventurePath=adventurePoint;
module.exports.adventurePost=adventurePost;
module.exports.adventurePage = adventurePage;
module.exports.adventureStart=adventureStart;