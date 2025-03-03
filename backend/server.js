require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de MySQL
const dbConfig = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Obtener conexión a MySQL
async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// Endpoint para obtener los usuarios y guardarlos en MySQL
app.get('/api/users', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    

    const [rows] = await connection.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  } finally {
    if (connection) await connection.end();
  }
});

// Endpoint para obtener direcciones de un usuario
app.get('/api/users/:id/addresses', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [addresses] = await connection.execute(
      'SELECT calle, ciudad, estado, codigo_postal FROM direcciones WHERE usuario_id = ?',
      [id]
    );
    res.json(addresses);
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    res.status(500).json({ message: 'Error al obtener direcciones' });
  } finally {
    if (connection) await connection.end();
  }
});

// Endpoint para agregar un usuario aleatorio a la base de datos
app.post('/api/users/add', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    
  
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
   
    const nombre = `${user.name.first} ${user.name.last}`;
    const correo = user.email;
    const pais = user.location.country;
    const foto = user.picture.medium;

    await connection.execute(
      'INSERT INTO usuarios (nombre, correo, pais, foto) VALUES (?, ?, ?, ?)',
      [nombre, correo, pais, foto]
    );
    
    res.json({ message: 'Usuario agregado correctamente', nombre, correo, pais, foto });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ message: 'Error al agregar usuario' });
  } finally {
    if (connection) await connection.end();
  }
});

// Endpoint para eliminar un usuario de la base de datos
app.delete('/api/users/:id', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    // Verificar si el usuario existe antes de eliminarlo
    const [existingUser] = await connection.execute("SELECT * FROM usuarios WHERE id = ?", [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await connection.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  } finally {
    if (connection) await connection.end();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


app.get('/api/users/:id/addresses', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const [addresses] = await connection.execute(
      'SELECT calle, ciudad, estado, codigo_postal FROM direcciones WHERE usuario_id = ?',
      [id]
    );
    console.log('Direcciones obtenidas:', addresses);
    res.json(addresses);
  } catch (error) {
    console.error('Error al obtener direcciones:', error);
    res.status(500).json({ message: 'Error al obtener direcciones' });
  } finally {
    if (connection) await connection.end();
  }
});
