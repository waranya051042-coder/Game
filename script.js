/**
 * ==============================================================================
 * VERB TO BE ADVENTURE: ผจญภัยพิชิต 10 ด่าน
 * Interactive 3D Educational Game for Grade 4 Students
 * Built with Three.js, Web Audio API, and Google Apps Script Backend
 * ==============================================================================
 */

// 1. STAGES & QUESTIONS (10 ด่านป่ามหัศจรรย์ พร้อมเฉลยและคำอธิบาย)
const STAGES_DATA = [
  {
    stage: 1,
    name: "ป่ามหัศจรรย์",
    icon: "🌳",
    sentence: "I ___ a student.",
    answer: "am",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>I</b> (ฉัน) เป็นบุรุษสรรพนามที่ 1 ในปัจจุบันกาล <u>ต้องใช้คู่กับ <b>am</b> เสมอ</u> (I am a student.)",
    biome: "forest",
    skyColor: 0x87ceeb,
    groundColor: 0x48a860,
    fogColor: 0x88d49e,
    decorations: "trees"
  },
  {
    stage: 2,
    name: "สะพานสายรุ้ง",
    icon: "🌉",
    sentence: "She ___ my sister.",
    answer: "is",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>She</b> (เธอ/เขาผู้หญิง) เป็นเอกพจน์บุรุษที่ 3 (คนเดียว) <u>ต้องใช้ <b>is</b></u> (She is my sister.)",
    biome: "rainbow",
    skyColor: 0xffd6e0,
    groundColor: 0xffffff,
    fogColor: 0xffe5ec,
    decorations: "rainbows"
  },
  {
    stage: 3,
    name: "ปราสาทเวทมนตร์",
    icon: "🏰",
    sentence: "They ___ happy.",
    answer: "are",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>They</b> (พวกเขา) เป็นพหูพจน์ (มีหลายคน) <u>ต้องใช้ <b>are</b></u> (They are happy.)",
    biome: "castle",
    skyColor: 0x2e1065,
    groundColor: 0x4c1d95,
    fogColor: 0x3b0764,
    decorations: "crystals"
  },
  {
    stage: 4,
    name: "ภูเขาไฟหินผา",
    icon: "🌋",
    sentence: "He ___ a teacher.",
    answer: "is",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>He</b> (เขาผู้ชาย) เป็นคำสรรพนามเอกพจน์ (คนเดียว) <u>ต้องใช้ <b>is</b></u> (He is a teacher.)",
    biome: "volcano",
    skyColor: 0x450a0a,
    groundColor: 0x262626,
    fogColor: 0x7f1d1d,
    decorations: "rocks"
  },
  {
    stage: 5,
    name: "เมืองใต้ทะเล",
    icon: "🌊",
    sentence: "We ___ friends.",
    answer: "are",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>We</b> (พวกเรา) เป็นพหูพจน์บุรุษที่ 1 (มีหลายคน) <u>ต้องใช้ <b>are</b></u> (We are friends.)",
    biome: "undersea",
    skyColor: 0x0284c7,
    groundColor: 0x075985,
    fogColor: 0x0369a1,
    decorations: "corals"
  },
  {
    stage: 6,
    name: "ดินแดนหิมะ",
    icon: "❄️",
    sentence: "It ___ a cat.",
    answer: "is",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>It</b> (มัน) ใช้แทนสัตว์ 1 ตัว (เอกพจน์) <u>ต้องใช้ <b>is</b></u> (It is a cat.)",
    biome: "snow",
    skyColor: 0xbfdbfe,
    groundColor: 0xf1f5f9,
    fogColor: 0xdbeafe,
    decorations: "snowtrees"
  },
  {
    stage: 7,
    name: "สวนดอกไม้",
    icon: "🌸",
    sentence: "You ___ very kind.",
    answer: "are",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>You</b> (คุณ / พวกคุณ) กฎไวยากรณ์ภาษาอังกฤษกำหนดให้ <u>ใช้คู่กับ <b>are</b> เสมอ</u> (You are very kind.)",
    biome: "flower",
    skyColor: 0xfce7f3,
    groundColor: 0x86efac,
    fogColor: 0xfbcfe8,
    decorations: "flowers"
  },
  {
    stage: 8,
    name: "ทะเลทรายสีทอง",
    icon: "🏜️",
    sentence: "My mother ___ beautiful.",
    answer: "is",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>My mother</b> (คุณแม่ของฉัน) มีคนเดียว (เอกพจน์ เทียบเท่า She) <u>ต้องใช้ <b>is</b></u> (My mother is beautiful.)",
    biome: "desert",
    skyColor: 0xfef08a,
    groundColor: 0xeab308,
    fogColor: 0xfde047,
    decorations: "pyramids"
  },
  {
    stage: 9,
    name: "เกาะลอยฟ้า",
    icon: "☁️",
    sentence: "The dogs ___ hungry.",
    answer: "are",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>The dogs</b> (สุนัขหลายตัว สังเกตการเติม -s เป็นพหูพจน์ เทียบเท่า They) <u>ต้องใช้ <b>are</b></u> (The dogs are hungry.)",
    biome: "sky",
    skyColor: 0x7dd3fc,
    groundColor: 0xa5f3fc,
    fogColor: 0xbae6fd,
    decorations: "clouds"
  },
  {
    stage: 10,
    name: "ปราสาทแห่งชัยชนะ",
    icon: "👑",
    sentence: "I ___ ten years old.",
    answer: "am",
    choices: ["am", "is", "are"],
    explanation: "ประธานคือ <b>I</b> (ฉัน) ใช้บอกอายุของตนเอง <u>ต้องใช้คู่กับ <b>am</b> เสมอ</u> (I am ten years old.)",
    biome: "victory",
    skyColor: 0x581c87,
    groundColor: 0xfbbf24,
    fogColor: 0x7e22ce,
    decorations: "gold_pillars"
  }
];

