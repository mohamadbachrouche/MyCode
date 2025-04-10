import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

class EnhancedGraphics {
  constructor(scene, loadingManager) {
    this.scene = scene;
    this.loadingManager = loadingManager || new THREE.LoadingManager();
    this.loader = new GLTFLoader(this.loadingManager);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.models = {
      buildings: {},
      vegetation: {},
      animals: {},
      villagers: {}
    };
    this.waterMaterials = [];
  }

  async loadRealisticModels() {
    try {
      console.log("Starting to load models...");
      
      // Create simpler placeholder models instead of loading from URLs
      this.createPlaceholderModels();
      
      // Simulate loading completion
      setTimeout(() => {
        if (this.loadingManager && this.loadingManager.onLoad) {
          console.log("Forcing onLoad event...");
          this.loadingManager.onLoad();
        }
      }, 2000);
      
      return true;
    } catch (error) {
      console.error("Error loading models:", error);
      // Create fallback models if loading fails
      this.createPlaceholderModels();
      return false;
    }
  }
  
  createPlaceholderModels() {
    console.log("Creating placeholder models...");
    
    // Buildings - simple cube
    const buildingGeometry = new THREE.BoxGeometry(5, 10, 5);
    const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    this.models.buildings.woodenHouse = building;
    
    const castleGeometry = new THREE.BoxGeometry(20, 30, 20);
    const castleMaterial = new THREE.MeshPhongMaterial({ color: 0x708090 });
    const castle = new THREE.Mesh(castleGeometry, castleMaterial);
    this.models.buildings.stoneCastle = castle;
    
    // Trees - simple cone and cylinder
    const treeGeometry = new THREE.CylinderGeometry(0, 3, 10, 8);
    const treeTrunkGeometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 8);
    const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    
    const treeTop = new THREE.Mesh(treeGeometry, leafMaterial);
    treeTop.position.y = 7.5;
    const treeTrunk = new THREE.Mesh(treeTrunkGeometry, trunkMaterial);
    treeTrunk.position.y = 2.5;
    
    const tree = new THREE.Group();
    tree.add(treeTop);
    tree.add(treeTrunk);
    
    this.models.vegetation.oakTree = tree;
    this.models.vegetation.pineTree = tree.clone();
    
    // Animals - simple box
    const animalGeometry = new THREE.BoxGeometry(2, 1, 3);
    const animalMaterial = new THREE.MeshPhongMaterial({ color: 0x964B00 });
    const animal = new THREE.Mesh(animalGeometry, animalMaterial);
    
    this.models.animals.horse = animal;
    this.models.animals.cow = animal.clone();
    this.models.animals.sheep = animal.clone();
    
