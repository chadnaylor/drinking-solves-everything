import ProblemsList from "./Components/ProblemsList.js"
import './App.css';
import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Cookie from 'js-cookie'
import Age from './Components/Age'
import history from './Components/BrowserHistory'

class App extends React.Component {

  componentDidMount() {
    if (window.location.pathname!=='/age' && Cookie.get('legalAge') === undefined) {
      history.push('/age')
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">Drinking Solves Everything</div>
          <Switch>
            <Route exact path="/" component={ProblemsList} />
            <Route path="/age" component={Age} />
          </Switch>
        </div>

      </BrowserRouter>

    )
  }
}

export default App;


// using an ES6 transpiler, like babel
//import { createHistory } from 'history'

// not using an ES6 transpiler
//var createHistory = require('history').createHistory