// Global Game State
const gameState = {
  playerName: "",
  playerClass: "ป.4/1",
  playerNo: "01",
  currentStageIndex: 0,
  score: 0,
  mistakes: 0,
  isPlaying: false,
  isQuestionActive: false,
  soundEnabled: true,
  lastFeedbackCorrect: false,
  keys: {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    run: false
  },
  joystick: {
    active: false,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0
  }
};

// ==========================================
// 2. AUDIO SYNTHESIZER (WEB AUDIO API)
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmInterval = null;
    this.isBgmPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = "sine", gainVal = 0.15) {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playJump() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playCorrect() {
    if (!gameState.soundEnabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.35, "triangle", 0.2);
      }, idx * 90);
    });
  }

  playWrong() {
    if (!gameState.soundEnabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch (e) {}
  }

  playVictory() {
    if (!gameState.soundEnabled) return;
    this.init();
    const fanfare = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.45 },
      { f: 587.33, d: 0.2 },
      { f: 659.25, d: 0.2 },
      { f: 783.99, d: 0.8 }
    ];
    let time = 0;
    fanfare.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, item.d, "triangle", 0.25);
      }, time * 1000);
      time += item.d + 0.05;
    });
  }

  playPortal() {
    if (!gameState.soundEnabled) return;
    this.init();
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, "sine", 0.15);
      }, idx * 70);
    });
  }

  startBGM() {
    if (!gameState.soundEnabled || this.isBgmPlaying) return;
    this.init();
    this.isBgmPlaying = true;
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let step = 0;
    this.bgmInterval = setInterval(() => {
      if (!gameState.soundEnabled || !this.isBgmPlaying) return;
      const note = scale[step % scale.length];
      this.playTone(note, 0.18, "sine", 0.035);
      step++;
    }, 400);
  }

  stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const icon = document.getElementById("audio-icon");
    if (gameState.soundEnabled) {
      icon.className = "fa-solid fa-volume-high";
      this.startBGM();
    } else {
      icon.className = "fa-solid fa-volume-xmark";
      this.stopBGM();
    }
  }
}

const soundEngine = new SoundEngine();

