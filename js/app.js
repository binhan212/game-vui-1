// ============================================================
// TYPING TROLL — Main Game Controller
// ============================================================

const GAME_DURATION = 60;

class TypingTrollGame {
  constructor() {
    this.state = 'idle'; // idle | playing | gameover
    this.mode = 'normal';
    this.timer = null;
    this.wpm = 0;
    this.accuracy = 100;
    this.correctChars = 0;
    this.totalChars = 0;
    this.sentencesCompleted = 0;
    this.currentSentence = null;
    this.currentIndex = 0;
    this.trollStreak = 0;
    this.correctStreak = 0;
    this.usedIds = new Set();
    this.roundCount = 0;
    this.idleTimeout = null;
    this.lastResult = null;
  }

  init() {
    cacheDom();

    // Load saved settings
    const settings = loadSettings();
    this.mode = settings.mode || 'normal';
    const isDark = settings.darkMode || false;

    applyTheme(isDark);
    applyMode(this.mode);

    this.bindEvents();
    this.prepareNewRound();
    showLoadingScreen();
  }

  bindEvents() {
    // Typing input
    dom.typingInput.addEventListener('input', (e) => this.onInput(e));

    // Prevent paste
    dom.typingInput.addEventListener('paste', (e) => {
      e.preventDefault();
      showToast('Gõ chứ đừng paste! 😤');
    });

    // Mode toggles
    if (dom.modeNormal) {
      dom.modeNormal.addEventListener('click', () => this.setMode('normal'));
    }
    if (dom.modeChill) {
      dom.modeChill.addEventListener('click', () => this.setMode('chill'));
    }

    // Dark mode toggle
    if (dom.btnDarkMode) {
      dom.btnDarkMode.addEventListener('click', () => this.toggleDarkMode());
    }

    // Replay
    if (dom.btnReplay) {
      dom.btnReplay.addEventListener('click', () => this.restart());
    }

    // Copy score
    if (dom.btnCopy) {
      dom.btnCopy.addEventListener('click', () => {
        if (this.lastResult) copyResultToClipboard(this.lastResult);
      });
    }
  }

  setMode(mode) {
    this.mode = mode;
    saveSetting('mode', mode);
    applyMode(mode);

    if (this.state === 'idle') {
      this.prepareNewRound();
    }
  }

  toggleDarkMode() {
    const settings = loadSettings();
    const newDark = !settings.darkMode;
    saveSetting('darkMode', newDark);
    applyTheme(newDark);
  }

  prepareNewRound() {
    this.correctChars = 0;
    this.totalChars = 0;
    this.sentencesCompleted = 0;
    this.currentIndex = 0;
    this.trollStreak = 0;
    this.correctStreak = 0;
    this.wpm = 0;
    this.accuracy = 100;
    this.usedIds = new Set();

    resetGameUI();
    this.loadNextSentence();
    this.startIdleTimer();
  }

  loadNextSentence() {
    const sentence = getRandomSentence(this.mode, this.usedIds);
    this.currentSentence = sentence;
    this.currentIndex = 0;
    this.usedIds.add(sentence.id);

    // Track troll streak
    if (!sentence.isHealing) {
      this.trollStreak++;
    } else {
      this.trollStreak = 0;
    }

    // Force healing if too many trolls in a row
    if (this.trollStreak > 3) {
      const available = healingSentences.filter(s => !this.usedIds.has(s.id));
      const source = available.length > 0 ? available : healingSentences;
      const healingOverride = { ...getRandomItem(source), isHealing: true };
      this.currentSentence = healingOverride;
      this.usedIds.add(healingOverride.id);
      this.trollStreak = 0;
    }

    renderSentence(this.currentSentence);
  }

  startIdleTimer() {
    this.clearIdleTimer();
    this.idleTimeout = setTimeout(() => {
      if (this.state === 'idle') {
        showToast(getRandomItem(idleMessages));
      }
    }, 10000);
  }

  clearIdleTimer() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
  }

  startGame() {
    this.state = 'playing';
    this.clearIdleTimer();

    this.timer = new GameTimer(
      GAME_DURATION,
      (remaining) => updateTimerDisplay(remaining),
      () => this.endGame()
    );
    this.timer.start();
  }

  onInput(e) {
    const typed = dom.typingInput.value;

    // Start game on first input
    if (this.state === 'idle' && typed.length > 0) {
      this.startGame();
    }

    if (this.state !== 'playing') return;

    const original = this.currentSentence.text;

    // Count chars for accuracy (handle multiple chars between events)
    const prevIndex = this.currentIndex;
    let hadWrong = false;
    for (let i = prevIndex; i < Math.min(typed.length, original.length); i++) {
      this.totalChars++;
      if (typed[i] === original[i]) {
        this.correctChars++;
        this.correctStreak++;
      } else {
        this.correctStreak = 0;
        hadWrong = true;
      }
    }
    if (hadWrong) shakeElement(dom.sentenceDisplay);

    this.currentIndex = typed.length;

    // Update visuals
    updateCharHighlight(original, typed);
    this.updateLiveStats();

    // Check sentence completion
    if (typed.length >= original.length) {
      // Verify all chars match
      let allCorrect = true;
      for (let i = 0; i < original.length; i++) {
        if (typed[i] !== original[i]) {
          allCorrect = false;
          break;
        }
      }

      this.sentencesCompleted++;
      updateSentenceCount(this.sentencesCompleted);

      // Show feedback
      const feedbackText = getSentenceFeedback(
        this.currentSentence.isHealing,
        this.wpm,
        this.trollStreak,
        this.mode
      );

      if (this.currentSentence.isHealing) {
        showHealingPopup(feedbackText);
      } else {
        showTrollFeedback(feedbackText);
      }

      // Load next
      this.loadNextSentence();
    }
  }

  updateLiveStats() {
    if (!this.timer) return;
    const elapsed = this.timer.getElapsed();
    this.wpm = calculateWPM(this.correctChars, elapsed);
    this.accuracy = calculateAccuracy(this.correctChars, this.totalChars);

    updateWPMDisplay(this.wpm);
    updateAccuracyDisplay(this.accuracy);
    updateStreakDisplay(this.correctStreak);
  }

  endGame() {
    this.state = 'gameover';
    this.clearIdleTimer();

    const elapsed = this.timer ? this.timer.getElapsed() : GAME_DURATION;
    const wpm = calculateWPM(this.correctChars, elapsed);
    const accuracy = calculateAccuracy(this.correctChars, this.totalChars);
    const feedback = getResultFeedback(wpm, this.mode);

    const result = {
      wpm,
      accuracy,
      sentencesCompleted: this.sentencesCompleted,
      wordsTyped: Math.round(this.correctChars / 5),
      feedback,
      date: new Date().toISOString().slice(0, 10),
      mode: this.mode,
    };

    this.lastResult = result;
    this.roundCount++;

    // Save score
    const isNewRecord = saveScore(result);

    // Check wellbeing reminder
    if (this.roundCount > 0 && this.roundCount % 5 === 0) {
      setTimeout(() => {
        showToast(getRandomItem(wellbeingReminders));
      }, 3000);
    }

    showResultScreen(result, isNewRecord);
  }

  restart() {
    if (this.timer) this.timer.reset();
    this.state = 'idle';
    showGameScreen();
    this.prepareNewRound();
  }
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  // Auto-detect system dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    const settings = loadSettings();
    if (settings.darkMode === undefined || settings.darkMode === null) {
      saveSetting('darkMode', true);
    }
  }

  const game = new TypingTrollGame();
  game.init();
});
