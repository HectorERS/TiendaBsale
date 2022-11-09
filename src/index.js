const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { database } = require('./keys');
const session = require('express-session');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session');

//inicializar
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))//__dirname devuelve la carpeta en donde esta(src) y la concatenamos a views


//Middlewares
app.use(session({
    secret: 'tiendabsale',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
})) //instanciar la sesion para ell uso de flash
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));// aceptar los datos que se envien desde los formularios
app.use(express.json());

//Routes





//Public
app.use(express.static(path.join(__dirname, 'public')))

//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})