// ==========================================
// 3. THREE.JS 3D ENGINE
// ==========================================
class AdventureWorld {
  constructor() {
    this.container = document.getElementById("game-canvas-container");
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.player = null;
    this.portal = null;
    this.decorationsGroup = null;
    this.groundMesh = null;
    this.lights = {};

    this.playerPos = new THREE.Vector3(0, 0, -14);
    this.playerVelocityY = 0;
    this.isGrounded = true;
    this.walkAnimTime = 0;
    this.portalZ = 12;
    this.stageCleared = false;
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.022);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 4.5, -20);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    // Lighting
    this.lights.ambient = new THREE.HemisphereLight(0xffffff, 0x444455, 0.7);
    this.scene.add(this.lights.ambient);

    this.lights.sun = new THREE.DirectionalLight(0xfff5e6, 1.1);
    this.lights.sun.position.set(10, 25, -10);
    this.lights.sun.castShadow = true;
    this.lights.sun.shadow.mapSize.width = 1024;
    this.lights.sun.shadow.mapSize.height = 1024;
    this.lights.sun.shadow.camera.near = 1;
    this.lights.sun.shadow.camera.far = 60;
    this.lights.sun.shadow.camera.left = -18;
    this.lights.sun.shadow.camera.right = 18;
    this.lights.sun.shadow.camera.top = 22;
    this.lights.sun.shadow.camera.bottom = -15;
    this.scene.add(this.lights.sun);

    this.buildGround();
    this.buildPathway();
    this.buildPortal();
    this.buildPlayerCharacter();

    this.decorationsGroup = new THREE.Group();
    this.scene.add(this.decorationsGroup);
    this.updateBiomeDecorations(0);

    window.addEventListener("resize", () => this.onWindowResize(), false);

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  buildGround() {
    const geo = new THREE.PlaneGeometry(120, 120, 16, 16);
    const mat = new THREE.MeshToonMaterial({ color: 0x48a860, shininess: 5 });
    this.groundMesh = new THREE.Mesh(geo, mat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = 0;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);
  }

  buildPathway() {
    const pathGeo = new THREE.BoxGeometry(6, 0.1, 34);
    const pathMat = new THREE.MeshToonMaterial({ color: 0xd6cbb8, shininess: 8 });
    const path = new THREE.Mesh(pathGeo, pathMat);
    path.position.set(0, 0.05, 0);
    path.receiveShadow = true;
    this.scene.add(path);

    const borderMat = new THREE.MeshToonMaterial({ color: 0x948979 });
    for (let z = -16; z <= 16; z += 1.8) {
      const stoneL = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35), borderMat);
      stoneL.position.set(-3.2, 0.2, z);
      stoneL.castShadow = true;
      this.scene.add(stoneL);

      const stoneR = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35), borderMat);
      stoneR.position.set(3.2, 0.2, z);
      stoneR.castShadow = true;
      this.scene.add(stoneR);
    }
  }

  buildPortal() {
    this.portal = new THREE.Group();
    this.portal.position.set(0, 0, this.portalZ);

    const pillarMat = new THREE.MeshToonMaterial({ color: 0xffd166 });
    const pillarL = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 5, 12), pillarMat);
    pillarL.position.set(-2.4, 2.5, 0);
    pillarL.castShadow = true;
    this.portal.add(pillarL);

    const pillarR = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 5, 12), pillarMat);
    pillarR.position.set(2.4, 2.5, 0);
    pillarR.castShadow = true;
    this.portal.add(pillarR);

    const archMat = new THREE.MeshToonMaterial({ color: 0xffb703 });
    const arch = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.35, 12, 24, Math.PI), archMat);
    arch.position.set(0, 4.8, 0);
    arch.castShadow = true;
    this.portal.add(arch);

    const coreGeo = new THREE.CircleGeometry(2.2, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x4cc9f0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    this.portalCore = new THREE.Mesh(coreGeo, coreMat);
    this.portalCore.position.set(0, 2.5, 0);
    this.portal.add(this.portalCore);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.08, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.portalRing = new THREE.Mesh(ringGeo, ringMat);
    this.portalRing.position.set(0, 2.5, 0.05);
    this.portal.add(this.portalRing);

    this.portalLight = new THREE.PointLight(0x4cc9f0, 2.5, 12);
    this.portalLight.position.set(0, 2.5, 1);
    this.portal.add(this.portalLight);

    this.scene.add(this.portal);
  }

  buildPlayerCharacter() {
    this.player = new THREE.Group();
    this.player.position.copy(this.playerPos);

    const skinMat = new THREE.MeshToonMaterial({ color: 0xffdbac });
    const shirtMat = new THREE.MeshToonMaterial({ color: 0x2563eb });
    const pantsMat = new THREE.MeshToonMaterial({ color: 0x334155 });
    const shoeMat = new THREE.MeshToonMaterial({ color: 0x854d0e });
    const hatMat = new THREE.MeshToonMaterial({ color: 0xf59e0b });
    const packMat = new THREE.MeshToonMaterial({ color: 0x78350f });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });

    // Torso
    const torsoGeo = new THREE.CylinderGeometry(0.42, 0.38, 0.9, 12);
    this.torso = new THREE.Mesh(torsoGeo, shirtMat);
    this.torso.position.y = 1.35;
    this.torso.castShadow = true;
    this.player.add(this.torso);

    // Backpack
    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), packMat);
    backpack.position.set(0, 1.4, -0.32);
    backpack.castShadow = true;
    this.player.add(backpack);

    // Head & Eyes
    this.head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), skinMat);
    this.head.position.y = 2.15;
    this.head.castShadow = true;
    this.player.add(this.head);

    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), eyeMat);
    eyeL.position.set(-0.16, 2.18, 0.42);
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), eyeMat);
    eyeR.position.set(0.16, 2.18, 0.42);
    this.player.add(eyeL);
    this.player.add(eyeR);

    // Hat
    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.08, 16), hatMat);
    hatBrim.position.y = 2.45;
    const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.45, 16), hatMat);
    hatTop.position.y = 2.68;
    this.player.add(hatBrim);
    this.player.add(hatTop);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.65, 8);
    armGeo.translate(0, -0.28, 0);

    this.armL = new THREE.Mesh(armGeo, shirtMat);
    this.armL.position.set(-0.52, 1.7, 0);
    this.armL.castShadow = true;
    this.player.add(this.armL);

    this.armR = new THREE.Mesh(armGeo, shirtMat);
    this.armR.position.set(0.52, 1.7, 0);
    this.armR.castShadow = true;
    this.player.add(this.armR);

    // Legs & Shoes
    const legGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.7, 8);
    legGeo.translate(0, -0.35, 0);

    this.legL = new THREE.Mesh(legGeo, pantsMat);
    this.legL.position.set(-0.22, 0.85, 0);
    this.legL.castShadow = true;
    this.player.add(this.legL);

    this.legR = new THREE.Mesh(legGeo, pantsMat);
    this.legR.position.set(0.22, 0.85, 0);
    this.legR.castShadow = true;
    this.player.add(this.legR);

    const shoeGeo = new THREE.BoxGeometry(0.24, 0.16, 0.38);
    const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
    shoeL.position.set(0, -0.65, 0.06);
    this.legL.add(shoeL);

    const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
    shoeR.position.set(0, -0.65, 0.06);
    this.legR.add(shoeR);

    // Blob Shadow
    const shadowGeo = new THREE.CircleGeometry(0.55, 16);
    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });
    this.blobShadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.blobShadow.rotation.x = -Math.PI / 2;
    this.blobShadow.position.y = 0.02;
    this.scene.add(this.blobShadow);

    this.scene.add(this.player);
  }

  updateBiomeDecorations(stageIdx) {
    const data = STAGES_DATA[stageIdx];
    while (this.decorationsGroup.children.length > 0) {
      this.decorationsGroup.remove(this.decorationsGroup.children[0]);
    }

    this.groundMesh.material.color.setHex(data.groundColor);
    this.scene.background.setHex(data.skyColor);
    this.scene.fog.color.setHex(data.fogColor);
    this.portalLight.color.setHex(data.skyColor);
    this.portalCore.material.color.setHex(data.skyColor);

    const sidePositions = [-12, -8, -5, 5, 8, 12];
    const zPositions = [-14, -8, -2, 4, 10];

    sidePositions.forEach(x => {
      zPositions.forEach(z => {
        const jitterX = x + (Math.random() - 0.5) * 2;
        const jitterZ = z + (Math.random() - 0.5) * 2.5;

        switch (data.decorations) {
          case "trees":
            this.createTree(jitterX, jitterZ);
            break;
          case "rainbows":
            this.createCloud(jitterX, jitterZ, 0.8 + Math.random() * 2);
            break;
          case "crystals":
            this.createCrystal(jitterX, jitterZ);
            break;
          case "rocks":
            this.createVolcanoRock(jitterX, jitterZ);
            break;
          case "corals":
            this.createCoral(jitterX, jitterZ);
            break;
          case "snowtrees":
            this.createSnowTree(jitterX, jitterZ);
            break;
          case "flowers":
            this.createFlower(jitterX, jitterZ);
            break;
          case "pyramids":
            this.createCactus(jitterX, jitterZ);
            break;
          case "clouds":
            this.createCloud(jitterX, jitterZ, 1 + Math.random() * 3);
            break;
          case "gold_pillars":
            this.createGoldPillar(jitterX, jitterZ);
            break;
          default:
            this.createTree(jitterX, jitterZ);
        }
      });
    });
  }

  createTree(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 2.2, 8), new THREE.MeshToonMaterial({ color: 0x854d0e }));
    trunk.position.y = 1.1;
    trunk.castShadow = true;
    group.add(trunk);
    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4), new THREE.MeshToonMaterial({ color: 0x22c55e }));
    foliage.position.y = 2.8;
    foliage.castShadow = true;
    group.add(foliage);
    this.decorationsGroup.add(group);
  }

  createCrystal(x, z) {
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), new THREE.MeshToonMaterial({ color: 0xa855f7, shininess: 40 }));
    crystal.position.set(x, 1, z);
    crystal.scale.set(0.6, 1.8, 0.6);
    crystal.castShadow = true;
    this.decorationsGroup.add(crystal);
  }

  createVolcanoRock(x, z) {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9), new THREE.MeshToonMaterial({ color: 0x1f2937 }));
    rock.position.set(x, 0.5, z);
    rock.scale.set(1.2, 0.8, 1);
    rock.castShadow = true;
    this.decorationsGroup.add(rock);
  }

  createCoral(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const coral = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.25, 1.6, 8), new THREE.MeshToonMaterial({ color: 0xf43f5e }));
    coral.position.y = 0.8;
    group.add(coral);
    this.decorationsGroup.add(group);
  }

  createSnowTree(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.5, 8), new THREE.MeshToonMaterial({ color: 0x475569 }));
    trunk.position.y = 0.75;
    group.add(trunk);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2, 8), new THREE.MeshToonMaterial({ color: 0xffffff }));
    cone.position.y = 2.4;
    group.add(cone);
    this.decorationsGroup.add(group);
  }

  createFlower(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1, 8), new THREE.MeshToonMaterial({ color: 0x22c55e }));
    stem.position.y = 0.5;
    group.add(stem);
    const petal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45), new THREE.MeshToonMaterial({ color: 0xf43f5e }));
    petal.position.y = 1.1;
    group.add(petal);
    this.decorationsGroup.add(group);
  }

  createCactus(x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const cactus = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2.2, 10), new THREE.MeshToonMaterial({ color: 0x15803d }));
    cactus.position.y = 1.1;
    group.add(cactus);
    this.decorationsGroup.add(group);
  }

  createCloud(x, z, yHeight = 2) {
    const cloud = new THREE.Group();
    cloud.position.set(x, yHeight, z);
    const mat = new THREE.MeshToonMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    for (let i = 0; i < 3; i++) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), mat);
      puff.position.set((i - 1) * 0.6, 0, 0);
      cloud.add(puff);
    }
    this.decorationsGroup.add(cloud);
  }

  createGoldPillar(x, z) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 3.5, 12), new THREE.MeshToonMaterial({ color: 0xf59e0b, shininess: 30 }));
    pillar.position.set(x, 1.75, z);
    pillar.castShadow = true;
    this.decorationsGroup.add(pillar);
  }

  resetPlayerPosition() {
    this.playerPos.set(0, 0, -14);
    this.playerVelocityY = 0;
    this.isGrounded = true;
    this.player.position.copy(this.playerPos);
    this.player.rotation.set(0, 0, 0);
    this.stageCleared = false;
  }

  animate() {
    requestAnimationFrame(this.animate);
    const delta = 0.016;
    const speed = gameState.keys.run ? 9.5 : 5.8;

    let moveX = 0;
    let moveZ = 0;

    if (gameState.keys.forward) moveZ += 1;
    if (gameState.keys.backward) moveZ -= 1;
    if (gameState.keys.left) moveX -= 1;
    if (gameState.keys.right) moveX += 1;

    if (gameState.joystick.active) {
      moveX += gameState.joystick.dx;
      moveZ += gameState.joystick.dy;
    }

    if (gameState.isPlaying && !gameState.isQuestionActive) {
      const inputVector = new THREE.Vector2(moveX, moveZ);
      const isMoving = inputVector.length() > 0.1;

      if (isMoving) {
        inputVector.normalize();
        this.playerPos.x += inputVector.x * speed * delta;
        this.playerPos.z += inputVector.y * speed * delta;

        this.playerPos.x = Math.max(-10, Math.min(10, this.playerPos.x));
        this.playerPos.z = Math.max(-15, Math.min(this.portalZ + 1, this.playerPos.z));

        const targetAngle = Math.atan2(inputVector.x, inputVector.y);
        this.player.rotation.y = THREE.MathUtils.lerp(this.player.rotation.y, targetAngle, 0.2);

        this.walkAnimTime += delta * (gameState.keys.run ? 18 : 12);
        const limbAngle = Math.sin(this.walkAnimTime) * 0.75;
        this.legL.rotation.x = limbAngle;
        this.legR.rotation.x = -limbAngle;
        this.armL.rotation.x = -limbAngle;
        this.armR.rotation.x = limbAngle;
        this.torso.position.y = 1.35 + Math.abs(Math.sin(this.walkAnimTime * 2)) * 0.08;
      } else {
        this.legL.rotation.x = THREE.MathUtils.lerp(this.legL.rotation.x, 0, 0.15);
        this.legR.rotation.x = THREE.MathUtils.lerp(this.legR.rotation.x, 0, 0.15);
        this.armL.rotation.x = THREE.MathUtils.lerp(this.armL.rotation.x, 0, 0.15);
        this.armR.rotation.x = THREE.MathUtils.lerp(this.armR.rotation.x, 0, 0.15);
        this.torso.position.y = 1.35 + Math.sin(Date.now() * 0.003) * 0.02;
      }

      if (gameState.keys.jump && this.isGrounded) {
        this.playerVelocityY = 8.5;
        this.isGrounded = false;
        soundEngine.playJump();
      }

      if (!this.isGrounded) {
        this.playerVelocityY -= 22 * delta;
        this.playerPos.y += this.playerVelocityY * delta;

        if (this.playerPos.y <= 0) {
          this.playerPos.y = 0;
          this.playerVelocityY = 0;
          this.isGrounded = true;
        }
      }

      this.player.position.copy(this.playerPos);
      this.blobShadow.position.set(this.playerPos.x, 0.02, this.playerPos.z);
      const shadowScale = Math.max(0.2, 1 - this.playerPos.y * 0.25);
      this.blobShadow.scale.set(shadowScale, shadowScale, 1);

      const distToPortal = this.playerPos.distanceTo(new THREE.Vector3(0, 0, this.portalZ));
      if (distToPortal < 2.5 && !this.stageCleared && !gameState.isQuestionActive) {
        triggerStageQuestion();
      }
    }

    if (this.portalRing) {
      this.portalRing.rotation.z += 0.02;
      this.portalCore.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.06);
    }

    const targetCamX = this.playerPos.x * 0.6;
    const targetCamY = 4.8 + this.playerPos.y * 0.4;
    const targetCamZ = this.playerPos.z - 7.5;

    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetCamX, 0.08);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetCamY, 0.08);
    this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, targetCamZ, 0.08);
    this.camera.lookAt(this.playerPos.x, this.playerPos.y + 1.6, this.playerPos.z + 4);

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

