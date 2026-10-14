/**
 * ====================================================================
 * BIRTHDAY GREETING WEBSITE - JAVASCRIPT LOGIC & CUSTOMIZATION
 * ====================================================================
 */

/* ====================================================================
   🛠️ 1. USER CONFIGURATION (ตั้งค่าข้อมูลส่วนตัวตรงนี้ได้เลย)
   ==================================================================== */
const CONFIG = {
  // 1.1 ชื่อเจ้าของวันเกิด
  birthdayName: "คิตตี้เอินจังดิวะ",

  // 1.2 วันที่ / เดือน (แสดงที่ลายเซ็นการ์ด)
  signatureDate: "ตุลาคม 2026",

  // 1.3 ลายเซ็นผู้ส่ง
  signatureFrom: "See you again 💖",

  // 1.4 ข้อความอวยพร (3-4 ประโยค)
  wishes: [
    "คำอวยพรไดก็คงไม่เท่ากับเราลงมือทำเองและ ไงก็ต้องขยันหาความรู้เยอะละตอนนี้ AI IA น่ากลัวมาก เว็บนี้ก็ให้ AI ทำให้ 70 % แทบไม่ต้องทำไรเลยถ้ามีความรู้หน่อยน่าจะทำได้ดีกว่านี้ถือว่าลองครูไป อิอิอิ",
    "ไงก็ถ้ามีความสุขดีก็ไม่ต้องทักมาหากันก็ได้ จะรับปริญญา งานแต่ง จะงานบวชลูกขึ้นบ้านใหม่ ถูกหวย ไม่ต้องโทรมาเดี๋ยวเราอิจฉา แต่ถ้ามีเรื่องทุขใจหรือมีปัญหาเมื่อไหร่ค่อยโทรมานะเหมือนเมื่อตอนนั้นที่โทรมาหาเรา เวลานั้นค่อยโทยมาหานะอย่ามัวแต่ยืนตากฝนอย่างเดียวละ -///-",
    "ขอคุณความทรงจำดีๆนะ ขอเสียของมันคงเดี๋ยวก็คงลืมแต่ข้อดีมันก็มีคือเราสามารถขึ้นใหม่ได้🎂✨"
  ],

  // 1.5 ลิงก์เพลงเบื้องหลัง (Background Music)
  musicUrl: "music/SinBad_mp3.mp3", 

  // 1.6 แกลเลอรีรูปภาพความทรงจำ 7 รูป สำหรับ 7 จุดเช็คอินในเกม
  photos: [
    {
      url: "images/เด็กตะกะ.mp4",
      date: "Memories 01",
      caption: "เป็นไงบ้างไปเป็นเด็กตะมูมมามที่อื่นมั้ย 🍰"
    },
    {
      url: "images/เป็นคนเหนือไงถึงอู้เก่ง.mp4",
      date: "Memories 02",
      caption: "สู็ๆนะเดือนสุดท้ายแล้วถ้าเหนื่อยก็อู้บ้างเหมือนที่เคยทำ -_-"
    },
    {
      url: "images/photo3.jpg",
      date: "Memories 03",
      caption: "เล็บก็เบาๆบ้าง 🌸"
    },
    {
      url: "images/photo2.jpg",
      date: "Memories 04",
      caption: "อย่านอนดึกบ่อยละ สมองอ้องหมด 🌅"
    },
    {
      url: "images/ขอบคุนสำหรับมื้อสุดท้ายของชีวิต.mp4",
      date: "Memories 05",
      caption: "ขอบคุณของขวัญที่ล้ำค่าคืออาหารมื้อสุดท้าย 🎁"
    },
    {
      url: "images/photo6.jpg",
      date: "Memories 06",
      caption: "ขอให้มีความสุขในทุกวินาที 🥂✨"
    },
    {
      url: "images/photo4.jpg",
      date: "Memories 07",
      caption: "ไม่มีไรตลกดี 655455 🎉💖"
    },
    {
      url: "images/ขอบคุณสำหรับโมเม้นสรรหา.mp4",
      date: "Memories 08",
      caption: "ความทรงจำสุดพิเศษที่แบ่งปันกัน 💕"
    }
  ]
};

// Helper: Check if media URL is a video
function isVideoMedia(url) {
  if (!url) return false;
  return /\.(mp4|mov|webm|ogg)$/i.test(url);
}

/* ====================================================================
   🎉 2. CONFETTI ENGINE (พลุกระดาษเฉลิมฉลอง Canvas Engine)
   ==================================================================== */
class ConfettiManager {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationFrame = null;
    this.colors = [
      '#FF8FA3', '#F8B4C4', '#FFB3C6',
      '#E5BA73', '#F7D794', '#D4AF37',
      '#FFFDF9', '#FAF0CA', '#F4ACB7'
    ];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(options = {}) {
    const count = options.count || 120;
    const originX = options.x !== undefined ? options.x : window.innerWidth / 2;
    const originY = options.y !== undefined ? options.y : window.innerHeight / 2.5;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 9 + 5,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * 10,
        opacity: 1,
        gravity: 0.28,
        drag: 0.96,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    if (!this.animationFrame) {
      this.animate();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.007;

      if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    } else {
      this.animationFrame = null;
    }
  }
}

/* ====================================================================
   🎵 3. AUDIO PLAYER & WEB AUDIO API MUSIC BOX SYNTHESIZER
   ==================================================================== */
class BirthdayAudioPlayer {
  constructor() {
    this.audioEl = document.getElementById('bg-music');
    this.toggleBtn = document.getElementById('music-toggle-btn');
    this.tooltip = document.getElementById('music-tooltip');
    this.isPlaying = false;
    this.audioCtx = null;
    this.melodyTimer = null;
    this.isSynthPlaying = false;

    this.initEvents();
  }

  initEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    const unlockAudio = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio, { once: true });
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.toggleBtn) {
      this.toggleBtn.classList.add('playing');
      if (this.tooltip) this.tooltip.textContent = 'หยุดเพลง ⏸️';
    }

    if (CONFIG.musicUrl && this.audioEl) {
      if (this.audioEl.src !== CONFIG.musicUrl) {
        this.audioEl.src = CONFIG.musicUrl;
      }
      this.audioEl.play().catch(() => {
        this.playSynthesizerMelody();
      });
    } else {
      this.playSynthesizerMelody();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.toggleBtn) {
      this.toggleBtn.classList.remove('playing');
      if (this.tooltip) this.tooltip.textContent = 'เปิดเพลง 🎵';
    }

    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopSynthesizerMelody();
  }

  playSynthesizerMelody() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.isSynthPlaying = true;

    const melody = [
      { note: 261.63, duration: 0.35, pause: 0.1 },
      { note: 261.63, duration: 0.25, pause: 0.05 },
      { note: 293.66, duration: 0.6, pause: 0.1 },
      { note: 261.63, duration: 0.6, pause: 0.1 },
      { note: 349.23, duration: 0.6, pause: 0.1 },
      { note: 329.63, duration: 1.1, pause: 0.3 },

      { note: 261.63, duration: 0.35, pause: 0.1 },
      { note: 261.63, duration: 0.25, pause: 0.05 },
      { note: 293.66, duration: 0.6, pause: 0.1 },
      { note: 261.63, duration: 0.6, pause: 0.1 },
      { note: 392.00, duration: 0.6, pause: 0.1 },
      { note: 349.23, duration: 1.1, pause: 0.3 },

      { note: 261.63, duration: 0.35, pause: 0.1 },
      { note: 261.63, duration: 0.25, pause: 0.05 },
      { note: 523.25, duration: 0.6, pause: 0.1 },
      { note: 440.00, duration: 0.6, pause: 0.1 },
      { note: 349.23, duration: 0.6, pause: 0.1 },
      { note: 329.63, duration: 0.6, pause: 0.1 },
      { note: 293.66, duration: 0.9, pause: 0.25 },

      { note: 466.16, duration: 0.35, pause: 0.1 },
      { note: 466.16, duration: 0.25, pause: 0.05 },
      { note: 440.00, duration: 0.6, pause: 0.1 },
      { note: 349.23, duration: 0.6, pause: 0.1 },
      { note: 392.00, duration: 0.6, pause: 0.1 },
      { note: 349.23, duration: 1.4, pause: 0.8 }
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.isSynthPlaying || !this.isPlaying) return;

      const item = melody[noteIdx];
      this.triggerChimeTone(item.note, item.duration);

      const delay = (item.duration + item.pause) * 1000;
      noteIdx = (noteIdx + 1) % melody.length;
      this.melodyTimer = setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  triggerChimeTone(freq, duration) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.audioCtx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {}
  }

  stopSynthesizerMelody() {
    this.isSynthPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  playCelebrationChime() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.triggerChimeTone(note, 0.6);
      }, index * 100);
    });
  }

  playVictoryFanfare() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (!this.audioCtx) return;

    const fanfare = [
      { note: 523.25, delay: 0 },
      { note: 523.25, delay: 150 },
      { note: 523.25, delay: 300 },
      { note: 659.25, delay: 450 },
      { note: 783.99, delay: 650 },
      { note: 1046.50, delay: 900 }
    ];
    fanfare.forEach(item => {
      setTimeout(() => {
        this.triggerChimeTone(item.note, 0.7);
      }, item.delay);
    });
  }

  playLockedSound() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.audioCtx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.17);
    } catch(e) {}
  }
}
/* =========================================================
   🎂 4. INTERACTIVE CAKE & CANDLE BLOWING
   ========================================================= */
class CakeInteraction {
  constructor(confetti, audioPlayer) {
    this.confetti = confetti;
    this.audioPlayer = audioPlayer;
    this.blowBtn = document.getElementById('blow-candle-btn');
    this.relightBtn = document.getElementById('relight-candle-btn');
    this.wishCard = document.getElementById('wish-reveal-card');
    this.flames = document.querySelectorAll('.flame');
    this.smokes = document.querySelectorAll('.smoke');
    this.candles = document.querySelectorAll('.candle');
    this.isBlown = false;

    this.init();
  }

  init() {
    if (this.blowBtn) {
      this.blowBtn.addEventListener('click', () => this.blowCandles());
    }

    if (this.relightBtn) {
      this.relightBtn.addEventListener('click', () => this.relightCandles());
    }

    this.candles.forEach(candle => {
      candle.addEventListener('click', () => {
        if (!this.isBlown) {
          this.blowCandles();
        }
      });
    });
  }

  blowCandles() {
    if (this.isBlown) return;
    this.isBlown = true;

    this.flames.forEach(flame => {
      flame.classList.add('extinguished');
    });

    this.smokes.forEach(smoke => {
      smoke.classList.remove('rise');
      void smoke.offsetWidth;
      smoke.classList.add('rise');
    });

    if (this.audioPlayer) {
      this.audioPlayer.playCelebrationChime();
    }

    if (this.confetti) {
      const rect = document.getElementById('cake-container')?.getBoundingClientRect();
      const originX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const originY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      this.confetti.burst({ x: originX, y: originY, count: 140 });
    }

    if (this.wishCard) {
      this.wishCard.classList.add('revealed');
      this.wishCard.setAttribute('aria-hidden', 'false');
    }

    if (this.blowBtn) this.blowBtn.classList.add('hidden');
    if (this.relightBtn) this.relightBtn.classList.remove('hidden');
  }

  relightCandles() {
    this.isBlown = false;

    this.flames.forEach(flame => {
      flame.classList.remove('extinguished');
    });

    this.smokes.forEach(smoke => {
      smoke.classList.remove('rise');
    });

    if (this.wishCard) {
      this.wishCard.classList.remove('revealed');
      this.wishCard.setAttribute('aria-hidden', 'true');
    }

    if (this.blowBtn) this.blowBtn.classList.remove('hidden');
    if (this.relightBtn) this.relightBtn.classList.add('hidden');
  }
}

/* =========================================================
   🎁 5. INTERACTIVE SURPRISE GIFT BOX
   ========================================================= */
class GiftBoxInteraction {
  constructor(confetti, audioPlayer) {
    this.giftBox = document.getElementById('gift-box');
    this.hintText = document.getElementById('gift-hint-text');
    this.confetti = confetti;
    this.audioPlayer = audioPlayer;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.giftBox) return;

