# Cours : Cryptographie Asymmétrique - RSA et Fonctions à Sens Unique

## Introduction

La cryptographie asymétrique, ou cryptographie à clé publique, constitue une révolution dans la sécurité des communications. Contrairement aux systèmes symétriques où une même clé sert au chiffrement et au déchiffrement, l'asymétrie utilise deux clés mathématiquement liées mais distinctes. Ce cours explique les fondements conceptuels et mathématiques du RSA, premier algorithme pratique de chiffrement à clé publique, et le concept sous-jacent des fonctions à sens unique.

## 1. Le Concept de Fonction à Sens Unique

### 1.1 Définition Formelle

Une fonction à sens unique est une fonction mathématique f : X → Y qui satisfait deux conditions :

1. **Facilité de calcul direct** : Étant donné x ∈ X, il est algorithmiquement facile de calculer f(x).

2. **Difficulté de calcul inverse** : Étant donné y ∈ Y, il est algorithmiquement difficile de trouver un x ∈ X tel que f(x) = y, sauf information supplémentaire.

La difficulté est mesurée en complexité computationnelle : une opération est considérée "difficile" si le temps de calcul requis croît exponentiellement avec la taille de l'entrée, même avec les ordinateurs les plus puissants.

### 1.2 Exemples Fondamentaux

**Exemple 1 : Multiplication versus Factorisation**

- Sens direct (facile) : Multiplier deux grands nombres premiers p et q pour obtenir n = p × q
- Sens inverse (difficile) : Étant donné n, retrouver p et q

Avec des nombres de 300 chiffres, la multiplication s'effectue en microsecondes, tandis que la factorisation demanderait des milliards d'années de calcul avec les technologies actuelles.

**Exemple 2 : Fonction de Chemin dans un Graphe**

- Sens direct (facile) : Étant donné un chemin dans un graphe, vérifier qu'il visite tous les sommets une fois
- Sens inverse (difficile) : Trouver un chemin qui visite tous les sommets une fois (problème du voyageur de commerce)

### 1.3 Fonction à Sens Unique avec Trappe

Pour être utile en cryptographie, une fonction à sens unique nécessite une "trappe" (trapdoor) : une information secrète qui rend le calcul inverse facile pour son détenteur.

Définition : Une fonction f est à sens unique avec trappe s'il existe une information secrète t telle que :

- Sans t, calculer l'inverse de f est difficile
- Avec t, calculer l'inverse de f est facile

C'est exactement ce principe qui sous-tend le RSA : la factorisation de n est difficile sans connaître p et q, mais triviale avec cette connaissance.

## 2. L'Algorithme RSA (Rivest-Shamir-Adleman, 1977)

# L'Algorithme RSA Simplifié

## L'Idée de Base

RSA fonctionne sur un principe simple : il est facile de multiplier deux grands nombres, mais très difficile de retrouver ces deux nombres si on ne connaît que leur produit. C'est comme un cadenas numérique.

## Les 5 Étapes Simples

### Étape 1 : Choisir deux nombres premiers secrets

- On prend deux grands nombres premiers (divisibles seulement par 1 et eux-mêmes)
- Exemple simple : **p = 3** et **q = 11**
- Ces nombres restent **SECRETS** - c'est la clé privée

### Étape 2 : Calculer la clé publique (le cadenas)

- On multiplie ces deux nombres : **n = p × q**
- Dans notre exemple : n = 3 × 11 = **33**
- Ce nombre **33** est public - tout le monde peut le connaître

### Étape 3 : Calculer un nombre caché

- On calcule : **φ = (p-1) × (q-1)**
- Dans notre exemple : φ = (3-1) × (11-1) = 2 × 10 = **20**
- Ce nombre **20** reste secret aussi

### Étape 4 : Choisir la partie publique du cadenas

- On choisit un nombre **e** qui n'a aucun diviseur commun avec φ (sauf 1)
- On veut : pgcd(e, φ) = 1
- Exemple simple : **e = 3** (car pgcd(3, 20) = 1)
- Ce **e = 3** est public avec le n

**Résultat de la clé publique** : (n=33, e=3) - comme un cadenas ouvert qu'on distribue

