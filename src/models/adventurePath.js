var mongoose = require('mongoose');
var _ = require('underscore');

var pathModel;

var pathSchema = new mongoose.Schema({
    
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

pathSchema.methods.toAPI = function() {
    return {
        longitude: this.longitude,
        latitude: this.latitude,
        adventureid:this.adventureid,
        timestamp:this.timestamp
    };
};

pathSchema.statics.findByAdventure = function(adventureId, callback) {

    var search = {
        adventureid: mongoose.Types.ObjectId(adventureId)
    };

    return pathModel.find(search).select("longitude latitude timestamp").exec(callback);
};


pathModel = mongoose.model('Path', pathSchema);


module.exports.pathModel = pathModel;
module.exports.pathSchema = pathSchema;