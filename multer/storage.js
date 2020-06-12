/**
 * Configuracion multer
 */
var path = require('path');
var multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage}).single("image");
module.exports = upload;