
import './App.css';
import React from 'react'

class App extends React.Component {
  state = {
    isAddProblemFormDisplayed: false,
    problems: [],
    newProblemName: "",
    newProblemInstructions: ""
  }
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  }

  toggleAddProblemForm = () => {
    this.setState({ isAddProblemFormDisplayed: !this.state.isAddProblemFormDisplayed })
  }
  submitProblem = (event) => {
    event.preventDefault()
    this.setState({
      problems: [
        {
          name: this.state.newProblemName,
          instructions: this.state.newProblemInstructions
        }
      ]
    })
  }
  render() {
    const addNewProblemForm = (
      <form id="problem-form" onSubmit={this.submitProblem}>
        <label htmlFor="newProblemName">Problem name: </label>
        <input type="text" name="newProblemName" onChange={this.handleChange} value={this.state.newProblemName} />
        <label htmlFor="newProblemInstructions">Instructions:</label>
        <textarea name="newProblemInstructions"
          placeholder="write problem instructions here..."
          onChange={this.handleChange}
          value={this.state.newProblemInstructions} />
        <input type="submit" />
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Problems</h1>
        {
          this.state.isAddProblemFormDisplayed
            ? addNewProblemForm
            : <button id="add-problem" onClick={this.toggleAddProblemForm}>Add Problem</button>
        }
        {
          this.state.problems.length > 0 ?
            <ul>
              <li>{this.state.problems[0].name}</li>
            </ul> :
            <p>There are no problems to list.</p>
        }
      </div>
    )

  }

}

export default App;
