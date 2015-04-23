var mongoose = require('mongoose');
var _ = require('underscore');

var locatorModel;

var locatorSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true,
    },
    
    latitude: {
        type: Number,
        required: true
    },
    
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    },
    
    username: {
        type: String,
        required: false
    }

});

locatorSchema.methods.toAPI = function() {
    return {
        longitude: this.longitude,
        latitude: this.latitude,
        username: this.username
    };
};

locatorSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return locatorModel.find(search).select("longitude username latitude").exec(callback);
};


locatorModel = mongoose.model('Locator', locatorSchema);


module.exports.locatorModel = locatorModel;
module.exports.locatorSchema = locatorSchema;