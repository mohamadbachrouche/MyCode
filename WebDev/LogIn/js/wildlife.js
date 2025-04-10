import * as THREE from 'three';

class WildlifeSystem {
  constructor(scene, terrain) {
    // Check if terrain is relatively flat by sampling nearby points
    this.isTerrainFlat = (x, z) => {
      const sampleSize = 2;
      const centerHeight = this.terrain.getHeightAtPosition(x, z);
      
      for (let dx = -sampleSize; dx <= sampleSize; dx++) {
        for (let dz = -sampleSize; dz <= sampleSize; dz++) {
          const height = this.terrain.getHeightAtPosition(x + dx, z + dz);
          if (Math.abs(height - centerHeight) > 1.5) return false;
        }
      }
      return true;
    };
    this.scene = scene;
    this.terrain = terrain;
    this.animals = [];
    this.birds = [];
    this.villagers = [];
    this.clock = new THREE.Clock();
    this.mixers = [];
  }

  addAnimals(graphicsEngine, count = 80) {
    const animalTypes = ['horse', 'cow', 'sheep'];
    const animalGroup = new THREE.Group();
    
    for (let i = 0; i < count; i++) {
      // Random animal type
      const animalType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
      
      if (graphicsEngine.models.animals[animalType]) {
        const animal = graphicsEngine.models.animals[animalType].clone();
        
        // Random position
        const x = Math.random() * this.terrain.terrainSize - this.terrain.terrainSize/2;
        const z = Math.random() * this.terrain.terrainSize - this.terrain.terrainSize/2;
        const y = this.terrain.getHeightAtPosition(x, z);
        
        animal.position.set(x, y, z);
        animal.rotation.y = Math.random() * Math.PI * 2;
        
        // Store animal data
        this.animals.push({
          model: animal,
          type: animalType,
          position: new THREE.Vector3(x, y, z),
          direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
          speed: 0.2 + Math.random() * 0.3,
          nextActionTime: Math.random() * 5,
          state: 'idle',
          animationTime: 0
        });
        
        animalGroup.add(animal);
      }
    }
    
    this.scene.add(animalGroup);
    return animalGroup;
  }
  
  addBirds(graphicsEngine, count = 50) {
    const birdGroup = new THREE.Group();
    
    // Create several flocks of birds
    const numFlocks = 5;
    const birdsPerFlock = Math.floor(count / numFlocks);
    
    for (let f = 0; f < numFlocks; f++) {
      // Create a flock center point
      const flockCenter = new THREE.Vector3(
        (Math.random() - 0.5) * this.terrain.terrainSize * 0.8,
        100 + Math.random() * 100,
        (Math.random() - 0.5) * this.terrain.terrainSize * 0.8
      );
      
      const flockDirection = new THREE.Vector3(
        Math.random() - 0.5,
        (Math.random() - 0.5) * 0.2,
        Math.random() - 0.5
      ).normalize();
      
      const flockSpeed = 0.5 + Math.random() * 0.5;
      
      // Create birds in this flock
      for (let i = 0; i < birdsPerFlock; i++) {
        if (graphicsEngine.models.animals['bird']) {
          const bird = graphicsEngine.models.animals['bird'].clone();
          
          // Position around flock center
          const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 20
          );
          
          const position = flockCenter.clone().add(offset);
          bird.position.copy(position);
          
          // Store bird data for flight animation
          this.birds.push({
            model: bird,
            position: position.clone(),
            flockCenter: flockCenter.clone(),
            flockDirection: flockDirection.clone(),
            flockSpeed: flockSpeed,
            offset: offset.clone(),
            flapSpeed: 0.2 + Math.random() * 0.1,
            flapPhase: Math.random() * Math.PI * 2,
            flockId: f
          });
          
          birdGroup.add(bird);
        }
      }
    }
    
