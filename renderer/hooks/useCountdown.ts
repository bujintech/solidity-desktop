import { useEffect, useRef, useState } from 'react';

const useCountdown = (num: number) => {
  const [count, setCount] = useState(0);

  const timer = useRef<NodeJS.Timeout>();
  const switchRef = useRef(false);

  const countdown = () => {
    if (!switchRef.current) return;

    timer.current = setTimeout(() => {
      setCount((count) => {
        let c = count - 1;
        if (c < 0) {
          c = 0;
          switchRef.current = false;
        }
        return c;
      });

      countdown();
    }, 1000);
  };

  useEffect(() => {
    if (count > 0 && switchRef.current) {
      countdown();
    }

    return () => {
      timer.current && clearTimeout(timer.current);
      // switchRef.current = false;
    };
  }, [count]);

  const stopCountdown = () => {
    timer.current && clearTimeout(timer.current);
  };

  const restartCountdown = (n?: number) => {
    switchRef.current = true;
    setCount(n || num);
  };

  const startCountdown = (n?: number) => {
    switchRef.current = true;
    setCount(n || num);
    // countdown();
  };

  return { count, restartCountdown, startCountdown, stopCountdown };
};

export default useCountdown;
