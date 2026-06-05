export const tapVibrate = () => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    // 50ms vibration as requested
    navigator.vibrate(50);
  }
};
