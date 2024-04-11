// // Endpoint para manejar la autenticación
// app.post('/api/auth/signin', async (req, res) => {
//     console.log(req.body);
//     const { email, password } = req.body;

//     try {

//         if (!email || !password) {

//             res.status(400).json({ error: 'Falta el email y/o la contraseña en la solicitud de autenticación', message: error.message });

//         }

//         const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//         });

//         // Si la autenticación es exitosa, puedes enviar una respuesta al cliente
//         // Incluir las cookies en la respuesta
//         res.status(200).json({ message: 'Usuario correcto' });

//     } catch (error) {

//         res.status(500).json({ error: 'Error de autenticación', message: error.message });

//     }
// });

// app.get('/api/auth/signout', async (req, res) => {
//     // Eliminar sesión
//     const { error } = await supabase.auth.signOut()

//     if (!error) {
//         res.status(200).json({ message: 'Usuario deslogueado' });
//     } else {
//         console.error('Error al desloguear usuario:', error);
//         res.status(500).json({ error: 'Error al desloguear usuario', message: error.message });
//     }
// });


// app.get('/api/auth/isLoged', async (req, res) => {

//     // Creamos una sesión si el usuario está logueado
//     const currentSession = supabase.auth.getSession();

//     if (currentSession) {
//         res.status(200).json({ message: 'El usuario está logueado' })
//     } else {
//         res.status(400).json({ error: 'Usuario no logueado', message: error.message });
//     }
// });

// app.js

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
app.use(cors());

// Llamamos al router
app.use('/', require('./routes/router'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



