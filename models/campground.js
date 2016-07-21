var mongoose = require('mongoose');


var campgroundSchema = new mongoose.Schema({
    
   name: String,
   image: String,
   latitude: Number,
   longitude: Number,
   state: String,
   description: String
});

module.exports = mongoose.model('Campground', campgroundSchema);