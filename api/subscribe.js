const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
    if (req.method === "POST") {
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
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
};
