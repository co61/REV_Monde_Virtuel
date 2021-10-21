//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
var canvas, engine ;
var scene, camera ;
var Tableaux= new Array();
var Headers= new Array();
var Descriptions= new Array();


function init(){
	canvas = document.getElementById("renderCanvas") ; 
	engine = new BABYLON.Engine(canvas,true) ; 
	scene  = creerScene() ; 

	camera = creerCamera("camera",{}, scene) ; 
	camera.applyGravity = true;

	scene.gravity = new BABYLON.Vector3(0, -0.10, 0);
	camera.applyGravity = true;
	camera._needMoveForGravity = true;
	camera.ellipsoid = new BABYLON.Vector3(1.1, .8, 1.1); 
	boxCamera=BABYLON.Mesh.CreateBox("boxCamera",0.5,scene);
	boxCamera.scaling=new BABYLON.Vector3(2,2,2);
	boxCamera.position = new BABYLON.Vector3(camera.position.x,camera.position.y-0.5,camera.position.z);
	boxCamera.setParent(camera);
	boxCamera.isPickable=false;


	scene.collisionsEnabled = true;
	camera.checkCollisions = true;	

	createLights() ;
	peuplerScene() ;  

	set_FPS_mode(scene, canvas,camera) ; 

	window.addEventListener("resize", function(){engine.resize();}) ; 

	engine.runRenderLoop( function(){scene.render();} ) ; 
}


function createLights(){
	// https://doc.babylonjs.com/divingDeeper/lights/lights_introduction

	// https://doc.babylonjs.com/divingDeeper/lights/shadows
	// lightHall = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(15, 10, 15), new BABYLON.Vector3(0, -1, 0), BABYLON.Tools.ToRadians(180) , 0.1, scene);
	var lightScene1 = new BABYLON.HemisphericLight("lightHall", new BABYLON.Vector3(30,30,30), scene) ; 
	var lightScene2 = new BABYLON.HemisphericLight("lightHall", new BABYLON.Vector3(0,30,0), scene) ; 
	// var lightHall = new BABYLON.PointLight("lightHall", new BABYLON.Vector3(15,9,22.5), scene) ;
	// lightHall = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(29.5, 9.8, 29.5), new BABYLON.Vector3(-1, -0.5, -1), BABYLON.Tools.ToRadians(90) , 0.5, scene);
	// lightHall = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0.5, 9.8, 29.5), new BABYLON.Vector3(1, -0.5, -1), BABYLON.Tools.ToRadians(90) , 0.5, scene);
	// lightHall = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(29.5, 9.8, 0.5), new BABYLON.Vector3(1, -0.5, 1), BABYLON.Tools.ToRadians(90) , 0.5, scene);
	// lightHall = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0.5, 9.8, 0.5), new BABYLON.Vector3(-1, -0.5, 1), BABYLON.Tools.ToRadians(90) , 0.5, scene);
	// var lightSalle1 = new BABYLON.PointLight("lightSalle1", new BABYLON.Vector3(5,4.5,7.5), scene) ; 
	// var lightSalle2 = new BABYLON.PointLight("lightSalle2", new BABYLON.Vector3(15,4.5,7.5), scene) ; 
	// var lightSalle3 = new BABYLON.PointLight("lightSalle3", new BABYLON.Vector3(25,4.5,7.5), scene) ; 
	// lightEntrance.intensity=2;
	// lightSalle1.intensity=0.5;
	// lightSalle2.intensity=0.5;
	// lightSalle3.intensity=0.5;

}


// // mesh labels
//     meshes.forEach((m) => {
//         //rajouter if box camera dans box tableau alors afficher pancarte
//         header = BABYLON.GUI.Button.CreateSimpleButton(m.name, m.name);

//         header.width = "150px";
//         header.height = "35px";
//         header.color = "white";
//         header.background = "green";
//         header.cornerRadius = 10;

//         advancedTexture.addControl(header);

//         header.linkWithMesh(m);
//         header.linkOffsetY = 50;
//     });
    