    this.scene.add(birdGroup);
    return birdGroup;
  }
  
  addVillagers(graphicsEngine, count = 30) {
    const villagerTypes = ['farmer', 'blacksmith', 'merchant'];
    const villagerGroup = new THREE.Group();
    
    for (let i = 0; i < count; i++) {
      const type = villagerTypes[Math.floor(Math.random() * villagerTypes.length)];
      
      if (graphicsEngine.models.villagers[type]) {
        const villager = graphicsEngine.models.villagers[type].clone();
        
        // Position villagers in flat areas
        let x, z, y;
        do {
          x = Math.random() * this.terrain.terrainSize - this.terrain.terrainSize/2;
          z = Math.random() * this.terrain.terrainSize - this.terrain.terrainSize/2;
          y = this.terrain.getHeightAtPosition(x, z);
        } while (!this.isTerrainFlat(x, z)); // Make sure they're on relatively flat terrain
        
        villager.position.set(x, y, z);
        villager.rotation.y = Math.random() * Math.PI * 2;
        
        // Store villager data
        this.villagers.push({
          model: villager,
          type: type,
          position: new THREE.Vector3(x, y, z),
          direction: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(),
          speed: 0.1 + Math.random() * 0.2,
          nextActionTime: Math.random() * 8,
          state: 'idle',
          taskDuration: 0,
          taskPosition: null,
          animationTime: 0
        });
        
        villagerGroup.add(villager);
      }
    }
    
    this.scene.add(villagerGroup);
    return villagerGroup;
  }
  
  update(delta) {
    if (!delta) {
      delta = this.clock.getDelta();
    }
    
    this.updateAnimals(delta);
    this.updateBirds(delta);
    this.updateVillagers(delta);
    
    // Update animation mixers
    for (const mixer of this.mixers) {
      mixer.update(delta);
    }
  }
  
  updateAnimals(delta) {
    this.animals.forEach(animal => {
      animal.animationTime += delta;
      animal.nextActionTime -= delta;
      
      if (animal.nextActionTime <= 0) {
        // Time to change behavior
        if (Math.random() > 0.7) {
          // Change direction
          animal.direction = new THREE.Vector3(
            Math.random() - 0.5,
            0,
            Math.random() - 0.5
          ).normalize();
          
          // Change state
          animal.state = Math.random() > 0.3 ? 'walking' : 'idle';
        }
        
        // Set new waiting time
        animal.nextActionTime = 2 + Math.random() * 5;
      }
      
      // Move animal based on state
      if (animal.state === 'walking') {
        const movement = animal.direction.clone().multiplyScalar(animal.speed * delta);
        animal.position.add(movement);
        
        // Apply to model
        animal.model.position.copy(animal.position);
        animal.model.position.y = this.terrain.getHeightAtPosition(animal.position.x, animal.position.z);
        
        // Update rotation to face movement direction
        if (movement.length() > 0.001) {
            animal.model.rotation.y = Math.atan2(movement.x, movement.z);
        }
        
        // Face in movement direction
        if (movement.length() > 0.001) {
          animal.model.lookAt(animal.model.position.clone().add(animal.direction));
        }
        
        // Animate legs for walking
        if (animal.model.children.length > 2) {
          // Assuming legs are children after body and head
          for (let i = 2; i < animal.model.children.length; i++) {
            const leg = animal.model.children[i];
            const legIndex = i - 2;
            
            // Alternate leg movements
            const legPhase = animal.animationTime * 5 + legIndex * Math.PI/2;
            leg.position.y = leg.userData.baseY || -0.7;
            leg.position.y += Math.sin(legPhase) * 0.1;
            
            // Store original position if not already stored
            if (!leg.userData.baseY) {
              leg.userData.baseY = leg.position.y;
            }
          }
        }
      }
      
      // Avoid leaving the terrain
      const boundaryLimit = this.terrain.terrainSize / 2 - 50;
      if (Math.abs(animal.position.x) > boundaryLimit || 
          Math.abs(animal.position.z) > boundaryLimit) {
        // Turn around
        animal.direction.multiplyScalar(-1);
        animal.model.lookAt(animal.model.position.clone().add(animal.direction));
      }
    });
  }
  
  updateBirds(delta) {
    // Update flock centers first
    const flockCenters = [];
    const flockDirections = [];
    
    // Initialize arrays for each flock
    for (let f = 0; f < 5; f++) {
      flockCenters[f] = null;
      flockDirections[f] = new THREE.Vector3();
    }
    
    // Get current flock centers and aggregate directions
    this.birds.forEach(bird => {
      const flockId = bird.flockId;
      
      if (!flockCenters[flockId]) {
        flockCenters[flockId] = bird.flockCenter.clone();
      }
      
      flockDirections[flockId].add(bird.flockDirection);
    });
    
    // Normalize flock directions
    flockDirections.forEach(dir => dir.normalize());
    
    // Update each flock center
    for (let f = 0; f < flockCenters.length; f++) {
      if (flockCenters[f]) {
        // Add some randomness to flock movement
        const randomTurn = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.1
        );
        
        flockDirections[f].add(randomTurn).normalize();
        
        // Move flock center
        const flockSpeed = this.birds.find(b => b.flockId === f)?.flockSpeed || 0.5;
        flockCenters[f].add(flockDirections[f].clone().multiplyScalar(flockSpeed * delta * 10));
        
        // Keep flock within bounds
        const boundaryLimit = this.terrain.terrainSize / 2 - 100;
        if (Math.abs(flockCenters[f].x) > boundaryLimit) {
          flockDirections[f].x = -flockDirections[f].x;
        }
        if (Math.abs(flockCenters[f].z) > boundaryLimit) {
          flockDirections[f].z = -flockDirections[f].z;
        }
        
        // Keep flock at reasonable height
        const groundHeight = this.terrain.getHeightAtPosition(flockCenters[f].x, flockCenters[f].z);
        if (flockCenters[f].y < groundHeight + 50) {
          flockDirections[f].y = Math.abs(flockDirections[f].y) + 0.1;
        } else if (flockCenters[f].y > groundHeight + 200) {
          flockDirections[f].y = -Math.abs(flockDirections[f].y) - 0.1;
        }
      }
    }
    
    // Now update individual birds
    this.birds.forEach(bird => {
      // Flap wings animation
      bird.flapPhase += bird.flapSpeed;
      
      // Actually animate wing flapping
      if (bird.model.children && bird.model.children.length >= 2) {
        // Assuming wings are child objects
        const leftWing = bird.model.children[1];
        const rightWing = bird.model.children[2];
        
        if (leftWing && rightWing) {
          leftWing.rotation.z = Math.sin(bird.flapPhase) * 0.3;
          rightWing.rotation.z = -Math.sin(bird.flapPhase) * 0.3;
        }
      }
      
      // Update bird position based on flock
      const flockId = bird.flockId;
      
      if (flockCenters[flockId]) {
        // Update flock center reference
        bird.flockCenter.copy(flockCenters[flockId]);
        bird.flockDirection.copy(flockDirections[flockId]);
        
        // Calculate target position (flock center + offset)
        const targetPosition = bird.flockCenter.clone().add(bird.offset);
        
        // Move bird towards target position
        bird.position.lerp(targetPosition, 0.1);
        
        // Apply to model
        bird.model.position.copy(bird.position);
        
        // Face in movement direction
        const lookDirection = bird.flockDirection.clone();
        if (lookDirection.length() > 0.001) {
          const lookTarget = bird.position.clone().add(lookDirection);
          bird.model.lookAt(lookTarget);
        }
        
        // Add slight banking effect when turning
        const bankAmount = 0.5;
        bird.model.rotation.z = -bird.flockDirection.x * bankAmount;
      }
    });
  }
  
  updateVillagers(delta) {
    this.villagers.forEach(villager => {
      villager.animationTime += delta;
      villager.nextActionTime -= delta;
      
      if (villager.nextActionTime <= 0) {
        // Time to change behavior based on role
        switch (villager.type) {
          case 'farmer':
            // Farmers alternate between walking and farming
            if (villager.state === 'idle' || villager.state === 'walking') {
              villager.state = 'farming';
              villager.taskDuration = 5 + Math.random() * 5;
            } else {
              villager.state = 'walking';
              villager.direction = new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
              ).normalize();
            }
            break;
            
          case 'blacksmith':
            // Blacksmiths mostly stay in one place and hammer
            if (Math.random() > 0.2) {
              villager.state = 'hammering';
              villager.taskDuration = 3 + Math.random() * 3;
            } else {
              villager.state = 'walking';
              villager.direction = new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
              ).normalize();
            }
            break;
            
          case 'merchant':
            // Merchants walk around more
            if (Math.random() > 0.7) {
              villager.state = 'idle';
              villager.taskDuration = 2 + Math.random() * 2;
            } else {
              villager.state = 'walking';
              villager.direction = new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
              ).normalize();
            }
            break;
        }
        
        villager.nextActionTime = villager.taskDuration || (2 + Math.random() * 5);
      }
      
      // Perform actions based on state
      switch (villager.state) {
        case 'walking':
          // Move villager
          const movement = villager.direction.clone().multiplyScalar(villager.speed * delta);
          villager.position.add(movement);
          
          // Apply to model
          villager.model.position.copy(villager.position);
          villager.model.position.y = this.terrain.getHeightAtPosition(villager.position.x, villager.position.z);
          
          // Face in movement direction
          if (movement.length() > 0.001) {
            villager.model.lookAt(villager.model.position.clone().add(villager.direction));
          }
          
          // Animate walking
          if (villager.model.children.length >= 4) {
            // Assuming arms are children 2 and 3
            const leftArm = villager.model.children[2];
            const rightArm = villager.model.children[3];
            
            leftArm.rotation.x = Math.sin(villager.animationTime * 5) * 0.5;
            rightArm.rotation.x = Math.sin(villager.animationTime * 5 + Math.PI) * 0.5;
          }
          break;
          
        case 'farming':
          // Farming animation - bending down and up
          if (villager.model.children.length >= 4) {
            villager.model.rotation.x = Math.sin(villager.animationTime * 2) * 0.2;
            
            // Arms move together
            const leftArm = villager.model.children[2];
            const rightArm = villager.model.children[3];
            
            leftArm.rotation.x = Math.sin(villager.animationTime * 2) * 0.8 - 0.4;
            rightArm.rotation.x = Math.sin(villager.animationTime * 2) * 0.8 - 0.4;
          }
          break;
          
        case 'hammering':
          // Hammering animation - one arm goes up and down
          if (villager.model.children.length >= 4) {
            const rightArm = villager.model.children[3];
            rightArm.rotation.x = Math.sin(villager.animationTime * 8) * 0.8 - 0.4;
          }
          break;
          
        case 'idle':
          // Subtle idle animation
          if (villager.model.children.length >= 4) {
            villager.model.rotation.y += Math.sin(villager.animationTime * 0.5) * 0.01;
          }
          break;
      }
      
      // Avoid leaving the terrain
      const boundaryLimit = this.terrain.terrainSize / 2 - 50;
      if (Math.abs(villager.position.x) > boundaryLimit || 
          Math.abs(villager.position.z) > boundaryLimit) {
        // Turn around
        villager.direction.multiplyScalar(-1);
        villager.model.lookAt(villager.model.position.clone().add(villager.direction));
      }
    });
  }
}

export { WildlifeSystem };
