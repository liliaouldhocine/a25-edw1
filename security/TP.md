# Énoncé de l'Exercice Pratique : Chiffrement RSA

---

## **Exercice : Envoyez-moi un Message Secret**

**Objectif :** Appliquer concrètement le chiffrement asymétrique RSA pour envoyer un message confidentiel à votre enseignant.

---

## **Contexte**

Vous êtes un agent secret qui doit transmettre un message crucial à votre contact (l'enseignant). Le canal de communication est public et surveillé. Vous devez donc chiffrer votre message pour qu'il ne soit lisible que par le destinataire légitime.

---

## **Votre Mission**

Envoyer le message suivant de manière sécurisée :  
**`J_AI_REUSSI_MON_COURS`**

---

## **Clé Publique du Destinataire (l'Enseignant)**

Votre contact vous a transmis sa clé publique RSA :

- **n = 221**
- **e = 5**

Cette clé publique est comme un cadenas ouvert : tout le monde peut l'utiliser pour verrouiller un message, mais seul le détenteur de la clé privée correspondante peut l'ouvrir.

---

## **Consignes de Chiffrement**

### **Étape 1 : Conversion du message en nombres**

Utilisez le codage suivant :

- A = 1, B = 2, C = 3, ..., Z = 26
- Le tiret bas "\_" = 27

**Exemple :** "AB" devient 1 2

### **Étape 2 : Chiffrement RSA**

Pour chaque nombre `m` (message en clair), calculez le chiffré `c` avec la formule :

```
c = m^e mod n
```

soit dans notre cas :

```
c = m^5 mod 221
```

**Rappel :** `a mod b` signifie "le reste de la division de a par b"

### **Étape 3 : Exemple de calcul**

Pour la lettre "A" (valeur 1) :

```
c = 1^5 mod 221 = 1 mod 221 = 1
```

"B" (valeur 2) :

```
c = 2^5 mod 221 = 32 mod 221 = 32
```

---

## **Ce Que Vous Devez Rendre**

### **1. Le Message Chiffré**

Donnez la suite complète des nombres chiffrés correspondant à "J_AI_REUSSI_MON_COURS", dans l'ordre.

Format suggéré :  
`[valeur1] [valeur2] [valeur3] ...`

### **2. Le Document Explicatif** (2 pages maximum)

Ce document doit contenir :

**a) Votre démarche complète :**

- La table de conversion lettre → nombre
- Le calcul détaillé pour **au moins 3 caractères différents** (montrez toutes les étapes)
- Le résultat final complet (tous les caractères chiffrés)

**b) Votre analyse :**

- Pourquoi cette méthode empêche-t-elle un espion de lire le message intercepté ?
- Quelles sont les limites de cette implémentation simplifiée par rapport au RSA réel ?
- En quoi le choix de `n=221` rend-il cet exercice pédagogique mais pas réellement sécurisé ?

---

## **Conseils Pratiques**

1. **Calculs :**
   - Pour les puissances, calculez par étapes :
     ```
     10^5 = 10^2 × 10^2 × 10 = 100 × 100 × 10 = 100000
     ```
   - Pour les modulo, soustrayez des multiples de 221 :
     ```
     100000 ÷ 221 = 452 (car 221×452 = 99892)
     Reste = 100000 - 99892 = 108
     ```

2. **Vérification :**
   - Comparez vos résultats intermédiaires entre membres du groupe
   - Un même caractère (comme "\_") doit toujours donner le même chiffré

---

## **Rappels Théoriques Importants**

- **n = 221** est public, mais sa factorisation (13 × 17) est secrète
- **e = 5** est la partie publique de la clé
- Seul le destinataire (avec la clé privée **d**) peut déchiffrer
- La sécurité repose sur la difficulté de factoriser `n` en `p × q`
- Avec `n=221`, la factorisation est facile, mais avec un `n` de 600 chiffres, c'est impossible en pratique

---

## **Questions à Se Poser Pendant l'Exercice**

1. Pourquoi tous les "\_" donnent-ils le même nombre chiffré ? Est-ce un problème ?
2. Que se passerait-il si deux groupes chiffraient le même message ? Obtiendraient-ils le même résultat ?
3. Comment un attaquant pourrait-il tenter de casser ce chiffrement ?

---

## **Format de Remise**

Envoyez un seul document PDF contenant :

1. Page 1 : Le message chiffré (en gros, bien visible)
2. Page 2+ : Vos calculs détaillés et votre analyse
3. Dernière page : Noms et prénoms de tous les membres du groupe

**Nom du fichier :** `RSA_Nom.pdf`

---

## **Pour Aller Plus Loin (Bonus)**

Si vous terminez en avance, réfléchissez à :

- Comment modifier l'exercice pour qu'un même caractère ne donne pas toujours le même chiffré ?
- Quelle serait la clé privée `d` correspondante à notre `e=5` et `n=221` ? (Indice : elle doit satisfaire `d × 5 ≡ 1 mod 192`)
- Pourquoi utilise-t-on en réalité RSA pour chiffrer une clé de session plutôt que le message directement ?

**Bonne chance dans votre mission !**

_L'enseignant, détenteur de la clé privée, pourra vérifier que votre message est correctement chiffré et que vous avez bien "réussi votre cours"._
