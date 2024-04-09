const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connection = require('../database/db');

const { promisify } = require('util');



// Método de registro
exports.register = async (req, res) => {
  try {
    const data = req.body;
    const user = data.email;
    const name = data.name;
    const pass = data.password;
    const role = data.role;

    let passHash = await bcryptjs.hash(pass, 8)

    connection.query('INSERT INTO users SET ?', { user: user, name: name, pass: passHash, role: role }, (error, results) => {
      if (error) {
        
        console.error('Error al instertar los datos en la BBDD:', error);
      
      } else {

        // Envía una respuesta al cliente indicando que la solicitud fue recibida correctamente
        res.status(200).json({ message: 'Solicitud recibida correctamente' });
      
      }
    })

  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    // Devuelve una respuesta de error al cliente
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body.email
    const pass = req.body.password

    connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
      if (results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass))) {
        res.status(401).json({ error: 'Credenciales inválidas: usuario o contraseña incorrectos' });
      }else{
        //Iniio de sesión ok
        const id = results[0].id
        const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
          expiresIn: process.env.JWT_TIEMPO_EXPIRA
        })

        res.status(200).json({message: 'Inicio exitoso!!', token: token})
      }
    })

  } catch (error) {
    
  }
};
