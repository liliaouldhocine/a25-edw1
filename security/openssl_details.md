## **Déchiffrement de la commande**

```bash
openssl req -x509 -newkey rsa:2048 -keyout server.key -out server.crt \
  -days 365 -nodes -subj "/CN=localhost"
```

---

## **Partie par partie :**

### 1. **`openssl req`**

- **`openssl`** : L'outil en ligne de commande pour les opérations cryptographiques
- **`req`** : Sous-commande pour gérer les "Certificate Signing Requests" (demandes de signature de certificat)

---

### 2. **`-x509`**

- **Signification** : Génère un certificat auto-signé X.509 (pas une CSR)
- **Pourquoi** : Normalement, `req` génère une demande de certificat à envoyer à une autorité de certification. Avec `-x509`, on crée directement un certificat auto-signé, parfait pour le développement.
- **Analogie** : Au lieu de demander une signature officielle (CSR), on s'auto-signe le document.

---

### 3. **`-newkey rsa:2048`**

- **`-newkey`** : Crée une nouvelle paire de clés
- **`rsa:2048`** : Algorithme RSA avec une clé de 2048 bits
  - **RSA** : Algorithme de cryptographie asymétrique
  - **2048** : Longueur de la clé (standard actuel, sécurisé)
  - **Alternative** : `rsa:4096` pour plus de sécurité, `ec` pour ECC (Elliptic Curve)

---

### 4. **`-keyout server.key`**

- **`-keyout`** : Spécifie où sauvegarder la clé privée générée
- **`server.key`** : Nom du fichier de sortie pour la clé privée
- **Important** : Ce fichier doit rester SECRET ! Jamais partagé ou commité dans Git.

---

### 5. **`-out server.crt`**

- **`-out`** : Spécifie où sauvegarder le certificat généré
- **`server.crt`** : Nom du fichier de sortie pour le certificat public
- **Extension** : `.crt` pour "certificate", peut aussi être `.pem`

---

### 6. **`-days 365`**

- **Signification** : Durée de validité du certificat en jours
- **Valeur** : 365 jours = 1 an
- **Autres exemples** :
  - `-days 30` : 1 mois (test)
  - `-days 730` : 2 ans (max pour Let's Encrypt)
  - `-days 3650` : 10 ans (ancienne pratique)

---

### 7. **`-nodes`**

- **Signification** : **NO** **DES** (No Data Encryption Standard)
- **Fonction** : Génère la clé privée SANS mot de passe
- **Pourquoi** : Pour le développement, évite d'entrer un mot de passe à chaque démarrage du serveur
- **Sécurité** : En production, on peut omettre ce flag pour protéger la clé par un mot de passe

---

### 8. **`-subj "/CN=localhost"`**

- **`-subj`** : "Subject" - informations sur l'entité du certificat
- **`/CN=localhost`** : Common Name (nom commun) = localhost
- **Format** : `/Clé=Valeur/Clé=Valeur`
- **Champs complets possibles** :

  ```
  -subj "/C=FR/ST=Ile-de-France/L=Paris/O=MonEntreprise/OU=IT/CN=monsite.com"
  ```

  - **C** : Country (Pays) - FR, US, etc.
  - **ST** : State/Province (Région)
  - **L** : Locality (Ville)
  - **O** : Organization (Entreprise)
  - **OU** : Organizational Unit (Département)
  - **CN** : Common Name (Domaine principal)

---

## **Équivalent sans raccourcis**

Cette commande est un raccourci pour :

```bash
# 1. Générer clé privée + CSR en une fois
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=localhost"

# 2. Auto-signer le certificat
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

# 3. Supprimer le CSR intermédiaire
rm server.csr
```

---

## **Résultat final**

La commande crée **deux fichiers** :

### **1. server.key** (clé privée - SECRET)

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5JgKdNc6w4M6P
... (contenu crypté) ...
-----END PRIVATE KEY-----
```

### **2. server.crt** (certificat public - peut être partagé)

```
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKL1K2Z5zQJOMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
... (contenu du certificat) ...
-----END CERTIFICATE-----
```

---

## **Scénarios d'utilisation**

### **Développement local** (cette commande) :

```bash
# Certificat pour localhost
-subj "/CN=localhost"
```

### **Test réseau local** :

```bash
# Certificat pour IP locale
-subj "/CN=192.168.1.100"
```

### **Multi-domaines** (nécessite SAN) :

```bash
openssl req -x509 -newkey rsa:2048 \
  -keyout server.key -out server.crt \
  -days 365 -nodes \
  -subj "/CN=monsite.com" \
  -addext "subjectAltName=DNS:monsite.com,DNS:www.monsite.com,DNS:localhost"
```

---

## **Avertissements importants**

1. **Auto-signé ≠ Production** : Les navigateurs afficheront un avertissement
2. **localhost uniquement** : Ne fonctionne que pour `https://localhost`
3. **Pas de SAN** : Certains navigateurs modernes (Chrome) peuvent refuser les certificats sans Subject Alternative Name
4. **Sécurité** : `-nodes` = pas de mot de passe sur la clé

---

## **Pour un certificat plus compatible (modernes) :**

```bash
openssl req -x509 -newkey rsa:2048 \
  -keyout server.key -out server.crt \
  -days 365 -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
  -addext "extendedKeyUsage=serverAuth"
```

Cette version ajoute les extensions nécessaires pour les navigateurs récents !
