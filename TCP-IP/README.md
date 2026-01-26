# Cours structuré sur les protocoles TCP/IP

## 1. Introduction au réseau Internet

### Infrastructure physique mondiale

- **Câbles sous-marins** : Réseau mondial interconnecté (Montrer les câbles mondiaux)
- **Fournisseurs de services réseau (NSP)** : Gèrent le trafic Internet via des câbles interconnectés qui se connectent aux sous-réseaux jusqu'aux machines
- **Points d'échange Internet** :
  - **NAP** (Network Access Points)
  - **MAE** (Metropolitan Area Exchange)
- **Économie de l'infrastructure** :
  - Les entreprises développent des réseaux et les louent à des chaînes de fournisseurs (ex: Bell, Rogers)
  - Les fournisseurs d'accès louent le réseau à moindre coût pour les utilisateurs individuels
- **Acteurs majeurs** : GAFA (Google, Apple, Facebook, Amazon) + Microsoft Windows + États-nations

### Système d'adressage et de nommage

- **Adresse IP** : Identifiant unique pour chaque accès
- **Objectif** : Connecter toutes les machines du réseau
- **Routeurs** :
  - Analysent les adresses IP
  - Routeurs liés aux NSP
  - Routeurs liés aux NAP
  - Routeurs des fournisseurs d'accès
- **Système DNS** (Domain Name System) :
  - Étape intermédiaire entre noms de domaine et adresses IP
  - Processus : Adresse saisie → Serveur DNS → IP retrouvée → Router → Machine cible
  - Hiérarchie : DNS racine (majorité américains mais distribués mondialement) → TLD → Serveurs autoritaires

## 2. Modèles de référence réseau

### Modèle OSI (Open Systems Interconnection)

- Créé par l'ISO pour permettre à des systèmes différents de communiquer
- **7 couches** avec rôles spécifiques :

1. **Application (7)** : Interface utilisateur (accès au réseau)
   - Exemple : Image ouverte dans une application

2. **Présentation (6)** : Format des données pour interprétation universelle
   - Permet à l'image d'être comprise par toutes les applications

3. **Session (5)** : Gestion des communications
   - Début, maintien et fin des sessions

4. **Transport (4)** : Transport des données entre systèmes

5. **Réseau (3)** : Détermination des adresses et routage

6. **Liaison de données (2)** : Fiabilité de la transmission sur un lien

7. **Physique (1)** : Caractéristiques physiques (fréquence, vitesse, câbles)

### Modèle TCP/IP

- Implémentation choisie pour Internet, créée par l'armée américaine
- **4 couches** simplifiées :

1. **Application** : Combine Application + Présentation + Session de l'OSI
2. **Transport** : Même rôle que la couche 4 OSI
3. **Internet** : Correspond à la couche Réseau OSI
4. **Accès réseau** : Combine Liaison + Physique OSI
   - Adresse MAC, caractéristiques physiques
   - Aucun impact sur les couches 1, 2, 3 du modèle OSI

## 3. Protocole IP en détail

### Caractéristiques

- Troisième couche du modèle OSI, bloc "Internet" de TCP/IP
- Identifie toutes les machines sur le réseau
- Ajoute adresse du destinataire et de l'expéditeur aux segments de transport
- Résultat : Paquet IP

### Attribution des adresses

- **Fournisseurs d'accès** : Distribuent les adresses aux utilisateurs
- **IANA** (Internet Assigned Numbers Authority) : Calcule et émet toutes les adresses IP
  - Dépend du gouvernement américain (contrôle NAP et NSP)

### Versions d'IP

- **IPv4** : 32 bits (épuisé)
- **IPv6** : 128 bits (solution long terme)
- **Limitation** : IP ne garantit pas la livraison, seulement l'adressage

## 4. Protocoles de transport : TCP vs UDP vs QUIC

### TCP (Transmission Control Protocol)

- **Fiabilité** : Communication sans perte, dans l'ordre
- **Bidirectionnel** : Communication simultanée A→B et B→A
- **Three-way handshake** :
  1. **SYN** : Client → Serveur (avec ISN client)
     - Statut : SYN_SENT
  2. **SYN-ACK** : Serveur → Client (ISN client+1 + ISN serveur)
     - Statut : SYN_RCVD
  3. **ACK** : Client → Serveur (ISN serveur+1)
     - Connexion établie
- **Segments TCP** : Protocole HTTP + en-tête TCP avec numéro de séquence ISN

### UDP (User Datagram Protocol)

- **Rapidité** : Plus rapide que TCP
- **Fiabilité réduite** : Possibilité de pertes de paquets
- **Cas d'utilisation** :
  - Flux vidéo (perte de frames acceptable)
  - Jeux vidéo (rapidité prioritaire)
  - Pas pour transactions bancaires (fiabilité requise)

### QUIC (Quick UDP Internet Connections)

- Développé par Google, standardisé par IETF
- **Objectif** : Remplacer TCP à terme
- **Caractéristiques** :
  - Utilise UDP comme transport
  - Numéro d'identification similaire à TCP
  - Notion d'ACK (accusés de réception)
  - Connexion bidirectionnelle
  - Chiffrement par défaut
  - Fiabilité comparable à TCP
- **HTTP/3** : Basé sur QUIC

## 5. Ports et Sockets

### Ports logiciels

- **Définition** : "Portes" vers des processus spécifiques (0-65535)
- **Gestion** : Protocole TCP gère les ports utilisés
- **Ports standards** :
  - HTTP : 80
  - HTTPS : 443
  - SSH : 22
  - SMTP : 25/587
  - DNS : 53

