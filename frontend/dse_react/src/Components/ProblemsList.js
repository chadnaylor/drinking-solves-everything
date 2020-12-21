import React from 'react'
import './ProblemsList.css'

class ProblemsList extends React.Component {
    state = {
        isAddProblemFormDisplayed: false,
        problems: [
            { name: "wife", instructions: "leave her for a younger woman" },
            { name: "dog", instruction: "take your dog to the vet!" }],
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

    async componentDidMount() {
        try {
            const result = await fetch('')
            const problems = await result.json()
            this.setState({ problems })
        } catch (e) {
            console.log(e)
        }

    }
    render() {
        const addNewProblemForm = (
            <form id="problem-form" onSubmit={this.submitProblem}>
                <label htmlFor="newProblemName">Problem name: </label>
                <input type="text" name="newProblemName" onChange={this.handleChange} value={this.state.newProblemName} />
                <div />
                <label htmlFor="newProblemInstructions">Instructions:</label>
                <textarea name="newProblemInstructions"
                    placeholder="write problem instructions here..."
                    onChange={this.handleChange}
                    value={this.state.newProblemInstructions} />
                <div />
                <input id="submitProblem" type="submit" />
            </form>
        )

        const updateProblem = (name) => {
            this.setState({...this.state, newProblemName: name});
            //{ alert(this.state.newProblemName) };
        }

        return (
            <div className="ProblemContainer">
                <div className="ProblemsList">
                    <h1 className="Problems-header">Problems List</h1>
                    {
                        this.state.problems.length > 0 ?
                            <ul>
                                {this.state.problems.map((problem) => <li key={problem.id} onClick={() => updateProblem(problem.name)}>{problem.name}</li>)}
                            </ul> :
                            <p>There are no problems to list.</p>
                    }
                    {
                        this.state.isAddProblemFormDisplayed
                            ? addNewProblemForm
                            : <button id="add-problem" onClick={this.toggleAddProblemForm}>Add Problem</button>
                    }
                </div>
                <div className={`ProblemsList ProblemDetail`}>
                    {
                        this.state.newProblemName === "" ?
                            <h1 className="Problems-header">'Select a problem to see drink recommendations!!! :P '</h1> :
                            <h1 className="Problems-header">{this.state.newProblemName}</h1>
                    }
                </div>
            </div>
        )

    }

}

export default ProblemsList