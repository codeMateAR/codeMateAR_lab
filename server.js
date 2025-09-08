const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'portal.db');

// Middleware para parsear JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Sirve archivos como index.html, css, etc.

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Crear la tabla de usuarios si no existe
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password_hash TEXT,
            client_name TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                // Insertar un usuario de prueba si no existe para que puedas hacer login
                const testUser = 'admin';
                const testPassword = 'admin.2020x';
                db.get('SELECT * FROM users WHERE username = ?', [testUser], (err, row) => {
                    if (!row) {
                        bcrypt.hash(testPassword, 10, (err, hash) => {
                            db.run('INSERT INTO users (username, password_hash, client_name) VALUES (?, ?, ?)', 
                                [testUser, hash, 'Admin User'], 
                                () => console.log(`Test user 'admin' created successfully.`)
                            );
                        });
                    }
                });
            }
        });
    }
});

// Ruta de la API para el login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos.' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error del servidor.' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Comparar la contraseña enviada con el hash guardado
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error del servidor.' });
            }
            if (isMatch) {
                // En un futuro, aquí generarías un token de sesión (JWT)
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.' });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
            }
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});