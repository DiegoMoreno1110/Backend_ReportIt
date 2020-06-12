var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Report', reportSchema);