const world = new AdventureWorld();

// ==========================================
// 4. GAME FLOW & QUESTION ENGINE
// ==========================================

function initUI() {
  const dotsContainer = document.getElementById("stage-dots-container");
  dotsContainer.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const dot = document.createElement("div");
    dot.className = `stage-dot ${i === 1 ? "active" : ""}`;
    dot.id = `stage-dot-${i}`;
    dot.textContent = i;
    dotsContainer.appendChild(dot);
  }

  document.getElementById("btn-start-game").addEventListener("click", handleStartGame);
  document.getElementById("form-register").addEventListener("submit", (e) => {
    e.preventDefault();
    handleStartGame();
  });

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-choice");
      handleAnswerChoice(selected);
    });
  });

  document.getElementById("btn-feedback-action").addEventListener("click", handleFeedbackNext);

  document.getElementById("btn-audio-toggle").addEventListener("click", () => {
    soundEngine.toggleSound();
  });

  document.getElementById("btn-leaderboard-open").addEventListener("click", openLeaderboardModal);
  document.getElementById("btn-lb-close").addEventListener("click", closeLeaderboardModal);
  document.getElementById("btn-lb-ok").addEventListener("click", closeLeaderboardModal);
  document.getElementById("btn-refresh-lb").addEventListener("click", fetchLeaderboard);

  document.getElementById("btn-help-open").addEventListener("click", () => {
    document.getElementById("modal-help").classList.add("active");
  });
  document.getElementById("btn-help-close").addEventListener("click", () => {
    document.getElementById("modal-help").classList.remove("active");
  });
  document.getElementById("btn-help-ok").addEventListener("click", () => {
    document.getElementById("modal-help").classList.remove("active");
  });

  document.getElementById("btn-print-cert").addEventListener("click", () => window.print());
  document.getElementById("btn-play-again").addEventListener("click", resetFullGame);

  setupKeyboardControls();
  setupMobileControls();
}

