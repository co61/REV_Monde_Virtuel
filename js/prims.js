

function creerScene(){
	var scn = new BABYLON.Scene(engine) ; 
	return scn ;
}


function creerCamera(name,options,scn){
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	camera = new BABYLON.UniversalCamera(name,new BABYLON.Vector3(15,1.7,40),scn) ;
	camera.setTarget(new BABYLON.Vector3(15,0,15)) ; 

	camera.keysUp = [90,38];
	camera.keysDown = [40,83];
	camera.keysLeft = [81,37];
	camera.keysRight = [68,39];
	camera.attachControl(canvas) ;
	camera.inertia = 0.01;
	camera.angularSensibility  = 1000;

	camera.attachControl(canvas, false) ; 


	return camera
}



function creerSol(name,options,scn){
	let larg     = options.largeur || 300 ;   
	let prof     = options.profondeur || larg ;   
	let materiau = options.materiau || new BABYLON.StandardMaterial("blanc",scene) ;

	let sol = BABYLON.Mesh.CreateGround(name,larg,prof,2.0,scn) ;

	sol.material = materiau ;
	// sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/grass.png',scene);
	sol.material.diffuseTexture.uScale = 10.0;
	sol.material.diffuseTexture.vScale = 10.0;
	sol.material.specularTexture.uScale = 10.0;
	sol.material.specularTexture.vScale = 10.0;
	sol.material.emissiveTexture.uScale = 10.0;
	sol.material.emissiveTexture.vScale = 10.0;
	sol.material.ambientTexture.uScale = 10.0;
	sol.material.ambientTexture.vScale = 10.0;
	sol.receiveShadows = true;
	sol.metadata = {"type": 'ground'};

	sol.checkCollisions = true;

	return sol
}

function creerCiel(nom,scn){

	let scene = scn;

	var skybox = BABYLON.MeshBuilder.CreateBox(nom, { size: 1000.0 }, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox"+nom, scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
	//skybox.metadata = {"Type": 'sky'};
	return skybox;
}

function creerMateriauSimple(nom,options,scn){
	let couleur = options.couleur || null ; 
	let texture = options.texture || null ; 
	let uScale  = options.uScale  || 1.0 ; 
	let vScale  = options.vScale  || 1.0 ; 

	let materiau = new BABYLON.StandardMaterial(nom,scn) ; 
	if(couleur != null) materiau.diffuseColor = couleur ; 
	if(texture!= null){
		materiau.diffuseTexture = new BABYLON.Texture(texture,scn) ; 
		materiau.diffuseTexture.uScale = uScale ; 
		materiau.diffuseTexture.vScale = vScale ; 
	}
	return materiau ; 
}


function creerSphere(nom,opts,scn){

	let options  = opts || {} ; 
	let diametre = options.diametre || 1.0 ;

	let sph = BABYLON.Mesh.CreateSphere(nom,diametre,1,scn) ;
	sph.material              = options.materiau || new BABYLON.StandardMaterial("blanc",scene) ;
	//sph.material.diffuseColor  = new BABYLON.Color3(1.0,1.0,1.0) ;


	sph.metadata = {"type": 'sphere'}
	return sph;

}
function creerCylindre(nom,opts,scn){

	let options  = opts || {} ; 
	let height = options.height || 2.0 ;
	let diameter = options.diameter || 1.0;
	let diameterTop = options.diameterTop || diameter;
	let diameterBottom = options.diameterBottom || diameter;
	let materiau = options.materiau || new BABYLON.StandardMaterial("noir"+nom,scn);

	let cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:height,diameter:diameter,diameterTop:diameterTop,diameterBottom:diameterBottom},scn);
	cylinder.material              = materiau;
	//cylinder.material.diffuseColor  = new BABYLON.Color3(1.0,1.0,1.0) ;
	return cylinder;
}

