import React from 'react';
import CounterButton from './CounterButton';
import { useCounter } from '../hooks/use-counter';

export interface CounterFunctionProps {
  label: string;
}

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const { counter, increment, doubleResult } = useCounter({});

  return (
    <>
      <div style={styles.double}>Dobro: {doubleResult}</div>
      {counter < 10 && (
        <CounterButton label={label} counter={counter} onClick={increment} />
      )}
    </>
  );
};
const styles = {
  double: {
    marginBottom: '10px',
  },
};
export default CounterFunction;
