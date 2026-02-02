const express = require("express");
const https = require("https");
const fs = require("fs");
const app = express();

const PORT = 3000;

const options = {
  key: fs.readFileSync("./certs/key.pem"), // Pour m'assurer de lire les fichier avant toute autre execution
  cert: fs.readFileSync("./certs/cert.pem"),
};

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur sécurisé ! ");
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`Serveur HTTPS sur https://localhost:${PORT}`);
});

// Serveur Node pour le port 80
// const express = require("express");
// const app = express();

// const PORT = 3000;

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Bienvenue sur mon application");
// });

// app.listen(PORT, () => {
//   console.log(`Serveur démarré sur http://localhost:${PORT}`);
// });