function creerPoster(nom,opts,scn){

	let options = opts || {} ; 
	let hauteur = options["hauteur"] || 1.0 ; 
	let largeur = options["largeur"] || 1.0 ; 	
	let textureName = options["tableau"] || ""; 

	var group = new BABYLON.TransformNode(nom)
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, {width:largeur,height:hauteur}, scn);
	tableau1.parent = group ; 
	tableau1.position.y = hauteur/2.0 ; 

	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;



	return group ; 

}

function creerCloison(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 
	let materiau2   = options.materiau2 || options.materiau; 

    let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let cloison1 = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur/2},scn) ;
	cloison1.material = materiau ; 
	cloison1.parent = groupe ; 
	cloison1.position.z=-epaisseur/4;
	cloison1.position.y = hauteur / 2.0 ; 
	cloison1.checkCollisions = true;

	let cloison2 = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur/2},scn) ;
	cloison2.material = materiau2 ; 
	cloison2.parent = groupe ; 
	cloison2.position.z=epaisseur/4;
	cloison2.position.y = hauteur / 2.0 ; 
	cloison2.rotation.z=Math.PI;
	cloison2.checkCollisions = true;
	

    return groupe ;  
}

function creerPorte(nom,opts,scn){
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ;
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 
	let materiau2   = options.materiau2 || options.materiau; 
	let groupe = new BABYLON.TransformNode("groupe-"+nom) ;

	let porte = creerCloison(nom,{largeur:largeur,hauteur:hauteur,epaisseur:epaisseur, materiau:materiau,materiau2:materiau2},scn) ;
	porte.parent=groupe;
	porte.checkCollisions = true;
	return groupe;
}
function createCentraleDoor(scene){
	porteCentrale=creerPorte("porteCentrale",{hauteur:3.8, largeur:3,materiau2:materiauPorte,materiau:materiauPorteG},scene);
	porteCentrale.position=new BABYLON.Vector3(13.5,0,30);
	const porteCentralepivotAt = new BABYLON.Vector3(12, 0, 30);
	const porteCentralerelativePosition = porteCentralepivotAt.subtract(porteCentrale.position)
	porteCentrale.setPivotPoint(porteCentralerelativePosition);

	porteCentrale2=creerPorte("porteCentrale2",{hauteur:3.8, largeur:3,materiau2:materiauPorteG,materiau:materiauPorte},scene);
	porteCentrale2.position=new BABYLON.Vector3(16.5,0,30);
	const porteCentrale2pivotAt = new BABYLON.Vector3(18, 0, 30);
	const porteCentrale2relativePosition = porteCentrale2pivotAt.subtract(porteCentrale2.position)
	porteCentrale2.setPivotPoint(porteCentrale2relativePosition);

	contactBoxDoorCentrale1=BABYLON.Mesh.CreateBox("contactBoxDoorCentrale1", 1,scene);
	contactBoxDoorCentrale1.scaling = new BABYLON.Vector3(6,4,3);
	contactBoxDoorCentrale1.position=new BABYLON.Vector3(15,0,31.5);
	contactBoxDoorCentrale1.visibility = 0;
	contactBoxDoorCentrale1.setPickable=false;

	contactBoxDoorCentrale2=BABYLON.Mesh.CreateBox("contactBoxDoorCentrale2", 1,scene);
	contactBoxDoorCentrale2.scaling = new BABYLON.Vector3(6,4,2.5);
	contactBoxDoorCentrale2.position=new BABYLON.Vector3(15,0,28.75);
	contactBoxDoorCentrale2.visibility = 0;
	contactBoxDoorCentrale2.setPickable=false;
}
function createRoomDoors(scene){
	porteGauche=creerPorte("porteGauche",{hauteur:2.52, largeur:1.5,epaisseur:0.04,materiau2:materiauPorteG,materiau:materiauPorte},scene);
	porteDroite=creerPorte("porteDroite",{hauteur:2.52, largeur:1.5,materiau2:materiauPorte,materiau:materiauPorteG,epaisseur:0.04},scene);
	porteGauche.position=new BABYLON.Vector3(25.75,-0.2,15.085);
	porteGauche.rotation.x=0;
	porteDroite.position=new BABYLON.Vector3(24.25,-0.2,15.085);
	porteDroite.rotation.x=0;
	contactBoxPorte=BABYLON.Mesh.CreateBox("contactBoxPorte", 1,scene);
	contactBoxPorte.scaling = new BABYLON.Vector3(2,3,5);
	contactBoxPorte.position=new BABYLON.Vector3(25.75,-0.2,15.085);
	contactBoxPorte.visibility = 0;
	contactBoxPorte.setPickable=false;

	porteGauche2=creerPorte("porteGauche2",{hauteur:2.52, largeur:1.5,materiau2:materiauPorteG,materiau:materiauPorte,epaisseur:0.04},scene);
	porteDroite2=creerPorte("porteDroite2",{hauteur:2.52, largeur:1.5,materiau2:materiauPorte,materiau:materiauPorteG,epaisseur:0.04},scene);
	porteGauche2.position=new BABYLON.Vector3(15.75,-0.2,15.075);
	porteGauche2.rotation.x=0;
	porteDroite2.position=new BABYLON.Vector3(14.25,-0.2,15.075);
	porteDroite2.rotation.x=0;	
	contactBoxPorte2=BABYLON.Mesh.CreateBox("contactBoxPorte2", 1,scene);
	contactBoxPorte2.scaling = new BABYLON.Vector3(2,3,5);
	contactBoxPorte2.position=new BABYLON.Vector3(15.75,-0.2,15.075);
	contactBoxPorte2.visibility = 0;
	contactBoxPorte2.setPickable=false;

	porteGauche3=creerPorte("porteGauche3",{hauteur:2.52, largeur:1.5,materiau2:materiauPorteG,materiau:materiauPorte,epaisseur:0.04},scene);
	porteDroite3=creerPorte("porteDroite3",{hauteur:2.52, largeur:1.5,materiau2:materiauPorte,materiau:materiauPorteG,epaisseur:0.04},scene);
	porteGauche3.position=new BABYLON.Vector3(5.75,-0.2,15.075);
	porteGauche3.rotation.x=0;
	porteDroite3.position=new BABYLON.Vector3(4.25,-0.2,15.075);
	porteDroite3.rotation.x=0;
	contactBoxPorte3=BABYLON.Mesh.CreateBox("contactBoxPorte3", 1,scene);
	contactBoxPorte3.scaling = new BABYLON.Vector3(2,3,5);
	contactBoxPorte3.position=new BABYLON.Vector3(5.75,-0.2,15.075);
	contactBoxPorte3.visibility = 0;
	contactBoxPorte3.setPickable=false;
}

