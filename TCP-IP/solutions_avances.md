# Solutions détaillées des exercices TCP/IP

## 1. **Exercices d'identification de couches**

### Solution 1.1 : Association protocole/couche

1. **HTTP** → Couche Application (TCP/IP) / Couche 7 (OSI)
2. **TCP** → Couche Transport (TCP/IP) / Couche 4 (OSI)
3. **IP** → Couche Internet (TCP/IP) / Couche 3 (OSI)
4. **Ethernet** → Couche Accès réseau (TCP/IP) / Couche 2 (OSI)
5. **DNS** → Couche Application (TCP/IP) / Couche 7 (OSI)
6. **UDP** → Couche Transport (TCP/IP) / Couche 4 (OSI)
7. **TLS** → Entre Application et Transport (agit sur les données applicatives avant transport)
8. **SSH** → Couche Application (TCP/IP) / Couche 7 (OSI)
9. **QUIC** → Couche Transport (TCP/IP) / Couche 4 (OSI)
10. **Wi-Fi (802.11)** → Couche Accès réseau (TCP/IP) / Couches 1-2 (OSI)

### Solution 1.2 : Scénario d'encapsulation SMTP

**Processus d'encapsulation :**

```
1. Données applicatives (SMTP) :
   "Bonjour, voici le rapport."
   + En-têtes SMTP (From, To, Date, Subject)

2. Couche Transport (TCP) :
   [Port source: 587, Port dest: 25]
   [SEQ: ISN, ACK: 0]
   + "Bonjour, voici le rapport." + en-têtes SMTP

3. Couche Internet (IP) :
   [IP source: 192.168.1.10]
   [IP dest: 203.0.113.5]
   [Protocole: TCP (6)]
   + Segment TCP complet

4. Couche Accès réseau (Ethernet) :
   [MAC dest: Routeur (ex: 00:1A:2B:3C:4D:5F)]
   [MAC source: 00:1A:2B:3C:4D:5E]
   [Type: 0x0800 (IPv4)]
   + Paquet IP complet
   + FCS (Frame Check Sequence)

5. Physique :
   Conversion en signaux électriques/optiques
```

## 2. **Exercices sur le three-way handshake TCP**

### Solution 2.1 : Calcul de séquences

**Données :**

- ISN client = 1000
- ISN serveur = 5000
- Premier segment client = 200 octets

**Séquences :**

1. **SYN (client → serveur) :**
   - Sequence Number = 1000
   - Acknowledgment Number = 0 (pas encore de données reçues)
   - Flags : SYN=1

2. **SYN-ACK (serveur → client) :**
   - Sequence Number = 5000 (ISN serveur)
   - Acknowledgment Number = 1001 (ISN client + 1)
   - Flags : SYN=1, ACK=1

3. **ACK (client → serveur) :**
   - Sequence Number = 1001 (ISN client + 1)
   - Acknowledgment Number = 5001 (ISN serveur + 1)
   - Flags : ACK=1

4. **Premier segment de données (client → serveur) :**
   - Sequence Number = 1001 (début des données)
   - Acknowledgment Number = 5001
   - Après envoi des 200 octets : prochain SEQ = 1201
   - Flags : ACK=1, PSH=1 (push pour livraison immédiate)

### Solution 2.2 : Dépannage de connexion

**Scénario :**

```
Client: SYN (seq=1000)
Serveur: SYN-ACK (seq=4000, ack=1001)
Client: ACK (seq=1001, ack=4000)
[Connexion établie]
Client: DATA (seq=1001, 1500 octets) → Pas de réponse
```

**3 causes possibles :**

1. **Problème de route/firewall :**
   - Le segment DATA est bloqué par un firewall intermédiaire
   - ACL (Access Control List) bloque le port ou l'adresse IP
   - Test : `traceroute` et vérification des règles firewall

2. **Problème de buffer serveur :**
   - Buffer d'écoute TCP plein sur le serveur
   - Application serveur ne `accept()` pas les nouvelles connexions
   - Solution : Vérifier `netstat -an | grep LISTEN` et espace mémoire

3. **MTU/Path MTU Discovery :**
   - Segment de 1500 octets dépasse le MTU d'un lien intermédiaire
   - Paquet fragmenté ou ICMP "Fragmentation Needed" bloqué
   - Test : Réduire la taille du segment (MSS negotiation)