### Sockets

- **Définition** : Points d'entrée pour communication inter-programmes
- **Composition** :
  - Port origine + IP origine
  - Port destination + IP destination
- **Différence WebSocket** : Protocole applicatif, pas une socket système
- **Rôle** : Point d'accès, ne gère pas la connexion

## 6. Protocoles applicatifs

### HTTP (HyperText Transfer Protocol)

#### Évolution :

- **HTTP/1.0** :
  - Une connexion TCP par requête
  - Destruction et recréation des canaux pour chaque requête

- **HTTP/1.1** :
  - Plusieurs canaux TCP simultanés (2-10)
  - Réutilisation des canaux persistants
  - Pas d'état des requêtes

- **HTTP/2** :
  - Un canal TCP avec multiplexage (plusieurs requêtes simultanées)
  - Server Push (envoi proactif de données)
  - Obligation HTTPS avec TLS 1.2 minimum

- **HTTP/3** :
  - Basé sur QUIC (donc UDP)
  - Handshake plus court
  - TLS 1.3 minimum
  - Performance améliorée (pas de blocage en cascade)
  - Meilleure gestion des pertes de paquets

#### Processus HTTP :

```
Données → Protocole HTTP → Message HTTP (requête/réponse avec en-têtes)
```

#### HTTPS = HTTP + TLS

- Vérification d'identité du serveur
- Chiffrement complet des requêtes
- Protection contre les attaques de l'homme du milieu

### SMTP (Simple Mail Transfer Protocol)

- Basé sur TCP/IP
- MTA (Mail Transfer Agent) utilise TCP/IP pour contacter les serveurs de messagerie
- Processus : Client → Serveur SMTP → Serveur destination

### FTP (File Transfer Protocol)

- Transfert de fichiers client-serveur
- Exemple d'outil : FileZilla

### DNS (Domain Name System)

- Protocole spécifique pour résolution de noms
- Utilise UDP principalement
- Processus : `DNS → UDP → IP`
- Requêtes petites, donc adaptées à UDP

## 7. Sécurité : TLS/SSL et certificats

### Objectifs de la cryptographie

1. **Confidentialité** : Message illisible par des tiers
2. **Authenticité** : Vérification de l'identité de l'émetteur
3. **Intégrité** : Garantie de non-modification

### Mécanismes cryptographiques

#### Cryptographie symétrique

- Secret unique partagé
- Rapide mais problème de partage sécurisé du secret

#### Cryptographie asymétrique

- Paire clé privée/publique
- Chiffrement avec clé publique, déchiffrement avec clé privée
- Authentification avec signatures numériques

### TLS (Transport Layer Security)

- Combine les deux approches :
  - Asymétrique pour échanger la clé symétrique
  - Symétrique pour chiffrer les communications
- Authenticité et intégrité garanties par signatures asymétriques

### Certificats X.509

#### Processus d'obtention :

1. Préparation serveur (Nginx/Apache) avec domaine
2. Génération paire clés (privée/publique)
3. Demande de certificat à une autorité de certification (CA)
4. Validation par la CA :
   - Token sur serveur
   - Requête HTTP de vérification
   - Confirmation de propriété du domaine
5. Signature du certificat par la CA avec sa clé privée

#### Infrastructure à clé publique (PKI)

- **Autorités de certification racine** : Pré-enregistrées dans navigateurs et systèmes d'exploitation
- **Chaîne de confiance** : Certificats signés par des CA reconnues
- **Vérification par le client** :
  - Réception certificat + signature
  - Vérification avec clé publique de la CA
  - Validation de la signature du certificat
  - Authentification MFA supplémentaire si nécessaire

### TLS Handshake (version 1.2)

1. **Connexion TCP** établie
2. **Client Hello** : Algorithmes supportés, versions
3. **Server Hello** : Choix des algorithmes, certificat serveur
4. **Négociation des clés** :
   - Échange de clés avec ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)
   - Génération Pre-Master Key
   - Signatures pour authentification
5. **Établissement des clés symétriques**
6. **Communication chiffrée**

### Cipher Suites

Exemple : `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`

- ECDHE : Échange de clés
- RSA : Authentification
- AES_128_GCM : Chiffrement symétrique
- SHA256 : Hashing pour intégrité

## 8. Concepts avancés

### Encapsulation/Décapsulation

**Exemple : Envoi d'une image de chat**

1. **Couche Application** : Transformation de l'image, chiffrement, ajout d'en-têtes
2. **Couche Transport** : Découpage en segments, numérotation pour réassemblage
3. **Couche Internet** : Ajout des adresses IP
4. **Accès Réseau** : Ajout des adresses MAC
5. **Transmission physique**
6. **Réception** : Processus inverse de décapsulation

### Unités de données

- Chaque couche a sa propre unité :
  - Application : Message
  - Transport : Segment (TCP) / Datagramme (UDP)
  - Internet : Paquet
  - Accès réseau : Trame
  - Physique : Bits

## 9. Récapitulatif des protocoles par couche

### Couche Application

- HTTP/HTTPS, SMTP, FTP, DNS, SSH, TLS
- HLS (flux vidéo), WebRTC (communication temps réel)

### Couche Transport

- TCP (fiabilité), UDP (rapidité), QUIC (moderne)

### Couche Internet

- IPv4, IPv6, ICMP

### Couche Accès Réseau

- Ethernet (câble), Wi-Fi (802.11), Adresses MAC
