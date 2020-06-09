var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/users')
var Report = require('./models/report')
var Admin = require('./models/admins');


/*-----------------------*/
/* CONFIGURACIÓN EXPRESS */
/*-----------------------*/
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var puertoHTTP = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    console.log("Entrando a APi");
    next();
});

router.get('/', function(req, res) {
    res.json({ mensaje: "Primer API" })
});

app.use('/api', router);
app.listen(puertoHTTP);
console.log('Se ha levantado la aplicación en el puerto ' + puertoHTTP);

/*---------------*/
/* CONEXIÓN MONGO*/
/*---------------*/
// usercontraseñaReportIt
const uri = 'mongodb+srv://user:usercontraseñaReportIt@reportit-4chws.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'problema de conexión con la DB'));
db.once('openUri', function() {
    console.log("Se estableció la conexión a la DB");
});

/*--------------------------*/
/* DECLARACION DE API USERS */
/*--------------------------*/
router.route('/users')
    .post(async function(req, resp) {
        var user = new User();
        user.nombre = req.body.nombre;
        user.correo = req.body.correo;
        user.contraseña = req.body.contraseña;


        if (user.correo == "") {
            resp.status(400).send({ error: "El correo está vacío" });
            return;
        }

        try {
            await user.save(function(err) {
                if (err) {
                    console.log(err);
                    resp.status(500).send({ mensaje: err.message });
                    return;
                }

                resp.json({ mensaje: 'Usuario creado' });
                return;
            });
        } catch (error) {
            if (error.name == "ValidatorError") {
                resp.status(400).send({ error: error.message });
            } else {
                resp.status(500).send({ mensaje: error })
            }
            return;
        }
    }).get(function(req, resp) {

        limite = parseInt(req.body.limite);
        nombre = req.body.nombre;

        if (nombre != "" || nombre == null) {
            User.find({ nombre: nombre }, function(err, users) {
                if (err) {
                    resp.status(500).send(err);
                }

                resp.status(200).send(users);
                return;

            });

        } else {

            User.find(function(err, users) {
                if (err) {
                    resp.status(500).send(err);
                }

                resp.status(200).send(users);
                return;

            }).limit(limite);
        }
    });


router.route('/users/:id_user')
    .get(function(req, res) {
        User.findById(req.params.id_user, function(error, user) {
            if (error) {
                res.status(404).send({ mensaje: "Usuario no encontrado" });
                return;
            }

            if (user == null) {
                res.status(404).send({ mensaje: "Id no es de un usuario" });
                return;
            }

            res.status(200).send(user);

        });
    }).put(function(req, res) {
        User.findById(req.params.id_user, async function(error, user) {
            if (error) {
                res.status(404).send({ mensaje: "Usuario no encontrado" });
                return;
            }

            if (user == null) {
                res.status(404).send({ mensaje: "Id no es de un usuario" });
                return;
            }

            user.nombre = req.body.nombre;
            user.correo = req.body.correo;
            user.contraseña = req.body.contraseña;

            await user.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.status(200).send({ mensaje: "Usuario Actualizado" });
            });

        });
    }).delete(function(req, res) {
        User.deleteOne({ _id: req.params.id_user }, function(err, user) {
            if (err) {
                res.send(error);

            }
            res.status(200).json({ mensaje: "Usuario borrado con éxito" })

        });
    });

    /*--------------------------/
    /* DECLARACION DE API REPORTS */
    /*--------------------------*/

    router.route('/reports')
    .post(async function(req, resp) {
        var report = new Report();
        report.nombre = req.body.nombre;
        report.titulo = req.body.titulo;
        report.fecha = req.body.fecha;
        report.descripcion = req.body.descripcion;
        report.foto = req.body.foto;


        if (report.titulo == "") {
            resp.status(400).send({ error: "El titulo está vacío" });
            return;
        }

        if (report.nombre == "") {
            resp.status(400).send({ error: "El nombre está vacío" });
            return;
        }

        if (report.fecha == "") {
            resp.status(400).send({ error: "La fecha está vacío" });
            return;
        }

        if (report.descripcion == "") {
            resp.status(400).send({ error: "La descripcion está vacío" });
            return;
        }

        if (report.foto == "") {
            resp.status(400).send({ error: "La foto está vacío" });
            return;
        }


        try {
            await report.save(function(err) {
                if (err) {
                    console.log(err);
                    resp.status(500).send({ mensaje: err.message });
                    return;
                }

                resp.json({ mensaje: 'Reporte creado' });
                return;
            });
        } catch (error) {
            if (error.name == "ValidatorError") {
                resp.status(400).send({ error: error.message });
            } else {
                resp.status(500).send({ mensaje: error })
            }
            return;
        }
    }).get(function(req, resp) {

        limite = parseInt(req.body.limite);
        titulo = req.body.titulo;

        if (titulo != "" || titulo == null) {
            Report.find({ titulo: titulo }, function(err, reports) {
                if (err) {
                    resp.status(500).send(err);
                }

                resp.status(200).send(reports);
                return;

            });

        } else {

            Report.find(function(err, reports) {
                if (err) {
                    resp.status(500).send(err);
                }

                resp.status(200).send(reports);
                return;

            }).limit(limite);
        }
    });


