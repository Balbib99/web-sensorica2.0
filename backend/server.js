const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');

// Se requiere si se quieren utilizar variables de entorno
require('dotenv').config();

// Libreria para el uso de inicio de sesión por autenticación
// const supabase = require('./lib/supabase')

// Configuración de las cors para el acceso desde cualquier sitio
const allowedOrigins = ['http://localhost:80']; // Lista de orígenes permitidos

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('El origen de la solicitud no está permitido por CORS'));
        }
    },
    credentials: true // Habilitar el envío de cookies y otros credenciales
};

app.use(cors(corsOptions));

app.use(cookieParser())

// Configuración de body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor!');
});

app.get('/api/data', (req, res) => {
    // Lógica para obtener datos
    res.json({ message: 'Datos obtenidos desde el backend' });
});

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

app.get('/api/auth/datos-contaminantes', async (req, res) => {
    const { idEstacion, idContaminante } = req.query;
    const url = `https://www.valladolid.es/valladolid-client/cm/valladolid/Last24HData.1.1.tkContent.365944/obtener-graficas-dia?idEstacion=${idEstacion}&idContaminante=${idContaminante}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