## 3. **Exercices sur les ports et adressage**

### Solution 3.1 : Identification de services

```
Local: 192.168.1.1:22 ↔ Distant: 10.0.0.5:54321
→ Service : SSH (Secure Shell)
→ Client : Utilisateur distant (port éphémère 54321 > 1023)

Local: 192.168.1.1:443 ↔ Distant: 10.0.0.6:49215
→ Service : HTTPS (HTTP Secure)
→ Client : Navigateur web ou application

Local: 192.168.1.1:53 ↔ Distant: 8.8.8.8:53
→ Service : DNS (Domain Name System)
→ Client : Serveur DNS faisant une requête récursive

Local: 192.168.1.1:80 ↔ Distant: 10.0.0.7:62341
→ Service : HTTP (Web)
→ Client : Navigateur ou script
```

### Solution 3.2 : Conception d'architecture

**Stratégie proposée :**

1. **Site principal (HTTPS) :**
   - Port 443 (HTTPS standard)
   - Virtual Host avec Server Name
   - Justification : Standard pour le web sécurisé

2. **API REST (HTTPS) :**
   - Port 443 également
   - Différencié par URL (/api/\*) ou sous-domaine (api.example.com)
   - Justification : Éviter les problèmes de firewall avec ports non-standard

3. **Interface d'administration (SSH) :**
   - Port 22 (SSH standard)
   - Restreindre l'accès par IP source
   - Justification : Standard pour administration à distance

4. **Monitoring (HTTP) :**
   - Port 8080 (HTTP alternative)
   - Ou port 443 avec authentification
   - Justification : Séparation des services, évite confusion

5. **Serveur de fichiers (FTP) :**
   - Port 21 (contrôle) + Ports 20 ou plage passive (50000-51000)
   - Préférer SFTP (SSH) sur port 22
   - Justification : FTP clair obsolète, préférer SFTP/SCP

**Recommandation supplémentaire :**

- Load Balancer en frontal sur les ports 80/443
- Redirection HTTP → HTTPS automatique
- Séparation des services sur différents serveurs si possible

## 4. **Exercices sur HTTP/HTTPS**

### Solution 4.1 : Comparaison des versions HTTP

1. **Site e-commerce avec multiples ressources :**
   - **Version recommandée : HTTP/2 ou HTTP/3**
   - **Justification :** Multiplexing permet de charger images/scripts en parallèle
   - Réduction de la latence grâce à un seul handshake TCP/TLS

2. **Application de trading boursier :**
   - **Version recommandée : HTTP/3**
   - **Justification :** QUIC réduit la latence (0/1 RTT)
   - Meilleure résistance aux changements de réseau (mobile)

3. **Blog statique avec peu de visiteurs :**
   - **Version recommandée : HTTP/1.1**
   - **Justification :** Simplicité, support universel
   - Overhead de HTTP/2/3 non justifié pour trafic faible

4. **Application de vidéoconférence Web :**
   - **Version recommandée : HTTP/3 + WebRTC**
   - **Justification :** HTTP/3 pour signalisation, WebRTC pour flux média
   - Faible latence, support NAT traversal

5. **Téléchargement de gros fichiers :**
   - **Version recommandée : HTTP/2**
   - **Justification :** Stream multiplexé permet téléchargements parallèles
   - Head-of-line blocking évité contrairement à HTTP/1.1

### Solution 4.2 : Analyse de requête HTTP

**Requête :**

```
GET /api/data?user=123 HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer xyz123
```

1. **Nombre de requêtes TCP :**
   - **HTTP/1.0 :** 1 requête TCP par ressource (sans keep-alive)
   - **HTTP/1.1 :** Réutilisation possible (keep-alive)
   - **HTTP/2 :** 1 connexion TCP pour toutes les ressources (multiplexing)

2. **Token expiré pendant la session :**
   - Serveur répond `401 Unauthorized` ou `403 Forbidden`
   - Client doit rafraîchir le token (via OAuth refresh token)
   - Nouvelle requête avec token valide
   - Bonne pratique : Utiliser des tokens courts + refresh automatique

