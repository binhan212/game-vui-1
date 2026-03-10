// ============================================================
// TYPING TROLL — Timer Module
// ============================================================

class GameTimer {
  constructor(duration, onTick, onEnd) {
    this.duration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.intervalId = null;
    this.running = false;
    this.startTime = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.startTime = Date.now();
    this.remaining = this.duration;

    this.intervalId = setInterval(() => {
      const elapsed = (Date.now() - this.startTime) / 1000;
      this.remaining = Math.max(0, this.duration - elapsed);

      this.onTick(Math.ceil(this.remaining));

      if (this.remaining <= 0) {
        this.stop();
        this.onEnd();
      }
    }, 100); // Update every 100ms for smooth countdown
  }

  stop() {
    this.running = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.remaining = this.duration;
    this.startTime = null;
  }

  getElapsed() {
    if (!this.startTime) return 0;
    return (Date.now() - this.startTime) / 1000;
  }

  isRunning() {
    return this.running;
  }
}