function peuplerScene(){

	// Création du sol global
	var sol = creerSol("sol",{},scene) ; 
	var ciel=creerCiel("ciel",scene);
	
	//création de matériaux
	materiauPorte = creerMateriauSimple("mat-porte",{texture:"assets/textures/porte.jpeg"},scene) ;
	materiauPorteG = creerMateriauSimple("mat-porteg",{texture:"assets/textures/portegauche.jpeg"},scene) ;
	materiauWood = creerMateriauSimple("mat-wood",{texture:"assets/textures/WOOD.png"},scene);
	materiauIllusion2 = creerMateriauSimple("mat-illusion2",{texture:"assets/textures/illusion2.jpg"},scene);

	sol.receiveShadows = true;

	materiauCloison = creerMateriauSimple("mat-cloison",{texture:"assets/textures/murs.jpg"}, scene) ; 
	materiauCarrelage = creerMateriauSimple("mat-carrelage",{texture:"assets/textures/solCarrelage.jpg"}, scene) ;
	materiauMarbre = creerMateriauSimple("mat-marbre",{texture:"assets/textures/marbre.jpg"}, scene) ;
	materiauIllusion = creerMateriauSimple("mat-illusion",{texture:"assets/textures/illusion.jpg"}, scene) ;

	// Création d'une cloison
	var cloisonUpRight = creerCloison("cloisonUpRight",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpRight.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonUpRight.rotation.y = 0*Math.PI ;
	var cloisonUpMid = creerCloison("cloisonUpMid",{hauteur:5.0, largeur:10.0,materiau:materiauCloison,materiau2:materiauIllusion2},scene) ;
	cloisonUpMid.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonUpMid.rotation.y = 0*Math.PI ;
	var cloisonUpLeft = creerCloison("cloisonUpLeft",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpLeft.position = new BABYLON.Vector3(25,0,0) ; 
	cloisonUpLeft.rotation.y = 0*Math.PI ;
	var cloisonUpTop = creerCloison("cloisonUpTop",{hauteur:5.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonUpTop.position = new BABYLON.Vector3(15,5,0) ; 
	cloisonUpTop.rotation.y = 0*Math.PI ;

	var cloisonRightSalle3 = creerCloison("cloisonRightSalle3",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightSalle3.position = new BABYLON.Vector3(0,0,7.5) ; 
	cloisonRightSalle3.rotation.y = Math.PI/2;
	var cloisonRightMezzanine = creerCloison("cloisonRightMezzanine",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightMezzanine.position = new BABYLON.Vector3(0,5,7.5) ; 
	cloisonRightMezzanine.rotation.y = Math.PI/2;
	var cloisonRightHall = creerCloison("cloisonRightHall",{hauteur:10.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightHall.position = new BABYLON.Vector3(0,0,22.5) ; 
	cloisonRightHall.rotation.y = Math.PI/2;

	var cloisonLeftSalle1 = creerCloison("cloisonLeftSalle1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftSalle1.position = new BABYLON.Vector3(30,0,7.5) ; 
	cloisonLeftSalle1.rotation.y = Math.PI/2;
	var cloisonLeftMezzanine = creerCloison("cloisonLeftMezzanine",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftMezzanine.position = new BABYLON.Vector3(30,5,7.5) ; 
	cloisonLeftMezzanine.rotation.y = Math.PI/2;
	var cloisonLeftHall = creerCloison("cloisonLeftHall",{hauteur:10.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftHall.position = new BABYLON.Vector3(30,0,22.5) ; 
	cloisonLeftHall.rotation.y = Math.PI/2;


	var cloisonNord1 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord1.position = new BABYLON.Vector3(10,0,7.5) ; 
	cloisonNord1.rotation.y = 1/2*Math.PI;
	var cloisonNord2 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord2.position = new BABYLON.Vector3(20,0,7.5) ; 
	cloisonNord2.rotation.y = 1/2*Math.PI;

	//création d'un sol de salle
	var cloisonFloorMezzanine = creerCloison("cloisonFloorMezzanine",{hauteur:15.0, largeur:30.0,materiau:materiauWood,materiau2:materiauCloison},scene) ;
	cloisonFloorMezzanine.position = new BABYLON.Vector3(15,5,0) ; 
	cloisonFloorMezzanine.rotation.x = 1/2*Math.PI;

	var cloisonFloorHall = creerCloison("cloisonFloorHall",{hauteur:15.0, largeur:30.0,materiau:materiauWood},scene) ;
	cloisonFloorHall.position = new BABYLON.Vector3(15,0,15) ; 
	cloisonFloorHall.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle1 = creerCloison("cloisonFloorSalle1",{hauteur:15.0, largeur:10.0,materiau:materiauCarrelage},scene) ;
	cloisonFloorSalle1.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonFloorSalle1.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle2 = creerCloison("cloisonFloorSalle2",{hauteur:15.0, largeur:10.0,materiau:materiauIllusion},scene) ;
	cloisonFloorSalle2.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonFloorSalle2.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle3 = creerCloison("cloisonFloorSalle3",{hauteur:15.0, largeur:10.0,materiau:materiauWood},scene) ;
	cloisonFloorSalle3.position = new BABYLON.Vector3(25,0,0) ; 
	cloisonFloorSalle3.rotation.x = 1/2*Math.PI;

	//CRéation d'un mur avec une porte
	var cloisonDown = createDoorWall("cloisonDown",{hauteur:10.2, largeur:30.0,hauteurPorte:4, largeurPorte:6,materiau:materiauCloison},scene) ;
	cloisonDown.position = new BABYLON.Vector3(15,-0.2,30) ; 
	cloisonDown.rotation.x=-Math.PI/2;

	var doorwallLeft = createDoorWall("doorwallLeft", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallLeft.position=new BABYLON.Vector3(25,-0.2,15.075);
	doorwallLeft.rotation.x=-90;
    var doorwallMid = createDoorWall("doorwallMid", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison ,materiau2:materiauMarbre}, scene);
    doorwallMid.position=new BABYLON.Vector3(15,-0.2,15.075);
	doorwallMid.rotation.x=-90;
    const doorwallRight = createDoorWall("doorwallRight", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallRight.position=new BABYLON.Vector3(5,-0.2,15.075);
	doorwallRight.rotation.x=-90;


	//creation d'un plafond
	var plafond = creerCloison("plafond",{hauteur:30.0, largeur:30.0,materiau:materiauCloison},scene) ;
	plafond.position = new BABYLON.Vector3(15,10,0) ; 
	plafond.rotation.x = 1/2*Math.PI;

	//creation d'un escalier
	var escalier2 = creerEscalier("escalier",{hauteur:3.25, largeur:3.0, longueur : 7, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	escalier2.position = new BABYLON.Vector3(15,0.1,25) ; 
	escalier2.rotation.y = Math.PI;
	var escalier3 = creerEscalier("escalier",{hauteur:1.75, largeur:3.0, longueur : 12.0, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	escalier3.position = new BABYLON.Vector3(15,3.25,16.5) ; 
	escalier3.rotation.y = Math.PI/2;
	var escalier4 = creerEscalier("escalier",{hauteur:1.75, largeur:3.0, longueur : 12.0, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	escalier4.position = new BABYLON.Vector3(15,3.25,16.5) ; 
	escalier4.rotation.y = -Math.PI/2;

	var cloisonFloorEscalier1 = creerCloison("cloisonFloorEscalier1",{hauteur:3.0, largeur:3.0,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	cloisonFloorEscalier1.position = new BABYLON.Vector3(1.5 ,5,15) ; 
	cloisonFloorEscalier1.rotation.x = 1/2*Math.PI;
	var cloisonFloorEscalier2 = creerCloison("cloisonFloorEscalier2",{hauteur:3.0, largeur:3.0,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	cloisonFloorEscalier2.position = new BABYLON.Vector3(28.5,5,15) ; 
	cloisonFloorEscalier2.rotation.x = 1/2*Math.PI;


	advancedDynamicTexture = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
	curs = new BABYLON.GUI.Rectangle("curs");
	curs.width='10px';
	curs.height='10px';
	curs.color='red';
	advancedDynamicTexture.addControl(curs);
	//shadow Hall
	// shadowGeneratorHall = new BABYLON.ShadowGenerator(1024, lightHall);
	// shadowGeneratorHall.usePoissonSampling = true;
 //    shadowGeneratorHall.transparencyShadow = true;
 //    shadowGeneratorHall.enableSoftTransparentShadow = true;
	// shadowGeneratorHall.addShadowCaster(cloisonDown);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonFloor);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonLeft);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonRight);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallLeft);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallMid);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallRight);

	
	// Création des tableaux
	// function (name, file, parent, position, rotation)
	placeTableau("tableau1", "assets/tableaux/Berthe.jpg", cloisonRightHall, new BABYLON.Vector3(-6.6,1.5,0.2), Math.PI );
	placeTableau("tableau2", "assets/tableaux/Berthe.jpg", cloisonRightHall, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI );
	placeTableau("tableau2", "assets/tableaux/Berthe.jpg", cloisonRightHall, new BABYLON.Vector3(-0.6,1.5,0.2), Math.PI );

	// Création d une sphere
	var sphere1 = BABYLON.MeshBuilder.CreateSphere("sphere1", {diameter:1.0}, scene) ; 
	sphere1.material = new BABYLON.StandardMaterial("materiauMarbre", scene) ;
	sphere1.position = new BABYLON.Vector3(15,6,14);
	sphere1.visibility=0.7;

	var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter:1.0}, scene) ; 
	sphere2.material = new BABYLON.StandardMaterial("materiauMarbre", scene) ;
	sphere2.position = new BABYLON.Vector3(3,1,27);
	sphere2.visibility=0.7;
	
	//creation d'une porte
	createCentraleDoor();
	createRoomDoors();	
}
function placeTableau(name, file, parent, position, rotation){
	var tableau = creerPoster(name,{tableau:file},scene) ;
	tableau.parent = parent ; // on accroche le tableau à la cloison parent
	tableau.rotation.y=rotation;
	tableau.position = position;
	// console.log(tableau.name);
	var boxCollision = BABYLON.MeshBuilder.CreateBox("box_"+name, {width:2,height:4,depth:3}, scene);
	boxCollision.position=new BABYLON.Vector3(0,0,-2);
	boxCollision.isPickable=false;
	boxCollision.parent = tableau;
	boxCollision.visibility = 0;
	var plane = BABYLON.Mesh.CreatePlane("plane",0.1);
	plane.parent=tableau;
	plane.position.y = -0.07;
	plane.visibility = 0; 
	plane.isPickable=false;
	var header = BABYLON.GUI.Button.CreateSimpleButton(name, name);
    header.width = "150px";
    header.height = "20px";
    header.color = "black";
    header.fontSize = 18 ;
    header.background = "cyan";
    header.cornerRadius = 10;
    // header.onPointerClickObservable.add(() => {alert("clicked image")});
    header.isVisible = false;
    advancedDynamicTexture.addControl(header);
    header.linkWithMesh(plane);
    var planedescription = BABYLON.Mesh.CreatePlane("planedescription",0.1);
	planedescription.parent=tableau;
	planedescription.position.y = -0.35;
	planedescription.visibility = 0; 
	planedescription.isPickable=false;
    var description = BABYLON.GUI.Button.CreateSimpleButton(name, "C'est un très beau tableau qui représente une dame");
    description.width = "300px";
    description.height = "100px";
    description.color = "white";
    description.fontSize = 10 ;
    description.background = "green";
    description.cornerRadius = 10;
    description.isVisible = false;
    advancedDynamicTexture.addControl(description);
    description.linkWithMesh(planedescription);

    
    // console.log(tableau.getChildren());
	Tableaux.push(tableau);
	Headers.push(header);
	Descriptions.push(description);
}

var isLocked = false ;

function vecToLocal(vector, mesh){
    var m = mesh.getWorldMatrix();
    var v = BABYLON.Vector3.TransformCoordinates(vector, m);
	return v;		 
}

function set_FPS_mode(scene, canvas, camera){
	// https://stackoverflow.com/questions/47116383/babylonjs-how-to-move-the-camera-in-front-of-a-mesh
	// https://www.babylonjs-playground.com/#ZHDBJ#37
	// On click event, request pointer lock
	scene.onPointerDown = function (evt, pickResult) {
		//true/false check if we're locked, faster than checking pointerlock on each single click.
		if (!isLocked) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}
		console.log(pickResult.pickedMesh.name);
		var resultat = scene.pick(window.innerWidth/2, window.innerHeight/2);
		if(resultat.pickedMesh.name=='sphere1' || resultat.pickedMesh.name=='sphere2'){
			camera.position= new BABYLON.Vector3(resultat.pickedMesh.position.x,resultat.pickedMesh.position.y+1,resultat.pickedMesh.position.z);
		}
		Tableaux.forEach(function (item, i){
			if(resultat.pickedMesh.name==item.getChildren()[0].name){
				console.log("hit "+item.name);
				console.log("hit "+Headers[i].isVisible);

			}else{
			}
		});

	};
	
	///Intéraction porte
	posLimite=0;
	i=0;
	pos=0;
	alpha = 0;
	porte1=false;
	porte2=false;
    scene.registerBeforeRender( function()  {
		if(boxCamera.intersectsMesh(contactBoxPorte,false)){ i=1;	}
		else if(boxCamera.intersectsMesh(contactBoxPorte2,false)){ i=2; }
		else if(boxCamera.intersectsMesh(contactBoxPorte3,false)){ i=3; }

		if(boxCamera.intersectsMesh(contactBoxPorte,false) || boxCamera.intersectsMesh(contactBoxPorte2,false) || boxCamera.intersectsMesh(contactBoxPorte3,false)){
			if (posLimite<1.6){
				pos=0.05;
				posLimite+=pos;
			}
			else{
				pos=0;
			}
		}else{
			if (posLimite>0){
				pos=-0.05;
				posLimite+=pos;
			}
			else{
				pos=0;
			}
		}
		if (i==1){
			porteGauche.position.x+=pos;
			porteDroite.position.x-=pos;
		}
		else if (i==2){
			porteGauche2.position.x+=pos;
			porteDroite2.position.x-=pos;
		}
		else if (i==3){
			porteGauche3.position.x+=pos;
			porteDroite3.position.x-=pos;
		}
		
		
        //Balloon 1 intersection -- Precise = false
        if (boxCamera.intersectsMesh(contactBoxDoorCentrale1, false)) {
			if (!porte2)
			{
				porte1=true;
				
				if(alpha<Math.PI/2){
					alpha+=0.05;
				}
			}
        }
		else if (boxCamera.intersectsMesh(contactBoxDoorCentrale2,false))
		{
			if (!porte1){
				porte2=true; 
				if(alpha>-Math.PI/2){
					alpha-=0.05;
				}
			}
		}
		
		else{
			if (porte1) 
			{
				if(alpha<0.05){
					alpha-=0.05;
				}
				porte1=false;
				porte2=false;
			}
			else if (porte2) 
			{
				if(alpha<Math.PI/2){
					alpha+=0.05;
				}
				porte1=false;
				porte2=false;
			}
			else
			{	
				if(alpha<-0.05){
					alpha+=0.05;
				}

				else if(alpha>0.05){
					alpha-=0.05;
				}
			}
			
		}

		porteCentrale.rotation.y=alpha;
		porteCentrale2.rotation.y=-alpha;
		

		Tableaux.forEach(function (item, i){
			if(boxCamera.intersectsMesh(item.getChildren()[1] )){
				// console.log("intersection "+item.name);
				Headers[i].isVisible = true;
				Descriptions[i].isVisible = true;
			}else{
				Headers[i].isVisible = false;
				Descriptions[i].isVisible = false;
			}
		});

	});
	// Event listener when the pointerlock is updated (or removed by pressing ESC for example).
	var pointerlockchange = function () {
		var controlEnabled = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || false;

		// If the user is already locked
		if (!controlEnabled) {
			camera.detachControl(canvas);
			isLocked = false;
		} else {
			camera.attachControl(canvas);
			setTimeout(() => {
				isLocked = true;
			}, 100);

		}
	};

	// Attach events to the document
	document.addEventListener("pointerlockchange", pointerlockchange, false);
	document.addEventListener("mspointerlockchange", pointerlockchange, false);
	document.addEventListener("mozpointerlockchange", pointerlockchange, false);
	document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

}

init() ;
