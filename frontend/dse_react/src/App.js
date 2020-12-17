import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component {
  state = {
    isAddProblemFormDisplayed: false
  }

  toggleAddProblemForm = () => {
    this.setState({ isAddProblemFormDisplayed: !this.state.isAddProblemFormDisplayed })
  }

  render() {
    const addNewProblemForm = <form id="problem-form"></form>

    return (
      <div className="App">
        <header className="App-header">
          My Problems
      </header>
        {
          this.state.isAddproblemFormDisplayed
            ? addNewProblemForm
            : <button id="add-problem">Add problem</button>
        }
        
        <form>
          <p>There are no problems to list.</p>
        </form>
      </div>
    );
  }

}

export default App;
