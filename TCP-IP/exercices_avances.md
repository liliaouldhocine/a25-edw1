# Exercices pratiques sur les protocoles TCP/IP

## 1. **Exercices d'identification de couches**

### Exercice 1.1 : Association protocole/couche

Pour chaque protocole, indiquez sa couche principale dans le modèle TCP/IP :

1. HTTP
2. TCP
3. IP
4. Ethernet
5. DNS
6. UDP
7. TLS
8. SSH
9. QUIC
10. Wi-Fi (802.11)

### Exercice 1.2 : Scénario d'encapsulation

Décrivez le processus d'encapsulation pour l'envoi d'un email via SMTP :

- Données : "Bonjour, voici le rapport."
- De : alice@domain.com (IP: 192.168.1.10, MAC: 00:1A:2B:3C:4D:5E)
- À : bob@other.com (Serveur SMTP: smtp.other.com, IP: 203.0.113.5)

Listez ce qui est ajouté à chaque couche.

## 2. **Exercices sur le three-way handshake TCP**

### Exercice 2.1 : Calcul de séquences

Un client initie une connexion TCP avec un serveur :

- ISN client = 1000
- ISN serveur = 5000
- Premier segment de données client = 200 octets

Donnez les valeurs des champs de séquence et d'acquittement pour :

1. Segment SYN (client → serveur)
2. Segment SYN-ACK (serveur → client)
3. Segment ACK (client → serveur)
4. Segment de données (client → serveur)

### Exercice 2.2 : Dépannage de connexion

Analysez ce scénario problématique :

```
Client: SYN (seq=1000)
Serveur: SYN-ACK (seq=4000, ack=1001)
Client: ACK (seq=1001, ack=4000)
[Connexion semble établie]
Client: DATA (seq=1001, 1500 octets)
```

Le serveur ne répond pas. Proposez 3 causes possibles.

## 3. **Exercices sur les ports et adressage**

### Exercice 3.1 : Identification de services

Un administrateur voit ces connexions sur son serveur :

```
Local: 192.168.1.1:22 ↔ Distant: 10.0.0.5:54321
Local: 192.168.1.1:443 ↔ Distant: 10.0.0.6:49215
Local: 192.168.1.1:53 ↔ Distant: 8.8.8.8:53
Local: 192.168.1.1:80 ↔ Distant: 10.0.0.7:62341
```

Identifiez le service sur chaque port local et le type de client.

### Exercice 3.2 : Conception d'architecture

Vous devez configurer un serveur web avec :

- Site principal (HTTPS)
- API REST (HTTPS)
- Interface d'administration (SSH)
- Monitoring (HTTP)
- Serveur de fichiers (FTP)

Proposez une stratégie de ports et justifiez vos choix.

## 4. **Exercices sur HTTP/HTTPS**

### Exercice 4.1 : Comparaison des versions HTTP

Pour chaque scénario, indiquez la version HTTP la plus adaptée et justifiez :

1. Site e-commerce avec multiples images et scripts
2. Application de trading boursier (temps réel)
3. Blog statique avec peu de visiteurs
4. Application de vidéoconférence Web
5. Téléchargement de gros fichiers

### Exercice 4.2 : Analyse de requête

Une requête HTTP contient :

```
GET /api/data?user=123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer xyz123
```

1. Combien de requêtes TCP sont nécessaires en HTTP/1.0? En HTTP/2?
2. Que se passe-t-il si le token expire pendant la session?
3. Comment HTTPS modifierait-il cette requête?

## 5. **Exercices DNS**

### Exercice 5.1 : Résolution DNS

Tracez la résolution complète pour `www.universite.fr` :

1. Quels serveurs sont consultés et dans quel ordre?
2. Quel protocole de transport est utilisé à chaque étape?
3. Combien de temps prendrait cette résolution sans cache?
4. Quels enregistrements DNS seraient retournés?

### Exercice 5.2 : Problème de résolution

