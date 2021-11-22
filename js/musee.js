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


function peuplerScene(){

	// Création du sol global
	var sol = creerSol("sol",{},scene) ; 
	sol.receiveShadows = true;

	creerMateriau();

	// Création d'une cloison
	cloisonUpRight = creerCloison("cloisonUpRight",{hauteur:5.0, largeur:10.0,materiau:materiauCloison},scene) ;
	cloisonUpRight.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonUpRight.rotation.y = 0*Math.PI ;
	cloisonUpMid = creerCloison("cloisonUpMid",{hauteur:5.0, largeur:10.0,materiau:materiauCloison,materiau2:materiauIllusion2},scene) ;
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
	var cloisonFloorSalle1 = creerCloison("cloisonFloorSalle1",{hauteur:15.0, largeur:10.0,materiau:materiauCarrelage},scene) ;
	cloisonFloorSalle1.position = new BABYLON.Vector3(5,0,0) ; 
	cloisonFloorSalle1.rotation.x = 1/2*Math.PI;
	var cloisonFloorSalle2 = creerCloison("cloisonFloorSalle2",{hauteur:15.0, largeur:10.0,materiau:materiauIllusion},scene) ;
	cloisonFloorSalle2.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonFloorSalle2.rotation.x = 1/2*Math.PI;


	var cloisonFloorSalle3 = creerCloison("cloisonFloorSalle3",{hauteur:15.0, largeur:10.0,materiau:materiauWood},scene) ;
	cloisonFloorSalle3.position = new BABYLON.Vector3(25,0,0) ; 
	cloisonFloorSalle3.rotation.x = 1/2*Math.PI;

	//Création d'un mur avec une porte
	var cloisonDown = createDoorWall("cloisonDown",{hauteur:10.2, largeur:30.0,hauteurPorte:4, largeurPorte:6,materiau:materiauCloison},scene) ;
	cloisonDown.position = new BABYLON.Vector3(15,-0.2,30) ; 
	cloisonDown.rotation.x=-Math.PI/2;

	var doorwallLeft = createDoorWall("doorwallLeft", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallLeft.position=new BABYLON.Vector3(25,-0.2,15.075);
	doorwallLeft.rotation.x=-Math.PI/2;
    var doorwallMid = createDoorWall("doorwallMid", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison ,materiau2:materiauMarbre}, scene);
    doorwallMid.position=new BABYLON.Vector3(15,-0.2,15.075);
	doorwallMid.rotation.x=-Math.PI/2;
    const doorwallRight = createDoorWall("doorwallRight", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallRight.position=new BABYLON.Vector3(5,-0.2,15.075);
	doorwallRight.rotation.x=-Math.PI/2;


	//creation d'un plafond
	var plafond = creerCloison("plafond",{hauteur:30.0, largeur:30.0,materiau:materiauCloison},scene) ;
	plafond.position = new BABYLON.Vector3(15,10,0) ; 
	plafond.rotation.x = 1/2*Math.PI;

	//creation d'un escalier
	var escalier2 = creerEscalier("escalier",{hauteur:3.25, largeur:3.0, longueur : 6, nbmarches:12,materiau2:materiauWood,materiau:materiauMarbre},scene) ;
	escalier2.position = new BABYLON.Vector3(15,0.1,24) ; 
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
 	// shadowGeneratorHall.transparencyShadow = true;
 	// shadowGeneratorHall.enableSoftTransparentShadow = true;
	// shadowGeneratorHall.addShadowCaster(cloisonDown);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonFloor);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonLeft);
	// shadowGeneratorHall.getShadowMap().renderList.push(cloisonRight);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallLeft);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallMid);
	// shadowGeneratorHall.getShadowMap().renderList.push(doorwallRight);

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
		materiauCloison = creerMateriauSimple("mat-cloison",{texture:"assets/textures/murs.jpg"}, scene) ; 
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

	var plafondEntree = creerCloison("plafondEntree",{hauteur:5, largeur:10,materiau:materiauCloison},scene) ;
	plafondEntree.position = new BABYLON.Vector3(15,4.6,30) ; 
	plafondEntree.rotation.x = 1/2*Math.PI;

	var solEntree = creerCloison("solEntree",{hauteur:4.5, largeur:10,materiau:materiauWood},scene) ;
	solEntree.position = new BABYLON.Vector3(15,0,30) ; 
	solEntree.rotation.x = 1/2*Math.PI;

	var plafondGAucheEntree = creerCloison("plafondGAucheEntree",{hauteur:Math.sqrt(28), largeur:4.5,materiau:materiauCloison},scene) ;
	plafondGAucheEntree.position = new BABYLON.Vector3(20,4.6,32.25) ; 
	plafondGAucheEntree.rotation = new BABYLON.Vector3(-0.15*Math.PI-Math.PI/4,1/2*Math.PI,0);

	var plafondDroiteEntree = creerCloison("plafondDroiteEntree",{hauteur:Math.sqrt(28), largeur:4.5,materiau:materiauCloison},scene) ;
	plafondDroiteEntree.position = new BABYLON.Vector3(10,4.6,32.25) ; 
	plafondDroiteEntree.rotation = new BABYLON.Vector3(0.15*Math.PI+Math.PI/4,1/2*Math.PI,0);

	const corners = [ new BABYLON.Vector2(4.9, 0),
		new BABYLON.Vector2(0, 1.5),
		new BABYLON.Vector2(-4.9, 0)
	];        

	const triangle = new BABYLON.PolygonMeshBuilder("triangleEntree",corners, scene);
	const triangleEntree = triangle.build(false, 0.1); //updatable or not, depth
	triangleEntree.rotation.x=-Math.PI/2;
	triangleEntree.material=new BABYLON.StandardMaterial("materiauCloison", scene) ;
	triangleEntree.position= new BABYLON.Vector3(15,4.6,34.2) ; 


	discGaucheSol = BABYLON.MeshBuilder.CreateDisc("discGaucheSol", {radius:1.02},scene);
	discGaucheSol.material=new BABYLON.StandardMaterial("materiauNoir", scene) ;
	discGaucheSol.position = new BABYLON.Vector3(18.7,0.08,33) ;
	discGaucheSol.rotation.x = 1/2*Math.PI;

	discGauchePlafond = BABYLON.MeshBuilder.CreateDisc("discGauchePlafond", {radius:1.02},scene);
	discGauchePlafond.material=new BABYLON.StandardMaterial("materiauWood", scene) ;
	discGauchePlafond.position = new BABYLON.Vector3(18.7,4.54,33) ;
	discGauchePlafond.rotation.x = -1/2*Math.PI;

	discDroiteSol = BABYLON.MeshBuilder.CreateDisc("discDroiteSol", {radius:1.02},scene);
	discDroiteSol.material=new BABYLON.StandardMaterial("materiauNoir", scene) ;
	discDroiteSol.position = new BABYLON.Vector3(11.2,0.08,33) ;
	discDroiteSol.rotation.x = 1/2*Math.PI;

	discDroitePlafond = BABYLON.MeshBuilder.CreateDisc("discDroitePlafond", {radius:1.02},scene);
	discDroitePlafond.material=new BABYLON.StandardMaterial("materiauWood", scene) ;
	discDroitePlafond.position = new BABYLON.Vector3(11.2,4.54,33) ;
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
	helix1.position = new BABYLON.Vector3(18.7,-.1,33);
	helix1.checkCollisions = true;
	//create ribbon
	ribbon1 = BABYLON.MeshBuilder.CreateRibbon("ribbon1", {pathArray: [pathHelix], offset: 10, closeArray: true});
	ribbon1.position = new BABYLON.Vector3(18.7,-.1,33);
	ribbon1.checkCollisions = true;

	//show pathHelix
	helix2 = BABYLON.MeshBuilder.CreateLines("helix2", {points: pathHelix});
	helix2.color = BABYLON.Color3.Black();
	helix2.position = new BABYLON.Vector3(11.2,-.1,33);
	helix2.checkCollisions = true;
	//create ribbon
	ribbon2 = BABYLON.MeshBuilder.CreateRibbon("ribbon2", {pathArray: [pathHelix], offset: 10, closeArray: true});
	ribbon2.position = new BABYLON.Vector3(11.2,-.1,33);
	ribbon2.checkCollisions = true;
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
	placeTableau("Cap Canaveral", "assets/NorthAmerica/Images/Cap Canaveral.jpg", cloisonRightSalle3, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI );
	placeTableau("Grand Canyon", "assets/NorthAmerica/Images/Grand Canyon.jpg", cloisonRightSalle3, new BABYLON.Vector3(0,1.5,0.2), Math.PI );
	placeTableau("National Park", "assets/NorthAmerica/Images/Nationnal Park.jpg", cloisonRightSalle3, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI );
	placeTableau("Niagara Falls", "assets/NorthAmerica/Images/Niagara Falls.jpg", cloisonUpRight, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI );
	placeTableau("Pentagone", "assets/NorthAmerica/Images/Pentagone.jpg", cloisonUpRight, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI );
	placeTableau("San Francisco Bridge", "assets/NorthAmerica/Images/San Francisco Bridge.jpg", cloisonNord1, new BABYLON.Vector3(3.6,1.5,-0.2), 0);
	placeTableau("Yellowstone", "assets/NorthAmerica/Images/Yellowstone.jpg", cloisonNord1, new BABYLON.Vector3(0,1.5,-0.2), 0 );
	placeTableau("Yosemite", "assets/NorthAmerica/Images/Yosemite.jpg", cloisonNord1, new BABYLON.Vector3(-3.6,1.5,-0.2), 0 );

	//South America salle milieu
	placeTableau("Amazone", "assets/SouthAmerica/Images/Amazone.jpg", cloisonNord1, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI );
	placeTableau("Chute d'Iguazu", "assets/SouthAmerica/Images/Chute d'Iguazu.jpg", cloisonNord1, new BABYLON.Vector3(0,1.5,0.2), Math.PI );
	placeTableau("Machu Picchu", "assets/SouthAmerica/Images/Machu Picchu.jpg", cloisonNord1, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI );
	placeTableau("Perito Moreno Glacier", "assets/SouthAmerica/Images/Perito Moreno Glacier.jpg", cloisonUpMid, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI );
	placeTableau("Rio", "assets/SouthAmerica/Images/Rio.jpg", cloisonUpMid, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI );
	placeTableau("Salar d'Uyuni", "assets/SouthAmerica/Images/Salar d'Uyuni.jpg", cloisonNord2, new BABYLON.Vector3(3.6,1.5,-0.2), 0);
	placeTableau("Arecibo", "assets/SouthAmerica/Images/Arecibo.jpg", cloisonNord2, new BABYLON.Vector3(0,1.5,-0.2), 0 );
	placeTableau("Mont Roraima", "assets/SouthAmerica/Images/Mont Roraima.jpg", cloisonNord2, new BABYLON.Vector3(-3.6,1.5,-0.2), 0 );

	//Asia salle gauche
	placeTableau("Bumbay", "assets/Asia/Images/Bumbay.jpg", cloisonNord2, new BABYLON.Vector3(3.6,1.5,0.2), Math.PI );
	placeTableau("Himalaya", "assets/Asia/Images/Himalaya.jpg", cloisonNord2, new BABYLON.Vector3(0,1.5,0.2), Math.PI );
	placeTableau("Hong Kong", "assets/Asia/Images/Hong Kong.jpg", cloisonNord2, new BABYLON.Vector3(-3.6,1.5,0.2), Math.PI );
	placeTableau("Port Shanghai", "assets/Asia/Images/Port Shanghai.jpg", cloisonUpLeft, new BABYLON.Vector3(1.6,1.5,0.2), Math.PI );
	placeTableau("Taj Mahal", "assets/Asia/Images/Taj Mahal.jpg", cloisonUpLeft, new BABYLON.Vector3(-1.6,1.5,0.2), Math.PI );
	placeTableau("Toundra", "assets/Asia/Images/Toundra.jpg", cloisonLeftSalle1, new BABYLON.Vector3(3.6,1.5,-0.2), 0);
	placeTableau("Yourte Mongolie", "assets/Asia/Images/Yourte Mongolie.jpg", cloisonLeftSalle1, new BABYLON.Vector3(0,1.5,-0.2), 0 );
	placeTableau("La Grande Muraille de Chine", "assets/Asia/Images/La Grande Muraille de Chine.jpg", cloisonLeftSalle1, new BABYLON.Vector3(-3.6,1.5,-0.2), 0 );

	//Africa hall
	placeTableau("Forêt Tropicale", "assets/Africa/Images/Forêt Tropicale.jpg", cloisonRightHall, new BABYLON.Vector3(5,1.5,0.2), Math.PI );
	placeTableau("Cap de Bonne Espérance", "assets/Africa/Images/Cap de Bonne Espérance.jpg", cloisonRightHall, new BABYLON.Vector3(2,1.5,0.2), Math.PI );
	placeTableau("Lake Victoria", "assets/Africa/Images/Lake Victoria.jpg", cloisonRightHall, new BABYLON.Vector3(-1,1.5,0.2), Math.PI );
	placeTableau("Madagascar", "assets/Africa/Images/Madagascar.jpg", cloisonRightHall, new BABYLON.Vector3(-4,1.5,0.2), Math.PI );
	placeTableau("Maroc teinture", "assets/Africa/Images/Maroc teinture.jpg", cloisonLeftHall, new BABYLON.Vector3(5,1.5,-0.2), 0 );
	placeTableau("Nigeria Mine", "assets/Africa/Images/Nigeria Mine.jpg", cloisonLeftHall, new BABYLON.Vector3(2,1.5,-0.2), 0);
	placeTableau("Nil", "assets/Africa/Images/Nil.jpg", cloisonLeftHall, new BABYLON.Vector3(-1,1.5,-0.2), 0 );
	placeTableau("Sahara", "assets/Africa/Images/Sahara.jpg", cloisonLeftHall, new BABYLON.Vector3(-4,1.5,-0.2), 0 );


	//Oceanie mezzanine
	placeTableau("Atolls de Scilly", "assets/Oceanie/Images/Atolls de Scilly.jpg", cloisonUpTop, new BABYLON.Vector3(4,1.5,0.2), Math.PI );
	placeTableau("Desert Australie", "assets/Oceanie/Images/Desert Australie.jpg", cloisonUpTop, new BABYLON.Vector3(10,1.5,0.2), Math.PI );
	placeTableau("Ile de tasmanie", "assets/Oceanie/Images/Ile de tasmanie.jpg", cloisonUpTop, new BABYLON.Vector3(-4,1.5,0.2), Math.PI );
	placeTableau("Moeraki Boulders", "assets/Oceanie/Images/Moeraki Boulders.jpg", cloisonUpTop, new BABYLON.Vector3(-10,1.5,0.2), Math.PI );
	placeTableau("Nouvelle zélande", "assets/Oceanie/Images/Nouvelle zélande.jpg", cloisonRightMezzanine, new BABYLON.Vector3(2.5,1.5,0.2), Math.PI );
	placeTableau("Sidney", "assets/Oceanie/Images/Sidney.jpg", cloisonRightMezzanine, new BABYLON.Vector3(-2.5,1.5,0.2), Math.PI);
	placeTableau("Polynésie française", "assets/Oceanie/Images/Polynésie française.jpg", cloisonLeftMezzanine, new BABYLON.Vector3(2.5,1.5,-0.2), 0 );
	placeTableau("Philipines", "assets/Oceanie/Images/Philipines.jpg", cloisonLeftMezzanine, new BABYLON.Vector3(-2.5,1.5,-0.2), 0 );

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
	header.width = "200px";
	header.height = "25px";
	header.color = "black";
	header.fontSize = 18 ;
	header.background = "white";
	// header.cornerRadius = 10;
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
	description.width = "350px";
	description.height = "120px";
	description.color = "white";
	description.fontSize = 15 ;
	description.background = "green";
	description.cornerRadius = 10;
	description.isVisible = false;
	advancedDynamicTexture.addControl(description);
	description.linkWithMesh(planedescription);

    //sound and lights
    // var sound = new BABYLON.Sound("gunshot", "assets/NorthAmerica/Sounds/creepySoundsTest.mp3", scene);
    // sound.play();

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
			}else{
				Headers[i].isVisible = false;
				Descriptions[i].isVisible = false;
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
