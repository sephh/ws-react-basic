import React from 'react';
import './App.css';
import CounterClass from './components/CounterClass';
import CounterFunction from './components/CounterFunction';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CounterFunction label={'Counter Function'} />
      </header>
    </div>
  );
}

export default App;
