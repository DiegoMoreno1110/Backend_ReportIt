var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },    
    desc: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('Image', imageSchema);