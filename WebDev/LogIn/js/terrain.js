import * as THREE from 'three';

class EnhancedTerrain {
  constructor(scene, loadingManager) {
    this.scene = scene;
    this.loadingManager = loadingManager || new THREE.LoadingManager();
    this.terrainSize = 2000;
    this.terrainSegments = 256;
    this.heightMultiplier = 80;
    this.textures = {};
  }
  
  async loadTextures() {
    const textureLoader = new THREE.TextureLoader(this.loadingManager);
    
    // Load terrain textures with promises
    const loadTexture = (path) => {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          path, 
          (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(this.terrainSize/50, this.terrainSize/50);
            resolve(texture);
          },
          undefined,
          (error) => {
            console.error(`Error loading texture ${path}:`, error);
            // Create a fallback texture
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 128;
            const context = canvas.getContext('2d');
            context.fillStyle = '#4CAF50';
            context.fillRect(0, 0, 128, 128);
            const fallbackTexture = new THREE.CanvasTexture(canvas);
            fallbackTexture.wrapS = fallbackTexture.wrapT = THREE.RepeatWrapping;
            fallbackTexture.repeat.set(this.terrainSize/50, this.terrainSize/50);
            resolve(fallbackTexture);
          }
        );
      });
    };
    
    try {
      // Load textures from CDN
      this.textures.grass = await loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big.jpg');
      this.textures.rock = await loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/backgrounddetailed6.jpg');
      this.textures.sand = await loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/grasslight-big.jpg');
      this.textures.dirt = await loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/terrain/backgrounddetailed6.jpg');
    } catch (error) {
      console.error("Error loading textures:", error);
    }
    
    return this.textures;
  }
  
  createDetailedTerrain() {
    const geometry = new THREE.PlaneGeometry(
      this.terrainSize,
      this.terrainSize,
      this.terrainSegments,
      this.terrainSegments
    );
    
    // Create height map with multiple noise frequencies
    const vertices = geometry.attributes.position.array;
    
    // Generate terrain using improved noise algorithm
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      
      // Multiple octaves of noise for realistic terrain
      let height = 0;
      
      // Large-scale terrain features (mountains, valleys)
      height += this.noise(x * 0.0005, z * 0.0005) * 0.5;
      
      // Medium-scale features (hills, depressions)
      height += this.noise(x * 0.002, z * 0.002) * 0.3;
      
      // Small-scale features (rocks, bumps)
      height += this.noise(x * 0.01, z * 0.01) * 0.1;
      
      // Micro details
      height += this.noise(x * 0.05, z * 0.05) * 0.05;
      
      // Create mountains and valleys
      height = Math.pow(Math.abs(height), 0.8) * Math.sign(height);
      
      // Create flat areas for settlements
      const flatteningFactor = 1 - Math.exp(-Math.pow(height, 2) * 10);
      height *= flatteningFactor;
      
      // Apply height to vertex
      vertices[i + 1] = height * this.heightMultiplier;
    }
    
    // Update normals for lighting
    geometry.computeVertexNormals();
    
    // Create material with texture blending
    const material = this.createTerrainMaterial();
    
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    
    this.scene.add(terrain);
    this.terrain = terrain;
    return terrain;
  }
  
  createTerrainMaterial() {
    // Create material with texture splatting for different terrain types
    const material = new THREE.MeshStandardMaterial({
      map: this.textures.grass,
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    
    return material;
  }
  
  createRivers() {
    // Create meandering rivers using spline curves
    const riverGroup = new THREE.Group();
    
    // Create 2-3 main rivers
    for (let i = 0; i < 3; i++) {
      const points = [];
      const riverLength = 15 + Math.floor(Math.random() * 10);
      
      // Starting point
      const startX = Math.random() * this.terrainSize - this.terrainSize/2;
      const startZ = Math.random() * this.terrainSize - this.terrainSize/2;
      
      let currentX = startX;
      let currentZ = startZ;
      
      for (let j = 0; j < riverLength; j++) {
        // Get height at this position
        const y = this.getHeightAtPosition(currentX, currentZ) - 1;
        
        points.push(new THREE.Vector3(currentX, y, currentZ));
        
        // Random meandering
        const angle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25;
        const distance = 10 + Math.random() * 20;
        
        currentX += Math.cos(angle) * distance;
        currentZ += Math.sin(angle) * distance;
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const riverGeometry = new THREE.TubeGeometry(curve, 64, 5 + Math.random() * 10, 8, false);
      
      const riverMaterial = new THREE.MeshStandardMaterial({
        color: 0x0077be,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      
      const river = new THREE.Mesh(riverGeometry, riverMaterial);
      riverGroup.add(river);
    }
    
    this.scene.add(riverGroup);
    return riverGroup;
  }
  
  placeVegetation(graphicsEngine) {
    const vegetationGroup = new THREE.Group();
    
    // Place trees in forests and individual areas
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * this.terrainSize - this.terrainSize/2;
      const z = Math.random() * this.terrainSize - this.terrainSize/2;
      
      // Determine biome based on noise
      const biomeNoise = this.noise(x * 0.002, z * 0.002);
      
      if (biomeNoise > 0.2) {
        // Forest area - add clusters of trees
        this.createTreeCluster(graphicsEngine, x, z, vegetationGroup);
      } else if (biomeNoise > -0.2) {
        // Scattered vegetation
        if (Math.random() > 0.7) {
          this.placeSingleTree(graphicsEngine, x, z, vegetationGroup);
        }
      }
    }
    
    this.scene.add(vegetationGroup);
    return vegetationGroup;
  }
  
  createTreeCluster(graphicsEngine, centerX, centerZ, group) {
    const clusterSize = 3 + Math.floor(Math.random() * 7);
    
    for (let i = 0; i < clusterSize; i++) {
      const offsetX = Math.random() * 40 - 20;
      const offsetZ = Math.random() * 40 - 20;
      
      this.placeSingleTree(graphicsEngine, centerX + offsetX, centerZ + offsetZ, group);
    }
  }
  
  placeSingleTree(graphicsEngine, x, z, group) {
    // Randomly choose tree type
    const treeType = Math.random() > 0.5 ? 'oakTree' : 'pineTree';
    
    if (!graphicsEngine.models.vegetation[treeType]) return;
    
    const model = graphicsEngine.models.vegetation[treeType].clone();
    
    // Get height at this position from terrain
    const y = this.getHeightAtPosition(x, z);
    
    model.position.set(x, y, z);
    
    // Random rotation and scale variation
    model.rotation.y = Math.random() * Math.PI * 2;
    const scale = 0.8 + Math.random() * 0.4;
    model.scale.set(scale, scale, scale);
    
    group.add(model);
  }
  
  getHeightAtPosition(x, z) {
    // Sample noise to determine height at any point
    // Multiple octaves of noise for realistic terrain
    let height = 0;
    
    // Large-scale terrain features
    height += this.noise(x * 0.0005, z * 0.0005) * 0.5;
    
    // Medium-scale features
    height += this.noise(x * 0.002, z * 0.002) * 0.3;
    
    // Small-scale features
    height += this.noise(x * 0.01, z * 0.01) * 0.1;
    
    // Micro details
    height += this.noise(x * 0.05, z * 0.05) * 0.05;
    
    // Create mountains and valleys
    height = Math.pow(Math.abs(height), 0.8) * Math.sign(height);
    
    // Create flat areas for settlements
    const flatteningFactor = 1 - Math.exp(-Math.pow(height, 2) * 10);
    height *= flatteningFactor;
    
    return height * this.heightMultiplier;
  }
  
  // Improved Perlin noise function
  noise(x, y) {
    // Simple noise function for demonstration
    // In a real implementation, you would use a proper noise library
    return Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5 +
           Math.sin(x * 0.25) * Math.cos(y * 0.25) * 0.25 +
           Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.125 +
           Math.sin(x * 1.0) * Math.cos(y * 1.0) * 0.0625;
  }
}

export { EnhancedTerrain };
