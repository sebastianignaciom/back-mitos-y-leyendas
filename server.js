const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para evitar redirecciones en OPTIONS (¡ANTES DE TODO!)
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next(); // No redirijas OPTIONS
    }
    // Aquí puedes agregar otras redirecciones (HTTPS, WWW) si son necesarias,
    // pero *asegúrate* de que la condición anterior esté primero.
    next();
});


// Configuración CORS (DESPUÉS del middleware de redirección)
app.use(cors({
    origin: 'https://mitos-y-leyendas-web.vercel.app', // Reemplaza con tu dominio
    methods: ['POST', 'OPTIONS'], // Importante: Incluye OPTIONS
    allowedHeaders: ['Content-Type'], // Si usas otras cabeceras, inclúyelas aquí
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Importa y usa tus rutas (si tienes archivos de rutas separados)
const subscribeRoute = require('./api/subscribe'); // Ajusta la ruta si es diferente
app.post('/api/subscribe', subscribeRoute); // Usa la ruta importada

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;