import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ShaderMaterial, Shading } from 'three';

let cubebb : THREE.Box3;
let spherebb : THREE.Sphere;
let sphere1bb : THREE.Sphere;

let sphere1_speed = 0.01;
let sphere_x = 0.1;
let sphere_y = 0.1;
let sphere_z = 0.1;

let cube_x = 0.15;
let cube_y = 0.11;
let cube_z = 0.15;

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;
let sphere: THREE.Mesh;
let sphere1: THREE.Mesh;


let cube: THREE.Mesh;
let scube: THREE.Mesh;
let plane: THREE.Mesh;
let plane1: THREE.Mesh;
let plane2: THREE.Mesh;


let group: THREE.Group;
let standModel: THREE.Object3D;
let exampleTexture: THREE.Texture;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    initStats();
    initListeners();
}

function initStats() {
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    lightAmbient = new THREE.AmbientLight(0x333333);
    scene.add(lightAmbient);

	// lightAmbient = new THREE.AmbientLight(0xffffff);
	// scene.add(lightAmbient);

    // Add a point light to add shadows
    // https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
    const shadowIntensity = 0.25;

    lightPoint = new THREE.PointLight(0xffffff);
    lightPoint.position.set(-0.5, 0.5, 4);
    lightPoint.castShadow = true;
    lightPoint.intensity = shadowIntensity;
    scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff)
	lightPoint.position.set(-0.5, 0.5, 4)
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint)

    const lightPoint2 = lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = false;
    scene.add(lightPoint2);

    const mapSize = 1024; // Default 512
    const cameraNear = 0.5; // Default 0.5
    const cameraFar = 500; // Default 500
    lightPoint.shadow.mapSize.width = mapSize;
    lightPoint.shadow.mapSize.height = mapSize;
    lightPoint.shadow.camera.near = cameraNear;
    lightPoint.shadow.camera.far = cameraFar;

    // added sphere

    const geometrySphere = new THREE.SphereGeometry(1);
    const materialSphere = new THREE.MeshPhongMaterial({ color: 0x111111 });
    sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.castShadow=true;
    sphere.position.set(-2,-0.35,2)
    sphere.scale.set(.2,.2,.2)
    scene.add(sphere);
	//add bounding sphere 
	spherebb = new THREE.Sphere(sphere.position, .2)

    // added sphere
	const geometrySphere1 = new THREE.SphereGeometry(1);
	const materialSphere1 = new THREE.MeshPhongMaterial({ color: 0x710B0B });
	sphere1 = new THREE.Mesh(geometrySphere1, materialSphere1);
	sphere1.castShadow=true;
	sphere1.position.set(0,0,-2)
	//sphere1.scale.set(1,1,1)
	scene.add(sphere1);
	//add bounding sphere 
	sphere1bb = new THREE.Sphere(sphere1.position, 1)

    // // Add a cube
    const geometryBox = new THREE.BoxGeometry();
    const materialBox = new THREE.MeshPhongMaterial({ color: 0x456789 });
    cube = new THREE.Mesh(geometryBox, materialBox);
    cube.castShadow = true;
    cube.position.set(-2,-2,-2);
    cube.scale.set(.5,.5,.5)
    cube.rotateY(200)
    scene.add(cube);
	//add cube bounding box 
	cubebb = new THREE.Box3( new THREE.Vector3(), new THREE.Vector3());	
	cubebb.setFromObject(cube)
    // // load a texture and add created model


    // // Add a plane
    const geometryPlane = new THREE.PlaneBufferGeometry(30, 30,30, 30);
    const materialPlane = new THREE.MeshPhongMaterial({ 
		color: 0x110011, 
		side: THREE.DoubleSide,
		flatShading: true		
	});

    const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
        // u_mouse: { type: 'v2', value: new THREE.Vector2() },
    };

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	})

    plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.position.z = -4;
    plane.receiveShadow = true;
	plane1 = new THREE.Mesh(geometryPlane, materialPlane);
	plane1.position.x = 5
    plane1.rotation.y = Math.PI / 2;
    plane1.receiveShadow = true;
	plane2 = new THREE.Mesh(geometryPlane, materialPlane);
	plane2.position.x = -5
    plane2.rotation.y = Math.PI / 2;
    plane2.receiveShadow = true;

    scene.add(plane);
    scene.add(plane1);
	scene.add(plane2);

    // // Init animation
    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('keyup', (event) => {
        const { key } = event;

        switch (key) {		//sphere can be speed up or slowed down
            case '-':	
				if (sphere_x  > 0 ){
					sphere_x -= 0.1;	
				} 
				if (sphere_x < 0 ){
					sphere_x += 0.1;	
				}
				if (sphere_y  > 0 ){
					sphere_y -= 0.1;	
				} 
				if (sphere_y < 0 ){
					sphere_y += 0.1;	
				}
				if (sphere_z  > 0 ){
					sphere_z -= 0.1;	
				} 
				if (sphere_z < 0 ){
					sphere_z += 0.1;	
				}
				console.log(sphere_x)
                break;
			case '=':
				if (sphere_x < 0 ){
					sphere_x -= 0.1;	
				} 
				if (sphere_x > 0 ){
					sphere_x += 0.1;	
				}
				if (sphere_y < 0 ){
					sphere_y -= 0.1;	
				} 
				if (sphere_y > 0 ){
					sphere_y += 0.1;	
				}
				if (sphere_z < 0 ){
					sphere_z -= 0.1;	
				}
				if (sphere_z > 0 ){
					sphere_z += 0.1;	
				}
				break;

            default:
                break;
        }
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	//let radomize = Math.random()
    requestAnimationFrame(() => {
        animate();
    });
	cube.position.x -= cube_x;
	cubebb.max.x -= cube_x
	cubebb.min.x -= cube_x;

	cube.position.y -= cube_y;
	cubebb.max.y -= cube_y
	cubebb.min.y -= cube_y;

	cube.position.z -= cube_z;
	cubebb.max.z -= cube_z;
	cubebb.min.z -= cube_z;

	sphere.position.x += sphere_x;
	sphere.position.y += sphere_y;
	sphere.position.z += sphere_z;

	sphere1.position.x += sphere1_speed


	checkCollisions()
    let delta = clock.getDelta();
	renderer.render(scene, camera);
}

function checkCollisions(){	
	//intersection checks cube
	if (cubebb.intersectsSphere(spherebb)){		//is if-immediate the best way for this ?
		sphere_x = -sphere_x		
		sphere_y = -sphere_y	
		sphere_z = -sphere_z

		cube_x = -cube_x
		cube_y = -cube_y
		cube_z = -cube_z
	}

	if (cubebb.intersectsSphere(sphere1bb)){		//is if-immediate the best way for this ?

		cube_x = -cube_x
		cube_y = -cube_y
		cube_z = -cube_z
	}

	if (spherebb.intersectsSphere(sphere1bb)){		//is if-immediate the best way for this ?
		sphere_x = -sphere_x		
		sphere_y = -sphere_y	
		sphere_z = -sphere_z
	}

	//cube wall checks 
	if (cube.position.x > 2  ){
		cube_x = -cube_x
	} 	
	if (cube.position.x < -2  ){
		cube_x = -cube_x
	} 
	if (cube.position.y > 2) {
		cube_y = -cube_y
	}
	if (cube.position.y < -2) {
		cube_y = -cube_y
	}
	if (cube.position.z > 2) {
		cube_z = -cube_z
	}
	if (cube.position.z < -2) {
		cube_z = -cube_z
	}

	//sphere wall checks 
	if (sphere.position.x > 2  ){
		sphere_x = -sphere_x
	} 	
	if (sphere.position.x < -2  ){
		sphere_x = -sphere_x
	} 
	if (sphere.position.y > 2) {
		sphere_y = -sphere_y
	}
	if (sphere.position.y < -2) {
		sphere_y = -sphere_y
	}
	if (sphere.position.z > 2) {
		sphere_z = -sphere_z
	}
	if (sphere.position.z < -2) {
		sphere_z = -sphere_z
	}


	//big sphere position checks 
		if (sphere1.position.x > 2  ){
		sphere1_speed = -sphere1_speed
	} 	
	if (sphere1.position.x < -2  ){
		sphere1_speed = -sphere1_speed
	} 
	
}
main()



//add more objects 
//add color swapper use array to iterate through colors ?