function handleStartGame() {
  const nameInput = document.getElementById("input-player-name").value.trim();
  const classInput = document.getElementById("input-player-class").value;
  const noInput = document.getElementById("input-player-no").value.trim();

  if (!nameInput) {
    alert("กรุณากรอกชื่อ - นามสกุล นักเรียนก่อนเริ่มการผจญภัยครับ");
    return;
  }
  if (!noInput) {
    alert("กรุณากรอกเลขที่ของนักเรียนครับ");
    return;
  }

  gameState.playerName = nameInput;
  gameState.playerClass = classInput;
  gameState.playerNo = noInput.padStart(2, "0");
  gameState.isPlaying = true;

  document.getElementById("hud-player-name").textContent = gameState.playerName;
  document.getElementById("hud-player-class").textContent = `${gameState.playerClass} • เลขที่ ${gameState.playerNo}`;
  document.getElementById("hud").classList.remove("hidden");
  document.getElementById("objective-banner").classList.remove("hidden");
  document.getElementById("modal-start").classList.remove("active");

  soundEngine.init();
  soundEngine.startBGM();
  soundEngine.playPortal();
  updateHUD();
}

function updateHUD() {
  const currentStage = STAGES_DATA[gameState.currentStageIndex];

  document.getElementById("stage-badge").textContent = `ด่าน ${gameState.currentStageIndex + 1} / 10`;
  document.getElementById("stage-title").textContent = `${currentStage.icon} ${currentStage.name}`;

  const percent = ((gameState.currentStageIndex + 1) / 10) * 100;
  document.getElementById("progress-bar-fill").style.width = `${percent}%`;
  document.getElementById("hud-score").textContent = gameState.score;

  for (let i = 1; i <= 10; i++) {
    const dot = document.getElementById(`stage-dot-${i}`);
    if (i < gameState.currentStageIndex + 1) {
      dot.className = "stage-dot completed";
    } else if (i === gameState.currentStageIndex + 1) {
      dot.className = "stage-dot active";
    } else {
      dot.className = "stage-dot";
    }
  }
}