    this.giftBox.addEventListener('click', () => this.toggleGift());
    this.giftBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleGift();
      }
    });

    // Hello Kitty Voucher Download Button
    const downloadBtn = document.getElementById('btn-download-coupon');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent collapsing the gift box
        this.downloadKittyCoupon();
      });
    }
  }

  downloadKittyCoupon() {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 620;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1000, 620);
    bgGrad.addColorStop(0, '#fff5f7');
    bgGrad.addColorStop(0.5, '#ffedf2');
    bgGrad.addColorStop(1, '#ffe3ea');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1000, 620);

    // Cute background polka dots
    ctx.fillStyle = 'rgba(255, 182, 193, 0.35)';
    for (let x = 25; x < 1000; x += 50) {
      for (let y = 25; y < 620; y += 50) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Ticket Outline with Rounded Corners & Side Notches
    ctx.save();
    ctx.strokeStyle = '#ff5c8a';
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(30, 30, 940, 560);
    ctx.restore();

    // Side ticket notches
    ctx.fillStyle = '#fdfaf6';
    ctx.beginPath();
    ctx.arc(30, 310, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ff5c8a';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(970, 310, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // 3. Hello Kitty Mascot Illustration (at x = 500, y = 125)
    const kx = 500;
    const ky = 125;
    ctx.save();
    ctx.translate(kx, ky);

    // Head background & outline
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-50, -10);
    ctx.bezierCurveTo(-65, -55, -40, -75, -25, -50);
    ctx.bezierCurveTo(-10, -56, 10, -56, 25, -50);
    ctx.bezierCurveTo(40, -75, 65, -55, 50, -10);
    ctx.bezierCurveTo(75, 15, 65, 55, 0, 56);
    ctx.bezierCurveTo(-65, 55, -75, 15, -50, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Inner pink ear touches
    ctx.strokeStyle = '#ffb6c1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-36, -34, 10, 0.8, 2.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(36, -34, 10, 0.8, 2.3);
    ctx.stroke();

    // Eyes
    ctx.fillStyle = '#333333';
    ctx.beginPath();
    ctx.ellipse(-24, 0, 4.5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(24, 0, 4.5, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rosy Blushing Cheeks
    ctx.fillStyle = 'rgba(255, 182, 193, 0.7)';
    ctx.beginPath();
    ctx.ellipse(-42, 12, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(42, 12, 9, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Yellow Nose
    ctx.fillStyle = '#ffcc00';
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 8, 6, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Whiskers Left
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-45, -3); ctx.lineTo(-72, -8);
    ctx.moveTo(-47, 8);  ctx.lineTo(-74, 8);
    ctx.moveTo(-45, 19); ctx.lineTo(-72, 24);
    ctx.stroke();

    // Whiskers Right
    ctx.beginPath();
    ctx.moveTo(45, -3); ctx.lineTo(72, -8);
    ctx.moveTo(47, 8);  ctx.lineTo(74, 8);
    ctx.moveTo(45, 19); ctx.lineTo(72, 24);
    ctx.stroke();

    // Kitty Red Bow on Left Ear
    ctx.fillStyle = '#ff2e63';
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-35, -45);
    ctx.bezierCurveTo(-55, -65, -60, -35, -35, -32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-25, -45);
    ctx.bezierCurveTo(-5, -65, 0, -35, -25, -32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-30, -38, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-32, -40, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 4. Badge Pill
    ctx.save();
    ctx.fillStyle = '#ff4071';
    const badgeW = 340;
    const badgeH = 36;
    const badgeX = 500 - badgeW / 2;
    const badgeY = 205;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 18);
    } else {
      ctx.rect(badgeX, badgeY, badgeW, badgeH);
    }
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Prompt, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎀 HELLO KITTY BIRTHDAY VOUCHER 🎀', 500, badgeY + badgeH / 2);
    ctx.restore();

    // 5. Title
    ctx.fillStyle = '#d81b60';
    ctx.font = 'bold 32px Prompt, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('คูปองพิเศษสำหรับวันเกิด', 500, 278);

    // 6. Reward Box
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffccd5';
    ctx.lineWidth = 2;
    const boxW = 820;
    const boxH = 90;
    const boxX = 500 - boxW / 2;
    const boxY = 305;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(boxX, boxY, boxW, boxH, 18);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#4a3b3a';
    ctx.font = 'bold 24px Prompt, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('"คูปองพาไปเลี้ยงของอร่อย 1 มื้อใหญ่ + ตามใจคนพิเศษ 1 วันเต็ม! 🍰🍽️"', 500, boxY + boxH / 2);
    ctx.restore();

    // 7. Voucher Code & Validity
    ctx.fillStyle = '#d81b60';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CODE: HBD-KITTY-2026', 500, 435);

    ctx.fillStyle = '#7d6b6a';
    ctx.font = '500 18px Prompt, sans-serif';
    ctx.fillText('ใช้ได้ตลอดไป ไม่มีวันหมดอายุ 💌💖', 500, 470);

    // 8. Watermark Footer
    ctx.fillStyle = '#ff8da1';
    ctx.font = '600 15px Prompt, sans-serif';
    ctx.fillText('✨ สุขสันต์วันเกิดแด่คนพิเศษ • Special Birthday Gift ✨', 500, 535);

    // 9. Download Trigger
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'hello-kitty-birthday-coupon.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Sound & Confetti feedback
    if (this.audioPlayer) this.audioPlayer.playCelebrationChime();
    if (this.confetti) this.confetti.burst({ count: 90 });

    const btn = document.getElementById('btn-download-coupon');
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> บันทึกคูปองเรียบร้อยแล้ว! 🎀💖';
      btn.style.background = 'linear-gradient(135deg, #2ec4b6, #20a496)';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
      }, 2500);
    }
  }

  toggleGift() {
    this.isOpen = !this.isOpen;
    this.giftBox.classList.toggle('open', this.isOpen);

    if (this.isOpen) {
      if (this.hintText) {
        this.hintText.innerHTML = '<i class="fa-regular fa-face-smile"></i> แตะอีกครั้งเพื่อปิดกล่อง';
      }

      if (this.audioPlayer) {
        this.audioPlayer.playCelebrationChime();
      }

      if (this.confetti) {
        const rect = this.giftBox.getBoundingClientRect();
        this.confetti.burst({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          count: 100
        });
      }
    } else {
      if (this.hintText) {
        this.hintText.innerHTML = '<i class="fa-regular fa-hand-pointer"></i> คลิกที่กล่องเพื่อเปิดของขวัญ';
      }
    }
  }
}