3. **Modification par HTTPS :**
   - **Avant envoi :** Handshake TLS pour établir session chiffrée
   - **Chiffrement :** Tous les headers et body chiffrés (sauf SNI)
   - **Headers ajoutés :**
     ```
     TLS Record Layer
     Application Data (HTTP chiffré)
     ```
   - **Port :** 443 au lieu de 80
   - **SNI (Server Name Indication) :** api.example.com dans le handshake TLS

## 5. **Exercices DNS**

### Solution 5.1 : Résolution DNS pour `www.universite.fr`

1. **Serveurs consultés (ordre) :**

   ```
   1. Cache local (hosts, mDNS, etc.)
   2. Resolveur configuré (FAI ou 8.8.8.8)
   3. Serveur racine (.)
   4. Serveur TLD .fr
   5. Serveurs autoritaires pour universite.fr
   6. Serveur spécifique pour www.universite.fr
   ```

2. **Protocole de transport :**
   - Résolveur → Serveurs : UDP 53 (par défaut)
   - Si réponse > 512 octets : TCP 53
   - DNSSEC : Requiert souvent TCP
   - DoT (DNS over TLS) : TCP 853
   - DoH (DNS over HTTPS) : HTTPS sur 443

3. **Temps sans cache :**

   ```
   Local → Résolveur : 10 ms
   Résolveur → Racine : 30 ms
   Racine → TLD .fr : 25 ms
   TLD → Autoritaires : 20 ms
   Autoritaire → WWW : 15 ms
   Total : ~100 ms (sans latence réseau additionnelle)
   ```

4. **Enregistrements retournés :**
   ```
   A : www.universite.fr. 3600 IN A 203.0.113.45
   AAAA : www.universite.fr. 3600 IN AAAA 2001:db8::1
   NS : universite.fr. 86400 IN NS ns1.universite.fr.
   MX : universite.fr. 3600 IN MX 10 mail.universite.fr.
   SOA : universite.fr. 3600 IN SOA ...
   ```

### Solution 5.2 : Problème de résolution DNS

**Problème :** `www.monsite.com` inaccessible mais IP 198.51.100.25 accessible.

**Étapes de diagnostic :**

1. **Test de résolution local :**

   ```bash
   nslookup www.monsite.com
   dig www.monsite.com
   # Vérifier si l'IP retournée est correcte
   ```

2. **Vérification de la configuration DNS :**

   ```bash
   cat /etc/resolv.conf
   ipconfig /all  # Windows
   # Vérifier serveurs DNS configurés
   ```

3. **Test avec différents résolveurs :**

   ```bash
   dig @8.8.8.8 www.monsite.com
   dig @1.1.1.1 www.monsite.com
   # Vérifier si problème spécifique au résolveur
   ```

4. **Vérification des enregistrements DNS :**

   ```bash
   dig www.monsite.com A
   dig monsite.com NS
   whois monsite.com
   # Vérifier expiration du domaine, délégation
   ```

5. **Solutions possibles :**
   - **Cache DNS corrompu :** `ipconfig /flushdns` ou `systemd-resolve --flush-caches`
   - **Problème de TTL :** Attendre expiration du cache
   - **Serveur DNS défaillant :** Changer de résolveur
   - **Enregistrement manquant :** Contacter l'hébergeur

## 6. **Exercices TLS/Certificats**

### Solution 6.1 : Chiffrement hybride TLS

**Pourquoi hybride :**

1. **Chiffrement asymétrique (début) :**
   - Pour échanger la clé symétrique de manière sécurisée
   - Résout le problème de distribution des clés
   - Permet l'authentification via certificats

2. **Chiffrement symétrique (suite) :**
   - Beaucoup plus rapide pour les données en volume
   - Moins de charge CPU
   - Adapté au chiffrement de flux continu

**Calcul de performance :**

```
Données :
- Message : 10 Mo = 10,485,760 octets
- Échange clé : 256 octets
- Asymétrique : 1000 ops/octet
- Symétrique : 1 op/octet

Calcul :
1. Échange clé asymétrique :
   256 octets × 1000 ops/octet = 256,000 ops

2. Chiffrement symétrique :
   10,485,760 octets × 1 op/octet = 10,485,760 ops

3. Total hybride :
   256,000 + 10,485,760 = 10,741,760 ops

4. Si tout en asymétrique :
   10,485,760 × 1000 = 10,485,760,000 ops

Gain :
   10,485,760,000 / 10,741,760 ≈ 976× plus rapide
```