function triggerStageQuestion() {
  gameState.isQuestionActive = true;
  soundEngine.playPortal();

  const currentStage = STAGES_DATA[gameState.currentStageIndex];

  document.getElementById("q-stage-badge").textContent = `ด่านที่ ${currentStage.stage} : ${currentStage.name}`;
  document.getElementById("q-biome-icon").textContent = currentStage.icon;

  const sentenceHtml = currentStage.sentence.replace("___", `<span class="blank-slot">___</span>`);
  document.getElementById("q-sentence-text").innerHTML = sentenceHtml;

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.style.opacity = "1";
    btn.style.borderColor = "#e2e8f0";
  });

  document.getElementById("modal-question").classList.add("active");
}

function handleAnswerChoice(selectedChoice) {
  const currentStage = STAGES_DATA[gameState.currentStageIndex];
  const isCorrect = selectedChoice.toLowerCase() === currentStage.answer.toLowerCase();

  document.getElementById("modal-question").classList.remove("active");

  const feedbackModal = document.getElementById("modal-feedback");
  const feedbackCard = document.getElementById("feedback-card");
  const feedbackIcon = document.getElementById("feedback-icon");
  const feedbackTitle = document.getElementById("feedback-title");
  const feedbackSub = document.getElementById("feedback-subtitle");
  const feedbackExpl = document.getElementById("feedback-explanation-box");
  const feedbackBtnText = document.getElementById("btn-feedback-text");
  const feedbackBtnIcon = document.getElementById("btn-feedback-icon");

  gameState.lastFeedbackCorrect = isCorrect;

  if (isCorrect) {
    gameState.score += 10;
    soundEngine.playCorrect();
    triggerMiniConfetti();

    feedbackCard.className = "modal-card cartoon-card feedback-card correct";
    feedbackIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
    feedbackTitle.textContent = "เก่งมาก! ตอบถูกต้อง 🎉";
    feedbackSub.textContent = `คำตอบที่ถูกต้องคือ "${currentStage.answer}" (+10 คะแนน)`;
    feedbackExpl.innerHTML = `<p>💡 <b>คำอธิบายไวยากรณ์:</b> ${currentStage.explanation}</p>`;
    feedbackBtnText.textContent = gameState.currentStageIndex === 9 ? "รับถ้วยรางวัล & ประกาศนียบัตร!" : "ลุยด่านถัดไป!";
    feedbackBtnIcon.className = "fa-solid fa-arrow-right";
  } else {
    // บันทึกผลเมื่อตอบผิดลง Google Sheets ทันทีตามข้อกำหนด
    gameState.mistakes += 1;
    soundEngine.playWrong();

    sendRecordToGoogleSheets({
      score: gameState.score,
      stageReached: gameState.currentStageIndex + 1,
      mistakes: gameState.mistakes,
      status: `ไม่ผ่าน (ตอบผิดด่านที่ ${gameState.currentStageIndex + 1})`
    });

    feedbackCard.className = "modal-card cartoon-card feedback-card wrong";
    feedbackIcon.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    feedbackTitle.textContent = "❌ ตอบผิดนะคร้าบ!";
    feedbackSub.textContent = `คุณเลือก "${selectedChoice}" แต่คำตอบที่ถูกต้องคือ "${currentStage.answer}"`;
    feedbackExpl.innerHTML = `
      <p>⚠️ <b>กติกา:</b> เมื่อตอบผิด ตัวละครจะถูกส่งกลับไปเริ่มด่านที่ 1 และคะแนนรอบปัจจุบันถูกรีเซ็ตเป็น 0</p>
      <p style="margin-top: 8px;">💡 <b>เฉลย & ทำความเข้าใจ:</b> ${currentStage.explanation}</p>
    `;
    feedbackBtnText.textContent = "กลับไปเริ่มด่านที่ 1";
    feedbackBtnIcon.className = "fa-solid fa-rotate-left";
  }

  feedbackModal.classList.add("active");
  updateHUD();
}

