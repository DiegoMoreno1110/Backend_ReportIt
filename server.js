var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var puertoHTTP = process.env.PORT || 8080;

var router = express.Router();
router.get('/', function(req, res) {
    res.json({ mensaje: "Creando API" })
});

app.use('/api', router);
app.listen(puertoHTTP);
console.log('Se ha levantado la aplicación en el puerto' + puertoHTTP);