### Solution 6.2 : Chaîne de certificats

**Certificat :** `*.example.com` ← CA Intermédiaire B ← CA Racine A

1. **Vérification par navigateur :**

   ```
   Étape 1 : Récupère certificat *.example.com
   Étape 2 : Vérifie signature avec clé publique de CA B
   Étape 3 : Récupère certificat CA B
   Étape 4 : Vérifie signature avec clé publique de CA A
   Étape 5 : CA A est dans le trust store du navigateur
   Étape 6 : Vérifie la révocation (CRL/OCSP)
   Étape 7 : Vérifie le nom de domaine et la date
   ```

2. **Si CA Intermédiaire B révoquée :**
   - Tous les certificats signés par B deviennent invalides
   - Navigateur affiche erreur "Certificat non fiable"
   - Solution : Resigner les certificats avec une autre CA
   - Transition difficile nécessitant re-déploiement

3. **Implémentation revocation :**
   - **CRL (Certificate Revocation List) :**
     - Liste téléchargée périodiquement
     - Problème : Fraîcheur des données
     - Solution : Delta CRL et CDP (CRL Distribution Points)

   - **OCSP (Online Certificate Status Protocol) :**
     - Vérification en temps réel
     - Problème : Vie privée (serveur sait quels sites vous visitez)
     - Solution : OCSP Stapling (serveur fournit la preuve)

   - **OCSP Must-Staple :**
     - Extension obligeant le stapling
     - Meilleure sécurité mais complexité accrue

   - **CT (Certificate Transparency) :**
     - Logs publics de tous les certificats émis
     - Détection rapide des certificats frauduleux

## 7. **Cas pratiques complexes**

### Solution 7.1 : Diagnostic de lenteur HTTPS

**Méthodologie en 5 étapes :**

1. **Analyse côté client :**

   ```bash
   # 1. Test DNS
   dig webapp.company.com

   # 2. Test connectivité TCP
   tcping webapp.company.com 443

   # 3. Test TLS handshake
   openssl s_client -connect webapp.company.com:443 -servername webapp.company.com

   # 4. Mesure RTT
   ping webapp.company.com

   # 5. Traceroute
   traceroute -T -p 443 webapp.company.com
   ```

2. **Analyse réseau intermédiaire :**
   - Vérifier MTU avec `ping -M do -s 1472`
   - Capturer trafic avec Wireshark
   - Analyser TCP retransmissions et window size

3. **Analyse serveur :**

   ```bash
   # 1. Charge serveur
   top, htop, vmstat

   # 2. Connexions TCP
   ss -tan | grep :443
   netstat -an | grep ESTABLISHED

   # 3. Logs applicatifs
   tail -f /var/log/nginx/access.log
   journalctl -u nginx -f
   ```

4. **Test applicatif :**

   ```bash
   # 1. Test sans TLS
   curl -v http://localhost:8080/health

   # 2. Test avec TLS
   curl -vk https://localhost/health

   # 3. Benchmark
   ab -n 1000 -c 10 https://webapp.company.com/
   ```

5. **Analyse SSL/TLS :**

   ```bash
   # 1. Vérifier certificat
   openssl x509 -in cert.pem -text -noout

   # 2. Vérifier cipher suites
   nmap --script ssl-enum-ciphers -p 443 webapp.company.com

   # 3. Test performance TLS
   openssl speed aes-256-gcm
   ```

### Solution 7.2 : Migration IPv6

**1. Scénarios de cohabitation :**

- **Dual-stack :** IPv4 et IPv6 simultanément (recommandé)
- **Tunneling :** 6to4, Teredo, ISATAP (transition)
- **Traduction :** NAT64/DNS64 (IPv6-only vers IPv4)
- **Proxy :** Application-level gateway

**2. Gestion DNS pendant transition :**

