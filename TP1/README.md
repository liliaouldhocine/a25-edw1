# **TP : Validation de l’environnement PHP / MySQL et compétences Bash**

## **PARTIE 1 — Compétences Bash**

### **Exercice 1 : Navigation**

1. Depuis un terminal, afficher :

   - le répertoire actuel
   - les éléments qu’il contient

**À remettre :**
→ une capture des deux commandes exécutées et du résultat.

---

### **Exercice 2 : Création d’un espace de travail**

1. Créer un dossier nommé **tp_php_mysql**
2. Entrer dans ce dossier
3. À l’intérieur, créer deux sous-dossiers :

   - `tests_php`
   - `tests_mysql`

4. Vérifier que les deux dossiers existent.

**À remettre :**
→ une capture montrant la structure finale.
→ une capture des commandes exécutées.

---

### **Exercice 3 : Création de fichiers**

1. Aller dans `tests_php`
2. Y créer les fichiers suivants :

   - `info.php`
   - `test_mysqli.php`
   - `test_pdo.php`
   - `connect.php`

3. Afficher la liste complète du dossier avec détails.

**À remettre :**
→ une capture d’écran.
→ une capture des commandes exécutées.

---

## **PARTIE 2 — Validation de PHP**

### **Exercice 4 : Vérifier le fonctionnement de PHP**

1. Exécuter une commande permettant d’afficher :

   - la version de PHP installée
   - la configuration de PHP

**À remettre :**
→ Des captures des commandes + résultats.

---

### **Exercice 5 : Lancer un serveur PHP**

1. Toujours dans `tests_php`, lancer un serveur PHP local
2. Choisir un port libre (expliquer comment vous savez qu’il est libre)
3. Accéder à `info.php` via un navigateur

**À remettre :**
→ capture du terminal montrant le serveur en marche
→ capture du navigateur affichant la page.
→ une capture des commandes exécutées.

---

## **PARTIE 3 — Validation de MySQL**

### **Exercice 6 : Vérifier le fonctionnement de MySQL**

1. Lancer MySQL depuis le terminal
2. Quitter MySQL

**À remettre :**
→ capture de l’écran MySQL.
→ une capture des commandes exécutées.

---

### **Exercice 7 : Création d’une base et d’une table**

Créer (en vous référant au cours de 28/11):

- une base nommée **tp_students**
- une table `users` avec trois champs :

  - id (clé primaire auto-incrémentée)
  - username (texte)
  - email (texte)

```MySQL
CREATE DATABASE tp_students;

USE tp_students;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com'),
('bob', 'bob@example.com');

```

**À remettre :**
→ capture des executions SQL.

---

## **PARTIE 4 — Vérification mysqli & PDO**

### **Exercice 8 : Tester mysqli**

1. Dans `test_mysqli.php`, écrire une ligne permettant d’afficher si l’extension `mysqli` est chargée.
2. Accéder à la page via le serveur PHP.

**À remettre :**
→ capture du résultat dans le navigateur.

---

### **Exercice 9 : Tester PDO**

1. Dans `test_pdo.php`, afficher si `pdo_mysql` est chargé.
2. Accéder au fichier via le serveur PHP.

**À remettre :**
→ capture du résultat.
→ une capture des commandes exécutées.

---

## **PARTIE 5 — Connexion MySQL via PHP**

### **Exercice 10 : Test complet**

1. Programmer `connect.php` pour afficher la liste des utilisateurs
2. Accéder au fichier via le serveur PHP

**À remettre :**
→ capture montrant les utilisateurs dans le navigateur.

---

## **PARTIE 6 — Dossier final à remettre**

Vous devez fournir dans la plateform team un fichier compressé :

**VOTRE_NOM_tp_php_mysql.zip** contenant :

- `info.php`
- `test_mysqli.php`
- `test_pdo.php`
- `connect.php`
- un **PDF** comportant _toutes les captures d’écran demandées_
- une explication personnelle (max 10 lignes) décrivant :

  - comment lancer un serveur PHP
  - comment choisir un port
  - comment accéder à un fichier PHP via le navigateur
  - comment vérifier les extensions PHP
  - comment entrer dans MySQL et créer une base
