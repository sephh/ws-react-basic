# State

A estratégia de reatividade do react é muito simples e talvez esteja aí sua beleza.

Para que o React saiba quando é preciso mudar alguma coisa na tela ele faz a diferenciação entre a árvore de 
componentes antiga e a atual, mas ele não faz de forma indiscriminada, para que ele dispare a renderização ele 
precisa ser informado disso e fazemos isso através da mudança de State e Props.

### State - Class Components

O `state` é o estado de um componente específico e controlado por ele mesmo.

Vamos ver como isso funciona tanto para class components quanto para function components.

Primeiro criaremos os components `CounterClass` e `CounterFunction`:

```
import React, {Component} from 'react';

class CounterClass extends Component {
    render() {
        return (
            <button>Counter Class</button>
        );
    }
}

export default CounterClass;
```

```
import React from 'react';

const CounterFunction: React.FC = () => {
    return (
        <button>Counter Function</button>
    );
};

export default CounterFunction;
```

E vamos inseri-los no `App.tsx`:

```
import CounterClass from "./components/CounterClass";
import CounterFunction from "./components/CounterFunction";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <CounterClass/>
                <CounterFunction/>
            </header>
        </div>
    );
}

export default App;
```

Por motivo didático vamos fazer algo aqui que não deve ser feito. 

Vamos adicionar o atributo `counter` no `CounterClass`, criar uma função para modificar o valor desse atributo 
e executar essa função quando o usuário clicar no botão:

```
import React, {Component} from 'react';

class CounterClass extends Component {
    counter: number = 0;

    increment() {
        this.counter++;
    }

    render() {
        return (
            <button onClick={() => this.increment()}>Counter Class {this.counter}</button>
        );
    }
}

export default CounterClass;
```

O que você acha que vai acontecer quando clicar no botão?

O valor do counter não é atualizado na tela. 

Será que a função não está sendo disparada?

Se colocarmos um console na função vamos identificar que ela está sendo disparada normalmente e o valor está mudando.

Nada muda na tela porque o React precisa ser "avisado" de que uma nova rodada de renderização precisa ser iniciada e 
faremos isso através do `state`. 

O componente corrigido fica assim:

```
import React, {Component} from 'react';

class CounterClass extends Component {
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
            <button onClick={() => this.increment()}>Counter Class {this.state.counter}</button>
        );
    }
}

export default CounterClass;
```

### State - Function Components

No caso de Function Components nós também precisamos informar a mudança de `state` para uma nova renderização, mas 
como não estendemos a class `Component`, não temos acesso ao atributo state e ao método setState, precisamos de 
outra estratégia.

Antigamente isso era impossível, mas agora temos os `hooks` para salvar o dia!

O nosso componente fica assim:

```
import React, {useState} from 'react';

const CounterFunction: React.FC = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    }

    return (
        <button onClick={increment}>Counter Function {counter}</button>
    );
};

export default CounterFunction;
```

Vamos valar com mais detalhes sobre hooks no próximo capítulo.