### Étape 5 : Calculer la clé privée (la clé unique)

- On trouve un nombre **d** tel que : (d × e) ÷ φ donne reste 1
- Mathématiquement : d × e ≡ 1 mod φ
- Dans notre exemple : on cherche d tel que (d × 3) ÷ 20 donne reste 1
- Solution : **d = 7** (car 7 × 3 = 21, et 21 ÷ 20 = 1 reste 1)

**Résultat de la clé privée** : (d=7) - gardée secrète

## Comment Ça Fonctionne en Pratique

### Pour envoyer un message secret à Alice :

1. **Bob veut envoyer le message "C"**
   - "C" est la 3ème lettre → valeur numérique **3**

2. **Bob utilise le cadenas public d'Alice**
   - Clé publique d'Alice : (n=33, e=3)
   - Il calcule : message^e mod n
   - Soit : 3^3 mod 33 = 27 mod 33 = **27**

3. **Bob envoie "27"** sur un canal public
   - Tout le monde peut voir "27"

### Pour lire le message :

1. **Alice reçoit "27"**
2. **Elle utilise sa clé privée secrète (d=7)**
   - Elle calcule : message_chiffré^d mod n
   - Soit : 27^7 mod 33
3. **Calcul étape par étape** :
   - 27^2 = 729, 729 ÷ 33 = 22 reste **3**
   - 27^4 = (27^2)^2 = 3^2 = 9
   - 27^7 = 27^4 × 27^2 × 27^1 = 9 × 3 × 27 = 729
   - 729 ÷ 33 = 22 reste **3** (le message original !)

## Pourquoi c'est Sécurisé ?

### Ce que tout le monde sait :

- n = 33 (le produit)
- e = 3 (la partie publique)

### Ce que seul Alice connaît :

- p = 3 et q = 11 (les facteurs secrets)
- d = 7 (la clé privée)

### Le défi pour un espion :

Pour retrouver le message original "3" à partir de "27", il doit :

1. Soit calculer 27^d mod 33, mais il ne connaît pas d
2. Soit retrouver d à partir de n et e, ce qui nécessite de factoriser 33

### Factoriser 33 est facile, mais...

Dans la vraie vie, on utilise des nombres comme :

- n = 257603515110061074615488647092740056073811723750283658336293
- Même avec un super-ordinateur, trouver p et q tels que p × q = ce nombre prendrait des milliers d'années

## L'Essence du RSA

1. **Deux clés** : une publique (comme un cadenas ouvert), une privée (comme la clé unique)
2. **Fonction à sens unique** : facile de multiplier p × q = n, très dur de retrouver p et q à partir de n
3. **Magie mathématique** : grâce aux nombres premiers et à l'arithmétique modulaire, seule la personne qui connaît les facteurs secrets peut déchiffrer

## En Résumé Très Simple

Imaginez que :

- **La clé publique** est un cadenas ouvert que vous distribuez
- **La clé privée** est la clé unique qui ouvre ce cadenas
- **Chiffrer** = mettre un message dans une boîte et fermer avec le cadenas ouvert
- **Déchiffrer** = ouvrir la boîte avec la clé unique

La sécurité vient du fait que même si tout le monde a le cadenas, personne ne peut fabriquer la clé correspondante sans connaître les secrets de fabrication (les nombres premiers p et q).

## 3. Sécurité du RSA

### 3.1 Hypothèses de Sécurité

La sécurité de RSA repose sur plusieurs problèmes difficiles présumés :

1. **Problème de la factorisation** : Difficulté de retrouver p et q à partir de n
2. **Problème de RSA** : Difficulté de retrouver m à partir de c, n et e sans connaître d
3. **Problème de la racine e-ième** : Difficulté de trouver m tel que m^e ≡ c mod n

### 3.2 Attaques Potentielles

**Attaque par factorisation :**

- Méthode naïve : Essayer tous les diviseurs jusqu'à √n → complexité exponentielle
- Crible quadratique : Plus efficace, mais toujours sous-exponentiel
- Crible algébrique : Meilleure méthode connue, mais toujours infaisable pour n > 2048 bits

