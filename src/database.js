const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database was to many conn');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('CONNECTION REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
})

pool.query = promisify(pool.query); //los metodos querys me permitiran usar asyc await y promesas

module.exports = pool;