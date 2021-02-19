# Componentes

Componentes são a base do React e uma aplicação será composta por vários deles.

Function e Class Components são os dois tipos de componentes do React e vamos ver como criar cada um deles.

### Function Component

Como o próprio nome diz são componentes representados por funções e hoje é o tipo mais adotado pela comunidade.

Veja um exemplo básico de um Function Component:

```
import React from 'react';

const HelloFunction: React.FC = () => {
    return <div>Hello Function!</div>;
}

export default HelloFunction;
```

Ele é basicamente uma função que retorna o conteúdo que será apresentado.

### Class Components

No caso dos Class Components utilizaremos uma `class` para definir nosso componente:

```
import React, {Component} from 'react';

class HelloClass extends Component {
    render() {
        return (
            <div>
                Hello Class!
            </div>
        );
    }
}

export default HelloClass;
```

A grande diferença aqui é que criamos uma classe que herda da classe `Component` do React e precisamos definir o método 
`render` para informá-la o que será renderizado na tela. 

Existem também vários métodos da classe que são disparados durante o ciclo de vida do componente, mas isso é 
assunto para um próximo tópico, por enquanto vamos manter simples.

### Composição

Vamos compor o app com nossos componentes?

Apague o conteúdo do App.tsx e import nossos componentes:

```
import React from 'react';
import './App.css';
import HelloFunction from './components/HelloFunction';
import HelloClass from './components/HelloClass';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HelloFunction/>
                <HelloClass/>
            </header>
        </div>
    );
}

export default App;
```

Vamos criar outro componente para ficar ainda mais claro: `HelloContainer.tsx`

```
import React from 'react';
import HelloFunction from "./HelloFunction";
import HelloClass from "./HelloClass";

const HelloContainer: React.FC = () => {
    return (
        <>
            <HelloFunction/>
            <HelloClass/>
        </>
    );
};

export default HelloContainer;
```

E nosso App.tsx:

```
import React from 'react';
import './App.css';
import HelloContainer from "./components/HelloContainer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <HelloContainer/>
            </header>
        </div>
    );
}

export default App;
```

Experimentem composição de componentes!