```
Stratégie :
1. Ajouter AAAA records pour tous les services
2. Utiliser Happy Eyeballs (RFC 8305)
3. Monitoring : 50/50 IPv4/IPv6 initialement
4. DNSSEC pour IPv6
5. PTR records pour IPv6 (reverse DNS)
```

**3. Tests de régression :**

```bash
# Tests fonctionnels
ping6, traceroute6, telnet IPv6

# Tests applicatifs
curl -6, wget --inet6-only

# Tests sécurité
ip6tables, scans IPv6

# Tests performance
iperf3 -V, throughput IPv6
```

**4. Plan de migration sur 12 mois :**

```
Mois 1-2 : Audit et planification
Mois 3-4 : Formation équipes
Mois 5-6 : Infrastructure réseau (routeurs, firewalls)
Mois 7-8 : Serveurs et services
Mois 9-10 : Clients et postes de travail
Mois 11 : Tests et validation
Mois 12 : Bascule et monitoring
```

### Solution 7.3 : Architecture microservices

**1. Stratégie de ports :**

```
Service Discovery : 8500 (Consul), 8761 (Eureka)
API Gateway : 443 (HTTPS), 80 (HTTP redirect)
Services internes : 8080-8099 (HTTP)
Base de données : 5432 (PostgreSQL), 27017 (MongoDB)
Cache : 6379 (Redis), 11211 (Memcached)
Monitoring : 9090 (Prometheus), 3000 (Grafana)
```

**2. Protocoles de communication :**

```
Client ←→ Gateway : HTTP/2 + TLS
Gateway ←→ Services : gRPC (performance)
Services internes : gRPC ou REST/HTTP2
Notifications temps réel : WebSocket + STOMP
File d'attente : AMQP (RabbitMQ) ou Kafka
```

**3. Chiffrement :**

```
TLS mutual pour service-to-service
Certificats courts durée (automatically rotated)
Vault ou Kubernetes Secrets pour gestion
mTLS avec SPIFFE/SPIRE pour identité
```

**4. Découverte de services :**

```
Pattern : Client-side discovery (Consul, Eureka)
Health checks : HTTP, TCP, custom scripts
Load balancing : Round-robin, least connections
Circuit breaker : Hystrix, Resilience4j
```

## 8. **Exercices de capture réseau**

### Solution 8.1 : Analyse Wireshark

**Données capturées :**

1. **Nombre de RTT avant données :**

   ```
   DNS Resolution : 1 RTT
   TCP Handshake : 1 RTT
   TLS Handshake : 2 RTT (TLS 1.2)
   Total : 4 RTT minimum
   Avec TLS 1.3 : 1 RTT (0-RTT possible)
   ```

2. **Cipher suites identifiées :**

   ```bash
   # Exemple de négociation :
   Client Hello : Offers 10 cipher suites
   Server Hello : Selects TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
   Key Exchange : ECDHE, Curve X25519
   ```

3. **Calcul débit effectif :**

   ```
   Données transmises : 1,500,000 octets
   Temps total : 2.5 secondes
   Débit brut : 1.5 MB / 2.5s = 600 KB/s
   Surcharge TCP/TLS : ~10%
   Débit net : ~540 KB/s
   ```

4. **Problèmes détectables :**
   - Retransmissions TCP (> 3% de perte)
   - Zero window (receiver buffer full)
   - Out-of-order packets
   - TCP spurious retransmissions
   - TLS handshake failures

### Solution 8.2 : Reconstruction de session TCP

**Frames désordonnées :**

```
Frame 1: SYN (seq=1000)
Frame 5: ACK (seq=1001, ack=5000)  ← Erroné, trop tôt
Frame 2: SYN-ACK (seq=5000, ack=1001)
Frame 3: PSHA (seq=1001, len=1500)
Frame 6: ACK (seq=5000, ack=2501)  ← Accuse réception frame 3
Frame 4: PSHA (seq=2501, len=1000)  ← Suite des données
```

**Ordre correct reconstruit :**

```
1. Frame 1: SYN (seq=1000)
2. Frame 2: SYN-ACK (seq=5000, ack=1001)
3. Frame 5: ACK (seq=1001, ack=5001)  ← Corrigé (5000+1)
4. Frame 3: PSHA (seq=1001, len=1500)
5. Frame 6: ACK (seq=5001, ack=2501)  ← Accuse 1500 octets
6. Frame 4: PSHA (seq=2501, len=1000)
```

