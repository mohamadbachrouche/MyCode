import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { EnhancedGraphics } from './graphics.js';
import { EnhancedTerrain } from './terrain.js';
import { WildlifeSystem } from './wildlife.js';

class MedievalFlightSimulator {
  constructor() {
    // Game state
    this.score = 0;
    this.isGameOver = false;
    this.worldSize = 2000;
    this.maxAltitude = 1000; // Increased altitude limit
    
    // Physics variables
    this.moveSpeed = 0.5;
    this.boostMultiplier = 2.0;
    this.rotationSpeed = 0.03;
    this.gravity = 0.01;
    this.keys = {};
    this.velocity = new THREE.Vector3();
    
    // Initialize loading manager first
    this.initLoadingManager();
    
    // Initialize systems
    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initUI();
    this.initEventListeners();
    
    // Force hide loading screen after 10 seconds in case loading gets stuck
    setTimeout(() => {
      const loadingElement = document.getElementById('loading');
      if (loadingElement && loadingElement.style.display !== 'none') {
        console.warn('Loading screen forced to hide after timeout');
        loadingElement.style.display = 'none';
      }
    }, 10000);
    
    // Start loading assets and initializing game
    this.init();
  }
  
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    document.body.appendChild(this.renderer.domElement);
  }
  
  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xCCCCCC, 0.0003);
  }
  
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    this.camera.position.set(0, 5, -10);
  }
  
  initUI() {
    // Update UI elements
    this.scoreElement = document.getElementById('scoreValue');
    this.altitudeElement = document.getElementById('altitudeValue');
    this.speedElement = document.getElementById('speedValue');
    this.loadingElement = document.getElementById('loading');
  }
  
  initEventListeners() {
    window.addEventListener('keydown', (e) => this.keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key.toLowerCase()] = false);
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }
  
  initLoadingManager() {
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onProgress = (url, loaded, total) => {
      const progress = (loaded / total * 100).toFixed(0);
      const progressElement = document.getElementById('loading-progress');
      if (progressElement) {
        progressElement.style.width = `${progress}%`;
      }
      const loadingText = document.querySelector('#loading div');
      if (loadingText) {
        loadingText.textContent = `Loading Medieval Flight Simulator... ${progress}%`;
      }
    };
    this.loadingManager.onLoad = () => {
      setTimeout(() => {
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
      }, 1000); // Slight delay to ensure everything is ready
    };
    this.loadingManager.onError = (url) => {
      console.error('Error loading resource:', url);
      alert('Failed to load some game resources. The game may not work correctly.');
    };
  }
  
  async init() {
    try {
      // Initialize systems with loading manager
      this.graphicsEngine = new EnhancedGraphics(this.scene, this.loadingManager);
      this.terrainSystem = new EnhancedTerrain(this.scene, this.loadingManager);
      
      // Load textures and models
      await Promise.all([
        this.graphicsEngine.loadRealisticModels(),
        this.terrainSystem.loadTextures()
      ]);
      
      // Create sky and lighting
      await this.initSkyAndLighting();
      
      // Create terrain and environment
      this.terrain = this.terrainSystem.createDetailedTerrain();
      this.rivers = this.terrainSystem.createRivers();
      this.vegetation = this.terrainSystem.placeVegetation(this.graphicsEngine);
      
      // Create water
      this.water = this.graphicsEngine.createRealisticWater(this.worldSize, this.worldSize);
      this.water.position.y = -5;
      this.scene.add(this.water);
      
      // Create clouds
      this.clouds = this.graphicsEngine.createCloudSystem();
      
      // Create airplane
      await this.createAirplane();
      
      // Initialize wildlife system
      this.wildlifeSystem = new WildlifeSystem(this.scene, this.terrainSystem);
      this.animals = this.wildlifeSystem.addAnimals(this.graphicsEngine, 80);
      this.birds = this.wildlifeSystem.addBirds(this.graphicsEngine, 50);
      this.villagers = this.wildlifeSystem.addVillagers(this.graphicsEngine, 30);
      
      // Start animation loop
      this.animate();
    } catch (error) {
      console.error("Error initializing game:", error);
      alert("Failed to initialize the game. Please check the console for details.");
      
      // Hide loading screen even if there's an error
      const loadingElement = document.getElementById('loading');
      if (loadingElement) {
        loadingElement.innerHTML = `<div>Error loading game: ${error.message}</div>
                                   <div>Please check the console for details.</div>`;
      }
    }
  }
  
  async initSkyAndLighting() {
    // Create dynamic sky
    this.sky = new THREE.Sky();
    this.sky.scale.setScalar(this.worldSize);
    this.scene.add(this.sky);
    
    // Configure sun position and sky parameters
    this.sun = new THREE.Vector3();
    this.effectController = {
      turbidity: 8,
      rayleigh: 1.5,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 45,
      azimuth: 180,
      timeOfDay: 0.5 // 0-1 for day cycle
    };
    
    this.updateSky();
    
    // Enhanced lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);
    
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.directionalLight.position.copy(this.sun).multiplyScalar(100);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 4096;
    this.directionalLight.shadow.mapSize.height = 4096;
    this.directionalLight.shadow.camera.near = 0.5;
    this.directionalLight.shadow.camera.far = 1000;
    this.directionalLight.shadow.camera.left = -500;
    this.directionalLight.shadow.camera.right = 500;
    this.directionalLight.shadow.camera.top = 500;
    this.directionalLight.shadow.camera.bottom = -500;
    this.scene.add(this.directionalLight);
    
    // Add hemisphere light for better ambient illumination
    this.hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x3D3D3D, 0.6);
    this.scene.add(this.hemisphereLight);
  }
  
  updateSky() {
    const uniforms = this.sky.material.uniforms;
    uniforms['turbidity'].value = this.effectController.turbidity;
    uniforms['rayleigh'].value = this.effectController.rayleigh;
    uniforms['mieCoefficient'].value = this.effectController.mieCoefficient;
    uniforms['mieDirectionalG'].value = this.effectController.mieDirectionalG;
    
    // Calculate sun position based on time of day
    const phi = THREE.MathUtils.degToRad(90 - this.effectController.elevation);
    const theta = THREE.MathUtils.degToRad(this.effectController.azimuth);
    this.sun.setFromSphericalCoords(1, phi, theta);
    uniforms['sunPosition'].value.copy(this.sun);
    
    // Update directional light if it exists
    if (this.directionalLight) {
      this.directionalLight.position.copy(this.sun).multiplyScalar(100);
    }
  }
  
  async createAirplane() {
    console.log("Creating airplane...");
    
    // Create a simple airplane model
    const airplane = new THREE.Group();
    
    // Fuselage
    const fuselageGeometry = new THREE.BoxGeometry(1, 0.8, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
    const fuselage = new THREE.Mesh(fuselageGeometry, material);
    airplane.add(fuselage);
    
    // Wings
    const wingGeometry = new THREE.BoxGeometry(6, 0.1, 1);
    const leftWing = new THREE.Mesh(wingGeometry, material);
    const rightWing = new THREE.Mesh(wingGeometry, material);
    leftWing.position.set(-2, 0, 0);
    rightWing.position.set(2, 0, 0);
    airplane.add(leftWing);
    airplane.add(rightWing);
    
    // Tail
    const tailGeometry = new THREE.BoxGeometry(0.5, 1, 1);
    const tail = new THREE.Mesh(tailGeometry, material);
    tail.position.set(0, 0.5, -1.5);
    airplane.add(tail);
    
    // Propeller
    const propellerGeometry = new THREE.BoxGeometry(4, 0.1, 0.2);
    const propeller = new THREE.Mesh(propellerGeometry, material);
    propeller.position.set(0, 0, 2.1);
    airplane.add(propeller);
    this.propeller = propeller;
    
    // Set airplane position
    airplane.position.set(0, 50, 0);
    airplane.castShadow = true;
    this.scene.add(airplane);
    this.airplane = airplane;
    
    console.log("Airplane created successfully");
  }
  
  updatePhysics(delta) {
    // Apply gravity
    if (!this.keys['u'] && !this.keys['p']) {
      this.velocity.y -= this.gravity;
    }
    
    // Apply velocity to airplane
    this.airplane.position.add(this.velocity);
    
    // Ground collision
    const groundHeight = this.terrainSystem.getHeightAtPosition(
      this.airplane.position.x, 
      this.airplane.position.z
    );
    
    if (this.airplane.position.y < groundHeight + 1) {
      this.airplane.position.y = groundHeight + 1;
      this.velocity.y = 0;
      
      // Check if crash landing (too fast)
      if (this.velocity.length() > 1) {
        this.gameOver();
      }
    }
    
    // Damping
    this.velocity.multiplyScalar(0.98);
  }
  
  updatePlane(delta) {
    if (this.isGameOver) return;
    
    const boost = this.keys[' '] ? this.boostMultiplier : 1;
    
    // Forward/backward movement with improved responsiveness
    if (this.keys['w']) {
      this.airplane.translateZ(this.moveSpeed * boost * 1.5 * delta * 60);
      this.airplane.rotation.x = -0.2;
    } else if (this.keys['s']) {
      this.airplane.translateZ(-this.moveSpeed * boost * delta * 60);
      this.airplane.rotation.x = 0.2;
    } else {
      this.airplane.rotation.x *= 0.95;
    }
    
    // Left/right movement
    if (this.keys['a']) {
      this.airplane.translateX(-this.moveSpeed * boost * delta * 60);
      this.airplane.rotation.z = 0.2;
    } else if (this.keys['d']) {
      this.airplane.translateX(this.moveSpeed * boost * delta * 60);
      this.airplane.rotation.z = -0.2;
    } else {
      this.airplane.rotation.z *= 0.95;
    }
    
    // Up/down movement with no altitude limit
    if (this.keys['arrowup']) {
      this.airplane.translateY(this.moveSpeed * boost * delta * 60);
    }
    if (this.keys['arrowdown'] && this.airplane.position.y > 1) {
      this.airplane.translateY(-this.moveSpeed * boost * delta * 60);
    }
    
    // Rotation
    if (this.keys['arrowleft']) this.airplane.rotation.y += this.rotationSpeed * delta * 60;
    if (this.keys['arrowright']) this.airplane.rotation.y -= this.rotationSpeed * delta * 60;
    
    // Animate propeller
    if (this.propeller) {
      this.propeller.rotation.z += 0.2 * boost;
    }
    
    // Improved camera follow with gradual tilt
    const heightFactor = Math.min(this.airplane.position.y / 100, 1);
    const cameraOffset = new THREE.Vector3(
      0,
      5 + heightFactor * 10,
      -15 - heightFactor * 10
    );
    cameraOffset.applyQuaternion(this.airplane.quaternion);
    
    // Add camera tilt based on vertical movement
    const verticalSpeed = this.velocity.y;
    const tiltAngle = THREE.MathUtils.clamp(verticalSpeed * -0.1, -0.2, 0.2);
    
    this.camera.position.lerp(this.airplane.position.clone().add(cameraOffset), 0.1);
    this.camera.lookAt(this.airplane.position);
    
    // Apply camera tilt
    this.camera.rotation.z = tiltAngle;
    
    // Update UI
    this.altitudeElement.textContent = Math.floor(this.airplane.position.y);
    this.speedElement.textContent = Math.floor(this.velocity.length() * 100);
  }
  
  checkCollisions() {
    // Implement more sophisticated collision detection
    const airplanePosition = this.airplane.position.clone();
    const collisionRadius = 3; // Collision sphere radius
    
    // Check collisions with terrain features, buildings, etc.
    // This would be expanded with actual collision detection for all objects
    
    // For now, just check if we're below ground level
    const groundHeight = this.terrainSystem.getHeightAtPosition(
      airplanePosition.x, 
      airplanePosition.z
    );
    
    if (airplanePosition.y < groundHeight) {
      this.gameOver();
    }
  }
  
  gameOver() {
    this.isGameOver = true;
    alert(`Game Over! Final Score: ${this.score}\nAltitude: ${Math.floor(this.airplane.position.y)}m\nSpeed: ${Math.floor(this.velocity.length() * 100)}km/h`);
    
    // Reset game
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.airplane.position.set(0, 50, 0);
    this.airplane.rotation.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.isGameOver = false;
  }
  
  updateScore() {
    this.score += 1;
    this.scoreElement.textContent = this.score;
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  updateDayNightCycle(delta) {
    // Slowly change time of day
    this.effectController.timeOfDay += delta * 0.05;
    if (this.effectController.timeOfDay > Math.PI * 2) {
      this.effectController.timeOfDay = 0;
    }
    
    // Update sky and lighting
    this.updateSky();
    
    // Adjust ambient light based on time of day
    const nightFactor = Math.max(0, Math.cos(this.effectController.timeOfDay * Math.PI));
    this.ambientLight.intensity = 0.2 + 0.6 * (1 - nightFactor);
    this.directionalLight.intensity = 0.3 + 0.9 * (1 - nightFactor);
    
    // Adjust fog color based on time of day
    const dayColor = new THREE.Color(0xCCCCCC);
    const nightColor = new THREE.Color(0x0A1020);
    const fogColor = new THREE.Color().lerpColors(nightColor, dayColor, 1 - nightFactor);
    this.scene.fog.color.copy(fogColor);
    this.renderer.setClearColor(fogColor);
    
    // Update time display
    const timeElement = document.getElementById('timeValue');
    if (timeElement) {
      const time = this.effectController.timeOfDay;
      if (time < Math.PI / 2) {
        timeElement.textContent = 'Morning';
      } else if (time < Math.PI) {
        timeElement.textContent = 'Day';
      } else if (time < Math.PI * 3/2) {
        timeElement.textContent = 'Evening';
      } else {
        timeElement.textContent = 'Night';
      }
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    
    try {
      // Check if initialization is complete
      if (!this.airplane || !this.terrain) {
        console.log("Waiting for initialization to complete...");
        return;
      }
      
      const delta = Math.min(0.1, this.clock ? this.clock.getDelta() : 0.016);
      
      if (!this.clock) {
        this.clock = new THREE.Clock();
        console.log("Clock initialized");
      }
      
      if (!this.isGameOver) {
        // Update game state
        this.updatePhysics(delta);
        this.updatePlane(delta);
        this.checkCollisions();
        this.updateScore();
        
        // Update day/night cycle
        this.updateDayNightCycle(delta);
        
        // Update wildlife
        if (this.wildlifeSystem) {
          this.wildlifeSystem.update(delta);
        }
        
        // Update water animation
        if (this.graphicsEngine && this.water) {
          this.graphicsEngine.updateWater(this.water, this.clock.getElapsedTime());
        }
        
        // Update clouds
        if (this.graphicsEngine && this.clouds) {
          this.graphicsEngine.updateClouds(this.clouds, delta);
        }
      }
      
      // Render the scene
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      } else {
        console.error("Missing renderer, scene, or camera:", {
          renderer: !!this.renderer,
          scene: !!this.scene,
          camera: !!this.camera
        });
      }
    } catch (error) {
      console.error('Error in animation loop:', error);
      // Don't stop the animation loop on error
    }
  }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing Medieval Flight Simulator...');
    window.game = new MedievalFlightSimulator();
  } catch (error) {
    console.error('Error initializing game:', error);
    alert('Failed to initialize the game. Please check the console for details.');
  }
});

export { MedievalFlightSimulator }; 