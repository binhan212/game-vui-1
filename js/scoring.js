// ============================================================
// TYPING TROLL — Scoring Module
// ============================================================

// Standard: 1 word = 5 characters (including spaces)
function calculateWPM(correctChars, elapsedSeconds) {
  if (elapsedSeconds <= 0) return 0;
  const minutes = elapsedSeconds / 60;
  const words = correctChars / 5;
  return Math.round(words / minutes);
}

function calculateAccuracy(correctChars, totalChars) {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
}

function getWPMLevel(wpm) {
  if (wpm > 80) return 'legendary';
  if (wpm > 60) return 'pro';
  if (wpm > 40) return 'good';
  if (wpm > 20) return 'average';
  return 'slow';
}

function getResultFeedback(wpm, mode) {
  const level = getWPMLevel(wpm);
  const fb = resultFeedbacks[level];
  // In chill mode, always use healing feedback
  if (mode === 'chill') return fb.healing;
  // Normal mode: 70% troll, 30% healing
  return Math.random() < 0.7 ? fb.troll : fb.healing;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomHealingQuote() {
  return getRandomItem(healingSentences).text;
}

function getRandomSentence(mode, usedIds) {
  const healingRatio = mode === 'chill' ? 0.5 : 0.3;
  const isHealing = Math.random() < healingRatio;
  const pool = isHealing ? healingSentences : trollSentences;

  // Try to avoid recently used sentences
  const available = pool.filter(s => !usedIds.has(s.id));
  const source = available.length > 0 ? available : pool;
  const sentence = getRandomItem(source);

  return { ...sentence, isHealing };
}

function getSentenceFeedback(isHealing, wpmCurrent, trollStreak, mode) {
  // Chill mode: always healing feedback
  if (mode === 'chill') return getRandomItem(healingFeedbacks);
  // Force healing after 3+ troll streak
  if (trollStreak >= 3 && !isHealing) return getRandomItem(healingFeedbacks);
  if (isHealing) return getRandomItem(healingFeedbacks);
  if (wpmCurrent < 25) return getRandomItem(trollFeedbacksSlow);
  return getRandomItem(trollFeedbacks);
}
