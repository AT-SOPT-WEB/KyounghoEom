import { TIMING } from '../constants';

export const startCountdown = (
  duration: number,
  callback: () => void,
  countdownRef: React.MutableRefObject<number | null>,
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
) => {
  let count = duration / TIMING.COUNTDOWN_INTERVAL;
  console.log('카운트다운 시작');
  
  countdownRef.current = window.setInterval(() => {
    console.log(count);
    count--;
    if (count === 0 && countdownRef.current) {
      clearInterval(countdownRef.current);
    }
  }, TIMING.COUNTDOWN_INTERVAL);
  
  timeoutRef.current = setTimeout(callback, duration);
}; 