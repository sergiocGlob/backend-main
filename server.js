const express =require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const exp = require('constants');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');


app.use('/.well-known',express.static(__dirname + '/public/.well-known'));
//app.use('/.well-known',express.static(__dirname + '/keys'));
//app.use('/static',express.static('.well-known'))

/*
*Rutas
*/
//app.use(session(false));

const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const machines = require('./routes/machinesRoutes');
const address = require('./routes/addressRoutes');
const cities = require('./routes/citiesRoutes');
const esp8266 = require('./routes/esp8266Routes');



const port = 350;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
//app.use(passport.initialize());
//app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');


app.set('port', port);

/*
*Llamando Rutas
*/

users(app);
categories(app);
machines(app);
address(app);
cities (app);
esp8266 (app);


// server.listen(3000,'192.168.12.191' , function(){
//     console.log('Aplicacion de  NodeJS ' + ' Iniciado...')
//     console.log('que te dices')
/// });192.168.39.111


server.listen(350,'0.0.0.0', function(){
    const port = server.address().port;
    console.log(port)
    console.log('Aplicacion de  NodeJS ' + port + ' Iniciado...')
    console.log(__dirname)
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

//"hello"