function handleFeedbackNext() {
  document.getElementById("modal-feedback").classList.remove("active");

  if (gameState.lastFeedbackCorrect) {
    if (gameState.currentStageIndex === 9) {
      handleGameVictory();
    } else {
      gameState.currentStageIndex += 1;
      world.resetPlayerPosition();
      world.updateBiomeDecorations(gameState.currentStageIndex);
      updateHUD();
      gameState.isQuestionActive = false;
      soundEngine.playPortal();
    }
  } else {
    // รีเซ็ตกลับไปด่าน 1 และคะแนนรอบปัจจุบันเป็น 0
    gameState.currentStageIndex = 0;
    gameState.score = 0;
    world.resetPlayerPosition();
    world.updateBiomeDecorations(0);
    updateHUD();
    gameState.isQuestionActive = false;
  }
}

function handleGameVictory() {
  gameState.isQuestionActive = true;
  soundEngine.playVictory();
  triggerVictoryConfetti();

  // บันทึกผลเมื่อชนะครบ 10 ด่าน ได้ 100 คะแนน
  sendRecordToGoogleSheets({
    score: 100,
    stageReached: 10,
    mistakes: gameState.mistakes,
    status: "ผ่าน 10 ด่านสมบูรณ์ (100 คะแนน)"
  });

  document.getElementById("cert-name").textContent = gameState.playerName;
  document.getElementById("cert-meta").textContent = `ชั้นประถมศึกษาปีที่ ${gameState.playerClass} • เลขที่ ${gameState.playerNo}`;

  const today = new Date();
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const thaiYear = today.getFullYear() + 543;
  const dateStr = `วันที่ ${today.getDate()} ${thaiMonths[today.getMonth()]} ${thaiYear}`;
  document.getElementById("cert-date").textContent = dateStr;

  document.getElementById("modal-victory").classList.add("active");
}

function resetFullGame() {
  document.getElementById("modal-victory").classList.remove("active");
  gameState.currentStageIndex = 0;
  gameState.score = 0;
  gameState.mistakes = 0;
  world.resetPlayerPosition();
  world.updateBiomeDecorations(0);
  updateHUD();
  gameState.isQuestionActive = false;
}

// ==========================================
// 5. GOOGLE APPS SCRIPT API INTEGRATION
// ==========================================

async function sendRecordToGoogleSheets(data) {
  const scriptUrl = (typeof CONFIG !== "undefined" && CONFIG.GOOGLE_SCRIPT_URL)
    ? CONFIG.GOOGLE_SCRIPT_URL
    : "";

  const payload = {
    name: gameState.playerName,
    className: gameState.playerClass,
    studentNo: gameState.playerNo,
    score: data.score,
    stageReached: data.stageReached,
    mistakes: data.mistakes,
    status: data.status,
    timestamp: new Date().toISOString()
  };

  saveLocalScore(payload);

  if (!scriptUrl || !scriptUrl.startsWith("http")) {
    console.log("Saved score locally:", payload);
    return;
  }

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log("Successfully sent record to Google Sheets");
  } catch (error) {
    console.warn("Notice sending to Google Sheets:", error);
  }
}

function saveLocalScore(item) {
  try {
    let list = JSON.parse(localStorage.getItem("verb_to_be_adventure_scores") || "[]");
    list.push(item);
    list.sort((a, b) => b.score - a.score);
    localStorage.setItem("verb_to_be_adventure_scores", JSON.stringify(list.slice(0, 30)));
  } catch (e) {}
}

async function fetchLeaderboard() {
  const tbody = document.getElementById("lb-table-body");
  tbody.innerHTML = `<tr><td colspan="7" class="lb-loading"><i class="fa-solid fa-spinner fa-spin"></i> กำลังโหลดข้อมูลอันดับ...</td></tr>`;

  const scriptUrl = (typeof CONFIG !== "undefined" && CONFIG.GOOGLE_SCRIPT_URL)
    ? CONFIG.GOOGLE_SCRIPT_URL
    : "";

  if (scriptUrl && scriptUrl.startsWith("http")) {
    try {
      const res = await fetch(`${scriptUrl}?action=getLeaderboard`);
      const data = await res.json();
      if (data && data.success && data.leaderboard && data.leaderboard.length > 0) {
        renderLeaderboardRows(data.leaderboard);
        return;
      }
    } catch (e) {
      console.log("Using local scores:", e);
    }
  }

  const localList = JSON.parse(localStorage.getItem("verb_to_be_adventure_scores") || "[]");
  if (localList.length > 0) {
    renderLeaderboardRows(localList);
  } else {
    const mockData = [
      { name: "ด.ช. ภูริชญ์ มีปัญญา", className: "ป.4/1", studentNo: "05", score: 100, stageReached: 10, status: "ผ่าน 10 ด่านสมบูรณ์" },
      { name: "ด.ญ. ชนัญชิดา สดใส", className: "ป.4/2", studentNo: "12", score: 100, stageReached: 10, status: "ผ่าน 10 ด่านสมบูรณ์" },
      { name: "ด.ช. อานนท์ ว่องไว", className: "ป.4/1", studentNo: "08", score: 80, stageReached: 9, status: "ไม่ผ่าน (ตอบผิดด่าน 9)" },
      { name: "ด.ญ. ปรียาภรณ์ ใจดี", className: "ป.4/3", studentNo: "19", score: 70, stageReached: 8, status: "ไม่ผ่าน (ตอบผิดด่าน 8)" }
    ];
    renderLeaderboardRows(mockData);
  }
}

