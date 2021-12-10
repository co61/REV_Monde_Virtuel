# REV_Monde_Virtuel

L'objectif de ce projet est de créer un environnement virtuel permettant à un avatar de se déplacer dans une reconstitution de musée. 

Logiciels et librarie utilisés :
- Sublime Text et Visual Studio Code pour l'édition du code
- Firefox pour l'exécution du fichier HTML
- Java Script pour le corps du code et la mise en place de l'environnement virtuel
- Babylon.js est la librairie utilisée pour réaliser cet environnement virtuel

## Le musée

Notre musée porte sur la représentation de lieux touristiques sur 5 continents de notre planète Terre, nous avons décidé d'exclure l'Europe et l'Antarctique par rapport au nombre de pièces.

![image](https://user-images.githubusercontent.com/63447104/145599946-ddbafde7-03f2-4620-bb26-11c30d9ec390.png)

Le musée comporte 5 pièces : 
- Le Hall qui comporte 10 tableaux portant sur l'Afrique
- La Mezzanine qui comporte 10 tableaux portant sur l'Océanie
- La salle de gauche qui comporte 10 tableaux portant sur l'Asie
- La salle du milieu qui comporte 10 tableaux portant sur l'Amérique du Sud 
- La salle de droite qui comporte 10 tableaux portant sur l'Amérique du Nord

![image](https://user-images.githubusercontent.com/63447104/145600017-b226b816-b317-4ad8-8bb5-626314ad5bff.png)


### Les murs

Il existe 2 types de murs dans notre musée, les pleins et ceux possédant un trou pour une porte. Ils n'ont pas été faits de la même manière. 
Les premiers utilisent la fonction: 
  ```BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur/2},scn) ;```
alors que les seconds:
   ```let groupe = new BABYLON.TransformNode("groupe-"+nom) ;
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
    const polygon = doorWall.build(false, epaisseur/2);
  ```
    
Nous avons en réalité créé 2 murs à chaque fois en coupant l'épaisseur totale en 2 ce qui nous permet de donner une texture différente d'un côté ou de l'autre du mur. C'est très pratique pour décorer le musée facilement.

### Les tableaux

Les tableaux sont choisis suivant les thèmes des salles. Ce sont des photos de paysages ou de lieux caractéristiques. Les différents tableaux sont répartis dans les salles de façon à remplir les murs le mieux possible. Ceux-ci ont pour parent le mur sur lequel ils se trouvent. Chaque tableau se voit attribuer une box de collision à sa génération via la fonction creerTableaux() et la sous fonction placeTableau(). Cette box de collision permet de détecter si l'avatar se trouve proche du tableau et ainsi d'afficher le titre du tableau aisni qu'un spot lumineux qui est aussi généré lors de la création du tableau. Finalement, une description est associée au tableau et s'affiche en dessous du tableau lorsque l'utilisateur clique sur celui-ci.

![image](https://user-images.githubusercontent.com/63447104/145600176-fd636a61-d24f-4511-95a6-545287013d9b.png)



### Les portes 

Les portes détectent automatiquement si l'avatar se trouve proche en rentrant en collision avec des boîtes invisibles ce qui déclenche leur ouverture:
![image](https://user-images.githubusercontent.com/59872748/145189514-89b00d1b-963f-4172-929c-b5af2d70e4bb.png)

Lorsque l'avatar sort de la zone la porte se referme. La porte d'entrée a la spécialité de détecter le sens de marche de l'avatar et son sens d'ouverture en dépend. C'est la seule porte à double battants s'ouvrant différemment selon le sens de l'avatar 

![image](https://user-images.githubusercontent.com/63447104/145598063-9e34a847-cd48-45c2-81f0-9c972c8bdc3e.png)

```
//animation porte centrale
        if (boxCamera.intersectsMesh(contactBoxDoorCentrale1, false)) {
			if (!porte2)
			{
				porte1=true;

				if(!africaSound.isPlaying){
					africaSound.play();
				}

				if (!doorSound.isPlaying){
					doorSound.play();
				}
				
				if(alpha<Math.PI/2){
					alpha+=0.05;
				}
				else {
					doorSound.stop();
				}
			}
        }
		else if (boxCamera.intersectsMesh(contactBoxDoorCentrale2,false))
		{
			if (!porte1){
				porte2=true; 
				if (!doorSound.isPlaying){
					doorSound.play();}

				if(alpha>-Math.PI/2){
					alpha-=0.05;
				}
				else {
					doorSound.stop();
				}
			}
		}
		
		else{
			if (porte1) 
			{
				if(alpha<0.05){
					alpha-=0.05;
				}
				else {
					doorSound.stop();
				}
				porte1=false;
				porte2=false;
				if (!doorSound.isPlaying){
					doorSound.play();}
				if (!africaSound.isPlaying){
					africaSound.play();
				}

			}
			else if (porte2) 
			{
				if(alpha<Math.PI/2){
					alpha+=0.05;
				}
				else {
					doorSound.stop();
				}
				porte1=false;
				porte2=false;
				if (!doorSound.isPlaying){
					doorSound.play();}
				if (!africaSound.isPlaying){
					africaSound.play();
				}

			}
			else
			{	
				if(alpha<-0.02){
					alpha+=0.05;
				}

				else if(alpha>0.02){
					alpha-=0.05;
				}
			}
			
		}

		porteCentrale.rotation.y=alpha;
		porteCentrale2.rotation.y=-alpha;
```
Nous gérons l'angle de rotation des portes en fonction du sens de passage de l'utilisateur tout en faisant en sorte qu'elles se referment une fois passé et que les battants s'ouvrent en opposition.

Les 3 autres sont coulissantes.

![image](https://user-images.githubusercontent.com/63447104/145600463-32ee8869-e914-42a4-a849-aa2b8cdb607f.png)



### L'escalier 

En face des portes d'entrées se trouve l'escalier double menant à la mezanine. Les rambardes ajoutées empèche la chute de l'avatar en dehors de l'escalier. Celui-ci peut être parcouru par l'avatar. Une pente lisse invisible a été rajouté sur la première partie de l'escalier pour permettre un déplacement plus simple, plus fluide et moins dépendant du regard de l'avatar.

![image](https://user-images.githubusercontent.com/63447104/145600351-99db7447-8511-4fcc-935a-9aca42254c56.png)



### Les animations

Dans le hall, une animation 3D représentant un pendule de Newton est présente au plafond. Cette animation génère un son de choc lorsque une bille en tape un autre, il peut etre désactivé en cliquant dessus avec le pointeur central (Carré rouge).

![image](https://user-images.githubusercontent.com/63447104/145600134-291385af-f447-4e4a-bd7f-a488d53e5909.png)

Ce pendule a été plutôt compliqué à mettre en place et prise de tête faisant tout nous-mêmes:

```//animation pendule
		if (beta2<=	0 && !tape2 && gauche==true){
			beta2+=0.04;
		}
		else if (!tape2 && beta2>-1 && gauche==false){
			beta2-=0.04;
		}
		if (beta2>=0 && gauche==true && !newton1Sound.isPlaying){
			tape2=true;
			if (boxCamera.intersectsMesh(contactBoxMezzanine,false) && stopNewton==false){
				newton1Sound.setVolume(0.3);
				newton1Sound.play();
			}
			else if (boxCamera.intersectsMesh(contactBoxHall,false) && stopNewton==false){
				newton1Sound.setVolume(0.3);
				newton1Sound.play();
			}
			else if (boxCamera.intersectsMesh(contactBoxDoorCentrale1,false) && stopNewton==false){
				newton1Sound.setVolume(0.2);
				newton1Sound.play();
			}
			else{
				newton1Sound.stop();
			}
		}
		else if (beta2<=-1 && gauche==false){
			gauche=true;
		}
		if (tape2 && beta<1 && gauche==true){
			beta+=0.04;
		}
		else if (tape2 && beta>=0 && gauche==false ){
			beta-=0.04;
		}
		if (gauche==false && beta<=0 &&!newton2Sound.isPlaying){
			tape2=false;
			if (boxCamera.intersectsMesh(contactBoxMezzanine,false) && stopNewton==false){
				newton2Sound.setVolume(0.3);
				newton2Sound.play();
			}
			else if (boxCamera.intersectsMesh(contactBoxHall,false) && stopNewton==false){
				newton2Sound.setVolume(0.3);
				newton2Sound.play();
			}
			else if (boxCamera.intersectsMesh(contactBoxDoorCentrale1,false) && stopNewton==false){
				newton2Sound.setVolume(0.2);
				newton2Sound.play();
			}
			else{
				newton2Sound.stop();
			}
		}
		else if (beta>=1 && gauche==true){
			gauche=false;
		}
		fil1.rotation.z=beta2;
		fil4.rotation.z=beta;

```
Le pendule consiste en 4 sphères reliées à des cylindres. Seules les 2 extérieures bougent. On contrôle l'angle de rotation des fils à leur pied en fonction de l'action de l'autre boule car une doit décoller seulement lorsque l'autre a tapé les boules internes puis elle doit revenir pour frapper à son tour.
Ce pendule a pris quelques heures à mettre en place.


Il y a également un petit bateau naviguant dans la mezzanine en faisant de simples allers-retours avec demi-tours.

![image](https://user-images.githubusercontent.com/63447104/145600072-f3db89a4-4dee-4ae1-9f4a-7d2612a0e3cc.png)

```    scene.registerBeforeRender( function()  {
		if (5<=bateau.position.x<=25 && aller){
			bateau.position.x+=0.05
		}
		else if (5<=bateau.position.x<=25 && retour){
			bateau.position.x-=0.05
		}
		if (bateau.position.x>=25){
			bateau.rotation.y-=0.015;
			aller=false;
			if(bateau.rotation.y<=-Math.PI){
				retour=true;
			}
		}
		else if (bateau.position.x<=5){
			bateau.rotation.y+=0.015;
			retour=false;
			if(bateau.rotation.y>=0.0){
				aller=true;
			}
		}
```

De plus la porte d'entrée est entouré de spirales animées en continu. 
![image](https://user-images.githubusercontent.com/63447104/145600280-87c52969-bb11-4840-9ef1-8d9140a95136.png)

Toutes ces statues ont été construites et animées à la main grâce aux modules mis a disposition par Babylon.js, **il n' y a aucun import dans notre musée**.


### Les balises

Des sphères blanche partiellement transparentes sont placées dans un coin du hall ainsi qu'au bord de la mezzanine. Ces dernières sont des balises permettant à l'avatar de se téléporter à la position des balises lorsqu'il clique dessus grâce au curseur ajouté au milieu de l'écrant (Carré rouge). Ces balises permettent une simplicité de déplacement entre la mezzanine et le hall mais n'ont pas été jugées nécessaires en d'autres lieux étant donné la facilité de déplacement.

![image](https://user-images.githubusercontent.com/63447104/145600228-4227e81c-73cc-429e-bb6e-8d9fcf981926.png)


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


