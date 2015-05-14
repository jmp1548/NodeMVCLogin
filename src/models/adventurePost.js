var mongoose = require('mongoose');
var _ = require('underscore');

var postModel;

var postSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default:'text'
    },
    content: {
        type: String,
        required: false
    },
    adventureid: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Adventure'
	},
    longitude: {
        type: Number,
        required: true,
    },
    
    latitude: {
        type: Number,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
        
    }
    
    

});

postSchema.methods.toAPI = function() {
    return {
        type:this.type,
        content:this.content,
        longitude: this.longitude,
        latitude: this.latitude,
        adventureid:this.adventureid,
        timestamp:this.timestamp,
        _id: this._id 
    };
};

postSchema.statics.findByAdventure = function(adventureId, callback) {

    var search = {
        adventureid: mongoose.Types.ObjectId(adventureId)
    };

    return postModel.find(search).select("longitude latitude type timestamp content").exec(callback);
};


postModel = mongoose.model('Post', postSchema);


module.exports.postModel = postModel;
module.exports.postSchema = postSchema;