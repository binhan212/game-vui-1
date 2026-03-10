// ============================================================
// TYPING TROLL — Effects Module
// Confetti, shake, particles, healing popup
// ============================================================

function celebrateWin(isNewRecord) {
  if (typeof confetti !== 'function') return;

  const defaults = {
    spread: 60,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    disableForReducedMotion: true,
    colors: ['#ffebee', '#e0f7fa', '#f3e5f5', '#fffde7', '#ff8a80', '#80deea'],
  };

  confetti({ ...defaults, particleCount: 40, angle: 60, origin: { x: 0, y: 0.7 } });
  confetti({ ...defaults, particleCount: 40, angle: 120, origin: { x: 1, y: 0.7 } });

  if (isNewRecord) {
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        disableForReducedMotion: true,
        colors: ['#ffd700', '#ff6b6b', '#48dbfb', '#ff9ff3'],
      });
    }, 500);
  }
}

function shakeElement(el) {
  el.classList.remove('shake');
  // Force reflow
  void el.offsetWidth;
  el.classList.add('shake');
}

function showHealingPopup(text) {
  // Remove any existing popup
  const old = document.querySelector('.healing-popup');
  if (old) old.remove();

  const popup = document.createElement('div');
  popup.className = 'healing-popup';
  popup.innerHTML =
    '<span class="healing-icon">💛</span>' +
    '<p class="healing-text">' + escapeHTML(text) + '</p>' +
    '<span class="healing-sparkle">✨ Thấm chưa? ✨</span>';

  document.body.appendChild(popup);

  requestAnimationFrame(() => {
    popup.classList.add('healing-popup--visible');
  });

  setTimeout(() => {
    popup.classList.add('healing-popup--fade-out');
    popup.addEventListener('animationend', () => popup.remove(), { once: true });
  }, 2500);
}

function showTrollFeedback(text) {
  const el = document.getElementById('feedback-text');
  if (!el) return;
  const container = document.getElementById('feedback-container');
  el.textContent = text;
  container.classList.remove('hidden', 'fade-out');
  container.classList.add('bounce-in');

  setTimeout(() => {
    container.classList.add('fade-out');
  }, 1500);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
