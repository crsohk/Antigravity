/**
 * ANTIGRAVITY NEXUS - QUANTUM PARTICLE & GRAVITATIONAL PHYSICS SANDBOX
 * Engineered for 60FPS high performance, glassmorphism UI & Web Audio synth.
 */

(function () {
  'use strict';

  // --- Core State ---
  const state = {
    particleCount: 1800,
    gravityPower: 1.2,
    antigravityPower: 2.0,
    friction: 0.985,
    preset: 'orbital', // orbital | singularity | antigravity | constellation
    theme: 'nebula',   // nebula | supernova | cyberpunk | matrix
    soundEnabled: false,
    gravityInverted: false,
    mouse: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      isDown: false,
      isRightClick: false,
      active: false
    },
    fps: 60,
    kineticEnergy: 0
  };

  // --- Theme Color Palettes ---
  const THEMES = {
    nebula: {
      colors: ['#00f2fe', '#4facfe', '#7f00ff', '#8a2be2', '#c471ed'],
      glow: 'rgba(0, 242, 254, 0.45)',
      trail: 'rgba(6, 7, 13, 0.16)'
    },
    supernova: {
      colors: ['#ffb300', '#ff8008', '#ffc837', '#ff4757', '#ffa502'],
      glow: 'rgba(255, 179, 0, 0.45)',
      trail: 'rgba(9, 6, 8, 0.16)'
    },
    cyberpunk: {
      colors: ['#f857a6', '#ff5858', '#b5179e', '#7209b7', '#4cc9f0'],
      glow: 'rgba(248, 87, 166, 0.45)',
      trail: 'rgba(8, 5, 14, 0.16)'
    },
    matrix: {
      colors: ['#00f59b', '#0ba360', '#3cba92', '#2ed573', '#7bed9f'],
      glow: 'rgba(0, 245, 155, 0.45)',
      trail: 'rgba(5, 10, 8, 0.16)'
    }
  };

  // --- DOM Elements ---
  const canvas = document.getElementById('physics-canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const rippleContainer = document.getElementById('ripple-container');

  const fpsDisplay = document.getElementById('fps-counter');
  const particleCountDisplay = document.getElementById('particle-count-display');
  const kineticEnergyDisplay = document.getElementById('kinetic-energy-display');

  const sliderParticleCount = document.getElementById('slider-particle-count');
  const sliderGravity = document.getElementById('slider-gravity');
  const sliderAntigravity = document.getElementById('slider-antigravity');
  const sliderFriction = document.getElementById('slider-friction');

  const valParticleCount = document.getElementById('val-particle-count');
  const valGravity = document.getElementById('val-gravity');
  const valAntigravity = document.getElementById('val-antigravity');
  const valFriction = document.getElementById('val-friction');

  const btnAudioToggle = document.getElementById('btn-audio-toggle');
  const audioIconOff = document.getElementById('audio-icon-off');
  const audioIconOn = document.getElementById('audio-icon-on');
  const audioLabel = document.getElementById('audio-label');

  const btnInfoModal = document.getElementById('btn-info-modal');
  const modalInfo = document.getElementById('modal-info');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnModalConfirm = document.getElementById('btn-modal-confirm');

  const btnBurst = document.getElementById('btn-burst');
  const btnReverseGravity = document.getElementById('btn-reverse-gravity');
  const btnResetParticles = document.getElementById('btn-reset-particles');
  const btnCaptureSnapshot = document.getElementById('btn-capture-snapshot');
  const btnCollapseHud = document.getElementById('btn-collapse-hud');
  const hudControls = document.getElementById('hud-controls');

  let width = 0;
  let height = 0;
  let dpr = 1;

  // --- Resize Canvas with HiDPI support ---
  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#06070d';
    ctx.fillRect(0, 0, width, height);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // --- Web Audio Synthesizer Engine ---
  let audioCtx = null;
  let ambientDroneGain = null;
  let droneFilter = null;

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      // Ambient celestial drone generator
      droneFilter = audioCtx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 440;
      droneFilter.Q.value = 4.0;

      ambientDroneGain = audioCtx.createGain();
      ambientDroneGain.gain.value = 0.08;

      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = 55; // Root A1

      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = 110; // Octave A2

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      droneFilter.connect(ambientDroneGain);
      ambientDroneGain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
    } catch (e) {
      console.warn('AudioContext not supported or permission denied', e);
    }
  }

  function playShockwaveChime(freq = 520) {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      const chimeOsc = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();

      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      chimeOsc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.35);

      chimeGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);

      chimeOsc.start();
      chimeOsc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {}
  }

  function toggleAudio() {
    state.soundEnabled = !state.soundEnabled;
    if (state.soundEnabled) {
      initAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (ambientDroneGain) ambientDroneGain.gain.value = 0.08;
      audioIconOff.classList.add('hidden');
      audioIconOn.classList.remove('hidden');
      audioLabel.textContent = 'Sound On';
      btnAudioToggle.style.borderColor = 'var(--neon-cyan)';
      playShockwaveChime(440);
    } else {
      if (ambientDroneGain) ambientDroneGain.gain.value = 0;
      audioIconOff.classList.remove('hidden');
      audioIconOn.classList.add('hidden');
      audioLabel.textContent = 'Sound Off';
      btnAudioToggle.style.borderColor = 'var(--glass-border)';
    }
  }

  // --- Particle Data Structure ---
  class Particle {
    constructor(x, y) {
      this.reset(x, y);
    }

    reset(x, y) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.radius = 1.0 + Math.random() * 2.2;
      this.mass = this.radius * 0.8;
      this.colorIndex = Math.floor(Math.random() * 5);
      this.alpha = 0.4 + Math.random() * 0.6;
    }
  }

  let particles = [];

  function initParticles() {
    particles = [];
    const count = state.particleCount;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < count; i++) {
      // Spawn in circular orbital ring
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * Math.min(width, height) * 0.42;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      const p = new Particle(x, y);
      // Tangential velocity for orbital momentum
      const speed = 1.2 + Math.random() * 2.0;
      p.vx = -Math.sin(angle) * speed;
      p.vy = Math.cos(angle) * speed;
      particles.push(p);
    }
    particleCountDisplay.textContent = count.toLocaleString();
  }

  initParticles();

  // --- Shockwave Ripple Animation ---
  function triggerShockwave(x, y, isAntiGravity = false) {
    const ripple = document.createElement('div');
    ripple.className = 'shockwave-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    if (isAntiGravity) {
      ripple.style.borderColor = 'var(--neon-magenta)';
      ripple.style.boxShadow = '0 0 30px var(--neon-magenta), inset 0 0 15px #ff5858';
    }
    rippleContainer.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 750);

    // Physical blast on particles
    const blastRadius = 380;
    const blastForce = isAntiGravity ? 18.0 : 12.0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = p.x - x;
      const dy = p.y - y;
      const distSq = dx * dx + dy * dy;
      if (distSq < blastRadius * blastRadius && distSq > 1) {
        const dist = Math.sqrt(distSq);
        const factor = (1 - dist / blastRadius) * blastForce;
        p.vx += (dx / dist) * factor;
        p.vy += (dy / dist) * factor;
      }
    }

    playShockwaveChime(isAntiGravity ? 660 : 440);
  }

  // --- Physics Simulation Loop ---
  let lastTime = performance.now();
  let frameCount = 0;
  let fpsTimer = 0;

  function updatePhysics(dt) {
    const cx = width / 2;
    const cy = height / 2;
    const mouseActive = state.mouse.active || state.mouse.isDown;
    const targetX = state.mouse.isDown ? state.mouse.x : cx;
    const targetY = state.mouse.isDown ? state.mouse.y : cy;

    const gravitySign = state.gravityInverted ? -1 : 1;
    const gMultiplier = state.gravityPower * gravitySign;
    const antiG = state.antigravityPower;
    const friction = state.friction;
    const preset = state.preset;

    let totalEnergy = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Gravity attractor calculations
      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) + 25.0; // Softening parameter

      // Normalized direction
      const nx = dx / dist;
      const ny = dy / dist;

      // Base gravitational pull
      const force = (gMultiplier * 900) / (distSq + 1200);

      // Mode-specific dynamics
      if (preset === 'orbital') {
        p.vx += nx * force;
        p.vy += ny * force;

        // Slight vortex swirl
        p.vx += -ny * force * 0.45;
        p.vy += nx * force * 0.45;

      } else if (preset === 'singularity') {
        // High vortex singularity accretion disc
        const vortexForce = (Math.abs(gMultiplier) * 1600) / (distSq + 800);
        p.vx += nx * force * 1.5;
        p.vy += ny * force * 1.5;
        // Strong tangential acceleration
        p.vx += -ny * vortexForce * 0.9;
        p.vy += nx * vortexForce * 0.9;

      } else if (preset === 'antigravity') {
        // Repulsion field from center and mouse
        const repulseForce = (antiG * 1800) / (distSq + 900);
        p.vx -= nx * repulseForce;
        p.vy -= ny * repulseForce;
        // Quantum Brownian jitter
        p.vx += (Math.random() - 0.5) * 0.6;
        p.vy += (Math.random() - 0.5) * 0.6;

      } else if (preset === 'constellation') {
        // Gentle equilibrium drift
        p.vx += nx * force * 0.5;
        p.vy += ny * force * 0.5;
      }

      // Mouse interactive force if hovering or clicking
      if (state.mouse.active) {
        const mdx = state.mouse.x - p.x;
        const mdy = state.mouse.y - p.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        const mDist = Math.sqrt(mDistSq) + 15;

        if (mDistSq < 60000) {
          const mnx = mdx / mDist;
          const mny = mdy / mDist;

          if (state.mouse.isRightClick) {
            // Repulsor blast
            const repulse = (antiG * 3500) / (mDistSq + 500);
            p.vx -= mnx * repulse;
            p.vy -= mny * repulse;
          } else if (state.mouse.isDown) {
            // Intense Black Hole pull
            const pull = (Math.abs(gMultiplier) * 4000) / (mDistSq + 500);
            p.vx += mnx * pull;
            p.vy += mny * pull;
          } else {
            // Gentle cursor repulsion bubble
            const bubble = 120 / (mDist + 40);
            p.vx -= mnx * bubble;
            p.vy -= mny * bubble;
          }
        }
      }

      // Apply fluid friction
      p.vx *= friction;
      p.vy *= friction;

      // Integrate position
      p.x += p.vx;
      p.y += p.vy;

      // Elastic boundary reflection
      const margin = 5;
      if (p.x < margin) {
        p.x = margin;
        p.vx *= -0.8;
      } else if (p.x > width - margin) {
        p.x = width - margin;
        p.vx *= -0.8;
      }

      if (p.y < margin) {
        p.y = margin;
        p.vy *= -0.8;
      } else if (p.y > height - margin) {
        p.y = height - margin;
        p.vy *= -0.8;
      }

      totalEnergy += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy);
    }

    state.kineticEnergy = totalEnergy;

    // Modulate audio filter with kinetic energy
    if (state.soundEnabled && droneFilter) {
      const targetFreq = Math.min(1800, 200 + totalEnergy * 0.25);
      droneFilter.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.1);
    }
  }

  // --- Render Loop ---
  function render() {
    const activeTheme = THEMES[state.theme] || THEMES.nebula;

    // Semi-transparent fade clear for motion trails
    ctx.fillStyle = activeTheme.trail;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    // High-performance additive glow blending
    ctx.globalCompositeOperation = 'lighter';

    // Constellation lines rendering
    if (state.preset === 'constellation') {
      ctx.lineWidth = 0.6;
      const maxDistance = 65;
      const maxDistSq = maxDistance * maxDistance;
      const sampleStep = 3; // Optimized subset comparison

      for (let i = 0; i < particles.length; i += sampleStep) {
        const p1 = particles[i];
        for (let j = i + sampleStep; j < particles.length; j += sampleStep) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const alpha = (1 - distSq / maxDistSq) * 0.35;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    // Render Particles
    const colors = activeTheme.colors;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const color = colors[p.colorIndex % colors.length];

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Interactive pointer gravity well indicator
    if (state.mouse.active && (state.mouse.isDown || state.mouse.isRightClick)) {
      ctx.beginPath();
      ctx.arc(state.mouse.x, state.mouse.y, 45, 0, Math.PI * 2);
      ctx.strokeStyle = state.mouse.isRightClick ? 'rgba(255, 71, 87, 0.7)' : 'rgba(0, 242, 254, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- Animation Frame Orchestration ---
  function loop(currentTime) {
    const dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Telemetry FPS calculation
    frameCount++;
    fpsTimer += dt;
    if (fpsTimer >= 0.4) {
      state.fps = Math.round(frameCount / fpsTimer);
      frameCount = 0;
      fpsTimer = 0;
      fpsDisplay.textContent = state.fps;
      kineticEnergyDisplay.textContent = (state.kineticEnergy / 100).toFixed(1) + ' kE';
    }

    updatePhysics(dt);
    render();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  // --- Mouse & Touch Event Listeners ---
  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.active = true;
  });

  window.addEventListener('mousedown', (e) => {
    // Avoid triggering if interacting with UI controls
    if (e.target.closest('.hud-panel') || e.target.closest('.app-header') || e.target.closest('.glass-dialog')) {
      return;
    }
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.isDown = true;
    state.mouse.isRightClick = (e.button === 2 || e.shiftKey);

    triggerShockwave(e.clientX, e.clientY, state.mouse.isRightClick);
  });

  window.addEventListener('mouseup', () => {
    state.mouse.isDown = false;
    state.mouse.isRightClick = false;
  });

  window.addEventListener('contextmenu', (e) => {
    if (!e.target.closest('.hud-panel') && !e.target.closest('.app-header') && !e.target.closest('.glass-dialog')) {
      e.preventDefault();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      triggerShockwave(width / 2, height / 2, false);
    }
  });

  // Touch Support
  window.addEventListener('touchstart', (e) => {
    if (e.target.closest('.hud-panel') || e.target.closest('.app-header')) return;
    if (e.touches.length > 0) {
      const t = e.touches[0];
      state.mouse.x = t.clientX;
      state.mouse.y = t.clientY;
      state.mouse.isDown = true;
      state.mouse.active = true;
      triggerShockwave(t.clientX, t.clientY, false);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      state.mouse.x = t.clientX;
      state.mouse.y = t.clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    state.mouse.isDown = false;
    state.mouse.active = false;
  });

  // --- UI Controls Binding ---

  // Sliders
  sliderParticleCount.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.particleCount = val;
    valParticleCount.textContent = val.toLocaleString();
    initParticles();
  });

  sliderGravity.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    state.gravityPower = val;
    valGravity.textContent = val.toFixed(1) + 'x';
  });

  sliderAntigravity.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    state.antigravityPower = val;
    valAntigravity.textContent = val.toFixed(1) + 'x';
  });

  sliderFriction.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    state.friction = val;
    valFriction.textContent = val.toFixed(3);
  });

  // Simulation Presets
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.preset = btn.dataset.preset;
      triggerShockwave(width / 2, height / 2, state.preset === 'antigravity');
    });
  });

  // Spectral Themes
  const themeChips = document.querySelectorAll('.chip-theme');
  themeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      themeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.theme = chip.dataset.theme;
    });
  });

  // Audio Toggle
  btnAudioToggle.addEventListener('click', toggleAudio);

  // Shockwave Action Button
  btnBurst.addEventListener('click', () => {
    triggerShockwave(width / 2, height / 2, false);
  });

  // Invert Gravity Button
  btnReverseGravity.addEventListener('click', () => {
    state.gravityInverted = !state.gravityInverted;
    btnReverseGravity.style.borderColor = state.gravityInverted ? 'var(--neon-magenta)' : 'var(--glass-border)';
    triggerShockwave(width / 2, height / 2, true);
  });

  // Reset Universe Button
  btnResetParticles.addEventListener('click', () => {
    initParticles();
    triggerShockwave(width / 2, height / 2, false);
  });

  // Screenshot Capture Button
  btnCaptureSnapshot.addEventListener('click', () => {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `antigravity-nexus-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.error('Snapshot capture failed', e);
    }
  });

  // HUD Collapse Toggle
  btnCollapseHud.addEventListener('click', () => {
    hudControls.classList.toggle('collapsed');
    btnCollapseHud.textContent = hudControls.classList.contains('collapsed') ? '+' : '−';
  });

  // Info Modal Dialog
  btnInfoModal.addEventListener('click', () => {
    modalInfo.showModal();
  });

  btnCloseModal.addEventListener('click', () => {
    modalInfo.close();
  });

  btnModalConfirm.addEventListener('click', () => {
    modalInfo.close();
  });

  modalInfo.addEventListener('click', (e) => {
    const rect = modalInfo.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      modalInfo.close();
    }
  });

})();
