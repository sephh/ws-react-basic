# Props

Props, nome que vem de propriedades, é a forma pela qual um componente `pai` se comunica com seu componente `filho`.

Em 99% dos casos o dado no React segue apenas um fluxo top down, seria um one-way data binding, ou seja, você não 
vai alterar o valor de uma prop no componente filho.

Se algum dia você precisar(eu nunca precisei) usar two-way data binding você pode utilizar o LinkedStateMixin, mas é 
uma feature avançada e não fará parte desse workshop. 

### Props - Class Components

No caso de Class Components props sera um atributo da classe Component.

Vamos experimentar:

```
import React, {Component} from 'react';

export interface CounterClassProps{
    label: string;
}

class CounterClass extends Component<CounterClassProps> {
    state = {
        counter: 0
    };

    increment() {
        let {counter} = this.state;
        counter++;
        this.setState({counter});
    }

    render() {
        return (
            <button onClick={() => this.increment()}>
                {this.props.label} {this.state.counter}
            </button>
        );
    }
}

export default CounterClass;
```

### Props - Function Components

No caso dos Function Components, `props` são atributos do primeiro parâmetro da função.

Nosso componente ficaria assim:

```
import React, { useState } from 'react';

export interface CounterFunctionProps {
  label: string;
}

const CounterFunction: React.FC<CounterFunctionProps> = ({ label }) => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <button onClick={increment}>
      {label} {counter}
    </button>
  );
};

export default CounterFunction;
```

### Desafio - 5 min

Agora que vimos state e props, vamos lançar um desafio para a criação de um componente para o botão do contador.

Esse componente será utilizado tanto no Class, quanto no Function Component, e terá os seguintes requisitos:

Deverá ter uma propriedade para o texto que será exibido no botão, uma propriedade para mostrar o valor do contador 
e uma propriedade para o evento de click do botão.

Mão na massa!
