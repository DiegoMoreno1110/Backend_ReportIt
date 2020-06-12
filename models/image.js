var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },    
    path: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}); 

module.exports = mongoose.model('Image', imageSchema);