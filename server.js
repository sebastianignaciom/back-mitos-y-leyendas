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
    next(); // Continúa con otras redirecciones (HTTPS, WWW) si las necesitas
});

// Configuración CORS (DESPUÉS del middleware de redirección)
app.use(cors({
    origin: 'https://mitos-y-leyendas-web.vercel.app', // Reemplaza con tu dominio
    methods: ['POST', 'OPTIONS'], // ¡Incluye OPTIONS!
    allowedHeaders: ['Content-Type'], // Si usas otras cabeceras, inclúyelas aquí
}));

app.use(express.json());

// Ruta para la raíz (¡ANTES DE OTRAS RUTAS!)
app.get("/", (req, res) => {
    console.log("Solicitud GET a /"); // Log para depuración
    res.send("Servidor funcionando correctamente");
});

// Otras rutas
const subscribeRoute = require('./api/subscribe');
app.post('/api/subscribe', subscribeRoute);
// ...

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;