/* =========================================================
   🎮 6. MEMORY TRAIL LINE-TRACING MINIGAME (เกมลากเส้น 7 จุด)
   ========================================================= */
class MemoryTrailGame {
  constructor(confetti, audioPlayer) {
    this.confetti = confetti;
    this.audioPlayer = audioPlayer;

    // Elements
    this.mapWrapper = document.getElementById('game-map-wrapper');
    this.avatar = document.getElementById('trail-avatar');
    this.walkedPath = document.getElementById('trail-road-walked');
    this.progressFill = document.getElementById('progress-fill-bar');
    this.countText = document.getElementById('unlocked-count-text');
    this.guideText = document.getElementById('game-guide-text');

    // Modals
    this.popupModal = document.getElementById('checkpoint-popup-modal');
    this.popupImg = document.getElementById('popup-img');
    this.popupVideo = document.getElementById('popup-video');
    this.popupTag = document.getElementById('popup-memory-tag');
    this.popupCaption = document.getElementById('popup-caption');
    this.popupCloseBtn = document.getElementById('popup-close-btn');
    this.popupContinueBtn = document.getElementById('popup-continue-btn');

    this.victoryModal = document.getElementById('victory-popup-modal');
    this.victoryViewBtn = document.getElementById('victory-view-gallery-btn');
    this.btnReset = document.getElementById('btn-reset-game');

    // Album Container & Teaser
    this.albumContainer = document.getElementById('unlocked-album-container');
    this.albumTeaser = document.getElementById('album-locked-teaser');

    // 10 Station Nodes along the path (Start, CP1-8, Finish)
    this.stations = [
      { id: 'node-start', x: 9.3, y: 17.4, type: 'start', label: 'จุดเริ่มต้น' },
      { id: 'node-cp-1', x: 29.1, y: 17.4, type: 'cp', cpIndex: 0, label: 'รูปที่ 1' },
      { id: 'node-cp-2', x: 54.6, y: 17.4, type: 'cp', cpIndex: 1, label: 'รูปที่ 2' },
      { id: 'node-cp-3', x: 87.2, y: 23.9, type: 'cp', cpIndex: 2, label: 'รูปที่ 3' },
      { id: 'node-cp-4', x: 79.1, y: 53.3, type: 'cp', cpIndex: 3, label: 'รูปที่ 4' },
      { id: 'node-cp-5', x: 50.0, y: 53.3, type: 'cp', cpIndex: 4, label: 'รูปที่ 5' },
      { id: 'node-cp-6', x: 19.8, y: 55.4, type: 'cp', cpIndex: 5, label: 'รูปที่ 6' },
      { id: 'node-cp-7', x: 31.4, y: 85.9, type: 'cp', cpIndex: 6, label: 'รูปที่ 7' },
      { id: 'node-cp-8', x: 57.5, y: 85.9, type: 'cp', cpIndex: 7, label: 'รูปที่ 8' },
      { id: 'node-finish', x: 83.7, y: 85.9, type: 'finish', label: 'เส้นชัย' }
    ];

    // Game state
    this.currentStep = 0; // 0 = at start, 1..7 = cp1..7, 8 = finish
    this.unlockedCheckpoints = new Set();
    this.isDragging = false;
    this.totalDashLength = 2200;

    this.init();
  }

