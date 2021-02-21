# Hooks

Hooks é uma feature nova do React que trouxe novos poderes para os Functional Components, principalmente no que diz 
respeito a estado.

Existem vários hooks e inclusive você pode criar o seu, mas vamos falar somente dos dois principais, useState e 
useEffect, e como criar um customizado.

### useState

O `useState`, como já vimos no material sobre state, é utilizado para gerenciar o estado de um componente.

Ele é uma função que retorna um array com duas posições: a primeira com o valor do estado e a segunda com a função 
responsável por modificá-lo.

O primeiro parâmetro da função recebe o estado inicia. Nós também podemos passar uma função que retorna o estado 
inicial, caso haja algum processamento. Essa função só é executada uma vez.

Vamos para a prática:

```
import React, { useState } from 'react';
import CounterButton from './CounterButton';

export interface CounterFunctionProps {
  label: string;
}

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const [counter, setCounter] = useState(3);
  const [doubleResult, setDoubleResult] = useState(counter * 2);

  const increment = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    setDoubleResult(2 * newCounter);
  };

  return (
    <>
      <div style={styles.double}>Dobro: {doubleResult}</div>
      <CounterButton label={label} counter={counter} onClick={increment} />
    </>
  );
};

const styles = {
  double:{
    marginBottom: '10px'
  }
};

export default CounterFunction;
```

### useEffect

O `useEffect` é um hook utilizado para o ciclo de vida do componente. Ele é disparado na inicialização do componente ou
quando tem uma nova rodada de renderização e possui um método de cleanup para quando o componente é destruído.

Ele tem dois parâmetros: o primeiro é um callback e o segundo é uma lista de dependências para identificar quando o 
hook deve ser disparado.

No nosso exemplo sobre `useState` queremos que o estado `double` seja modificado sempre que o `counter` mudar e
não está muito legal como foi implementado. Vamos refatorar com `useEffect`.

```
import React, { useEffect, useState } from 'react';
import CounterButton from './CounterButton';

export interface CounterFunctionProps {
  label: string;
}

const double = (num: number) => {
  return 2 * num;
};

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const [counter, setCounter] = useState(0);
  const [doubleResult, setDoubleResult] = useState(double(counter));

  const increment = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setDoubleResult(double(counter));
  }, [counter]);

  return (
    <>
      <div style={styles.double}>Dobro: {doubleResult}</div>
      <CounterButton label={label} counter={counter} onClick={increment} />
    </>
  );
};

const styles = {
  double: {
    marginBottom: '10px',
  },
};

export default CounterFunction;
```

Nesse exemplo vimos como funciona a função de callback e o array de dependências. Outra coisa importante é a função 
de cleanup. Vamos modificar o `CounterButton` e o `CounterFunction`.

No CounterButton vamos adicionar o Cleanup:

```
import React, { useEffect } from 'react';

export interface CounterButtonProps {
  onClick?: () => void;
  counter?: number;
  label: string;
}

function logDocumentClick() {
  console.log('cliquei no console');
}

const CounterButton: React.FC<CounterButtonProps> = ({
  label,
  counter = 0,
  onClick = () => {},
}) => {
  useEffect(() => {
    document.addEventListener('click', logDocumentClick);

    return () => {
      console.log('removeu');
      document.removeEventListener('click', logDocumentClick);
    };
  }, []);

  return (
      <button style={styles.button} onClick={onClick}>
        {label}
        <span style={styles.tag}>{counter}</span>
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
    alignItems: 'center',
  },
};

export default CounterButton;
```

No CounterFunction vamos destruir o CounterButton quando o `counter` chegar a 10.

```
import React, { useEffect, useState } from 'react';
import CounterButton from './CounterButton';

export interface CounterFunctionProps {
  label: string;
}

const double = (num: number) => {
  return 2 * num;
};

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const [counter, setCounter] = useState(0);
  const [doubleResult, setDoubleResult] = useState(double(counter));

  const increment = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setDoubleResult(double(counter));
  }, [counter]);

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
```

Agora quando o componente de botão é destruído, o evento no document é removido.

### Custom Hooks

Você também pode criar seu próprio hook!

É muito fácil, basta criar uma função que retorna o que você desejar.

Dessa forma podemos remover a lógica do component e reaproveitá-la.

Vamos fazer isso com a lógica do `CounterFunction`.

Primeiro vamos criar o nosso hook em `src/hooks/use-counter.ts`:

```
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
```

Nosso `CounterFunction` fica bem mais simples agora:

```
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
```