**Attaque par module commun :**
Si un même message est chiffré avec deux clés publiques partageant un facteur premier, on peut retrouver le message par calcul du pgcd.

**Attaques par canaux auxiliaires :**
Analyse de la consommation électrique, du temps de calcul, ou des rayonnements électromagnétiques pour déduire la clé privée.

### 3.3 Bonnes Pratiques

1. **Taille des clés** : Minimum 2048 bits, 4096 pour une sécurité à long terme
2. **Génération aléatoire** : Utiliser un générateur cryptographique sûr pour p et q
3. **Padding** : Toujours utiliser un schéma de padding comme OAEP
4. **Protection de la clé privée** : Stocker avec chiffrement, utiliser des modules matériels sécurisés

## 4. Applications du RSA

### 4.1 Chiffrement

Principalement utilisé pour chiffrer des clés de session (clés symétriques) dans des protocoles hybrides comme TLS/SSL.

### 4.2 Signature Numérique

RSA permet également de signer numériquement des documents :

- Création : s = H(m)^d mod n, où H est une fonction de hachage cryptographique
- Vérification : Vérifier que s^e ≡ H(m) mod n

### 4.3 Authentification

Dans les protocoles d'échange de clés comme SSH, RSA authentifie les parties grâce à leurs clés publiques.

## 5. Limites et Alternatives

### 5.1 Limitations du RSA

- **Taille des clés** : Beaucoup plus grandes que pour la cryptographie symétrique équivalente
- **Vitesse** : Opérations modulaires sur grands entiers relativement lentes
- **Déterminisme** : Sans padding aléatoire, RSA est déterministe et donc vulnérable
- **Avance quantique** : Les ordinateurs quantiques pourraient casser RSA avec l'algorithme de Shor

### 5.2 Algorithmes Alternatifs

- **ECC (Elliptic Curve Cryptography)** : Clés plus courtes, basée sur le problème du logarithme discret sur courbes elliptiques
- **Diffie-Hellman** : Échange de clés sans transmission de secret
- **Cryptographie post-quantique** : Algorithmes résistant aux attaques quantiques (lattices, codes)

## 6. Exercice Pratique : Simulation Manuelle de RSA

### 6.1 Génération de Clés (avec petits nombres)

1. Choisir p = 61 et q = 53 (nombres premiers)
2. Calculer n = 61 × 53 = 3233
3. Calculer φ(n) = (61-1) × (53-1) = 60 × 52 = 3120
4. Choisir e = 17 (premier avec 3120)
5. Calculer d : inverse de 17 modulo 3120
   - 17 × d ≡ 1 mod 3120
   - d = 2753 (car 17 × 2753 = 46801 = 15 × 3120 + 1)

Clé publique : (3233, 17)
Clé privée : (3233, 2753)

### 6.2 Chiffrement et Déchiffrement

Message : "HI" → conversion numérique : H=8, I=9 → m = 89 (on suppose 89 < 3233)

Chiffrement : c ≡ 89^17 mod 3233

- Calcul intermédiaire : 89^2 mod 3233 = 7921 mod 3233 = 7921 - 2×3233 = 1455
- Continuer les exponentiations modulaires...
- Résultat final : c = 1394

Déchiffrement : m ≡ 1394^2753 mod 3233

- Par calcul : m = 89
- Conversion : 89 → "HI"

## Conclusion

RSA représente une avancée majeure en cryptographie, rendant possible les communications sécurisées sans échange préalable de secret. Son élégance mathématique réside dans l'utilisation astucieuse du théorème d'Euler et de la difficulté de la factorisation. Bien que menacé à long terme par l'informatique quantique, RSA reste aujourd'hui un pilier de la sécurité informatique, illustrant parfaitement le concept de fonction à sens unique avec trappe.

Comprendre RSA nécessite d'appréhender plusieurs niveaux : la théorie des nombres sous-jacente, les considérations de sécurité pratique, et les limitations inhérentes à tout système cryptographique. Cette compréhension multidisciplinaire est essentielle pour évaluer, implémenter et utiliser correctement la cryptographie dans les applications modernes.