function creerEscalier(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ; 
	let longueur   = options.longueur || 10.0 ; 
	let nbMarche  = options.nbmarches || 20.0 ;	
	let epaisseur = options.epaisseur || 0.1 ;


	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 
	let materiau2   = options.materiau2 || options.materiau; 

    	let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	for (let i = 0 ; i< nbMarche; i++){
		let marche = creerCloison("marche"+i,{largeur:largeur,hauteur:longueur/nbMarche,depth:epaisseur, materiau:materiau,materiau2:materiau2},scn) ;
		marche.position = new BABYLON.Vector3(0,hauteur/nbMarche*i,longueur/nbMarche*i) ; 
		marche.rotation.x = 1/2*Math.PI;
		marche.parent = groupe ;

		let poteaud= creerCylindre("poteaud"+i,{height:1, diameter: 0.09,materiau:materiauNoir});
		poteaud.position = new BABYLON.Vector3(largeur/2-0.08,hauteur/nbMarche*i+1/2,longueur/nbMarche*i+hauteur/nbMarche) ; 
		poteaud.parent=groupe;

		let poteaug= creerCylindre("poteaug"+i,{height:1, diameter: 0.09,materiau:materiauNoir});
		poteaug.position = new BABYLON.Vector3(-largeur/2+0.08,hauteur/nbMarche*i+1/2,longueur/nbMarche*i+hauteur/nbMarche) ; 
		poteaug.parent=groupe;
	}
	// let barreg =creerCylindre("barreg",{height:longueur, diameter: 0.12,materiau:materiauWood});
	// barreg.position = new BABYLON.Vector3(-largeur/2-0.08,hauteur/2,1/2) ; 
	// barreg.rotation.x=Math.atan(hauteur/longueur);
	// barreg.parent=groupe;
    return groupe ;  
}


