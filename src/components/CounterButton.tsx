import React from 'react';

export interface CounterButtonProps {
  onClick?: () => void;
  counter?: number;
  label: string;
}

const CounterButton: React.FC<CounterButtonProps> = ({
  label,
  counter = 0,
  onClick = () => {},
}) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {label}
      <span style={styles.tag}>
        {counter}
      </span>
    </button>
  );
};

const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
  },
  tag: {
    marginLeft: '5px',
    backgroundColor: '#282d33',
    color: '#61dafb',
    height: '26px',
    width: '26px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export default CounterButton;
