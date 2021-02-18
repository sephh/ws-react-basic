# JSX

JSX é uma sintaxe de tags no javascript, para quem está acostumado com HTML pouca coisa muda.

Vamos ver as principais diferenças.

### Expressões e variáveis no JSX:

Algo mágico do JSX é poder colocar alguma lógica no seu template de forma bem abstraída.

Vamos falar sobre nosso `App.tsx` para exemplificar.

Na linha 9 você tem o seguinte: `<img src={logo} className="App-logo" alt="logo" />`. Note que no atributo `src` 
temos a variável `{logo}` entre chaves. Essa é a forma de dizer para o JSX que esse valor é dinâmico. 

Qualquer expressão válida de javascript entre chaves(`{}`) será executada no nosso template.

### Atributos específicos

A grande diferença entre os atributos no HTML e no JSX é que os atributos do JSX são escritos em `camelCase` e não 
`kebab-case`.

Atributos de css seguem o mesmo padrão, por exemplo: `backgroundColor`.

Um atributo que é bem trick é o `class` do HTML que no caso do JSX é `className`.

### Fragment

Todo template precisa de um elemento root, se por acaso seu component precisar ter dois elementos principais, no 
mesmo nível, você pode utilizar um `Fragment`.

```
import React, { Fragment } from 'react';

function App() {
    return (
        <Fragment>
            <div>Elemento 1</div>
            <div>Elemento 2</div>
        </Fragment>
    )
}
```

Isso pode ser simplificado com a seguinte sintaxe:

```
import React from 'react';

function App() {
  return (
      <>
        <div>Elemento 1</div>
        <div>Elemento 2</div>
      </>
  )
}
```

