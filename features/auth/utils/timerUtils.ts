export const timerUtils = {
  formatTime: (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  createTimer: (initialTime: number, onTick: (time: number) => void, onExpire: () => void) => {
    let timeLeft = initialTime;

    const timer = setInterval(() => {
      timeLeft = Math.max(timeLeft - 1, 0);
      onTick(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  },
};
