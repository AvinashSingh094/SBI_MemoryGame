import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Multi-stage firework burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#00b4d8', '#f59e0b', '#1e6fd9']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ffffff', '#fbbf24', '#38bdf8']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#22d3ee', '#3b82f6', '#facc15']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#0ea5e9', '#6366f1', '#eab308']
  });
}
