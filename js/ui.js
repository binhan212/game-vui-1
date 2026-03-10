// ============================================================
// TYPING TROLL — UI Module
// DOM manipulation, rendering, screen management
// ============================================================

// Cached DOM references
const dom = {};

function cacheDom() {
  dom.loadingScreen = document.getElementById('loading-screen');
  dom.gameScreen = document.getElementById('game-screen');
  dom.resultScreen = document.getElementById('result-screen');

  dom.loadingTip = document.getElementById('loading-tip');
  dom.loadingBar = document.getElementById('loading-bar');

  dom.timerDisplay = document.getElementById('timer-display');
  dom.wpmDisplay = document.getElementById('wpm-display');
  dom.accuracyDisplay = document.getElementById('accuracy-display');
  dom.sentenceCount = document.getElementById('sentence-count');
  dom.streakDisplay = document.getElementById('streak-display');
  dom.sentenceDisplay = document.getElementById('sentence-display');
  dom.sentenceIcon = document.getElementById('sentence-icon');
  dom.typingInput = document.getElementById('typing-input');
  dom.feedbackContainer = document.getElementById('feedback-container');
  dom.feedbackText = document.getElementById('feedback-text');

  dom.resultWPM = document.getElementById('result-wpm');
  dom.resultAccuracy = document.getElementById('result-accuracy');
  dom.resultSentences = document.getElementById('result-sentences');
  dom.resultFeedback = document.getElementById('result-feedback');
  dom.resultHealingQuote = document.getElementById('result-healing-quote');
  dom.resultBadge = document.getElementById('result-badge');
  dom.bestWpmDisplay = document.getElementById('best-wpm');

  dom.btnReplay = document.getElementById('btn-replay');
  dom.btnCopy = document.getElementById('btn-copy');
  dom.modeNormal = document.getElementById('mode-normal');
  dom.modeChill = document.getElementById('mode-chill');
  dom.btnDarkMode = document.getElementById('btn-dark-mode');

  dom.toast = document.getElementById('toast');
}

// --- Screen Management ---

function showScreen(screenId) {
  dom.loadingScreen.classList.add('hidden');
  dom.gameScreen.classList.add('hidden');
  dom.resultScreen.classList.add('hidden');

  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');
}

function showLoadingScreen() {
  const tip = getRandomItem(loadingTips);
  dom.loadingTip.textContent = tip.text;
  showScreen('loading-screen');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30 + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        showGameScreen();
      }, 300);
    }
    dom.loadingBar.style.width = progress + '%';
  }, 200);
}

function showGameScreen() {
  showScreen('game-screen');
  dom.typingInput.value = '';
  dom.typingInput.focus();
  updateBestWPM();
}

function showResultScreen(result, isNewRecord) {
  showScreen('result-screen');

  dom.resultWPM.textContent = result.wpm;
  dom.resultAccuracy.textContent = result.accuracy + '%';
  dom.resultSentences.textContent = result.sentencesCompleted;
  dom.resultFeedback.textContent = result.feedback;

  const healingQuote = getRandomHealingQuote();
  dom.resultHealingQuote.textContent = '💛 "' + healingQuote + '"';

  if (isNewRecord) {
    dom.resultBadge.textContent = '🏆 KỶ LỤC MỚI!';
    dom.resultBadge.classList.remove('hidden');
    dom.resultBadge.classList.add('bounce');
  } else {
    dom.resultBadge.classList.add('hidden');
  }

  if (result.wpm > 40) {
    celebrateWin(isNewRecord);
  }
}

// --- Game UI Updates ---

function updateTimerDisplay(seconds) {
  dom.timerDisplay.textContent = seconds + 's';
  if (seconds <= 10) {
    dom.timerDisplay.classList.add('timer-warning');
  } else {
    dom.timerDisplay.classList.remove('timer-warning');
  }
}

function updateWPMDisplay(wpm) {
  dom.wpmDisplay.textContent = wpm + ' WPM';
}

function updateAccuracyDisplay(accuracy) {
  dom.accuracyDisplay.textContent = accuracy + '%';
}

function updateSentenceCount(count) {
  dom.sentenceCount.textContent = 'Câu: ' + count;
}

function updateStreakDisplay(streak) {
  if (streak >= 3) {
    dom.streakDisplay.textContent = '🔥 ' + streak;
    dom.streakDisplay.classList.remove('hidden');
  } else {
    dom.streakDisplay.classList.add('hidden');
  }
}

function renderSentence(sentence) {
  dom.sentenceDisplay.innerHTML = '';
  dom.sentenceIcon.textContent = sentence.isHealing ? '💛' : '🤡';
  dom.sentenceDisplay.parentElement.classList.toggle('healing-sentence', sentence.isHealing);

  for (let i = 0; i < sentence.text.length; i++) {
    const span = document.createElement('span');
    span.textContent = sentence.text[i];
    span.className = i === 0 ? 'char-current' : 'char-pending';
    dom.sentenceDisplay.appendChild(span);
  }

  dom.typingInput.value = '';
  dom.sentenceDisplay.parentElement.classList.add('slide-up');
  setTimeout(() => {
    dom.sentenceDisplay.parentElement.classList.remove('slide-up');
  }, 300);
}

function updateCharHighlight(original, typed) {
  const chars = dom.sentenceDisplay.children;
  for (let i = 0; i < original.length; i++) {
    if (i < typed.length) {
      chars[i].className = typed[i] === original[i] ? 'char-correct' : 'char-wrong';
    } else if (i === typed.length) {
      chars[i].className = 'char-current';
    } else {
      chars[i].className = 'char-pending';
    }
  }
}

function updateBestWPM() {
  const best = getBestWPM();
  if (dom.bestWpmDisplay) {
    dom.bestWpmDisplay.textContent = best > 0 ? '🏆 Best: ' + best + ' WPM' : '';
  }
}

// --- Dark Mode ---

function applyTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (dom.btnDarkMode) {
    dom.btnDarkMode.textContent = isDark ? '☀️' : '🌙';
  }
}

function applyMode(mode) {
  document.body.classList.remove('mode-normal', 'mode-chill');
  document.body.classList.add('mode-' + mode);
  if (dom.modeNormal && dom.modeChill) {
    dom.modeNormal.classList.toggle('active', mode === 'normal');
    dom.modeChill.classList.toggle('active', mode === 'chill');
  }
}

// --- Toast ---

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.remove('hidden');
  dom.toast.classList.add('toast-show');
  setTimeout(() => {
    dom.toast.classList.remove('toast-show');
    dom.toast.classList.add('hidden');
  }, 2000);
}

// --- Copy Result ---

function copyResultToClipboard(result) {
  const quote = dom.resultHealingQuote ? dom.resultHealingQuote.textContent : '';
  const text =
    '🎮 Typing Troll: ' + result.wpm + ' WPM | ' + result.accuracy + '% chính xác\n' +
    '💬 ' + quote + '\n' +
    '👉 Thử ngay!';

  navigator.clipboard.writeText(text).then(() => {
    showToast('Đã copy! Paste lên story đi 🔥');
  }).catch(() => {
    showToast('Không copy được 😅');
  });
}

function resetGameUI() {
  dom.timerDisplay.textContent = '60s';
  dom.timerDisplay.classList.remove('timer-warning');
  dom.wpmDisplay.textContent = '0 WPM';
  dom.accuracyDisplay.textContent = '100%';
  dom.sentenceCount.textContent = 'Câu: 0';
  dom.streakDisplay.classList.add('hidden');
  dom.feedbackContainer.classList.add('hidden');
  dom.typingInput.value = '';
}
