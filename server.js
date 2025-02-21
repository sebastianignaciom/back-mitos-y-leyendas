// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email es requerido" });
    }
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .insert([{ email }]);
        
        if (error) throw error;

        res.json({ message: "Suscripción exitosa" });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
