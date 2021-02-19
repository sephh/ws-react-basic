import React, { useState } from 'react';
import CounterButton from "./CounterButton";

export interface CounterFunctionProps {
  label: string;
}

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <CounterButton
        label={label}
        counter={counter}
        onClick={increment}
    />
  );
};

export default CounterFunction;