  init() {
    if (!this.mapWrapper || !this.avatar) return;

    // 1. Compute exact station lengths along SVG road
    this.computeStationLengths();

    // 2. Setup SVG Path Dash
    if (this.walkedPath) {
      this.walkedPath.style.strokeDasharray = `${this.totalDashLength}`;
      this.walkedPath.style.strokeDashoffset = `${this.totalDashLength}`;
    }

    // 3. Setup Pointer Dragging on Avatar and Map
    this.setupDragging();

    // 4. Setup Click-to-Move on Nodes
    this.stations.forEach((st, idx) => {
      const el = document.getElementById(st.id);
      if (el) {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleNodeClick(idx);
        });
      }
    });

    // 5. Modal event listeners
    if (this.popupCloseBtn) {
      this.popupCloseBtn.addEventListener('click', () => this.closePopup());
    }
    if (this.popupContinueBtn) {
      this.popupContinueBtn.addEventListener('click', () => this.closePopup());
    }
    const popupBackdrop = document.getElementById('checkpoint-popup-backdrop');
    if (popupBackdrop) {
      popupBackdrop.addEventListener('click', () => this.closePopup());
    }

    if (this.victoryViewBtn) {
      this.victoryViewBtn.addEventListener('click', () => {
        if (this.victoryModal) this.victoryModal.classList.remove('active');
        const album = this.albumContainer || document.getElementById('unlocked-album-container');
        if (album) album.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // 6. Game Control Buttons
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => this.resetGame());
    }

    // Hide album initially until game is finished
    this.hideAlbum();

    // Initialize display
    this.updateStatusDisplay();
  }

  computeStationLengths() {
    this.stationLengths = [];
    if (!this.walkedPath || typeof this.walkedPath.getTotalLength !== 'function') {
      this.totalPathLength = 2200;
      this.totalDashLength = 2200;
      this.stationLengths = [0, 170, 390, 720, 950, 1200, 1460, 1760, 1980, 2200];
    return;
  }

  // On double-tap / double-click on the avatar, advance to next station
  this.avatar.addEventListener('dblclick', () => {
    const nextIdx = this.currentStep + 1;
    if (nextIdx < this.stations.length) {
      this.reachStation(nextIdx);
    }
  });

    try {
      this.totalPathLength = this.walkedPath.getTotalLength() || 2200;
      this.totalDashLength = this.totalPathLength;

      const targetPoints = [
        { x: 80, y: 80 },    // Start
        { x: 250, y: 80 },   // CP 1
        { x: 470, y: 80 },   // CP 2
        { x: 750, y: 110 },  // CP 3
        { x: 680, y: 245 },  // CP 4
        { x: 430, y: 245 },  // CP 5
        { x: 170, y: 255 },  // CP 6
        { x: 270, y: 395 },  // CP 7
        { x: 495, y: 395 },  // CP 8
        { x: 720, y: 395 }   // Finish
      ];

      this.stationLengths = [0];
      let searchL = 0;

      for (let i = 1; i < targetPoints.length; i++) {
        const target = targetPoints[i];
        let bestL = searchL;
        let minSqDist = Infinity;

        // Step by 2px along path
        for (let l = searchL; l <= this.totalPathLength; l += 2) {
          const pt = this.walkedPath.getPointAtLength(l);
          const dx = pt.x - target.x;
          const dy = pt.y - target.y;
          const sqDist = dx * dx + dy * dy;

          if (sqDist < minSqDist) {
            minSqDist = sqDist;
            bestL = l;
          } else if (sqDist > minSqDist && sqDist > 64 && l > bestL + 25) {
            // Passed station and getting farther
            break;
          }
        }

        // Fine tune around bestL
        let refinedL = bestL;
        const lowL = Math.max(searchL, bestL - 4);
        const highL = Math.min(this.totalPathLength, bestL + 4);
        for (let l = lowL; l <= highL; l += 0.25) {
          const pt = this.walkedPath.getPointAtLength(l);
          const dx = pt.x - target.x;
          const dy = pt.y - target.y;
          const sqDist = dx * dx + dy * dy;
          if (sqDist < minSqDist) {
            minSqDist = sqDist;
            refinedL = l;
          }
        }

        this.stationLengths.push(refinedL);
        searchL = refinedL;
      }
    } catch (e) {
      console.warn('SVG path calculation error, using fallback lengths:', e);
      this.totalPathLength = 2200;
      this.totalDashLength = 2200;
      this.stationLengths = [0, 170, 390, 720, 950, 1200, 1460, 1760, 2200];
    }
  }

  setupDragging() {
    const onPointerDown = (e) => {
      if (this.currentStep >= this.stations.length - 1) return;
      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;

      this.isDragging = true;
      this.avatar.classList.add('dragging');
      if (this.mapWrapper.setPointerCapture) {
        try { this.mapWrapper.setPointerCapture(e.pointerId); } catch(err){}
      }
      this.processMove(e);
    };

    // Double-tap / double-click on the avatar = advance to next station
    this.avatar.addEventListener('dblclick', () => {
      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;
      const nextIdx = this.currentStep + 1;
      if (nextIdx < this.stations.length) {
        this.reachStation(nextIdx);
      }
    });

    const onPointerMove = (e) => {
      // If a modal is open, don't process drag moves (but keep isDragging
      // so the drag can resume when the modal closes).
      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;
      if (!this.isDragging) return;
      this.processMove(e);
    };

    // Right-click on the avatar = also advance to next station
    this.avatar.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;
      const nextIdx = this.currentStep + 1;
      if (nextIdx < this.stations.length) {
        this.reachStation(nextIdx);
      }
    });

    const onPointerUp = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.avatar.classList.remove('dragging');
      if (this.mapWrapper.releasePointerCapture) {
        try { this.mapWrapper.releasePointerCapture(e.pointerId); } catch(err){}
      }

      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;

      // On pointer up: check if the cursor is close to the next station.
      // If so, jump there directly. This catches releases just short of the
      // node where processMove's path-sample trigger may not have fired.
      const nextIdx = this.currentStep + 1;
      const nextStation = this.stations[nextIdx];
      if (nextStation && nextIdx < this.stations.length) {
        const rect = this.mapWrapper.getBoundingClientRect();
        if (rect.width && rect.height) {
          const cx = ((e.clientX - rect.left) / rect.width) * 860;
          const cy = ((e.clientY - rect.top) / rect.height) * 460;
          const tx = (nextStation.x / 100) * 860;
          const ty = (nextStation.y / 100) * 460;
              if (Math.hypot(cx - tx, cy - ty) < 800) {
            this.reachStation(nextIdx);
            return;
          }
        }
      }

      // Snap avatar back to the current confirmed station and reset the
      // walked-path stroke to that station's length.
      const cur = this.stations[this.currentStep];
      if (cur) {
        this.setAvatarPosition(cur.x, cur.y);
      }
      if (this.walkedPath) {
        const curL = (this.stationLengths && this.stationLengths[this.currentStep] !== undefined)
          ? this.stationLengths[this.currentStep]
          : 0;
        this.walkedPath.style.strokeDashoffset = `${this.totalDashLength - curL}`;
      }
    };

    this.avatar.addEventListener('pointerdown', onPointerDown);
    this.mapWrapper.addEventListener('pointermove', onPointerMove);
    this.mapWrapper.addEventListener('pointerup', onPointerUp);
    this.mapWrapper.addEventListener('pointercancel', onPointerUp);

    // Double-tap / double-click on the avatar = advance to next station
    this.avatar.addEventListener('dblclick', () => {
      if (this.popupModal && this.popupModal.classList.contains('active')) return;
      if (this.victoryModal && this.victoryModal.classList.contains('active')) return;
      const nextIdx = this.currentStep + 1;
      if (nextIdx < this.stations.length) {
        this.reachStation(nextIdx);
      }
    });
  }

  processMove(e) {
    if (this.currentStep >= this.stations.length - 1) return;

    const rect = this.mapWrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // Convert screen coordinates to SVG viewBox space (860 x 460)
    const svgX = ((e.clientX - rect.left) / rect.width) * 860;
    const svgY = ((e.clientY - rect.top) / rect.height) * 460;

    const startL = (this.stationLengths && this.stationLengths[this.currentStep] !== undefined)
      ? this.stationLengths[this.currentStep]
      : 0;
    const nextIdx = this.currentStep + 1;
    const endL = (this.stationLengths && this.stationLengths[nextIdx] !== undefined)
      ? this.stationLengths[nextIdx]
      : this.totalPathLength;

    const segmentLength = endL - startL;
    if (segmentLength <= 0) return;

    // Adaptive sampling: more samples on longer / curvy segments
    // so the avatar can reliably reach the endpoint of each segment.
    const baseSamples = 48;
    const extraSamples = Math.min(60, Math.floor(segmentLength / 18));
    const samples = baseSamples + extraSamples;

    let bestL = startL;
    let minSqDist = Infinity;

    // Coarse sweep along the active segment only
    for (let i = 0; i <= samples; i++) {
      const l = startL + (segmentLength * i) / samples;
      const pt = this.walkedPath.getPointAtLength(l);
      const dx = pt.x - svgX;
      const dy = pt.y - svgY;
      const sqDist = dx * dx + dy * dy;
      if (sqDist < minSqDist) {
        minSqDist = sqDist;
        bestL = l;
      }
    }

    // Fine-grain polish around bestL (sub-pixel steps)
    const stepSize = segmentLength / samples;
    const fineLow = Math.max(startL, bestL - stepSize);
    const fineHigh = Math.min(endL, bestL + stepSize);
    for (let l = fineLow; l <= fineHigh; l += stepSize / 8) {
      const pt = this.walkedPath.getPointAtLength(l);
      const dx = pt.x - svgX;
      const dy = pt.y - svgY;
      const sqDist = dx * dx + dy * dy;
      if (sqDist < minSqDist) {
        minSqDist = sqDist;
        bestL = l;
      }
    }

    // Clamp strictly within [startL, endL]
    bestL = Math.max(startL, Math.min(endL, bestL));

    // Place avatar exactly on the road curve
    const curPt = this.walkedPath.getPointAtLength(bestL);
    const xPct = (curPt.x / 860) * 100;
    const yPct = (curPt.y / 460) * 100;
    this.setAvatarPosition(xPct, yPct);

    // Live illuminate walked path up to current dragged position
    if (this.walkedPath) {
      const walkedOffset = Math.max(0, this.totalDashLength - bestL);
      this.walkedPath.style.strokeDashoffset = `${walkedOffset}`;
    }

    // Check if reached next checkpoint
    const targetStation = this.stations[nextIdx];
    const targetSvgX = (targetStation.x / 100) * 860;
    const targetSvgY = (targetStation.y / 100) * 460;
    const distToTarget = Math.hypot(svgX - targetSvgX, svgY - targetSvgY);

    // Trigger conditions for reaching the next station:
    // 1) avatar dragged far enough along the active segment (within generous
    //    tolerance of the station position on the road), OR
    // 2) cursor/touch is near the target node (helps on curved approaches).
    // Values are intentionally generous so EVERY segment unblocks reliably,
    // including the curved 3→4, ascending 4→5, and wrap-around 6→7.
    const reachedEndOfSegment = bestL >= endL - 350;
    const cursorNearTarget = distToTarget < 800;

    if (reachedEndOfSegment || cursorNearTarget) {
      this.isDragging = false;
      this.avatar.classList.remove('dragging');
      this.reachStation(nextIdx);
    }
  }

  handleNodeClick(idx) {
    if (idx === this.currentStep + 1) {
      // Reached next station via click/tap!
      this.reachStation(idx);
    } else if (idx > this.currentStep + 1) {
      // Locked station clicked! Cannot skip ahead!
      const el = document.getElementById(this.stations[idx].id);
      if (el) {
        el.classList.remove('shake');
        void el.offsetWidth; // retrigger reflow
        el.classList.add('shake');
      }
      if (this.audioPlayer && this.audioPlayer.playLockedSound) {
        this.audioPlayer.playLockedSound();
      }
      const nextTargetNum = (this.currentStep + 1 < this.stations.length - 1)
        ? `จุดที่ ${this.currentStep + 1}`
        : 'จุดเส้นชัย 🏁';
      this.showGuideWarning(`🔒 จุดนี้ยังล็อคอยู่! ต้องผ่าน ${nextTargetNum} ก่อนนะ`);
    } else if (idx <= this.currentStep && idx > 0) {
      // Already unlocked checkpoint -> re-open photo modal
      const st = this.stations[idx];
      if (st.type === 'cp' && st.cpIndex !== undefined) {
        this.showPhotoPopup(st.cpIndex);
      }
    } else if (idx === 0) {
      this.showGuideWarning('🚩 จุดเริ่มต้นของการเดินทาง!');
    }
  }

  showGuideWarning(text) {
    if (!this.guideText) return;
    if (this.warningTimeout) clearTimeout(this.warningTimeout);

    const pill = document.getElementById('game-guide-pill');
    if (pill) {
      pill.classList.remove('pill-warning');
      void pill.offsetWidth;
      pill.classList.add('pill-warning');
    }

    this.guideText.textContent = text;
    this.warningTimeout = setTimeout(() => {
      if (pill) pill.classList.remove('pill-warning');
      this.updateStatusDisplay();
    }, 2400);
  }

  reachStation(idx) {
    this.currentStep = idx;
    const target = this.stations[idx];

    // Snap avatar smoothly
    this.setAvatarPosition(target.x, target.y);

    // Mark target DOM node as unlocked
    const el = document.getElementById(target.id);
    if (el) {
      el.classList.remove('locked', 'current', 'shake');
      el.classList.add('unlocked');
    }

    // Advance next target node to 'current' pulse
    const nextIdx = idx + 1;
    if (nextIdx < this.stations.length) {
      const nextEl = document.getElementById(this.stations[nextIdx].id);
      if (nextEl) {
        nextEl.classList.remove('locked', 'shake');
        nextEl.classList.add('current');
      }
    }

    // Animate SVG path progress to exact station length
    if (this.walkedPath) {
      const curL = (this.stationLengths && this.stationLengths[idx] !== undefined)
        ? this.stationLengths[idx]
        : (this.totalDashLength * (idx / (this.stations.length - 1)));
      const newOffset = Math.max(0, this.totalDashLength - curL);
      this.walkedPath.style.strokeDashoffset = `${newOffset}`;
    }

    // If checkpoint station (CP1 - CP7)
    if (target.type === 'cp') {
      const cpIdx = target.cpIndex;
      this.unlockedCheckpoints.add(cpIdx);

      // Audio & Confetti
      if (this.audioPlayer) this.audioPlayer.playCelebrationChime();
      if (this.confetti) {
        const rect = el ? el.getBoundingClientRect() : null;
        const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        this.confetti.burst({ x: cx, y: cy, count: 60 });
      }

      // Unlock card in gallery below
      this.unlockGalleryCard(cpIdx);

      // Show Checkpoint Reveal Modal
      setTimeout(() => {
        this.showPhotoPopup(cpIdx);
      }, 250);

    } else if (target.type === 'finish') {
      // Reached FINISH LINE!
      if (this.audioPlayer) this.audioPlayer.playVictoryFanfare();
      if (this.confetti) {
        this.confetti.burst({ count: 180, x: window.innerWidth / 2, y: window.innerHeight / 2.5 });
      }
      // Reveal the hidden album!
      this.revealAlbum();
      setTimeout(() => {
        if (this.victoryModal) this.victoryModal.classList.add('active');
      }, 400);
    }

    this.updateStatusDisplay();
  }

  setAvatarPosition(xPct, yPct) {
    this.avatar.style.left = `${xPct}%`;
    this.avatar.style.top = `${yPct}%`;
  }

  showPhotoPopup(cpIdx) {
    const photo = CONFIG.photos[cpIdx];
    if (!photo || !this.popupModal) return;

    const isVid = isVideoMedia(photo.url);
    if (isVid) {
      if (this.popupImg) this.popupImg.style.display = 'none';
      if (this.popupVideo) {
        this.popupVideo.style.display = 'block';
        this.popupVideo.src = photo.url;
        this.popupVideo.play().catch(() => {});
      }
    } else {
      if (this.popupVideo) {
        this.popupVideo.pause();
        this.popupVideo.style.display = 'none';
      }
      if (this.popupImg) {
        this.popupImg.style.display = 'block';
        this.popupImg.src = photo.url;
      }
    }

    if (this.popupTag) this.popupTag.textContent = photo.date || `Memories 0${cpIdx + 1}`;
    if (this.popupCaption) this.popupCaption.textContent = photo.caption;

    this.popupModal.classList.add('active');
    this.popupModal.setAttribute('aria-hidden', 'false');
  }

  closePopup() {
    if (this.popupVideo) {
      this.popupVideo.pause();
    }
    if (this.popupModal) {
      this.popupModal.classList.remove('active');
      this.popupModal.setAttribute('aria-hidden', 'true');
    }
  }

  unlockGalleryCard(cpIdx) {
    const card = document.querySelector(`.gallery-card[data-index="${cpIdx}"]`);
    if (card) {
      card.classList.remove('is-locked');
      const badge = card.querySelector('.card-locked-badge');
      if (badge) badge.remove();
    }
  }

  updateStatusDisplay() {
    const count = this.unlockedCheckpoints.size;
    if (this.countText) {
      this.countText.textContent = `ปลดล็อกแล้ว ${count} / 8 รูป`;
    }
    if (this.progressFill) {
      const pct = (this.currentStep / (this.stations.length - 1)) * 100;
      this.progressFill.style.width = `${pct}%`;
    }

    if (this.guideText) {
      if (this.currentStep === 0) {
        this.guideText.textContent = 'ลากตัวนำทาง หรือแตะจุดที่ 1 เพื่อเริ่ม!';
      } else if (this.currentStep < 8) {
        this.guideText.textContent = `เยี่ยมมาก! มุ่งหน้าสู่จุดที่ ${this.currentStep + 1} ต่อไป`;
      } else if (this.currentStep === 8) {
        this.guideText.textContent = 'จุดสุดท้ายแล้ว! ลากเข้าเส้นชัย 🏁 ได้เลย!';
      } else {
        this.guideText.textContent = '🎉 ถึงเส้นชัยแล้ว! ยินดีด้วยนะ!';
      }
    }
  }

  unlockAllPhotos() {
    for (let i = 1; i < this.stations.length; i++) {
      const st = this.stations[i];
      const el = document.getElementById(st.id);
      if (el) {
        el.classList.remove('locked', 'current');
        el.classList.add('unlocked');
      }
      if (st.type === 'cp' && st.cpIndex !== undefined) {
        this.unlockedCheckpoints.add(st.cpIndex);
        this.unlockGalleryCard(st.cpIndex);
      }
    }

    this.currentStep = this.stations.length - 1;
    const finish = this.stations[this.currentStep];
    this.setAvatarPosition(finish.x, finish.y);

    if (this.walkedPath) {
      this.walkedPath.style.strokeDashoffset = '0';
    }

    if (this.audioPlayer) this.audioPlayer.playVictoryFanfare();
    if (this.confetti) {
      this.confetti.burst({ count: 180 });
    }

    // Reveal the hidden album!
    this.revealAlbum();

    this.updateStatusDisplay();
    setTimeout(() => {
      if (this.victoryModal) this.victoryModal.classList.add('active');
    }, 400);
  }

  resetGame() {
    this.currentStep = 0;
    this.unlockedCheckpoints.clear();

    // Reset station nodes
    this.stations.forEach((st, idx) => {
      const el = document.getElementById(st.id);
      if (el) {
        el.classList.remove('unlocked', 'current');
        if (idx === 0) el.classList.add('unlocked');
        else if (idx === 1) el.classList.add('current');
        else el.classList.add('locked');
      }
    });

    // Reset path & avatar
    const start = this.stations[0];
    this.setAvatarPosition(start.x, start.y);

    if (this.walkedPath) {
      this.walkedPath.style.strokeDashoffset = `${this.totalDashLength}`;
    }

    // Reset gallery cards to locked
    document.querySelectorAll('.gallery-card').forEach((card, idx) => {
      card.classList.add('is-locked');
      if (!card.querySelector('.card-locked-badge')) {
        const badge = document.createElement('div');
        badge.className = 'card-locked-badge';
        badge.innerHTML = `<i class="fa-solid fa-lock"></i> ปลดล็อกผ่านจุดเช็ค ${idx + 1}`;
        card.querySelector('.card-image-wrap')?.appendChild(badge);
      }
    });

    // Re-hide album until game finishes again
    this.hideAlbum();

    this.updateStatusDisplay();
  }

  revealAlbum() {
    if (this.albumTeaser) {
      this.albumTeaser.classList.add('hidden');
    }
    if (this.albumContainer) {
      this.albumContainer.classList.remove('hidden');
      this.albumContainer.classList.add('revealed');
    }
    // Unlock all cards in album
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.classList.remove('is-locked');
      const badge = card.querySelector('.card-locked-badge');
      if (badge) badge.remove();
    });
  }

  hideAlbum() {
    if (this.albumTeaser) {
      this.albumTeaser.classList.remove('hidden');
    }
    if (this.albumContainer) {
      this.albumContainer.classList.add('hidden');
      this.albumContainer.classList.remove('revealed');
    }
  }
}

