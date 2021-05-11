import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const handleClick = (stringType) =>{
    store.dispatch({
      type:stringType
    })
  }

  return (
    <div>
      <button onClick={handleClick('GOOD')}>good</button> 
      <button onClick={handleClick('OK')}>neutral</button> 
      <button onClick={handleClick('BAD')}>bad</button>
      <button onClick={handleClick('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)