## 1. Générer les certificats SSL/TLS

### Avec OpenSSL (auto-signé - pour développement) :

```bash
# Créer un dossier pour les certificats
mkdir certs
cd certs

# Générer une clé privée
openssl genrsa -out server.key 2048

# Générer un CSR (Certificate Signing Request)
openssl req -new -key server.key -out server.csr \
  -subj "/C=FR/ST=Region/L=Ville/O=MonEntreprise/CN=localhost"

# Générer un certificat auto-signé (valide 365 jours)
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

**Alternative simplifiée** (tout en une commande) :

```bash
openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt \
  -days 365 -nodes -subj "/CN=localhost"
```

**Si vous utilisez Git Bash. vous devez ajouter ceci au début de la commande**

````bash
MSYS_NO_PATHCONV=1 openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=FR/ST=Region/L=Ville/O=MonEntreprise/CN=localhost"
```

## 2. Structure du projet

```
mon-projet/
├── certs/
│   ├── server.crt
│   └── server.key
├── server.js
└── package.json
```

## 3. Package.json

```json
{
  "name": "serveur-tls",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {}
}
```

## 4. Serveur HTTPS de base

### **server.js** - Version simple :

```javascript
const https = require("https");
const fs = require("fs");
const path = require("path");

// Chemins des certificats
const options = {
  key: fs.readFileSync(path.join(__dirname, "certs", "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "server.crt")),
};

// Création du serveur HTTPS
const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Serveur HTTPS fonctionnel ! 🔒\n");
});

// Démarrer le serveur
const PORT = 443;
server.listen(PORT, () => {
  console.log(`✅ Serveur HTTPS démarré sur https://localhost:${PORT}`);
});

// Gestion des erreurs
server.on("error", (error) => {
  console.error("❌ Erreur serveur:", error.message);
  if (error.code === "EACCES") {
    console.log(`⚠️  Le port ${PORT} nécessite des privilèges élevés`);
    console.log("Essayez avec sudo ou utilisez un port > 1024");
  }
});
```

## 5. Version avec Express.js

Si vous utilisez Express :

```bash
npm install express
```

```javascript
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

// Middleware de base
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Serveur HTTPS avec Express",
    secure: req.secure,
    protocol: req.protocol,
  });
});

app.get("/api/data", (req, res) => {
  res.json({ timestamp: new Date(), status: "secure" });
});

// Options TLS
const tlsOptions = {
  key: fs.readFileSync(path.join(__dirname, "certs", "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "server.crt")),
  // Pour plus de sécurité en production :
  // minVersion: 'TLSv1.2',
  // ciphers: 'HIGH:!aNULL:!MD5'
};

// Créer le serveur HTTPS
const PORT = 8443; // Alternative au 443 si pas de sudo
const server = https.createServer(tlsOptions, app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur Express HTTPS démarré:`);
  console.log(`   Local: https://localhost:${PORT}`);
  console.log(`   Réseau: https://${getLocalIP()}:${PORT}`);
});

// Obtenir l'IP locale pour l'affichage
function getLocalIP() {
  const interfaces = require("os").networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}
```

## 6. Version avec redirection HTTP → HTTPS (si besoin)

```javascript
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

// Middleware pour forcer HTTPS (en production)
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Votre code d'application...

// Serveur HTTPS principal
const httpsOptions = {
  key: fs.readFileSync("certs/server.key"),
  cert: fs.readFileSync("certs/server.crt"),
};

const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(443, () => {
  console.log("HTTPS sur le port 443");
});

// Redirection HTTP vers HTTPS
http
  .createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`,
    });
    res.end();
  })
  .listen(80, () => {
    console.log("Redirection HTTP -> HTTPS sur le port 80");
  });
```

## 7. Pour utiliser Let's Encrypt (Production)

```javascript
const tlsOptions = {
  key: fs.readFileSync("/etc/letsencrypt/live/votredomaine.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/votredomaine.com/fullchain.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/votredomaine.com/chain.pem"),
};
```

## 8. Tester le serveur

```bash
# Démarrer le serveur
node server.js

# Tester avec curl
curl -k https://localhost:8443  # -k ignore la vérification du certificat auto-signé

# Tester avec curl en vérifiant le certificat (développement)
curl --cacert certs/server.crt https://localhost:8443
```

## Points importants :

1. **En développement** : Les certificats auto-signés afficheront un avertissement dans le navigateur
2. **En production** : Utilisez Let's Encrypt ou un certificat d'une autorité reconnue
3. **Ports** :
   - HTTPS standard : port 443 (nécessite sudo sous Linux)
   - Alternative : ports 8443, 8080, 3000
4. **Sécurité** : Gardez toujours votre clé privée (`.key`) sécurisée !

## Script de démarrage simplifié :

**start.js** :

```javascript
const https = require("https");
const fs = require("fs");

const server = https.createServer(
  {
    key: fs.readFileSync("./certs/server.key"),
    cert: fs.readFileSync("./certs/server.crt"),
  },
  (req, res) => {
    res.end("Hello HTTPS!");
  },
);

const PORT = process.env.PORT || 8443;
server.listen(PORT);
console.log(`HTTPS sur https://localhost:${PORT}`);
```

Exécutez simplement : `node start.js`

Votre serveur Node.js avec TLS est maintenant prêt !
````
