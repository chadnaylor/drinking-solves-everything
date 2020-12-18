import ProblemsList from "./Components/ProblemsList.js"
import './App.css';
import React from 'react'

class App extends React.Component {
  render( ){
      return (
        <div className="App">
          <ProblemsList/>
        </div>
      )
    }
}

export default App;
