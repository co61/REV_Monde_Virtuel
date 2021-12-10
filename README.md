# REV_Monde_Virtuel

L'objectif de ce projet est de créer un environnement virtuel permettant à un avatar de se déplacer dans une reconstitution de musée. 

Logiciels et librarie utilisés :
- Sublime Text et Visual Studio Code pour l'édition du code
- Firefox pour l'exécution du fichier HTML
- Java Script pour le corps du code et la mise en place de l'environnement virtuel
- Babylon.js est la librairie utilisée pour réaliser cet environnement virtuel

## Le musée

Notre musée porte sur la représentation de lieux touristiques sur 5 continents de notre planète Terre, nous avons décidé d'exclure l'Europe et l'Antarctique par rapport au nombre de pièces.

Le musée comporte 5 pièces : 
- Le Hall qui comporte 10 tableaux portant sur l'Afrique
- La Mezzanine qui comporte 10 tableaux portant sur l'Océanie
- La salle de gauche qui comporte 10 tableaux portant sur l'Asie
- La salle du milieu qui comporte 10 tableaux portant sur l'Amérique du Sud 
- La salle de droite qui comporte 10 tableaux portant sur l'Amérique du Nord

![image](https://user-images.githubusercontent.com/63447104/145587866-d5adc768-9187-45cb-bba2-bf993cf3e046.png)
![image](https://user-images.githubusercontent.com/63447104/145597398-3d01248f-0799-42a3-8d8a-842b0233d16f.png)


### Les murs

Il existe 2 types de murs dans notre musée, les pleins et ceux possédant un trou pour une porte. Ils n'ont pas été faits de la même manière. 
Les premiers utilisent la fonction: 
  'BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur/2},scn) ;'
alors que les seconds:
   '''let groupe = new BABYLON.TransformNode("groupe-"+nom) ;
    const corners = [ new BABYLON.Vector2(largeur/2, 0),
      new BABYLON.Vector2(largeur/2, hauteur),
      new BABYLON.Vector2(-largeur/2, hauteur),
      new BABYLON.Vector2(-largeur/2, 0)
    ];
    const hole = [ new BABYLON.Vector2(largeurPorte/2, 0),
      new BABYLON.Vector2(largeurPorte/2, hauteurPorte),
      new BABYLON.Vector2(-largeurPorte/2, hauteurPorte),
      new BABYLON.Vector2(-largeurPorte/2, 0)
    ];          
    const doorWall = new BABYLON.PolygonMeshBuilder("doorWall",corners, scn);
    doorWall.addHole(hole);
    const polygon = doorWall.build(false, epaisseur/2);'''
 Nous avons en réalité créé 2 murs à chaque fois en coupant l'épaisseur totale en 2 ce qui nous permet de donner une texture différente d'un côté ou de l'autre du mur. C'est très pratique pour décorer le musée facilement.

### Les tableaux

Les tableaux sont choisis suivant les thèmes des salles. Ce sont des photos de paysages ou de lieux caractéristiques. Les différents tableaux sont répartis dans les salles de façon à remplir les murs le mieux possible. Ceux-ci ont pour parent le mur sur lequel ils se trouvent. Chaque tableau se voit attribuer une box de collision à sa génération via la fonction creerTableaux() et la sous fonction placeTableau(). Cette box de collision permet de détecter si l'avatar se trouve proche du tableau et ainsi d'afficher le titre du tableau aisni qu'un spot lumineux qui est aussi généré lors de la création du tableau. Finalement, une description est associée au tableau et s'affiche en dessous du tableau lorsque l'utilisateur clique sur celui-ci.

![image](https://user-images.githubusercontent.com/63447104/145597253-e0559e06-8221-4b4b-ae12-0b534d02cb4c.png)



### Les portes 

Les portes détectent automatiquement si l'avatar se trouve proche en rentrant en collision avec des boîtes invisibles ce qui déclenche leur ouverture:
![image](https://user-images.githubusercontent.com/59872748/145189514-89b00d1b-963f-4172-929c-b5af2d70e4bb.png)

Lorsque l'avatar sort de la zone la porte se referme. La porte d'entrée a la spécialité de détecter le sens de marche de l'avatar et son sens d'ouverture en dépend. C'est la seule porte à double battants s'ouvrant différemment selon le sens de l'avatar, les 3 autres sont coulissantes.

![image](https://user-images.githubusercontent.com/63447104/145598063-9e34a847-cd48-45c2-81f0-9c972c8bdc3e.png)



### L'escalier 

En face des portes d'entrées se trouve l'escalier double menant à la mezanine. Les rambardes ajoutées empèche la chute de l'avatar en dehors de l'escalier. Celui-ci peut être parcouru par l'avatar. Une pente lisse invisible a été rajouté sur la première partie de l'escalier pour permettre un déplacement plus simple, plus fluide et moins dépendant du regard de l'avatar.

![image](https://user-images.githubusercontent.com/63447104/145597594-afbdebac-19f4-474a-b170-31d233c64bbd.png)



### Les animations

Dans le hall, une animation 3D représentant un pendule de Newton est présente au plafond. Cette animation génère un son de choc lorsque une bille en tape un autre, il peut etre désactivé en cliquant dessus avec le pointeur central (Carré rouge).

![image](https://user-images.githubusercontent.com/63447104/145597519-aeec9d6b-b148-4104-8668-b6a65286750d.png)

Il y a également un petit bateau naviguant dans la mezzanine en faisant des allers-retours avec demi-tours.

![image](https://user-images.githubusercontent.com/63447104/145597456-c77837a3-2dbe-4d45-8a1c-864a89c90a33.png)

De plus la porte d'entrée est entouré de spirales animées en continu. 

![image](https://user-images.githubusercontent.com/63447104/145597846-5577e003-00fb-403e-b034-ee29f572b9d5.png)

Toutes ces statues ont été construites et animées à la main grâce aux modules mis a disposition par Babylon.js, **il n' y a aucun import dans notre musée**.


### Les balises

Des sphères blanche partiellement transparentes sont placées dans un coin du hall ainsi qu'au bord de la mezzanine. Ces dernières sont des balises permettant à l'avatar de se téléporter à la position des balises lorsqu'il clique dessus grâce au curseur ajouté au milieu de l'écrant (Carré rouge). Ces balises permettent une simplicité de déplacement entre la mezzanine et le hall mais n'ont pas été jugées nécessaires en d'autres lieux étant donné la facilité de déplacement.

![image](https://user-images.githubusercontent.com/63447104/145597933-a716d2ad-410e-4f61-a581-3e4f2de89af5.png)


### Les sons 

Nous avons choisi de lier les sons aux différentes salles plutôt qu'aux tableaux. Ces musiques se lancent suivant la pièce où se trouve l'avatar grâce à une box de collision qui est générée pour chaque salle. Chaque son est en rapport avec le continent de la salle où il se trouve. 
Listes des différentes musiques suivant les salles :
- African Safari pour le Hall
- Lotus Pool pour la salle de gauche
- House of the rising Sun pour la salle de droite
- A HOE I TE VAA pour la mézanine 
- Samba de Janeiro pour la salle du milieu
Un son ne se joue que si l'utilisateur est dans la pièce liée.

En plus des musiques, il y a aussi un son d'ouverture de porte lorsque la porte centrale s'ouvre et un son de pendule de Newton lorsque les billes s'entrechoquent.


