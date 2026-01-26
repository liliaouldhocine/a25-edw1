# Exercices pratiques pour débutants en réseaux TCP/IP

## Niveau 1 : Analogies pour comprendre les concepts

### Exercice 1.1 : "La Poste analogique"

**Situation :** Vous envoyez une lettre à un ami dans une autre ville.

1. **L'adresse sur l'enveloppe** = **\_\_** (protocole réseau)
2. **Le contenu de la lettre** = **\_\_** (couche applicative)
3. **Le facteur qui trie par ville** = **\_\_** (routeur)
4. **Le code postal** = **\_\_** (masque de réseau)
5. **"Fragile" sur le paquet** = **\_\_** (indicateur TCP)
6. **L'accusé de réception** = **\_\_** (ACK TCP)

### Exercice 1.2 : "Restaurant Internet"

Au restaurant :

- Vous (client) commandez au serveur (serveur web)
- Le serveur note la commande (requête HTTP)
- La cuisine prépare (traitement serveur)
- Le serveur apporte le plat (réponse HTTP)

**Questions :**

1. Que se passe-t-il si le serveur n'entend pas bien votre commande? (**\_\_**)
2. Comment être sûr que la commande est correcte? (**\_\_**)
3. Si vous commandez entrée + plat + dessert, arrive-t-il tout en même temps? (**\_\_**)

## Niveau 2 : Schémas à compléter

### Exercice 2.1 : "Le voyage d'un email"

Complétez le chemin d'un email d'Alice à Bob :

```
Alice tape "Bonjour" dans Gmail
    ↓
[______ couche] : Transformation en données email
    ↓
[TCP] : Découpage en ______ + numérotation
    ↓
[IP] : Ajout adresse IP source: ______ et destination: ______
    ↓
[Ethernet] : Ajout adresse MAC de la ______
    ↓
Signal sur le ______ (câble/Wi-Fi)
    ↓
... voyage à travers Internet ...
    ↓
Bob reçoit "______" dans sa boîte mail
```

### Exercice 2.2 : "Les couches empilées"

Dessinez les 4 couches TCP/IP comme des boîtes empilées. Dans chaque boîte, écrivez :

- Son nom
- 2 exemples de ce qu'elle fait
- 1 protocole qu'elle utilise

Exemple pour "Application" :

```
[ Application ]
• Gère les emails et pages web
• Formate les données
• Protocole: HTTP
```

## Niveau 3 : Scénarios concrets

### Exercice 3.1 : "Problème de connexion Wi-Fi"

**Scénario :** Vous êtes chez un ami. Son Wi-Fi fonctionne, mais vous ne pouvez pas accéder à Facebook.

**Questions de diagnostic :**

1. Pouvez-vous accéder à Google? OUI/NON
   - Si NON → Problème probable : **\_\_**
2. L'icône Wi-Fi montre-vous connecté? OUI/NON
   - Si NON → Problème probable : **\_\_**
3. Facebook marche-t-il sur le téléphone de votre ami? OUI/NON
   - Si OUI → Problème probable : **\_\_**

**Solutions possibles à relier :**
A. Redémarrer le routeur  
B. Vérifier le mot de passe Wi-Fi  
C. Vider le cache DNS (`ipconfig /flushdns`)  
D. Vérifier le firewall

### Exercice 3.2 : "Comparaison streaming vs appel vidéo"

Vous regardez Netflix (streaming) et passez un appel Zoom (visioconférence).

**Complétez le tableau :**

| Aspect             | Netflix (streaming)                   | Zoom (visio)                   | Protocole adapté                     |
| ------------------ | ------------------------------------- | ------------------------------ | ------------------------------------ |
| Perte acceptable?  | OUI - Perdre quelques **\_\_** est OK | NON - Chaque **\_\_** compte   | UDP pour **\_\_**, TCP pour **\_\_** |
| Délai important?   | Peu importe si bufferisé              | Très important (< **\_\_** ms) |                                      |
| Exemple vie réelle | Livraison colis (peut être en retard) | Conversation téléphonique      |                                      |

## Niveau 4 : Jeux de rôle

### Exercice 4.1 : "Jeu des paquets"

**Règles :** En groupe de 4-5 personnes, simulez l'envoi d'un message.

**Rôles :**

- **Expéditeur** : Écrit le message "Hello" sur un papier
- **TCP** : Découpe en lettres H-E-L-L-O, numérote (1-5)
- **IP** : Ajoute adresses "De: Alice, Pour: Bob"
- **Routeur** : "Lit" l'adresse, passe au suivant
- **Destinataire** : Reçoit, vérifie l'ordre, dit "ACK" pour chaque

**Variante problématique :**

- Perte du paquet "L" → Que fait TCP?
- Paquets arrivent dans le désordre → Comment les réordonner?
- Routeur mal configuré → Où va le paquet?

### Exercice 4.2 : "Le jeu du DNS"

**Matériel :** Cartes avec noms de domaine d'un côté, IP au dos.

**Exemple cartes :**

- Recto: "google.com" | Verso: "142.250.179.206"
- Recto: "facebook.com" | Verso: "157.240.241.35"

**Jeu :**

1. Un "client" demande "Je veux google.com"
2. Le "DNS local" cherche dans son cache (mémoire)
3. Si pas trouvé, demande au "DNS racine"
4. Qui demande au "DNS .com"
5. Qui donne l'adresse du "DNS google.com"
6. Qui retourne l'IP

**Questions :**

- Pourquoi ne pas tout garder en cache?
- Que se passe-t-il si le DNS racine ne répond pas?

