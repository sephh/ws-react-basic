import { useEffect, useState } from 'react';

export interface UseCounterProps {
  counter?: number;
}

export interface UseCounter {
  counter: number;
  doubleResult: number;
  increment: () => void;
}

const double = (num: number) => num * 2;

export function useCounter({
  counter: initialCounter = 0,
}: UseCounterProps): UseCounter {
  const [counter, setCounter] = useState(initialCounter);
  const [doubleResult, setDoubleResult] = useState(double(counter));

  const increment = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setDoubleResult(double(counter));
  }, [counter]);

  return {
    increment,
    counter,
    doubleResult,
  };
}
