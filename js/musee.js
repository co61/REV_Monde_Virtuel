//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array
var canvas, engine ;
var scene, camera ;
let cloisons;
var cloison;

function init(){
	canvas = document.getElementById("renderCanvas") ; 
	engine = new BABYLON.Engine(canvas,true) ; 
	scene  = creerScene() ; 

	camera = creerCamera("camera",{}, scene) ; 
	camera.applyGravity = true;

	
	createLights() ;
	peuplerScene() ;  

	set_FPS_mode(scene, canvas,camera) ; 

	window.addEventListener("resize", function(){engine.resize();}) ; 

	engine.runRenderLoop( function(){scene.render();} ) ; 
}


function createLights(){
	var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(5,5,5), scene) ; 
}

function murs(){
	
}

function peuplerScene(){

	// Création du sol
	var sol = creerSol("sol",{},scene) ; 

	// Création d'une cloison

	var materiauRouge = creerMateriauSimple("rouge",{couleur:new BABYLON.Color3(0.8,0.1,0.1)},scene) ;

	var materiauCloison = creerMateriauSimple("mat-cloison",{texture:"assets/textures/murs.jpg"}, scene) ; 

	var cloisonUp = creerCloison("cloisonUp",{hauteur:10.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonUp.position = new BABYLON.Vector3(15,0,0) ; 
	cloisonUp.rotation.y = 0*Math.PI ;
	var cloisonRight = creerCloison("cloisonRight",{hauteur:10.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonRight.position = new BABYLON.Vector3(0,0,15) ; 
	cloisonRight.rotation.y = Math.PI/2;
	// var cloisonDown = creerCloison("cloisonDown",{hauteur:10.0, largeur:30.0,materiau:materiauCloison},scene) ;
	// cloisonDown.position = new BABYLON.Vector3(15,0,30) ; 
	// cloisonDown.rotation.y = 0*Math.PI ;
	var cloisonLeft = creerCloison("cloisonLeft",{hauteur:10.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonLeft.position = new BABYLON.Vector3(30,0,15) ; 
	cloisonLeft.rotation.y = Math.PI/2;

	// var cloisonMidHaut = creerCloison("cloisonMidHaut",{hauteur:7.5, largeur:30.0,materiau:materiauCloison},scene) ;
	// cloisonMidHaut.position = new BABYLON.Vector3(15,2.5,15) ; 
	// cloisonMidHaut.rotation.y = 0*Math.PI;
	// var cloisonMidRight = creerCloison("cloisonMidRight",{hauteur:2.5, largeur:3.0,materiau:materiauCloison},scene) ;
	// cloisonMidRight.position = new BABYLON.Vector3(28.5,0,15) ; 
	// cloisonMidRight.rotation.y = 0*Math.PI;
	// var cloisonMid1 = creerCloison("cloisonMid1",{hauteur:2.5, largeur:6.0,materiau:materiauCloison},scene) ;
	// cloisonMid1.position = new BABYLON.Vector3(20,0,15) ; 
	// cloisonMid1.rotation.y = 0*Math.PI;
	// var cloisonMid2 = creerCloison("cloisonMid2",{hauteur:2.5, largeur:6.0,materiau:materiauCloison},scene) ;
	// cloisonMid2.position = new BABYLON.Vector3(10,0,15) ; 
	// cloisonMid2.rotation.y = 0*Math.PI;
	// var cloisonMidLeft = creerCloison("cloisonMidLeft",{hauteur:2.5, largeur:3.0,materiau:materiauCloison},scene) ;
	// cloisonMidLeft.position = new BABYLON.Vector3(1.5,0,15) ; 
	// cloisonMidLeft.rotation.y = 0*Math.PI;



	var cloisonNord1 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord1.position = new BABYLON.Vector3(10,0,7.5) ; 
	cloisonNord1.rotation.y = 1/2*Math.PI;
	var cloisonNord2 = creerCloison("cloisonNord1",{hauteur:5.0, largeur:15.0,materiau:materiauCloison},scene) ;
	cloisonNord2.position = new BABYLON.Vector3(20,0,7.5) ; 
	cloisonNord2.rotation.y = 1/2*Math.PI;

	var cloisonFloor = creerCloison("cloisonFloor",{hauteur:15.0, largeur:30.0,materiau:materiauCloison},scene) ;
	cloisonFloor.position = new BABYLON.Vector3(15,5,0) ; 
	cloisonFloor.rotation.x = 1/2*Math.PI;

	//CRéation d'un mur avec une porte
	var cloisonDown = createDoorWall("cloisonDown",{hauteur:10.2, largeur:30.0,hauteurPorte:4, largeurPorte:6,materiau:materiauCloison},scene) ;
	cloisonDown.position = new BABYLON.Vector3(15,-0.2,30) ; 
	cloisonDown.rotation.x=-Math.PI/2;

	var doorwallLeft = createDoorWall("doorwallLeft", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallLeft.position=new BABYLON.Vector3(25,-0.2,15);
	doorwallLeft.rotation.x=-90;
    var doorwallMid = createDoorWall("doorwallMid", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallMid.position=new BABYLON.Vector3(15,-0.2,15);
	doorwallMid.rotation.x=-90;
    const doorwallRight = createDoorWall("doorwallRight", {hauteur:5.7, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene);
    doorwallRight.position=new BABYLON.Vector3(5,-0.2,15);
	doorwallRight.rotation.x=-90;




	/*for(var i=0; i< 10; i++){
		var cl= creerCloison("cloison-"+i, {materiau:materiauCloison}, scene) ; 
		cl.position = new BABYLON.Vector3(0,0,-5*i) ; 
	}*/ 

	// Création d un tableau
	var tableau = creerPoster("tableau1",{tableau:"assets/tableaux/Berthe.jpg"},scene) ;
	tableau.parent = cloisonUp ; // on accroche le tableau à la cloison 
	tableau.position.z = -0.1  ;  
	tableau.position.y = 1.7 ; 
	


	// Création d une sphere
	var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:1.0}, scene) ; 
	var cloison = creerCloison("cloison",{hauteur:1.0,largeur:1.0,materiau:materiauRouge},scene) ; 
	sphere.material = new BABYLON.StandardMaterial("materiau1", scene) ; 
	

}

var isLocked = false ; 

function set_FPS_mode(scene, canvas, camera){

	// On click event, request pointer lock
	scene.onPointerDown = function (evt) {

		//true/false check if we're locked, faster than checking pointerlock on each single click.
		if (!isLocked) {
			canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock || false;
			if (canvas.requestPointerLock) {
				canvas.requestPointerLock();
			}
		}

		//continue with shooting requests or whatever :P
		//evt === 0 (left mouse click)
		//evt === 1 (mouse wheel click (not scrolling))
		//evt === 2 (right mouse click)
	};

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