/* =========================================================
   📸 7. PHOTO GALLERY & LIGHTBOX MODAL
   ========================================================= */
class GalleryLightbox {
  constructor() {
    this.modal = document.getElementById('lightbox-modal');
    this.backdrop = document.getElementById('lightbox-backdrop');
    this.modalImg = document.getElementById('lightbox-img');
    this.modalVideo = document.getElementById('lightbox-video');
    this.caption = document.getElementById('lightbox-caption');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');

    this.currentIndex = 0;
    this.imagesData = [];

    this.init();
  }

  init() {
    this.refreshCards();

    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
    if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());
    if (this.prevBtn) this.prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });

    document.addEventListener('keydown', (e) => {
      if (!this.modal || !this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  refreshCards() {
    this.imagesData = [];
    const cards = document.querySelectorAll('.gallery-card');

    cards.forEach((card, idx) => {
      const mediaEl = card.querySelector('.gallery-img, .gallery-video');
      const captionText = card.getAttribute('data-caption') || mediaEl?.getAttribute('alt') || '';
      const src = mediaEl?.getAttribute('src') || '';
      this.imagesData.push({
        src: src,
        caption: captionText,
        isVideo: isVideoMedia(src)
      });

      card.addEventListener('click', () => {
        this.open(idx);
      });
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateModal();
    if (this.modal) {
      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.modalVideo) {
      this.modalVideo.pause();
    }
    if (this.modal) {
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.imagesData.length) % this.imagesData.length;
    this.updateModal();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imagesData.length;
    this.updateModal();
  }

  updateModal() {
    const data = this.imagesData[this.currentIndex];
    if (!data) return;

    if (data.isVideo) {
      if (this.modalImg) this.modalImg.style.display = 'none';
      if (this.modalVideo) {
        this.modalVideo.style.display = 'block';
        this.modalVideo.src = data.src;
        this.modalVideo.play().catch(() => {});
      }
    } else {
      if (this.modalVideo) {
        this.modalVideo.pause();
        this.modalVideo.style.display = 'none';
      }
      if (this.modalImg) {
        this.modalImg.style.display = 'block';
        this.modalImg.src = data.src;
      }
    }

    if (this.caption) this.caption.textContent = data.caption;
  }
}

/* =========================================================
   🚀 8. INITIALIZATION & DATA BINDING
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render initial texts and photo gallery from CONFIG
  applyCustomizations();

  // 2. Initialize Confetti
  const confetti = new ConfettiManager('confetti-canvas');
  setTimeout(() => {
    confetti.burst({ count: 90, x: window.innerWidth / 2, y: window.innerHeight / 3 });
  }, 400);

  // 3. Initialize Audio
  const audioPlayer = new BirthdayAudioPlayer();

  // 4. Initialize Cake & Gift Box
  new CakeInteraction(confetti, audioPlayer);
  new GiftBoxInteraction(confetti, audioPlayer);

  // 5. Initialize Memory Trail Minigame!
  new MemoryTrailGame(confetti, audioPlayer);

  // 6. Initialize Lightbox
  new GalleryLightbox();

  // 7. Confetti Button in Message Card
  const celebrateBtn = document.getElementById('celebrate-btn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      confetti.burst({ count: 150 });
      audioPlayer.playCelebrationChime();
    });
  }
});

/**
 * Sync custom text and parameters from CONFIG to DOM
 */
function applyCustomizations() {
  const nameEl = document.getElementById('display-name');
  const cardRecipientEl = document.getElementById('card-recipient-name');
  if (nameEl && CONFIG.birthdayName) nameEl.textContent = CONFIG.birthdayName;
  if (cardRecipientEl && CONFIG.birthdayName) cardRecipientEl.textContent = CONFIG.birthdayName;

  const dateEl = document.getElementById('current-date-display');
  if (dateEl && CONFIG.signatureDate) dateEl.textContent = CONFIG.signatureDate;

  const signatureHandwritten = document.querySelector('.signature-handwritten');
  if (signatureHandwritten && CONFIG.signatureFrom) signatureHandwritten.textContent = CONFIG.signatureFrom;

  const wishesContainer = document.getElementById('greeting-message-text');
  if (wishesContainer && CONFIG.wishes && CONFIG.wishes.length > 0) {
    wishesContainer.innerHTML = CONFIG.wishes.map(paragraph => `<p>${paragraph}</p>`).join('');
  }

  // Render 7 Photo/Video Gallery Cards (initially locked for the game)
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid && CONFIG.photos && CONFIG.photos.length > 0) {
    galleryGrid.innerHTML = CONFIG.photos.map((item, idx) => {
      const isVid = isVideoMedia(item.url);
      const mediaHtml = isVid
        ? `<video src="${item.url}" class="gallery-video" muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()"></video>`
        : `<img src="${item.url}" alt="${item.caption}" class="gallery-img" loading="lazy">`;

      return `
        <div class="gallery-card is-locked" data-index="${idx}" data-caption="${item.caption}">
          <div class="card-image-wrap">
            ${mediaHtml}
            <div class="card-locked-badge">
              <i class="fa-solid fa-lock"></i> ปลดล็อกผ่านจุดเช็ค ${idx + 1}
            </div>
            <div class="card-overlay">
              <i class="fa-solid fa-${isVid ? 'play' : 'magnifying-glass-plus'} overlay-icon"></i>
            </div>
          </div>
          <div class="card-caption">
            <span class="caption-date">${item.date || ('Memories ' + String(idx + 1).padStart(2, '0'))}</span>
            <p class="caption-text">${item.caption}</p>
          </div>
        </div>
      `;
    }).join('');
  }
}