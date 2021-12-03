//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array

var canvas, engine ;
var scene, camera ;
var Tableaux= new Array();
var Headers= new Array();
var Descriptions= new Array();
var Sounds= new Array();


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
	boxFeet=BABYLON.Mesh.CreateBox("boxCamera",0.5,scene);
	boxFeet.position = new BABYLON.Vector3(camera.position.x,camera.position.y-0.8,camera.position.z);
	boxFeet.setParent(camera);
	boxFeet.isPickable=false;


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

	var lightScene1 = new BABYLON.HemisphericLight("lightHall", new BABYLON.Vector3(0,30,0), scene) ; 
	// var lightScene2 = new BABYLON.HemisphericLight("lightHall", new BABYLON.Vector3(15,15,-15), scene) ;
	// lightScene1.intensity=2;
	// lightScene2.intensity=2;
	

}


function peuplerScene(){

	// Création du sol global
	var sol = creerSol("sol",{},scene) ; 
	sol.receiveShadows = true;

	creerMateriau();

	// Création d'une cloison
	cloisonUpRight = creerCloison("cloisonUpRight",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpRight.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonUpRight.rotation.y = 0*Math.PI ;
	cloisonUpMid = creerCloison("cloisonUpMid",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpMid.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonUpMid.rotation.y = 0*Math.PI ;
	cloisonUpLeft = creerCloison("cloisonUpLeft",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpLeft.position = new BABYLON.Vector3(25,0,0) ; 
	cloisonUpLeft.rotation.y = 0*Math.PI ;
	cloisonUpTop = creerCloison("cloisonUpTop",{hauteur:5.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonUpTop.position = new BABYLON.Vector3(15,5,0) ; 
	cloisonUpTop.rotation.y = 0*Math.PI ;

	cloisonRightSalle3 = creerCloison("cloisonRightSalle3",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightSalle3.position = new BABYLON.Vector3(0,0,7.5) ; 
	cloisonRightSalle3.rotation.y = Math.PI/2;
	cloisonRightMezzanine = creerCloison("cloisonRightMezzanine",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightMezzanine.position = new BABYLON.Vector3(0,5,7.5) ; 
	cloisonRightMezzanine.rotation.y = Math.PI/2;
	cloisonRightHall = creerCloison("cloisonRightHall",{hauteur:10.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonRightHall.position = new BABYLON.Vector3(0,0,22.5) ; 
	cloisonRightHall.rotation.y = Math.PI/2;

	cloisonLeftSalle1 = creerCloison("cloisonLeftSalle1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftSalle1.position = new BABYLON.Vector3(30,0,7.5) ; 
	cloisonLeftSalle1.rotation.y = Math.PI/2;
	cloisonLeftMezzanine = creerCloison("cloisonLeftMezzanine",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftMezzanine.position = new BABYLON.Vector3(30,5,7.5) ; 
	cloisonLeftMezzanine.rotation.y = Math.PI/2;
	cloisonLeftHall = creerCloison("cloisonLeftHall",{hauteur:10.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonLeftHall.position = new BABYLON.Vector3(30,0,22.5) ; 
	cloisonLeftHall.rotation.y = Math.PI/2;


	cloisonNord1 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord1.position = new BABYLON.Vector3(10,0,7.5) ; 
	cloisonNord1.rotation.y = 1/2*Math.PI;
	cloisonNord2 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord2.position = new BABYLON.Vector3(20,0,7.5) ; 
	cloisonNord2.rotation.y = 1/2*Math.PI;

	//création d'un sol de salle
	var cloisonFloorMezzanine = creerCloison("cloisonFloorMezzanine",{hauteur:15.0, largeur:30.0,materiau:materiauWood,materiau2:materiauCloison},scene) ;
	cloisonFloorMezzanine.position = new BABYLON.Vector3(15,5,0) ; 
	cloisonFloorMezzanine.rotation.x = 1/2*Math.PI;

	var cloisonFloorHall = creerCloison("cloisonFloorHall",{hauteur:15.0, largeur:30.0,materiau:materiauWood},scene) ;
	cloisonFloorHall.position = new BABYLON.Vector3(15,0,15) ; 
	cloisonFloorHall.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle1 = creerCloison("cloisonFloorSalle1",{hauteur:15.0, largeur:10.0,materiau:materiauWood},scene) ;
	cloisonFloorSalle1.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonFloorSalle1.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle2 = creerCloison("cloisonFloorSalle2",{hauteur:15.0, largeur:10.0,materiau:materiauWood},scene) ;
	cloisonFloorSalle2.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonFloorSalle2.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle3 = creerCloison("cloisonFloorSalle3",{hauteur:15.0, largeur:10.0,materiau:materiauWood},scene) ;
	cloisonFloorSalle3.position = new BABYLON.Vector3(25,0,0) ; 
	cloisonFloorSalle3.rotation.x = 1/2*Math.PI;

	//Création d'un mur avec une porte
	var cloisonDown = createDoorWall("cloisonDown",{hauteur:10.2, largeur:30.0,hauteurPorte:4, largeurPorte:6,materiau:materiauCloison},scene) ;
	cloisonDown.position = new BABYLON.Vector3(15,-0.2,30) ; 
	cloisonDown.rotation.x=-Math.PI/2;

	var doorwallLeft = createDoorWall("doorwallLeft", {hauteur:5.06, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallLeft.position=new BABYLON.Vector3(25,0,15);
	doorwallLeft.rotation.x=-Math.PI/2;
    var doorwallMid = createDoorWall("doorwallMid", {hauteur:5.06, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison ,materiau2:materiauMarbre}, scene);
    doorwallMid.position=new BABYLON.Vector3(15,0,15);
	doorwallMid.rotation.x=-Math.PI/2;
    const doorwallRight = createDoorWall("doorwallRight", {hauteur:5.06, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallRight.position=new BABYLON.Vector3(5,0,15);
	doorwallRight.rotation.x=-Math.PI/2;


	//creation d'un plafond
	var plafond = creerCloison("plafond",{hauteur:30.0, largeur:30.0,materiau:materiauCloison},scene) ;
	plafond.position = new BABYLON.Vector3(15,10,0) ; 
	plafond.rotation.x = 1/2*Math.PI;

	//creation d'un escalier
	var escalier2 = creerEscalier("escalier",{hauteur:3.25, largeur:3.0, longueur : 6, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre,poteau:"dg"},scene) ;
	escalier2.position = new BABYLON.Vector3(15,0.1,24) ; 
	escalier2.rotation.y = Math.PI;
	var escalier3 = creerEscalier("escalier",{hauteur:1.7, largeur:3.0, longueur : 10.5, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre,poteau:"g"},scene) ;
	escalier3.position = new BABYLON.Vector3(16.5,3.3,16.6) ; 
	escalier3.rotation.y = Math.PI/2;
	var escalier4 = creerEscalier("escalier",{hauteur:1.7, largeur:3.0, longueur : 10.5, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre,poteau:"d"},scene) ;
	escalier4.position = new BABYLON.Vector3(13.5,3.3,16.6	) ; 
	escalier4.rotation.y = -Math.PI/2;

	var escalierdoux = creerCloison("escalierdoux",{hauteur:Math.sqrt(43), largeur:3.0},scene) ;
	escalierdoux.position = new BABYLON.Vector3(15,0.07,24.1)  ; 
	escalierdoux.rotation = new BABYLON.Vector3(0.496+2*Math.PI/11,Math.PI,0);
	escalierdoux.getChildren()[0].visibility=0;
	escalierdoux.getChildren()[1].visibility=0;

	let barreg1 =creerCylindre("barreg1",{height:Math.sqrt(43), diameter: 0.12,materiau:materiauWood});
	barreg1.position = new BABYLON.Vector3(16.4,2.6,21) ; 
	barreg1.rotation = new BABYLON.Vector3(0.496+2*Math.PI/11,Math.PI,0);

	let barred1 =creerCylindre("barred1",{height:Math.sqrt(43), diameter: 0.12,materiau:materiauWood});
	barred1.position = new BABYLON.Vector3(13.6,2.6,21) ; 
	barred1.rotation = new BABYLON.Vector3(0.496+2*Math.PI/11,Math.PI,0);

	let barred =creerCylindre("barred",{height:Math.sqrt(114), diameter: 0.12,materiau:materiauWood});
	barred.rotation = new BABYLON.Vector3(0,0,-3.3*Math.PI/6);
	barred.position = new BABYLON.Vector3(8.2,5.1,18.025) ; 

	let barreg =creerCylindre("barreg",{height:Math.sqrt(114), diameter: 0.12,materiau:materiauWood});
	barreg.rotation = new BABYLON.Vector3(0,0,3.3*Math.PI/6);
	barreg.position = new BABYLON.Vector3(21.8,5.1,18.025) ; 

	let barredp =creerCylindre("barreg",{height:2.75, diameter: 0.12,materiau:materiauWood});
	barredp.rotation = new BABYLON.Vector3(0,0,Math.PI/2);
	barredp.position = new BABYLON.Vector3(1.5,5.95,18.025) ; 

	let barregp =creerCylindre("barreg",{height:2.75, diameter: 0.12,materiau:materiauWood});
	barregp.rotation = new BABYLON.Vector3(0,0,Math.PI/2);
	barregp.position = new BABYLON.Vector3(28.5,5.95,18.025) ; 

	var cloisonFloorEscalier = creerCloison("cloisonFloorEscalier",{hauteur:3.0, largeur:3.0,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	cloisonFloorEscalier.position = new BABYLON.Vector3(15,3.25,15) ; 
	cloisonFloorEscalier.rotation.x = 1/2*Math.PI;

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
	createCentraleDoor(scene);
	createRoomDoors(scene);	

	creerContactBoxes();

	creerTableaux();

	creerPendule("pendule",scene);
	var penduleBox = BABYLON.Mesh.CreateBox("penduleBox",1, scene); 
	penduleBox.scaling = new BABYLON.Vector3(5,4,2);
	penduleBox.position = new BABYLON.Vector3(15,8,22);
	penduleBox.visibility=0;
	creerSons();

	creerEntree();

	
	// BABYLON.SceneLoader.ImportMesh("", "assets/meshes/", "fish.glb", scene, function (result){
	//  	result[0].scaling=new BABYLON.Vector3(0.5,0.5,0.5);
	//  	result[0].position=new BABYLON.Vector3(35,2,-3);
	// });

	//BABYLON.SceneLoader.ImportMesh("", "assets/meshes/", "solar_system.glb", scene, function (meshes) { 
	//});
}
function creerMateriau(){
		//création de matériaux
		materiauPorte = creerMateriauSimple("mat-porte",{texture:"assets/textures/porte.jpeg"},scene) ;
		materiauPorteG = creerMateriauSimple("mat-porteg",{texture:"assets/textures/portegauche.jpeg"},scene) ;
		materiauWood = creerMateriauSimple("mat-wood",{texture:"assets/textures/WOOD.png"},scene);
		materiauIllusion2 = creerMateriauSimple("mat-illusion2",{texture:"assets/textures/illusion2.jpg"},scene);
		materiauNoir= creerMateriauSimple("mat-noir",{couleur:new BABYLON.Color3(0.1,0.1,0.1)},scene);
		materiauCloison = creerMateriauSimple("mat-cloison",{texture:"assets/textures/mur_bois.jpg"}, scene) ; 
		materiauCarrelage = creerMateriauSimple("mat-carrelage",{texture:"assets/textures/solCarrelage.jpg"}, scene) ;
		materiauMarbre = creerMateriauSimple("mat-marbre",{texture:"assets/textures/marbre.jpg"}, scene) ;
		materiauIllusion = creerMateriauSimple("mat-illusion",{texture:"assets/textures/illusion.jpg"}, scene) ;
}
function creerSons(){
	southAmericaSound = new BABYLON.Sound("southAmericaSound", "assets/sound/southAmericaSound.mp3", scene,{loop:true, autoPlay:false}); 
	northAmericaSound = new BABYLON.Sound("northAmericaSound", "assets/sound/northAmericaSound.mp3", scene,{loop:true, autoPlay:false}); 
	asiaSound = new BABYLON.Sound("asiaSound", "assets/sound/asiaSound.mp3", scene,{loop:true, autoPlay:false}); 
	africaSound = new BABYLON.Sound("africaSound", "assets/sound/africaSound.mp3", scene,{loop:true, autoPlay:false}); 
	oceaniaSound= new BABYLON.Sound("oceaniaSound", "assets/sound/oceaniaSound.mp3", scene,{loop:true, autoPlay:false}); 
	newton1Sound= new BABYLON.Sound("newton1Sound", "assets/sound/newtonSound1.mp3", scene,{loop:false, autoPlay:false}); 
	newton2Sound= new BABYLON.Sound("newton2Sound", "assets/sound/newtonSound2.mp3", scene,{loop:false, autoPlay:false}); 
	doorSound= new BABYLON.Sound("doorSound", "assets/sound/doorSound.mp3", scene,{loop:false, autoPlay:false}); 

	oceaniaSound.setVolume(0.5);
	asiaSound.setVolume(0.7);
}

function creerEntree(){

	var plafondEntree = creerCloison("plafondEntree",{hauteur:5.2, largeur:10,materiau:materiauCloison},scene) ;
	plafondEntree.position = new BABYLON.Vector3(15,4.6,30) ; 
	plafondEntree.rotation.x = 1/2*Math.PI;

	var solEntree = creerCloison("solEntree",{hauteur:5.2, largeur:10,materiau:materiauWood},scene) ;
	solEntree.position = new BABYLON.Vector3(15,0,30) ; 
	solEntree.rotation.x = 1/2*Math.PI;

	var plafondGAucheEntree = creerCloison("plafondGAucheEntree",{hauteur:Math.sqrt(28), largeur:5.2,materiau:materiauCloison},scene) ;
	plafondGAucheEntree.position = new BABYLON.Vector3(20,4.6,32.6) ; 
	plafondGAucheEntree.rotation = new BABYLON.Vector3(-0.15*Math.PI-Math.PI/4,1/2*Math.PI,0);

	var plafondDroiteEntree = creerCloison("plafondDroiteEntree",{hauteur:Math.sqrt(28), largeur:5.2,materiau:materiauCloison},scene) ;
	plafondDroiteEntree.position = new BABYLON.Vector3(10,4.6,32.6) ; 
	plafondDroiteEntree.rotation = new BABYLON.Vector3(0.15*Math.PI+Math.PI/4,1/2*Math.PI,0);

	const corners = [ new BABYLON.Vector2(4.9, 0),
		new BABYLON.Vector2(0, 1.5),
		new BABYLON.Vector2(-4.9, 0)
	];        

	const triangle = new BABYLON.PolygonMeshBuilder("triangleEntree",corners, scene);
	const triangleEntree = triangle.build(false, 0.1); //updatable or not, depth
	triangleEntree.rotation.x=-Math.PI/2;
	triangleEntree.material=materiauMarbre ;
	triangleEntree.position= new BABYLON.Vector3(15,4.6,34.9) ; 


	discGaucheSol = BABYLON.MeshBuilder.CreateDisc("discGaucheSol", {radius:1.02},scene);
	discGaucheSol.material=materiauMarbre ;
	discGaucheSol.position = new BABYLON.Vector3(18.7,0.08,34) ;
	discGaucheSol.rotation.x = 1/2*Math.PI;

	discGauchePlafond = BABYLON.MeshBuilder.CreateDisc("discGauchePlafond", {radius:1.02},scene);
	discGauchePlafond.material=materiauMarbre ;
	discGauchePlafond.position = new BABYLON.Vector3(18.7,4.54,34) ;
	discGauchePlafond.rotation.x = -1/2*Math.PI;

	discDroiteSol = BABYLON.MeshBuilder.CreateDisc("discDroiteSol", {radius:1.02},scene);
	discDroiteSol.material=materiauMarbre ;
	discDroiteSol.position = new BABYLON.Vector3(11.2,0.08,34) ;
	discDroiteSol.rotation.x = 1/2*Math.PI;

	discDroitePlafond = BABYLON.MeshBuilder.CreateDisc("discDroitePlafond", {radius:1.02},scene);
	discDroitePlafond.material=materiauMarbre ;
	discDroitePlafond.position = new BABYLON.Vector3(11.2,4.54,34) ;
	discDroitePlafond.rotation.x = -1/2*Math.PI;


	// simple helix, single path
	pathHelix = [];
	let v;
	for (let i = 0; i <= 70; i++) {
		v = 2.0 * Math.PI * i / 20;
		pathHelix.push( new BABYLON.Vector3(1 * Math.cos(v), i/15, 1 * Math.sin(v)) );
	}

	//show pathHelix
	helix1 = BABYLON.MeshBuilder.CreateLines("helix1", {points: pathHelix});
	helix1.color = BABYLON.Color3.Black();
	helix1.position = new BABYLON.Vector3(18.7,-.1,34);
	helix1.checkCollisions = true;
	//create ribbon
	ribbon1 = BABYLON.MeshBuilder.CreateRibbon("ribbon1", {pathArray: [pathHelix], offset: 10, closeArray: true});
	ribbon1.position = new BABYLON.Vector3(18.7,-.1,34);
	ribbon1.checkCollisions = true;
	ribbon1.material=materiauMarbre ;

	//show pathHelix
	helix2 = BABYLON.MeshBuilder.CreateLines("helix2", {points: pathHelix});
	helix2.color = BABYLON.Color3.Black();
	helix2.position = new BABYLON.Vector3(11.2,-.1,34);
	helix2.checkCollisions = true;
	//create ribbon
	ribbon2 = BABYLON.MeshBuilder.CreateRibbon("ribbon2", {pathArray: [pathHelix], offset: 10, closeArray: true});
	ribbon2.position = new BABYLON.Vector3(11.2,-.1,34);
	ribbon2.checkCollisions = true;
	ribbon2.material=materiauMarbre ;
}
function soundCheck(){
	
	if(boxCamera.intersectsMesh(contactBoxSalleDroite,false) && !northAmericaSound.isPlaying){
		northAmericaSound.play() ;
	}
	else if (!boxCamera.intersectsMesh(contactBoxSalleDroite,false) && northAmericaSound.isPlaying){
		northAmericaSound.stop();
	}

	if(boxCamera.intersectsMesh(contactBoxSalleMilieu,false) && !southAmericaSound.isPlaying){
		southAmericaSound.play() ;
	}
	else if (!boxCamera.intersectsMesh(contactBoxSalleMilieu,false) && southAmericaSound.isPlaying){
		southAmericaSound.stop();
	}

	if(boxCamera.intersectsMesh(contactBoxSalleGauche,false) && !asiaSound.isPlaying){
		asiaSound.play() ;
	}
	else if (!boxCamera.intersectsMesh(contactBoxSalleGauche,false) && asiaSound.isPlaying){
		asiaSound.stop();
	}

	if(boxCamera.intersectsMesh(contactBoxHall,false) && !africaSound.isPlaying){
		africaSound.play() ;
		
	}
	else if (!boxCamera.intersectsMesh(contactBoxHall,false) && africaSound.isPlaying){
		africaSound.stop();
	}

	if(boxCamera.intersectsMesh(contactBoxMezzanine,false) && !oceaniaSound.isPlaying){
		oceaniaSound.play() ;
	}
	else if (!boxCamera.intersectsMesh(contactBoxMezzanine,false) && oceaniaSound.isPlaying){
		oceaniaSound.stop();
	}


}
function creerContactBoxes(){
		//create box collision for rooms
		contactBoxSalleDroite=BABYLON.Mesh.CreateBox("contactBoxSalleDroite", 1,scene);
		contactBoxSalleDroite.scaling = new BABYLON.Vector3(10,4,15);
		contactBoxSalleDroite.position=new BABYLON.Vector3(5,2,7.5);
		contactBoxSalleDroite.visibility = 0;
		contactBoxSalleDroite.isPickable=false;
	
		contactBoxSalleMilieu=BABYLON.Mesh.CreateBox("contactBoxSalleMilieu", 1,scene);
		contactBoxSalleMilieu.scaling = new BABYLON.Vector3(10,4,15);
		contactBoxSalleMilieu.position=new BABYLON.Vector3(15,2,7.5);
		contactBoxSalleMilieu.visibility = 0;
		contactBoxSalleMilieu.isPickable=false;
	
		contactBoxSalleGauche=BABYLON.Mesh.CreateBox("contactBoxSalleGauche", 1,scene);
		contactBoxSalleGauche.scaling = new BABYLON.Vector3(10,4,15);
		contactBoxSalleGauche.position=new BABYLON.Vector3(25,2,7.5);
		contactBoxSalleGauche.visibility = 0;
		contactBoxSalleGauche.isPickable=false;

		contactBoxHall=BABYLON.Mesh.CreateBox("contactBoxHall", 1,scene);
		contactBoxHall.scaling = new BABYLON.Vector3(30,5,15);
		contactBoxHall.position=new BABYLON.Vector3(15,2.5,22.5);
		contactBoxHall.visibility = 0;
		contactBoxHall.isPickable=false;

		contactBoxMezzanine=BABYLON.Mesh.CreateBox("contactBoxMezzanine", 1,scene);
		contactBoxMezzanine.scaling = new BABYLON.Vector3(30,5,15);
		contactBoxMezzanine.position=new BABYLON.Vector3(15,7.5,7.5);
		contactBoxMezzanine.visibility = 0;
		contactBoxMezzanine.isPickable=false;
}
function creerTableaux(){
	
	
	//North America salle droite
	placeTableau("Cap Canaveral", "assets/NorthAmerica/Images/Cap Canaveral.jpg", cloisonRightSalle3, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI ,"Cap Canaveral est le domaine américain de lancement de fusées pour l'espace, il s'etend sur de nombreux kilomètres et à une forte capacité de lancement.");
	placeTableau("Grand Canyon", "assets/NorthAmerica/Images/Grand Canyon.jpg", cloisonRightSalle3, new BABYLON.Vector3(0,1.5,0.2), Math.PI,"Le grand cayon est un des plus célèbre lieux touristique située aux Etats-Unis dans le sud ouest. Le colorado à creusé ce magnifique serpent dans la roche si spéciale par ces couleurs");
	placeTableau("National Park", "assets/NorthAmerica/Images/Central Park.jpg", cloisonRightSalle3, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI ," Central Park se trouve au milieu de New York, dans Manhattan. C'est un immense jardin public au milieu des grattes ciel.");
	placeTableau("Niagara Falls", "assets/NorthAmerica/Images/Niagara Falls.jpg", cloisonUpRight, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI , "Les chutes du Niagara se trouve à la frontière des Etats Unis et du Canada, célèbre lieu touristique, les chutes tombes dans les grands lacs américains.");
	placeTableau("Pentagone", "assets/NorthAmerica/Images/Pentagone.jpg", cloisonUpRight, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI ,"Pentagone, batiment probablemnt le plus sécurisé des Etats Unis car il renferme les secrets militaire, cible de nombreux Hackers qui veulent dominer leur domaine.");
	placeTableau("San Francisco Bridge", "assets/NorthAmerica/Images/San Francisco Bridge.jpg", cloisonNord1, new BABYLON.Vector3(3.6,1.5,-0.2), 0 ,"Pont séparant San Fransisco de l'ile voisine, présent sur de nombreuse carte postale grâce à sa construction et le paysage environnant.");
	placeTableau("Yellowstone", "assets/NorthAmerica/Images/Yellowstone.jpg", cloisonNord1, new BABYLON.Vector3(0,1.5,-0.2), 0 , "Parc National où sont présent des nombreux lacs au couleurs unique, des gésers, et le volcan le plus dangereux au monde s'il venait à se réveiller.");
	placeTableau("Yosemite", "assets/NorthAmerica/Images/Yosemite.jpg", cloisonNord1, new BABYLON.Vector3(-3.6,1.5,-0.2), 0 , "Célèbre montagne qui défie les grimpeurs depuis les prémices de l'alpinisme, El Capitan a été grimpé en free solo par Alexender Honnold.");

	//South America salle milieu
	placeTableau("Amazone", "assets/SouthAmerica/Images/Amazone.jpg", cloisonNord1, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI , "Le plus long, large et puissant fleuve trouve sa source en amazonie et se déverse dans l'océan Atlantique.");
	placeTableau("Chute d'Iguazu", "assets/SouthAmerica/Images/Chute d'Iguazu.jpg", cloisonNord1, new BABYLON.Vector3(0,1.5,0.2), Math.PI , "Les chutes d'Iguazu se trouve à la frontière entre le Brésil et l'Argentine, lieux naturel, parc nationnal, les touristes se massent pour les découvrir et les prendres sous tous les angles.");
	placeTableau("Machu Picchu", "assets/SouthAmerica/Images/Machu Picchu.jpg", cloisonNord1, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI, "Machu Picchu est une ancienne cit é inca du XV e siècle au Pérou, perchée sur un promontoire rocheux qui unit les monts Machu Picchu et Huayna Picchu (« le Jeune Pic » en quechua) sur le versant oriental des Andes centrales." );
	placeTableau("Perito Moreno Glacier", "assets/SouthAmerica/Images/Perito Moreno Glacier.jpg", cloisonUpMid, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI , "Le glacier Perito Moreno, en espagnol Glaciar Perito Moreno, est un glacier d'Argentine situé dans le parc national Los Glaciares de la province de Santa Cruz, à 78 kilomètres d'El Calafate, en Patagonie argentine. Son front glaciaire de 5 000 mètres de longueur et de 60 mètres de hauteur s'étend dans le lac Argentino.");
	placeTableau("Rio", "assets/SouthAmerica/Images/Rio.jpg", cloisonUpMid, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI, "Rio de Janeiro, souvent désignée simplement sous le nom de Rio, et archaïquement Riogénaire en français, est la deuxième plus grande ville du Brésil après São Paulo. Située dans le Sud-Est du pays, elle est la capitale de l'État de Rio de Janeiro. Avec ses 6,1 millions d'habitants intra-muros (communément appelés Cariocas, la variante Carioques existant aussi en français) et 12,62 millions dans l'aire urbaine, Rio de Janeiro est l'une des métropoles les plus importantes du continent américain." );
	placeTableau("Salar d'Uyuni", "assets/SouthAmerica/Images/Salar d'Uyuni.jpg", cloisonNord2, new BABYLON.Vector3(3.6,1.5,-0.2), 0, "Cette étendue de sel est située à 3 658 mètres d'altitude. Avec une superficie de 10 582 km21, elle constitue le plus vaste désert de sel du monde1,2 et représente la moitié des réserves de lithium exploitables de la planète. Ses dimensions sont de 150 kilomètres sur 100.");
	placeTableau("Arecibo", "assets/SouthAmerica/Images/Arecibo.jpg", cloisonNord2, new BABYLON.Vector3(0,1.5,-0.2), 0 ,"Le radiotélescope d’Arecibo est situé à Arecibo sur la côte nord de l’île de Porto Rico. Depuis février 2018, il est exploité par l’université de Floride centrale en association avec Yang Enterprises et l'université Ana G. Méndez de San Juan (Porto Rico) sous contrat de la National Science Foundation. Il avait précédemment été exploité par l’université Cornell, de sa construction dans les années 1960 jusqu'en 2011. L’observatoire fonctionne sous le nom de National Astronomy and Ionosphere Center (NAIC) même si les deux noms sont officiellement utilisés.");
	placeTableau("Mont Roraima", "assets/SouthAmerica/Images/Mont Roraima.jpg", cloisonNord2, new BABYLON.Vector3(-3.6,1.5,-0.2), 0, "Le mont Roraima est une montagne d'Amérique du Sud partagée entre le Brésil, le Guyana et le Venezuela. Il s'agit d'un tepuy, une montagne tabulaire caractéristique du plateau des Guyanes. Délimité par des falaises d'environ 1 000 mètres de hauteur, son plateau sommital présente un environnement totalement différent de la forêt tropicale humide et de la savane qui s'étendent à ses pieds. " );

	//Asia salle gauche
	placeTableau("Bumbay", "assets/Asia/Images/Bumbay.jpg", cloisonNord2, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI, "Bombay ou Mumbai, est la capitale de l'État indien du Maharashtra. La métropole compte 12 478 447 habitants en 2011. Ville d'Inde la plus peuplée, elle forme avec ses villes satellites de Navi Mumbai, Bhiwandi, Kalyan, Ulhasnagar et Thane, une agglomération de 18 414 288 habitants, soit la dixième plus peuplée au monde." );
	placeTableau("Himalaya", "assets/Asia/Images/Himalaya.jpg", cloisonNord2, new BABYLON.Vector3(0,1.5,0.2), Math.PI , "L'Himalaya Écouter, littéralement « demeure des neiges », ou chaîne de l'Himalaya, est un ensemble de chaînes de montagnes s'étirant sur plus de 2 400 km de long et large de 250 à 400 km, qui sépare le sous-continent indien du plateau tibétain dans le Sud de l'Asie. Au sens strict, il débute à l'ouest au Nanga Parbat au Pakistan et se termine à l'est au Namche Barwa au Tibet. Cet ensemble montagneux, délimité à l'ouest par la vallée du fleuve Indus et à l'est par la vallée du fleuve Brahmapoutre, couvre une aire d'environ 600 000 km2.");
	placeTableau("Hong Kong", "assets/Asia/Images/Hong Kong.jpg", cloisonNord2, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI ,"Hong Kong, officiellement la région administrative spéciale de Hong Kong de la république populaire de Chine, est la plus grande et la plus peuplée des deux régions administratives spéciales (RAS) de la république populaire de Chine, l'autre étant Macao. Au sein de la mégalopole du delta de la Rivière des Perles, elle compte environ sept millions d'habitants que l'on appelle Hongkongais (en anglais : Hongkongers) dont l'espérance de vie, de 84,2 ans, est la plus longue au monde en 2017");
	placeTableau("Port Shanghai", "assets/Asia/Images/Port Shanghai.jpg", cloisonUpLeft, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI ,"C'est, depuis 2005, le plus grand port du monde en tonnage. En 2010, le trafic de conteneurs y a atteint 29,05 millions d'EVP (équivalent vingt pieds), selon le gouvernement municipal. Shanghai a ainsi dépassé Singapour de 500 000 EVP. En 2017, ce trafic de conteneurs atteint 40,233 millions d'EVP, et 42,010 en 2018, soit un peu moins de 5 millions d'EVP de plus que Singapour (36,600 en 2019).");
	placeTableau("Taj Mahal", "assets/Asia/Images/Taj Mahal.jpg", cloisonUpLeft, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI, "Le Taj Mahal est considéré comme un joyau de l'architecture moghole, un style qui combine des éléments architecturaux des architectures islamique, iranienne, ottomane et indienne." );
	placeTableau("Toundra", "assets/Asia/Images/Toundra.jpg", cloisonLeftSalle1, new BABYLON.Vector3(3.6,1.5,-0.2), 0, "La toundra, terme venant du russe : тундра, lui-même emprunté au same désigne l'un des quatorze grands biomes terrestres. C'est une formation végétale située dans les zones climatiques froides, polaires ou montagnardes, constituée d'une strate végétale unique principalement composée de graminées, de carex, de lichens, de mousses et de diverses variétés d'arbrisseaux. On distingue habituellement la toundra arctique, la toundra antarctique et la toundra alpine. Les deux premières sont influencées par un climat froid d'origine polaire tandis que le climat de la toundra alpine est lié à l'altitude.");
	placeTableau("Yourte Mongolie", "assets/Asia/Images/Yourte Mongolie.jpg", cloisonLeftSalle1, new BABYLON.Vector3(0,1.5,-0.2), 0 , "Une yourte ou iourte est l'habitat traditionnel (tente avec une ossature démontable en bois recouvert de feutre) de nombreux nomades vivant en Asie centrale, notamment les Turcs, mongols et les wakhis . Elle est particulièrement utilisée au Kirghizstan, au Kazakhstan au Karakalpakistan mais aussi au Turkménistan, en Turquie en Afghanistan, en Iran, en Ouzbékistan et bien sûr en Mongolie.");
	placeTableau("La Grande Muraille de Chine", "assets/Asia/Images/La Grande Muraille de Chine.jpg", cloisonLeftSalle1, new BABYLON.Vector3(-3.6,1.5,-0.2), 0, "La Grande Muraille, aussi appelé « Les Grandes Murailles » est un ensemble de fortifications militaires chinoises construites, détruites et reconstruites en plusieurs fois et à plusieurs endroits entre le IIIeme siècle av. J.-C. et le XVIIe siècle pour marquer et défendre la frontière nord de la Chine. C'est la structure architecturale la plus importante jamais construite par l’être humain à la fois en longueur, en surface et en masse." );

	//Africa hall
	placeTableau("Forêt Tropicale", "assets/Africa/Images/Forêt Tropicale.jpg", cloisonRightHall, new BABYLON.Vector3(5,1.5,0.2), Math.PI, "La forêt tropicale est la forêt caractéristique des régions tropicales et équatoriales. Sous ce terme se cachent des réalités très différentes, des forêts tropophiles, composées d'arbres assez épars poussant sous un climat tropical de savane, à la forêt dite tropicale humide dans des zones à climat équatorial, en passant par les forêts de nuages relativement froides." );
	placeTableau("Cap de Bonne Espérance", "assets/Africa/Images/Cap de Bonne Espérance.jpg", cloisonRightHall, new BABYLON.Vector3(2,1.5,0.2), Math.PI ," Le cap de Bonne-Espérance est un promontoire rocheux sur la côte atlantique de l'Afrique du Sud, à l'extrémité de la péninsule du Cap située au sud de la ville du Cap et qui ferme à l'ouest la False Bay (traduction anglaise du terme signifiant « fausse baie » ou Valsbaai en afrikaans). Ce promontoire rocheux se termine à Cape Point, à 2 km du cap de Bonne-Espérance proprement dit. C'est une réserve naturelle parcourue de sentiers côtiers.");
	placeTableau("Lake Victoria", "assets/Africa/Images/Lake Victoria.jpg", cloisonRightHall, new BABYLON.Vector3(-1,1.5,0.2), Math.PI, "Le lac Victoria, ou Nyanza (encore appelé lac Ukéréoué — Ukerewe —, ou Nalubaale), est le plus grand lac d'Afrique et (selon les sources) le quatrième ou le deuxième au monde en superficie avec 68 100 km2. Il doit son nom occidental à l'explorateur britannique Speke qui fut en 1858 le premier Européen à l'atteindre, et qui le baptisa en l'honneur de la reine Victoria." );
	placeTableau("Madagascar", "assets/Africa/Images/Madagascar.jpg", cloisonRightHall, new BABYLON.Vector3(-4,1.5,0.2), Math.PI, "Madagascar, en forme longue la république de Madagascar, en malgache : Madagasikara et Repoblikan'i Madagasikara, est un état insulaire situé dans l'Océan Indien et géographiquement rattaché au continent africain, dont il est séparé par le canal du Mozambique. C’est la cinquième plus grande île du monde après l'Australie, le Groenland, la Nouvelle-Guinée et Bornéo." );
	placeTableau("Maroc teinture", "assets/Africa/Images/Maroc teinture.jpg", cloisonLeftHall, new BABYLON.Vector3(5,1.5,-0.2), 0 , "Les tanneries de Fès se composent de nombreux vases en pierre remplis avec une vaste gamme de teintures et de liquides divers répandus comme une grande palette d’aquarelles. Des dizaines d’hommes, dont beaucoup sont debout jusqu’à la taille dans les colorants, travaillent sous le soleil brûlant. Les tanneries traitent les peaux de vaches, de moutons, de chèvres et de chameaux, les transformant en articles en cuir de haute qualité tels que des sacs, manteaux, chaussures et souliers. Tout cela est réalisé à la main, sans nécessiter l’utilisation de machines modernes, et le processus n’a que très peu changé depuis l’époque médiévale, ce qui rend ces tanneries absolument fascinante à visiter.");
	placeTableau("Nigeria Mine", "assets/Africa/Images/Nigeria Mine.jpg", cloisonLeftHall, new BABYLON.Vector3(2,1.5,-0.2), 0, "Les deux mines d’uranium nigériennes du français Orano (ex-Areva) sont mal en point. L'une, la Cominak, arrêtera sa production en mars 2021, a annoncé le 23 octobre dans un communiqué le groupe nucléaire français. L'autre, la Somaïr, également en fin de vie, a fortement réduit la voilure et le nombre de ses salariés en raison des cours bas de l’uranium.");
	placeTableau("Nil", "assets/Africa/Images/Nil.jpg", cloisonLeftHall, new BABYLON.Vector3(-1,1.5,-0.2), 0 , "Le Nil est un fleuve d'Afrique. Avec une longueur d'environ 6 700 km, c'est avec le fleuve Amazone, le plus long fleuve du monde.");
	placeTableau("Sahara", "assets/Africa/Images/Sahara.jpg", cloisonLeftHall, new BABYLON.Vector3(-4,1.5,-0.2), 0 , "Le Sahara est un vaste désert chaud situé dans la partie nord du continent africain. Il s'étend sur 5 000 km d'ouest en est, de l'océan Atlantique à la mer Rouge, et couvre plus de 8,5 millions de km2 (soit près de 30 % de la surface du continent africain), ce qui en fait la plus grande étendue de terre aride d'un seul tenant dans le monde.");


	//Oceanie mezzanine
	placeTableau("Atolls de Scilly", "assets/Oceanie/Images/Atolls de Scilly.jpg", cloisonUpTop, new BABYLON.Vector3(4,1.5,0.2), Math.PI, "Manuae, ou Scilly, est un atoll faisant partie des îles Sous-le-Vent dans l'archipel de la Société et dépendant administrativement de la commune de Maupiti.");
	placeTableau("Desert Australie", "assets/Oceanie/Images/Desert Australie.jpg", cloisonUpTop, new BABYLON.Vector3(10,1.5,0.2), Math.PI, "Les déserts australiens couvrent, au total près de 1 371 000 km2, soit 18 % de l'Australie. La plupart des déserts se situent dans la partie centrale et au nord-ouest de l'île principale.");
	placeTableau("Ile de tasmanie", "assets/Oceanie/Images/Ile de tasmanie.jpg", cloisonUpTop, new BABYLON.Vector3(-4,1.5,0.2), Math.PI, "L'île de Tasmanie est, avec 60 000 km2, la principale île formant l'État australien de Tasmanie, soit les trois quarts de son territoire et le 27e territoire insulaire le plus vaste de la planète. Elle est entourée par les océans Indien et Pacifique et est séparée de la partie continentale de l'Australie, par le détroit de Bass." );
	placeTableau("Moeraki Boulders", "assets/Oceanie/Images/Moeraki Boulders.jpg", cloisonUpTop, new BABYLON.Vector3(-10,1.5,0.2), Math.PI, "Les Moeraki Boulders sont des rochers sphériques exceptionnellement grands situés le long d'un tronçon de la Koekohe Beach sur le platier de la baie d'Otago, entre Moeraki et Hampden, sur l'Île du Sud, en Nouvelle-Zélande. Les blocs les plus imposants pèsent plusieurs tonnes et vont jusqu'à trois mètres de diamètre." );
	placeTableau("Nouvelle zélande", "assets/Oceanie/Images/Nouvelle zélande.jpg", cloisonRightMezzanine, new BABYLON.Vector3(2.5,1.5,0.2), Math.PI );
	placeTableau("Sidney", "assets/Oceanie/Images/Sidney.jpg", cloisonRightMezzanine, new BABYLON.Vector3(-2.5,1.5,0.2), Math.PI, "La Nouvelle-Zélande est un État insulaire d'Océanie. Située dans le sud-ouest de l'océan Pacifique, la Nouvelle-Zélande est constituée de deux îles principales (l'île du Nord et l'île du Sud), et de nombreuses îles beaucoup plus petites (environ 600), notamment l'île Stewart/Rakiura et les îles Chatham.");
	placeTableau("Polynésie française", "assets/Oceanie/Images/Polynésie française.jpg", cloisonLeftMezzanine, new BABYLON.Vector3(2.5,1.5,-0.2), 0, "La Polynésie française est une collectivité d'outre-mer (plus spécifiquement pays d'outre-mer ou POM) au sein de la République française (code 987), composée de cinq archipels regroupant 118 îles dont 76 sont habitées : l'archipel de la Société avec les îles du Vent et les îles Sous-le-Vent, l'archipel des Tuamotu, l'archipel des Gambier, l'archipel des Australes et les îles Marquises. Les Polynésiens l'appellent aussi Fenua, mot signifiant « territoire » ou « pays » en tahitien." );
	placeTableau("Philipines", "assets/Oceanie/Images/Philipines.jpg", cloisonLeftMezzanine, new BABYLON.Vector3(-2.5,1.5,-0.2), 0 , "Les Philippines, en forme longue la république des Philippines, est un pays d'Asie du Sud-Est constitué d'un archipel de 7 641 îles dont onze totalisent plus de 90 % des terres et dont un peu plus de 2 000 seulement sont habitées, alors qu'environ 2 400 îles n'ont même pas reçu de nom. On distingue trois zones géographiques : Luçon, Visayas et Mindanao.");

}

function placeTableau(name, file, parent, position, rotation, tableauDescription){
	var tableau = creerPoster(name,{tableau:file},scene) ;
	tableau.parent = parent ; // on accroche le tableau à la cloison parent
	tableau.rotation.y=rotation;
	tableau.position = position;
	var boxCollision = BABYLON.MeshBuilder.CreateBox("box_"+name, {width:2,height:4,depth:5}, scene);
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
	header.width = "200px";
	header.height = "40px";
	header.color = "black";
	header.fontSize = 18 ;
	header.background = "white";
	header.isVisible = false;
	advancedDynamicTexture.addControl(header);
	header.linkWithMesh(plane);
	var planedescription = BABYLON.Mesh.CreatePlane("planedescription",0.1);
	planedescription.parent=tableau;
	planedescription.position.y = -0.65;
	planedescription.visibility = 0; 
	planedescription.isPickable=false;
	var description = BABYLON.GUI.Button.CreateSimpleButton(name, tableauDescription);
	description.width = "450px";
	description.height = "200px";
	description.color = "white";
	description.fontSize = 15 ;
	description.background = "";
	description.cornerRadius = 10;
	description.isVisible = false;
	advancedDynamicTexture.addControl(description);
	description.linkWithMesh(planedescription);

    var spot = new BABYLON.SpotLight("spotLight"+name, new BABYLON.Vector3(0,7,-1), new BABYLON.Vector3(0, -1, 0), BABYLON.Tools.ToRadians(45), 0.0, scene);
	spot.parent = tableau;
	// console.log(tableau.parent.position.x+tableau.position.x,tableau.parent.position.y+tableau.position.y,tableau.parent.position.z+tableau.position.z);
	spot.diffuse=new BABYLON.Color3(0.2,0,0.2);
	spot.intensity=10;
	// console.log("spotLight "+name+" parent : " + spot.intensity);

	Tableaux.push(tableau);
	Headers.push(header);
	Descriptions.push(description);
	// Sounds.push(sound);
}

var isLocked = false ;

function vecToLocal(vector, mesh){
    var m = mesh.getWorldMatrix();
    var v = BABYLON.Vector3.TransformCoordinates(vector, m);
	return v;		 
}
var stopNewton=false;

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
		// console.log(pickResult.pickedMesh.name);
		
		var resultat = scene.pick(window.innerWidth/2, window.innerHeight/2);
		if(resultat.pickedMesh.name=='sphere1' || resultat.pickedMesh.name=='sphere2'){
			camera.position= new BABYLON.Vector3(resultat.pickedMesh.position.x,resultat.pickedMesh.position.y+1,resultat.pickedMesh.position.z);
		}
		if (resultat.pickedMesh.name=="penduleBox"){
			stopNewton=!stopNewton;
		}
		Tableaux.forEach(function (item, i){
			if(resultat.pickedMesh.name==item.getChildren()[0].name){
				// console.log("hit "+item.name);
				// console.log("hit "+Headers[i].isVisible);
				Descriptions[i].isVisible = !Descriptions[i].isVisible ;

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
	gauche=true;
	tape2=false;
	beta=0;
	beta2=-1;

	alphaRibbon=0;
	alphaRibbon2=100;


    scene.registerBeforeRender( function()  {
		
		if (alphaRibbon<=100)
		{
			alphaRibbon+=0.2;
			alphaRibbon2-=0.2;
		}
		else{
			alphaRibbon=0;
			alphaRibbon2=100;
		}

		helix1.rotation.y=alphaRibbon;
		ribbon1.rotation.y=alphaRibbon;
		helix2.rotation.y=alphaRibbon;
		ribbon2.rotation.y=alphaRibbon;
		discDroiteSol.rotation.y=alphaRibbon;
		discGaucheSol.rotation.y=alphaRibbon;
		discDroitePlafond.rotation.y=alphaRibbon;
		discGauchePlafond.rotation.y=alphaRibbon;

		//animation 3 portes
		if(boxCamera.intersectsMesh(contactBoxPorte,false)){ i=1;	}
		else if(boxCamera.intersectsMesh(contactBoxPorte2,false)){ i=2; }
		else if(boxCamera.intersectsMesh(contactBoxPorte3,false)){ i=3; }

		if(boxCamera.intersectsMesh(contactBoxPorte,false) || boxCamera.intersectsMesh(contactBoxPorte2,false) || boxCamera.intersectsMesh(contactBoxPorte3,false)){
			if (posLimite<1.6){
				pos=0.07;
				posLimite+=pos;
			}
			else{
				pos=0;
			}
		}else{
			if (posLimite>0){
				pos=-0.07;
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

		soundCheck();
		
		// console.log(scene.getTransfomNode());
		// if(boxCamera.intersectsMesh(scene.getChildren,false)){ i=1;	}

		Tableaux.forEach(function (item, i){
			if(boxCamera.intersectsMesh(item.getChildren()[1] )){
				// console.log("intersection "+item.name);
				Headers[i].isVisible = true;
				// Descriptions[i].isVisible = true;
				item.getChildren()[4].intensity=10;
			}else{
				Headers[i].isVisible = false;
				Descriptions[i].isVisible = false;
				item.getChildren()[4].intensity=0;
			}
		});

		//animation pendule
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