## Niveau 5 : Observations réelles

### Exercice 5.1 : "Inspecteur réseau"

**Mission :** Ouvrez votre navigateur et inspectez une page web.

**Étapes :**

1. F12 → Onglet "Network"
2. Chargez une page simple (ex: wikipedia.org)
3. Observez :
   - Combien de requêtes? **\_\_**
   - Quel est le premier fichier chargé? **\_\_**
   - Temps de chargement total? **\_\_**

**Questions :**

1. Pourquoi y a-t-il tant de requêtes pour une seule page?
2. Quel est le fichier le plus lourd? Pourquoi?
3. Que signifie le code "200" à côté des fichiers?

### Exercice 5.2 : "Traceroute maison"

**Commande :** `tracert google.com` (Windows) ou `traceroute google.com` (Mac/Linux)

**Résultat typique :**

```
1. Routeur maison (192.168.1.1) - 1 ms
2. FAI (10.10.10.1) - 10 ms
3. ... 5-10 sauts ...
4. Google (142.250.179.206) - 30 ms
```

**Questions :**

1. Combien de "sauts" jusqu'à Google? **\_\_**
2. Où est la plus grande latence (lenteur)? **\_\_**
3. Que signifie "\* \* \*" dans les résultats? **\_\_**

## Niveau 6 : Création simple

### Exercice 6.1 : "Mon premier serveur web"

**Objectif :** Créer un serveur web qui dit "Bonjour" sur votre propre machine.

**Python simple :**

```python
from http.server import HTTPServer, BaseHTTPRequestHandler

class MonHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"<h1>Bonjour le monde!</h1>")

serveur = HTTPServer(('localhost', 8080), MonHandler)
print("Serveur démarré sur http://localhost:8080")
serveur.serve_forever()
```

**Instructions :**

1. Copiez ce code dans un fichier `serveur.py`
2. Exécutez: `python serveur.py`
3. Ouvrez http://localhost:8080 dans votre navigateur
4. Modifiez le message, rechargez la page

**Questions :**

1. Quel "port" utilise votre serveur? **\_\_**
2. Pourquoi "localhost"? Que signifie-t-il? **\_\_**
3. Que se passe-t-il si vous changez le port 8080 en 80?

### Exercice 6.2 : "Ma première requête HTTP"

**Sans navigateur, avec ligne de commande :**

**curl :**

```cmd
curl http://httpbin.org/get
```

**Analysez la réponse :**

```json
{
  "args": {},
  "headers": {
    "Host": "httpbin.org",
    "User-Agent": "curl/7.79.1"
  },
  "origin": "82.65.12.34",
  "url": "http://httpbin.org/get"
}
```

**Questions :**

1. Quelle est votre IP publique? **\_\_**
2. Quel "User-Agent" est envoyé? **\_\_**
3. Que sont les "headers"? À quoi servent-ils? **\_\_**

## Niveau 7 : Problèmes à résoudre

### Exercice 7.1 : "Le mystère de la page blanche"

**Scénario :** Vous cliquez sur un lien, la page reste blanche longtemps puis affiche.

**Hypothèses possibles :**

- [ ] Problème DNS (résolution lente)
- [ ] Serveur surchargé (répond lentement)
- [ ] Fichier CSS/JS bloquant
- [ ] Connexion internet lente

**Outils de diagnostic :**

1. F12 → Network : Voir quelle requête est lente
2. `nslookup domaine.com` : Vérifier DNS
3. `ping domaine.com` : Vérifier connectivité

**Solution :** Reliez chaque symptôme à sa cause probable.

### Exercice 7.2 : "Pourquoi HTTPS?"

**Expérience :** Comparez HTTP vs HTTPS

1. Visitez `http://httpbin.org` (non sécurisé)
2. Visitez `https://httpbin.org` (sécurisé)

**Que remarquez-vous dans la barre d'adresse?**

- HTTP : 🔓 ou "Non sécurisé"
- HTTPS : 🔒 ou "Sécurisé"

**Questions :**

1. Pourquoi votre banque utilise HTTPS? **\_\_**
2. Que pourrait voir un pirate sur un réseau Wi-Fi public si vous utilisez HTTP? **\_\_**
3. Pourquoi tous les sites n'utilisent-ils pas HTTPS? **\_\_**

## Niveau 8 : Quiz visuel

Placez dans l'ordre chronologique :

- [ ] Vous tapez "youtube.com"
- [ ] La vidéo commence à jouer
- [ ] Votre ordinateur demande l'IP à DNS
- [ ] Le routeur envoie les paquets à YouTube
- [ ] Votre navigateur envoie "GET /video"
- [ ] YouTube envoie les données vidéo

**Ordre correct :** 1. **\_\_**, 2. **\_\_**, 3. **\_\_**, 4. **\_\_**, 5. **\_\_**, 6. **\_\_**

## Solutions guidées (partielles pour laisser découvrir)

### Solutions Exercice 1.1 :

1. Adresse = IP
2. Contenu = Données applicatives
3. Facteur tri = Routeur
4. Code postal = Masque de sous-réseau
5. "Fragile" = Flag URGENT ou priorité
6. Accusé = ACK

### Solutions Exercice 3.1 :

1. NON → Problème internet général (A ou D)
2. NON → Problème connexion Wi-Fi (B)
3. OUI → Problème spécifique à votre appareil (C)

### Solutions Exercice 5.1 :

1. Car une page a HTML + CSS + JS + images + fonts...
2. Souvent les images ou les vidéos
3. 200 = "OK", succès
