**Réponses exactes pour l'examen Terminal Linux :**

### **Partie 1 : Questions théoriques (40%)**

**Section A : Vrai/Faux**

1.  **FAUX**. Le terminal est une interface en ligne de commande (CLI), pas une interface graphique (GUI).
2.  **FAUX**. `ls` liste le contenu d'un répertoire, il ne crée pas de fichiers.
3.  **VRAI**. `..` représente le répertoire parent.
4.  **FAUX**. Cela crée deux dossiers : `mon` et `dossier`. Pour un nom avec espace, il faut utiliser des guillemets : `mkdir "mon dossier"`.
5.  **VRAI**. L'option `-r` (récursive) permet de supprimer un répertoire et tout son contenu.
6.  **FAUX**. `pwd` (print working directory) affiche le chemin du répertoire courant, pas son contenu.
7.  **VRAI**. C'est une analogie valable : un lien symbolique pointe vers un fichier ou un répertoire original.
8.  **VRAI**. Le caractère générique `*` correspond à toute chaîne de caractères.
9.  **VRAI**. `sudo` permet d'exécuter une commande avec les privilèges d'administrateur (superuser).
10. **FAUX**. `clear` nettoie uniquement l'affichage du terminal.

**Section B : QCM**

1.  **c) pwd**
2.  **c) mkdir images**
3.  **b) Liste avec détails (permissions, taille)**
4.  **b) cd ~** (le tilde `~` représente le répertoire personnel)
5.  **c) Ctrl + U**
6.  **e) c et d sont correctes** (`mkdir --help` et `man mkdir`)
7.  **c) Dossier personnel (home)**
8.  **d) touch notes.txt**
9.  **c) history**
10. **a) q**

### **Partie 2 : Commandes à compléter/corriger (30%)**

**Exercice 1 : Complétez les commandes**

1.  `ls`
2.  `mkdir`
3.  `cd`
4.  `touch`
5.  `cd`
6.  `clear`
7.  `pwd`
8.  `-a` (ou `-la` pour plus de détails)
9.  `history`
10. `exit`

**Exercice 2 : Corrigez les erreurs**

1.  `ls -l "/home/mon dossier"` (ou `ls -l /home/mon\ dossier`)
2.  `mkdir images`
3.  `cd /home/user/Documents` (le dossier standard est généralement `Documents` au pluriel)
4.  `touch "mon fichier.txt"` (ou `touch mon\ fichier.txt`)
5.  `rm -r mon_dossier` (l'option `-r` est nécessaire pour supprimer un répertoire)

**Exercice 3 : Associez les commandes**

1. ls [ **C** ]
2. cd [ **D** ]
3. pwd [ **B** ]
4. mkdir [ **A** ]
5. touch [ **E** ]
6. clear [ **G** ]
7. rm [ **F** ]
8. cp [ **H** ]
9. mv [ **I** ]
10. man [ **J** ]

### **Partie 3 : Mise en pratique (30%)**

**Exercice 1 : Créez une structure de projet web**

```bash
mkdir mon_site_web
cd mon_site_web
touch index.html style.css script.js
mkdir images
touch images/logo.png images/background.jpg
```

_Screenshot requis montrant ces commandes et le résultat de `ls -R`._

**Exercice 2 : Manipulations de base**

```bash
mv style.css styles.css
mkdir backup
cp *.html *.css backup/
ln -s index.html accueil.html
ls -l
pwd
```

_Screenshot requis montrant ces commandes et les résultats._
