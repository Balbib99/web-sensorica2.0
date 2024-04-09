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

const express = require('express');
const cors = require('cors');

// Se requiere si se quieren utilizar variables de entorno
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS
const corsOptions = {
    origin: ['https://web-sensorica.com', 'https://localhost:443', 'http://localhost:5000'],
    methods: ['GET', 'POST'], // Puedes ajustar los métodos permitidos según tus necesidades
    allowedHeaders: ['Content-Type', 'Authorization'], // Puedes ajustar las cabeceras permitidas según tus necesidades
    credentials: true // Habilita el intercambio de cookies a través de dominios
};

app.use(cors(corsOptions));

// Middleware para manejar errores de CORS
app.use((err, req, res, next) => {
    if (err.name === 'CorsError') {
        res.status(403).json({ error: 'CORS Error: ' + err.message });
    } else {
        next(err);
    }
});

//Llamamos al router
app.use('/', require('./routes/router'))

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


