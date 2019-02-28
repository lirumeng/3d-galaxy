var camera, scene, renderer, root, root1, root2;
var controls;
var objects = [],
	objects1 = [],
	objects2 = [];
var targets = {
	sphere: [],
	sphere1: [],
	sphere2: [],
};
var radiusArray = [1000, 1500, 0]

var clock = new THREE.Clock();

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 1000, 5000);
	
	scene = new THREE.Scene();

	root = new THREE.Object3D();
	scene.add(root);

	root1 = new THREE.Object3D();
	scene.add(root1);

	root2 = new THREE.Object3D();
	scene.add(root2);

	// 轨道
	for (var i = 0; i < radiusArray.length; i++) {
		addTrack(radiusArray[i]);
	}

	// layer1-sphere
	for (var i = 0; i < table.layer1.length; i += 5) {
		var element = document.createElement('div');
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
		var number = document.createElement('div');
		number.className = 'number';
		number.textContent = (i / 5) + 1;
		element.appendChild(number);
		var symbol = document.createElement('div');
		symbol.className = 'symbol';
		symbol.textContent = table.layer1[i];
		element.appendChild(symbol);
		var details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = table.layer1[i + 1] + '<br>' + table.layer1[i + 2];
		element.appendChild(details);
		var object = new THREE.CSS3DObject(element);
		root.add(object)
		objects.push(object);
	}
	var vector = new THREE.Vector3();
	for (var i = 0, l = objects.length; i < l; i++) {
		var phi = Math.acos(-1 + (2 * i) / l);
		var theta = Math.sqrt(l * Math.PI) * phi;
		var object = new THREE.Object3D();
		object.position.setFromSphericalCoords(300, phi, theta);
		vector.copy(object.position).multiplyScalar(2);
		object.lookAt(vector);
		targets.sphere.push(object);
	}


	// layer2-sphere
	for (var i = 0; i < table.layer2.length; i += 5) {
		var element = document.createElement('div');
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
		var number = document.createElement('div');
		number.className = 'number';
		number.textContent = (i / 5) + 1;
		element.appendChild(number);
		var symbol = document.createElement('div');
		symbol.className = 'symbol';
		symbol.textContent = table.layer2[i];
		element.appendChild(symbol);
		var details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = table.layer2[i + 1] + '<br>' + table.layer2[i + 2];
		element.appendChild(details);
		var object1 = new THREE.CSS3DObject(element);
		root1.add(object1)
		objects1.push(object1);
	}
	var vector1 = new THREE.Vector3();
	for (var i = 0, l = objects1.length; i < l; i++) {
		var phi = Math.acos(-1 + (2 * i) / l);
		var theta = Math.sqrt(l * Math.PI) * phi;
		var object1 = new THREE.Object3D();
		object1.position.setFromSphericalCoords(400, phi, theta);
		vector1.copy(object1.position).multiplyScalar(2);
		object1.lookAt(vector1);
		targets.sphere1.push(object1);
	}

	// center-sphere
	for (var i = 0; i < table.center.length; i += 5) {
		var element = document.createElement('div');
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
		var number = document.createElement('div');
		number.className = 'number';
		number.textContent = (i / 5) + 1;
		element.appendChild(number);
		var symbol = document.createElement('div');
		symbol.className = 'symbol';
		symbol.textContent = table.center[i];
		element.appendChild(symbol);
		var details = document.createElement('div');
		details.className = 'details';
		details.innerHTML = table.center[i + 1] + '<br>' + table.center[i + 2];
		element.appendChild(details);
		var object2 = new THREE.CSS3DObject(element);
		root2.add(object2)
		objects2.push(object2);
	}
	var vector2 = new THREE.Vector3();
	for (var i = 0, l = objects2.length; i < l; i++) {
		var phi = Math.acos(-1 + (2 * i) / l);
		var theta = Math.sqrt(l * Math.PI) * phi;
		var object2 = new THREE.Object3D();
		object2.position.setFromSphericalCoords(600, phi, theta);
		vector2.copy(object2.position).multiplyScalar(2);
		object2.lookAt(vector2);
		targets.sphere2.push(object2);
	}

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

	controls = new THREE.TrackballControls(camera, renderer.domElement);
	controls.rotateSpeed = 0.5;
	controls.minDistance = 500;
	controls.maxDistance = 6000;
	// camera.rotation.set(-0.5328000913057879, 0.9331833414232114, 0.1904453317172604)
	controls.addEventListener('change', render);
	transform(targets.sphere, 2000, objects);
	transform(targets.sphere1, 2000, objects1);
	transform(targets.sphere2, 2000, objects2);

	window.addEventListener('resize', onWindowResize, false);
}

function addTrack(radius) {
	var material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		wireframe: true,
		wireframeLinewidth: 1,
		side: THREE.DoubleSide
	});
	for (var i = 0; i < 1; i++) {
		var element = document.createElement('div');
		element.style.width = radius * 2 + 'px';
		element.style.height = radius * 2 + 'px';
		element.style.borderRadius = '100%'
		element.style.boxShadow = '0 0 100px 20px rgba(0,255,255,.6) inset,0 0 50px 20px rgba(0,255,255,.6)'
		var object = new THREE.CSS3DObject(element);
		object.rotation.x = Math.PI / 2;
		scene.add(object);
		var geometry = new THREE.PlaneBufferGeometry();
		var mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
	}
}

function transform(targets, duration, objectss) {
	TWEEN.removeAll();
	for (var i = 0; i < objectss.length; i++) {
		var object = objectss[i];
		var target = targets[i];

		object.position.x = target.position.x
		object.position.y = target.position.y
		object.position.z = target.position.z

		object.rotation.x = target.rotation.x
		object.rotation.y = target.rotation.y
		object.rotation.z = target.rotation.z

		// new TWEEN.Tween(object.position)
		// 	.to({
		// 		x: target.position.x,
		// 		y: target.position.y,
		// 		z: target.position.z
		// 	}, Math.random() * duration + duration)
		// 	.easing(TWEEN.Easing.Exponential.InOut)
		// 	.start();
		// new TWEEN.Tween(object.rotation)
		// 	.to({
		// 		x: target.rotation.x,
		// 		y: target.rotation.y,
		// 		z: target.rotation.z
		// 	}, Math.random() * duration + duration)
		// 	.easing(TWEEN.Easing.Exponential.InOut)
		// 	.start();
	}
	new TWEEN.Tween(this)
		// .to({}, duration * 2)
		.to({})
		.onUpdate(render)
		.start();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	controls.update();

	var time = Date.now() * 0.0004;
	var elapsed = clock.getElapsedTime();
	// root.rotation.x = time;
	// root.rotation.z = time;
	root.rotation.y = time;
	root.position.set(Math.sin(elapsed) * radiusArray[0], 0, Math.cos(elapsed) * radiusArray[0]);


	// root1.rotation.y = time;
	root1.position.set(-Math.sin(elapsed) * radiusArray[1], 0, -Math.cos(elapsed) * radiusArray[1]);

	root2.rotation.y = time;
}

function render() {
	renderer.render(scene, camera);
}