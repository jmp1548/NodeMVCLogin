var mongoose = require('mongoose');
var _ = require('underscore');

var adventureModel;

var adventureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    
    userid: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    },
    
    longitude: {
        type: Number,
        required: true,
    },
    
    latitude: {
        type: Number,
        required: true
    }

});

adventureSchema.methods.toAPI = function() {
    return {
        title:this.title,
        longitude: this.longitude,
        latitude: this.latitude,
        createdData:this.createdData,
        _id: this._id.toString()  
    };
};

adventureSchema.statics.findByUser = function(ownerId, callback) {

    var search = {
        userid: mongoose.Types.ObjectId(ownerId)
    };

    return adventureModel.find(search).select("longitude latitude title createdData").exec(callback);
};
adventureSchema.statics.findByArea = function(lat,long,radius, callback) {
    var range=radius ||.10;
    var search = {
        longitude: {$gt: long-range, $lt: long+range},
        latitude: {$gt: lat-range, $lt: lat+range}
    };

    return adventureModel.find(search).select("longitude latitude title createdData").exec(callback);
};

adventureModel = mongoose.model('Adventure', adventureSchema);


module.exports.adventureModel = adventureModel;
module.exports.adventureSchema = adventureSchema;