function createDoorWall(nom, opts, scn)//, {hauteur:5.0, largeur:10.0, hauteurPorte:2.5, largeurPorte:3.0, materiau:materiauCloison }, scene) )
{
	let options   = opts || {} ; 

	let hauteur   = options.hauteur || 5.0; 
	let largeur   = options.largeur || 10.0 ; 
	let hauteurPorte = options.hauteurPorte || 2.5;
	let largeurPorte = options.largeurPorte || 3.0;
	let epaisseur = options.epaisseur || 0.1;

	let materiau = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn);
	let materiau2= options.materiau2 || options.materiau; 
	let groupe = new BABYLON.TransformNode("groupe-"+nom) ;

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
	const polygon = doorWall.build(false, epaisseur/2); //updatable or not, depth
	polygon.material= materiau ;
	polygon.position.z=-epaisseur/4;
	polygon.parent=groupe;
	polygon.checkCollisions = true;

	const polygon2 = doorWall.build(false, epaisseur/2); //updatable or not, depth
	polygon2.material= materiau2 ;
	polygon2.position.z=epaisseur/4;
	polygon2.rotation.z=Math.PI;
	polygon2.parent=groupe;
	polygon2.checkCollisions = true;

	polygon.checkCollisions = true;
	return groupe ;  

};


function creerPendule(nom,scn){

	sphere1 =  BABYLON.MeshBuilder.CreateSphere("sphere1"+nom,{diameter:1.0},scn);
	sphere2 =  BABYLON.MeshBuilder.CreateSphere("sphere2"+nom,{diameter:1.0},scn);
	sphere3 =  BABYLON.MeshBuilder.CreateSphere("sphere3"+nom,{diameter:1.0},scn);
	sphere4 =  BABYLON.MeshBuilder.CreateSphere("sphere4"+nom,{diameter:1.0},scn);
	sphere1.material = materiauNoir;
	sphere2.material = materiauNoir;
	sphere3.material = materiauNoir;
	sphere4.material = materiauNoir;
	fil1 = creerCylindre("fil1"+nom,{height: 3, diameter: 0.15,materiau:materiauNoir});
	fil2 = creerCylindre("fil2"+nom,{height: 3, diameter: 0.15,materiau:materiauNoir});
	fil3 = creerCylindre("fil3"+nom,{height: 3, diameter: 0.15,materiau:materiauNoir});
	fil4 = creerCylindre("fil4"+nom,{height: 3, diameter: 0.15,materiau:materiauNoir});
	sphere1.parent=fil1;
	sphere2.parent=fil2;
	sphere3.parent=fil3;
	sphere4.parent=fil4;
	sphere1.position.y=-1.5;
	sphere2.position.y=-1.5;
	sphere3.position.y=-1.5;
	sphere4.position.y=-1.5;

	socle=creerCylindre("socle"+nom,{height:5, diameter: 0.6, materiau:materiauWood});
	socle.position=new BABYLON.Vector3(15,10.13,22);
	socle.rotation.z=1.57;


	fil1.position=new BABYLON.Vector3(13.5,8.5,22);
	const fil1pivotAt = new BABYLON.Vector3(13.5,9.9,22);
	const fil1relativePosition = fil1pivotAt.subtract(fil1.position)
	fil1.setPivotPoint(fil1relativePosition);
	fil2.position=new BABYLON.Vector3(14.5,8.5,22);
	fil3.position=new BABYLON.Vector3(15.5,8.5,22);
	fil4.position=new BABYLON.Vector3(16.5,8.5,22);
	const fil4pivotAt = new BABYLON.Vector3(16.5,9.9,22);
	const fil4relativePosition = fil4pivotAt.subtract(fil4.position)
	fil4.setPivotPoint(fil4relativePosition);
	fil1.rotation.z=-1;

}

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