Un utilisateur ne peut pas accéder à `www.monsite.com` mais peut accéder à `198.51.100.25` (l'IP du site).
Proposez 4 étapes de diagnostic et correction.

## 6. **Exercices TLS/Certificats**

### Exercice 6.1 : Chiffrement hybride

Expliquez pourquoi TLS utilise :

1. Chiffrement asymétrique au début
2. Chiffrement symétrique ensuite
   Calculez l'avantage en performance si :

- Asymétrique : 1000 opérations/octet
- Symétrique : 1 opération/octet
- Message de 10 Mo
- Échange de clé : 256 octets

### Exercice 6.2 : Chaîne de certificats

Vous avez un certificat pour `*.example.com` signé par "CA Intermédiaire B" qui est lui-même signé par "CA Racine A".

1. Décrivez la vérification par un navigateur
2. Que se passe-t-il si "CA Intermédiaire B" est révoquée?
3. Comment implémenteriez-vous la revocation (CRL vs OCSP)?

## 7. **Cas pratiques complexes**

### Exercice 7.1 : Diagnostic réseau

Scénario : Un utilisateur se plaint de lenteur sur `https://webapp.company.com`.
Vous avez accès à :

- Logs du client
- Logs du serveur web
- Captures réseau
- Résultats de `dig`, `traceroute`, `openssl s_client`

Proposez une méthodologie d'investigation en 5 étapes.

### Exercice 7.2 : Migration IPv6

Une entreprise avec 5000 postes doit migrer vers IPv6.

1. Quels sont les scénarios de cohabitation (dual-stack, tunneling)?
2. Comment gérer le DNS pendant la transition?
3. Quels tests de régression effectuer?
4. Planifiez la migration sur 12 mois.

### Exercice 7.3 : Architecture microservices

Concevez l'architecture réseau pour :

- 10 microservices communicants
- Load balancer
- Base de données
- Cache Redis
- Service d'authentification

Spécifiez :

1. Stratégie de ports
2. Protocoles de communication (REST/gRPC/WebSocket)
3. Chiffrement (TLS mutual, certificats)
4. Découverte de services

## 8. **Exercices de capture réseau**

### Exercice 8.1 : Analyse Wireshark

On vous donne une capture contenant :

1. Requête DNS pour `api.service.com`
2. Three-way handshake TCP sur le port 443
3. TLS Handshake
4. Requête HTTP/2
5. Plusieurs trames de données
6. Fermeture TCP

Questions :

1. Combien de RTT avant que les données applicatives circulent?
2. Identifiez les cipher suites négociées
3. Calculez le débit effectif
4. Détectez d'éventuels problèmes

### Exercice 8.2 : Reconstruction de session

À partir d'une capture TCP désordonnée :

```
Frame 1: SYN (seq=1000)
Frame 5: ACK (seq=1001, ack=5000)
Frame 2: SYN-ACK (seq=5000, ack=1001)
Frame 3: PSHA (seq=1001, len=1500)
Frame 6: ACK (seq=5000, ack=2501)
Frame 4: PSHA (seq=2501, len=1000)
```

1. Reconstruisez l'ordre correct
2. Calculez la taille de la fenêtre
3. Y a-t-il des pertes de paquets?

## 9. **Exercices de sécurité**

### Exercice 9.1 : Attaque MITM

Décrivez comment une attaque Man-in-the-Middle pourrait :

1. Intercepter du HTTP non chiffré
2. Tenter d'intercepter du HTTPS
3. Exploiter un certificat auto-signé
   Proposez des contre-mesures pour chaque cas.

### Exercice 9.2 : Configuration sécurisée

Pour un serveur web Nginx, spécifiez la configuration TLS idéale :

1. Versions de protocole
2. Cipher suites
3. Paramètres de certificat
4. Headers de sécurité (HSTS, CSP)
5. Renouvellement automatique

## 10. **Projets pratiques**

### Projet 10.1 : Client HTTP minimal

En Python ou autre langage, implémentez :

1. Résolution DNS manuelle
2. Three-way handshake TCP
3. Envoi requête HTTP GET
4. Réception et parsing de la réponse
5. Support HTTP/1.1 avec keep-alive

### Projet 10.2 : Serveur de chat

Serveur avec :

1. Multiples clients via WebSocket
2. Chiffrement TLS
3. Rooms de discussion
4. Authentification basique
5. Logs de connexion

### Projet 10.3 : Outil de diagnostic

Créez un outil qui :

1. Teste la résolution DNS
2. Mesure la latence TCP
3. Vérifie la configuration TLS
4. Teste les différentes versions HTTP
5. Génère un rapport de performance

---

## **Corrections types (extraits)**

### Correction 1.1 :

1. HTTP → Application
2. TCP → Transport
3. IP → Internet
4. Ethernet → Accès réseau
5. DNS → Application
6. UDP → Transport
7. TLS → Entre Transport et Application
8. SSH → Application
9. QUIC → Transport
10. Wi-Fi → Accès réseau

### Correction 2.1 :

1. SYN : seq=1000, ack=0
2. SYN-ACK : seq=5000, ack=1001
3. ACK : seq=1001, ack=5001
4. DATA : seq=1001, ack=5001 (après envoi : seq=1201)

### Correction 4.1 :

1. HTTP/2 ou HTTP/3 : multiplexing pour ressources multiples
2. HTTP/3 : minimiser la latence avec QUIC
3. HTTP/1.1 : suffisant pour contenu statique
4. HTTP/3 + WebRTC : temps réel
5. HTTP/2 : stream multiplexé pour gros fichiers
