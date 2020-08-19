Au vu de la taille du projet celui-ci est fourni via une archive mais si vous le souhaitez vous pouvez le prendre de git:



Pour installer  les dependances, extraire les fichier puis aller dans chaque repertoire (client et serveur)avec une console de commande et lancer :

npm install


pour lancer le serveur, aller dans le repertoire serveur et lancer

node index.js


pour lancer le client, aller dans le repertoire serveur et lancer

node index.js [nom_optionel]


puis aller sur le navigateur de votre choix et aller à l'adresse suivante:

http://localhost:8082/


les clients etant sur le meme port on ne peut en avoir qu'un à la fois donc pour avoir un apercu de la page avec plusieurs clients il faut
retirer la deconnection des clients dans client/index.js ligne 73 a 77 puis lancer plusieur fois le client
ou bien remplacer les clients et serveurs pas des adresse non local pour lancer l'application sur plusieurs machines


J'ai consideré que la demande etait une interface pour gerer des ascenceurs avec 2 bouttons pour chaque ascenceur pour les faire monter ou descendre
comme il s'agit d'ascenceur les fonctions pour  monter ou descendre sont atomiques (inarrêtables) car l'ascenceur ne va pas stopper sa course en plein
mouvement.

Comme amelioration possible à cette application on pourrait faire une comparaison du tableau plutot que d'en reconstruire un à chaque fois ce
qui empecherai ce dernier de clignoter sur la page web.
De plus on pourrait avoir un retour sur les bouttons en plus de la mis a jour reguliere ce qui rendrai l'interface plus ergonomique et avec ces
deux amélioration on pourrai baisser le taux de rafraichissement du tableau car les ascenceurs ne sont pas sencés changer souvent.

L'option pour rajouter un nom à l'ascenceur ne fonctionne pas, on obtient rien à la reception ce qui fait que tout les ascenceurs ont des numéro
rendant l'application moins clair.

Enfin l'estetique pourrait etre plus travaillée.