function renderLeaderboardRows(items) {
  const tbody = document.getElementById("lb-table-body");
  tbody.innerHTML = "";

  items.slice(0, 15).forEach((row, idx) => {
    const tr = document.createElement("tr");
    let rankBadge = `${idx + 1}`;
    if (idx === 0) rankBadge = "🥇 1";
    else if (idx === 1) rankBadge = "🥈 2";
    else if (idx === 2) rankBadge = "🥉 3";

    tr.innerHTML = `
      <td><b>${rankBadge}</b></td>
      <td>${escapeHtml(row.name || "-")}</td>
      <td>${escapeHtml(row.className || "-")}</td>
      <td>${escapeHtml(row.studentNo || "-")}</td>
      <td><b style="color: #2563eb;">${row.score || 0}</b></td>
      <td>ด่าน ${row.stageReached || 1}</td>
      <td style="font-size: 0.85rem; color: #64748b;">${escapeHtml(row.status || "-")}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openLeaderboardModal() {
  document.getElementById("modal-leaderboard").classList.add("active");
  fetchLeaderboard();
}

function closeLeaderboardModal() {
  document.getElementById("modal-leaderboard").classList.remove("active");
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[m]);
}

// ==========================================
// 6. CONTROLS
// ==========================================

function setupKeyboardControls() {
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        gameState.keys.forward = true;
        break;
      case "KeyS":
      case "ArrowDown":
        gameState.keys.backward = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        gameState.keys.left = true;
        break;
      case "KeyD":
      case "ArrowRight":
        gameState.keys.right = true;
        break;
      case "Space":
        gameState.keys.jump = true;
        e.preventDefault();
        break;
      case "ShiftLeft":
      case "ShiftRight":
        gameState.keys.run = true;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        gameState.keys.forward = false;
        break;
      case "KeyS":
      case "ArrowDown":
        gameState.keys.backward = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        gameState.keys.left = false;
        break;
      case "KeyD":
      case "ArrowRight":
        gameState.keys.right = false;
        break;
      case "Space":
        gameState.keys.jump = false;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        gameState.keys.run = false;
        break;
    }
  });
}

function setupMobileControls() {
  const joystickZone = document.getElementById("joystick-zone");
  const joystickBase = document.getElementById("joystick-base");
  const joystickThumb = document.getElementById("joystick-thumb");
  const btnJump = document.getElementById("btn-mobile-jump");
  const btnRun = document.getElementById("btn-mobile-run");

  if (!joystickZone) return;

  const maxRadius = 45;

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = joystickBase.getBoundingClientRect();
    gameState.joystick.active = true;
    gameState.joystick.startX = rect.left + rect.width / 2;
    gameState.joystick.startY = rect.top + rect.height / 2;
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    if (!gameState.joystick.active) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - gameState.joystick.startX;
    const diffY = touch.clientY - gameState.joystick.startY;
    const dist = Math.hypot(diffX, diffY);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(diffY, diffX);

    const thumbX = Math.cos(angle) * clampedDist;
    const thumbY = Math.sin(angle) * clampedDist;

    joystickThumb.style.transform = `translate(calc(-50% + ${thumbX}px), calc(-50% + ${thumbY}px))`;
    gameState.joystick.dx = thumbX / maxRadius;
    gameState.joystick.dy = -thumbY / maxRadius;
  };

  const handleTouchEnd = () => {
    gameState.joystick.active = false;
    gameState.joystick.dx = 0;
    gameState.joystick.dy = 0;
    joystickThumb.style.transform = "translate(-50%, -50%)";
  };

  joystickZone.addEventListener("touchstart", handleTouchStart, { passive: false });
  joystickZone.addEventListener("touchmove", handleTouchMove, { passive: false });
  joystickZone.addEventListener("touchend", handleTouchEnd, { passive: false });
  joystickZone.addEventListener("touchcancel", handleTouchEnd, { passive: false });

  btnJump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    gameState.keys.jump = true;
  });
  btnJump.addEventListener("touchend", () => {
    gameState.keys.jump = false;
  });

  btnRun.addEventListener("touchstart", (e) => {
    e.preventDefault();
    gameState.keys.run = !gameState.keys.run;
    btnRun.style.background = gameState.keys.run
      ? "linear-gradient(135deg, #ef4444, #dc2626)"
      : "linear-gradient(135deg, #10b981, #059669)";
  });
}

// ==========================================
// 7. CELEBRATION CONFETTI
// ==========================================

function triggerMiniConfetti() {
  if (typeof confetti === "function") {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  }
}

function triggerVictoryConfetti() {
  if (typeof confetti === "function") {
    const duration = 4 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
}

// ==========================================
// 8. BOOTSTRAP ON LOAD
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  initUI();
  world.init();
});
