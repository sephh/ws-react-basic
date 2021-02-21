import React, { Component } from 'react';
import CounterButton from './CounterButton';

export interface CounterClassProps {
  label: string;
}

class CounterClass extends Component<CounterClassProps> {
  state = {
    counter: 0,
  };

  increment() {
    let { counter } = this.state;
    counter += 5;
    this.setState({ counter });
  }

  render() {
    const { label } = this.props;
    const { counter } = this.state;

    return (
      <CounterButton
        label={label}
        counter={counter}
        onClick={() => this.increment()}
      />
    );
  }
}

export default CounterClass;
