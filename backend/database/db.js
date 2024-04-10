const mysql = require('mysql2')
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

connection.connect((error) => {
    if (error) {
        console.log('El error de conexión es: '+ error.stack);
        return
    }

    console.log('Conectado a la base de datos MySQL!');
})

module.exports = connection