**Analyse :**

- **Taille de fenêtre :** Déduite des ACK
  - Frame 6: ack=2501 → 1500 octets acceptés
  - Window size probable : 8192 (standard)
- **Pertes de paquets :** Aucune détectée
  - Séquence continue : 1001 → 2501 → 3501
  - ACK correspondent aux SEQ envoyés

## 9. **Exercices de sécurité**

### Solution 9.1 : Attaque Man-in-the-Middle

**1. Interception HTTP non chiffré :**

- **Attaque :** Écoute réseau (Wireshark sur même LAN)
- **Contre-mesures :**
  - Utiliser HTTPS exclusivement
  - HSTS (HTTP Strict Transport Security)
  - Network segmentation

**2. Tentative interception HTTPS :**

- **Attaque :** Certificat falsifié + DNS poisoning
- **Contre-mesures :**
  - Certificats DV/OV/EV
  - Certificate Transparency
  - DNSSEC + DANE

**3. Exploitation certificat auto-signé :**

- **Attaque :** Présenter un certificat auto-signé
- **Contre-mesures :**
  - Ne pas accepter les exceptions de certificat
  - PKI d'entreprise avec CA interne
  - Pinner les certificats publics (HPKP déprécié, utiliser Expect-CT)

### Solution 9.2 : Configuration Nginx sécurisée

**Configuration TLS idéale :**

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # 1. Certificats
    ssl_certificate /etc/ssl/certs/fullchain.pem;
    ssl_certificate_key /etc/ssl/private/privkey.pem;
    ssl_trusted_certificate /etc/ssl/certs/chain.pem;

    # 2. Versions protocole
    ssl_protocols TLSv1.2 TLSv1.3;

    # 3. Cipher suites (TLS 1.2 + 1.3)
    ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256';

    # 4. Paramètres avancés
    ssl_prefer_server_ciphers on;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # 5. Headers sécurité
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Content-Security-Policy "default-src 'self';" always;

    # 6. Renouvellement automatique (Certbot)
    # certbot --nginx --keep-until-expiring --redirect --hsts --uir
}
```

## 10. **Projets pratiques (pseudocode)**

### Solution 10.1 : Client HTTP minimal (Python)

```python
import socket
import ssl

class SimpleHTTPClient:
    def __init__(self):
        self.sock = None

    def dns_resolve(self, hostname):
        """Résolution DNS simplifiée"""
        try:
            return socket.gethostbyname(hostname)
        except socket.gaierror:
            # Fallback à un résolveur
            resolver = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            # Implémentation DNS basic...
            return "8.8.8.8"  # Simplification

    def tcp_handshake(self, ip, port):
        """Three-way handshake manuel"""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        # SYN
        self.sock.connect((ip, port))
        # Le kernel gère le handshake
        return True

    def send_http_request(self, host, path="/"):
        """Envoi requête HTTP GET"""
        request = f"GET {path} HTTP/1.1\r\n"
        request += f"Host: {host}\r\n"
        request += "Connection: keep-alive\r\n"
        request += "User-Agent: SimpleHTTPClient/1.0\r\n"
        request += "Accept: text/html\r\n"
        request += "\r\n"

        self.sock.sendall(request.encode())

        # Réception réponse
        response = b""
        while True:
            chunk = self.sock.recv(4096)
            if not chunk:
                break
            response += chunk

        return response.decode('utf-8', errors='ignore')

    def parse_http_response(self, response):
        """Parsing basique de réponse HTTP"""
        headers, body = response.split("\r\n\r\n", 1)
        status_line = headers.split("\r\n")[0]
        return {
            'status': status_line,
            'headers': headers,
            'body': body[:1000]  # Premiers 1000 caractères
        }

    def close(self):
        if self.sock:
            self.sock.close()

# Utilisation
client = SimpleHTTPClient()
ip = client.dns_resolve("example.com")
if client.tcp_handshake(ip, 80):
    response = client.send_http_request("example.com")
    parsed = client.parse_http_response(response)
    print(f"Status: {parsed['status']}")
    print(f"Body preview: {parsed['body'][:500]}")
client.close()
```