    // Villagers - simple stick figure
    const villagerGeometry = new THREE.CapsuleGeometry(0.5, 1.5, 2, 8);
    const villagerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFCC99 });
    const villager = new THREE.Mesh(villagerGeometry, villagerMaterial);
    
    this.models.villagers.peasant = villager;
    this.models.villagers.knight = villager.clone();
    this.models.villagers.merchant = villager.clone();
    
    console.log("Placeholder models created successfully");
  }
  
  async loadModel(path, name) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          // Success callback
          const model = gltf.scene || gltf.scenes[0];
          
          // Scale and optimize the model
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Optimize materials
              if (child.material) {
                child.material.side = THREE.DoubleSide;
              }
            }
          });
          
          // Determine which collection to add to
          if (path.includes('castle') || path.includes('house')) {
            this.models.buildings[name] = model;
          } else if (path.includes('tree')) {
            this.models.vegetation[name] = model;
          } else if (path.includes('Horse') || path.includes('animal')) {
            this.models.animals[name] = model;
          } else {
            this.models.villagers[name] = model;
          }
          
          resolve(model);
        },
        // Progress callback
        (xhr) => {
          console.log(`${name} model: ${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        // Error callback
        (error) => {
          console.error(`Error loading model ${name}:`, error);
          reject(error);
        }
      );
    });
  }

  createRealisticSkybox() {
    // Create a more realistic skybox
    const skyboxTextures = [
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/px.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/nx.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/py.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/ny.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/pz.jpg',
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/skybox/nz.jpg'
    ];
    
    const skyboxLoader = new THREE.CubeTextureLoader();
    const skybox = skyboxLoader.load(skyboxTextures);
    
    this.scene.background = skybox;
    return skybox;
  }
  
  createCloudSystem() {
    const clouds = new THREE.Group();
    const cloudGeometry = new THREE.SphereGeometry(5, 8, 8);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      flatShading: true
    });
    
    // Create several cloud clusters
    for (let i = 0; i < 30; i++) {
      const cloudCluster = new THREE.Group();
      const numBlobs = 5 + Math.floor(Math.random() * 5);
      
      for (let j = 0; j < numBlobs; j++) {
        const blob = new THREE.Mesh(cloudGeometry, cloudMaterial);
        blob.position.set(
          Math.random() * 10 - 5,
          Math.random() * 2,
          Math.random() * 10 - 5
        );
        blob.scale.set(
          Math.random() * 0.5 + 0.5,
          Math.random() * 0.3 + 0.3,
          Math.random() * 0.5 + 0.5
        );
        cloudCluster.add(blob);
      }
      
      // Position cloud in the sky
      cloudCluster.position.set(
        Math.random() * 1000 - 500,
        100 + Math.random() * 100,
        Math.random() * 1000 - 500
      );
      
      // Add some random movement data
      cloudCluster.userData = {
        speed: Math.random() * 0.1 + 0.05,
        direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize()
      };
      
      clouds.add(cloudCluster);
    }
    
    this.scene.add(clouds);
    return clouds;
  }
  
  updateClouds(clouds, delta) {
    if (clouds && clouds.children) {
      for (let i = 0; i < clouds.children.length; i++) {
        const cloud = clouds.children[i];
        cloud.position.x += cloud.userData.speed * delta;
        
        // If cloud moves beyond the world boundary, reset to the other side
        if (cloud.position.x > 1000) {
          cloud.position.x = -1000;
        }
      }
    }
  }
  
  createRealisticWater(width, height) {
    // Create advanced water with reflections and refractions
    const waterGeometry = new THREE.PlaneGeometry(width, height, 64, 64);
    
    // Create water with enhanced visual quality
    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals: this.textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg', function(texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 8);
      }),
      sunDirection: new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined
    });
    
    water.rotation.x = -Math.PI / 2;
    water.receiveShadow = true;
    
    return water;
  }
  
  createRiverSystem(terrain, worldSize) {
    const rivers = new THREE.Group();
    
    // Create 3-5 rivers that flow through the terrain
    const numRivers = 3 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < numRivers; i++) {
      // Create a meandering river path
      const points = [];
      const riverLength = 20 + Math.floor(Math.random() * 15);
      
      // Random starting point near the edge
      const startX = (Math.random() - 0.5) * worldSize * 0.9;
      const startZ = (Math.random() - 0.5) * worldSize * 0.9;
      
      let currentX = startX;
      let currentZ = startZ;
      let currentAngle = Math.random() * Math.PI * 2;
      
      for (let j = 0; j < riverLength; j++) {
        // Get height at this position
        const y = -2; // Slightly below terrain
        
        points.push(new THREE.Vector3(currentX, y, currentZ));
        
        // Random meandering
        currentAngle += (Math.random() - 0.5) * 0.5;
        const distance = 20 + Math.random() * 10;
        
        currentX += Math.cos(currentAngle) * distance;
        currentZ += Math.sin(currentAngle) * distance;
        
        // Keep within world bounds
        currentX = THREE.MathUtils.clamp(currentX, -worldSize/2 * 0.9, worldSize/2 * 0.9);
        currentZ = THREE.MathUtils.clamp(currentZ, -worldSize/2 * 0.9, worldSize/2 * 0.9);
      }
      
      // Create a smooth curve from the points
      const curve = new THREE.CatmullRomCurve3(points);
      
      // Create river geometry
      const riverWidth = 5 + Math.random() * 10;
      const riverGeometry = new THREE.TubeGeometry(curve, 100, riverWidth, 8, false);
      
      // Create river material with realistic water appearance
      const riverMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0077be,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        envMapIntensity: 0.5
      });
      
      const river = new THREE.Mesh(riverGeometry, riverMaterial);
      river.receiveShadow = true;
      
      rivers.add(river);
    }
    
    this.scene.add(rivers);
    return rivers;
  }

  updateWater(water, time) {
    if (water && water.material) {
      water.material.uniforms['time'].value = time * 0.5;
    }
  }
}

export { EnhancedGraphics };
