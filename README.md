# REV_Monde_Virtuel

L'objectif de ce projet est de créer un environnement virtuel permettant à un avatar de se déplacer dans une reconstitution de musée. 

## Logiciels et librarie utilisés :
	- Sublime Text pour l'édition du code
	- Firefox pour l'exécution du fichier HTML
	- Java Script pour le corps du code et la mise en place de l'environnement virtuel
	- Babylon.js est la librairie utilisée pour réaliser cet environnement virtuel

## Le musée

Notre musée porte sur la représentation de lieux touristiques sur 5 continents de notre planète terre, nous avons décidé d'exclure l'Europe.

Le musée comporte 5 pièces : 
	- Le Hall qui comporte 10 tableaux portant sur l'Afrique
	- La Mézanine qui comporte 10 tableaux portant sur l'Océanie
	- La salle de gauche qui comporte 10 tableaux portant sur l'Asie
	- La salle du milieu qui comporte 10 tableaux portant sur l'Amérique du Sud 
	- La salle de droite qui comporte 10 tableaux portant sur l'Amérique du Nord

Dans le hall une animation 3D représentant un pendule de Newton est présente au plafond. Cette animation génère un son de choc lorsque une bille en tape un autre.
Une autre statue d'un bateau naviguant sur un plan de vagues est présente dans la mézanine.
De plus la porte d'entrée est entouré de spirales animées. 
Toutes ces statues ont été construite est énimé grâce aux modules mis a disposition par Babylon.js

Les portes détectent automatiquement si l'avatar se trouve proche ce qui enclanche sont ouverture, lorsque l'avatar sort de la zone la porte se referme. La porte d'entrée à la spécialité de détecter le sens de marche de l'avatar et son sens d'ouverture en dépend. Une texture de bois leur a été appliqué pour contraster avec le reste du musée qui est lui aussi sous une texture bois.

En face des portes d'entrées se trouve l'escalier double menant à la mézanine. Les rambardes ajoutées empèche la chute de l'avatar en dehors de l'escalier. Celui-ci peut être parcouru par l'avatar. Une pente lisse invisible a été rajouté sur la première partie de l'escalier pour permettre un déplacement plus simple, plus fluide et non dépendant du regard de l'avatar.

Des sphères blanche partiellement transparantes sont placées dans un coin du hall ainsi que au bord de la mézanine. Ces dernières sont des balises permettant à l'avatar de se téléporter à la position des balises lorsqu'il clique dessus grâce au curseur ajouté au milieu de l'écrant (Carré rouge). Ces balises permettent une simplicité de déplacement entre la mézanine et le hall mais n'ont pas été jugée nécessaire en d'autre lieux étant donné la facilité de déplacement.

Nous avons choisi de lier les sons aux différentes salle plutôt qu'aux tableaux. Ces musiques ce lancent suivant la pièce où se trouve l'avatar et sont en rapport avec le continent. 
Listes des différentes musiques suivant les salles :
	- African Safari pour le Hall
	- Lotus Pool pour la salle de gauche
	- House of the rising Sun pour la salle de droite
	- A HOE I TE VAA pour la mézanine 
	- Samba de Janeiro pour la salle du milieu


