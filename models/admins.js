var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);