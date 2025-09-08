const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const { open } = require('sqlite');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'portal.db');

// Middleware para parsear JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Sirve archivos como index.html, css, etc.

// Función para inicializar y conectar a la base de datos
async function initializeDatabase() {
    try {
        const db = await open({
            filename: DB_PATH,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');

        // Crear la tabla de usuarios si no existe (mejorado)
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password_hash TEXT,
            client_name TEXT
        )`);

        // Insertar un usuario de prueba si no existe (lógica mejorada y más robusta)
        const testUser = 'admin';
        const testPassword = 'admin.2020x';
        const existingUser = await db.get('SELECT * FROM users WHERE username = ?', [testUser]);

        if (!existingUser) {
            const saltRounds = 10;
            const hash = await bcrypt.hash(testPassword, saltRounds);
            await db.run('INSERT INTO users (username, password_hash, client_name) VALUES (?, ?, ?)', [testUser, hash, 'Admin User']);
            console.log(`Test user '${testUser}' created successfully.`);
        }

        return db;
    } catch (err) {
        console.error('Error initializing database', err.message);
        process.exit(1); // Salir si no se puede conectar a la BD
    }
}

(async () => {
    const db = await initializeDatabase();

    // Ruta de la API para el login (mejorada con async/await)
    app.post('/api/login', async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Usuario y contraseña son requeridos.' });
        }

        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

            if (!user) {
                // Usar el mismo mensaje de error para no revelar si un usuario existe o no
                return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (isMatch) {
                // En un futuro, aquí generarías un token de sesión (JWT)
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.' });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
            }
        } catch (err) {
            console.error('Login error:', err.message);
            res.status(500).json({ success: false, message: 'Error del servidor.' });
        }
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
})();