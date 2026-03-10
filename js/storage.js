// ============================================================
// TYPING TROLL — Storage Layer (localStorage wrapper)
// ============================================================

const STORAGE_KEY = 'typing-troll-data';

const DEFAULT_DATA = {
  version: 1,
  scores: [],
  settings: {
    mode: 'normal',
    darkMode: false,
  },
  stats: {
    totalGames: 0,
    totalWordsTyped: 0,
    bestWPM: 0,
    bestAccuracy: 0,
  },
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_DATA };
    const parsed = JSON.parse(raw);
    // Merge with defaults for forward-compat
    return {
      ...DEFAULT_DATA,
      ...parsed,
      settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
      stats: { ...DEFAULT_DATA.stats, ...(parsed.stats || {}) },
    };
  } catch {
    return { ...DEFAULT_DATA };
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function loadSettings() {
  return loadData().settings;
}

function saveSetting(key, value) {
  const data = loadData();
  data.settings[key] = value;
  saveData(data);
}

function loadScores() {
  return loadData().scores;
}

function saveScore(score) {
  const data = loadData();
  data.scores.push(score);
  // Sort by WPM desc, keep top 10
  data.scores.sort((a, b) => b.wpm - a.wpm);
  data.scores = data.scores.slice(0, 10);

  // Update stats
  data.stats.totalGames++;
  data.stats.totalWordsTyped += score.wordsTyped || 0;
  if (score.wpm > data.stats.bestWPM) data.stats.bestWPM = score.wpm;
  if (score.accuracy > data.stats.bestAccuracy) data.stats.bestAccuracy = score.accuracy;

  saveData(data);
  return data.scores[0].wpm === score.wpm; // Returns true if new high score
}

function getBestWPM() {
  const data = loadData();
  return data.stats.bestWPM;
}

function getStats() {
  return loadData().stats;
}