router.route('/reports/:id_report')
    .get(function(req, res) {
        Report.findById(req.params.id_report, function(error, report) {
            if (error) {
                res.status(404).send({ mensaje: "Reporte no encontrado" });
                return;
            }

            if (report == null) {
                res.status(404).send({ mensaje: "Id no es de un reporte" });
                return;
            }

            res.status(200).send(report);

        });
    }).put(function(req, res) {
        Report.findById(req.params.id_report, async function(error, report) {
            if (error) {
                res.status(404).send({ mensaje: "Reporte no encontrado" });
                return;
            }

            if (report == null) {
                res.status(404).send({ mensaje: "Id no es de un reporte" });
                return;
            }

            report.nombre = req.body.nombre;
            report.titulo = req.body.titulo;
            report.fecha = req.body.fecha;
            report.descripcion = req.body.descripcion;
            report.foto = req.body.foto;

            await report.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.status(200).send({ mensaje: "Reporte Actualizado" });
            });

        });
    }).delete(function(req, res) {
        Report.deleteOne({ _id: req.params.id_report }, function(err, report) {
            if (err) {
                res.send(error);

            }
            res.status(200).json({ mensaje: "Reporte borrado con éxito" })

        });
    });

/*--------------------------*/
/* DECLARACION DE API ADMINS */
/*--------------------------*/
router.route('/admins')
    .post(async function (req, res) {
        var admin = new Admin();
        admin.nombre = req.body.nombre;
        admin.correo = req.body.correo;
        admin.contraseña = req.body.contraseña;

        if(admin.nombre == ""){
            res.status(400).send({error: "Nombre de admin vacio"});
            return;
        }else if(admin.correo == ""){
            res.status(400).send({error: "Correo de admin vacio"});
            return;
        }else if(admin.contraseña == ""){
            res.status(400).send({error: "Contraseña vacia"});
            return;
        }

        try{
            await admin.save(function(err){
                if(err){
                    res.status(500).send({mensaje: err.message});
                    return;
                }
                res.json({mensaje: "Administrador creado"});
                return;
            });
        } catch(error) {
            if(error.nombre == "ValidationError"){
                res.status(400).send({mensaje: error.message});
            } else {
                res.status(500).send({mensaje: error});
            }
            return;
        }
    }).get(function(req, res){
        limite = parseInt(req.body.limite);
        nombre = req.body.nombre;
        if(nombre != "" || nombre == null){
            Admin.find(function(err, admins){
                if(err){
                    res.send(err);
                }
                res.status(200).send(admins);
            });
        } else {
            Admin.find(function(err, admins){
                if(err){
                    res.status(500).send(err);
                }
                res.status(200).send(admins);
                return;
            }).limit(limite);
        }
    });
router.route('/admins/:id_admin')
    .get(function(req, res){
        Admin.findById(req.params.id_admin, function(error, admin){
            if (error) {
                res.status(404).send({ mensaje: "Admin no encontrado" });
                return;
            }
            if (admin == null) {
                res.status(404).send({ mensaje: "Id no es de un admin" });
                return;
            }
            res.status(200).send(admin);
        });
    }).put(function(req, res){
        Admin.findById(req.params.id_admin, async function(error, admin){
            if (error) {
                res.status(404).send({ mensaje: "Admin no encontrado" });
                return;
            }
            if (admin == null) {
                res.status(404).send({ mensaje: "Id no es de un admin" });
                return;
            }
            admin.nombre = req.body.nombre;
            admin.correo = req.body.correo;
            admin.contraseña = req.body.contraseña;
            await admin.save(function(err){
                if(err){
                    res.status(500).send(err);
                    return;
                }
                res.status(200).send({mensaje: "Admin actualizado"});
            });
        });
    }).delete(function(req, res){
        Admin.deleteOne({_id: req.params.id_admin}, function(err, admin){
            if(err){
                res.send(error);
            }
            res.status(200).json({mensaje: "Admin eliminado con exito"})
        });
    });