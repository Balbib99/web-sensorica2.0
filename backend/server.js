const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const https = require('https');
// const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// // Configurar la ruta del certificado y la clave privada
// const key = fs.readFileSync('key.pem');
// const cert = fs.readFileSync('cert.pem');

// // Configurar el servidor HTTPS
// const server = https.createServer({ key: key, cert: cert }, app);

// Middleware para permitir CORS
app.use(cors({
    origin: '*'
}));


// Llamamos al router
app.use('/', require('./routes/router'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



