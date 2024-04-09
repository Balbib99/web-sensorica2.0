const express = require('express')
const router = express.Router()
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const conexion = require('../database/db');

const authController = require('../controllers/authController')

// Configuración de body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cookieParser()); 

router.get('/', (req, res) => {
    conexion()
    res.send('¡Hola desde el servidor!');
});

router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

router.get('/api/auth/datos-contaminantes', async (req, res) => {
    const { idEstacion, idContaminante } = req.query;
    const url = `https://www.valladolid.es/valladolid-client/cm/valladolid/Last24HData.1.1.tkContent.365944/obtener-graficas-dia?idEstacion=${idEstacion}&idContaminante=${idContaminante}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router