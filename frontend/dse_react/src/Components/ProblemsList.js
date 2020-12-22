import React from 'react'
import './ProblemsList.css'

class ProblemsList extends React.Component {
    state = {
        isAddProblemFormDisplayed: false,
        problems: [
            { name: "Angered significant other", drink : "Rum", description: "She's not talking to me but it def wasn't my fault" },
            { name: "Living organism that may or may not identify as a 'dog'", drink : "Vodka", description: "Pour it out of the bottle into a cup" },
            { name: "No job", drink : "Whiskey", description: "Pour it out of the bottle into a cup" },
            { name: "No money ", drink : "Mojito", description: "There are banks everywhere, OK? Get a mask, a gun..." }
        ],
        newProblemName: "",
        newProblemdescription: "",
        targetProblemName: "",
        targetProblemDescription: "",
        targetProblemDrink: ""
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
            problems: [...this.state.problems,
                {
                    name: this.state.newProblemName,
                    description: this.state.newProblemdescription
                }
            ]
        })
    }

    async componentDidMount() {
        try {
            const result = await fetch('http://localhost:3001/problems')
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
                <label htmlFor="newProblemDescription">description:</label>
                <textarea name="newProblemDescription"
                    placeholder="write problem description here..."
                    onChange={this.handleChange}
                    value={this.state.newProblemDescription} />
                <div />
                <input id="submitProblem" type="submit" />
            </form>
        )

        const updateProblem = (problem) => {
            this.setState({...this.state,
                targetProblemName: problem.name, 
                targetProblemDrink: problem.drink,
                targetProblemDescription: problem.description
            });
            
        }

        return (
            <div className="ProblemContainer">
                <div className="ProblemsList">
                    <h1 className="Problems-header">Problems List</h1>
                    {
                        this.state.problems.length > 0 ?
                            <ul>
                                {this.state.problems.map((problem) => 
                                    <li key={problem.id} onClick={() => 
                                        updateProblem(problem)}>{problem.name}</li>)}
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
                        this.state.targetProblemName === "" ?
                            <h1 className="Problems-header">'Select a problem to see drink recommendations!!! :P '</h1> :
                            <><h1 className="Problems-header">{this.state.targetProblemName}</h1>
                            <p className="Problem-drink">{this.state.targetProblemDrink}</p>
                            <p className="Problem-description">{this.state.targetProblemDescription}</p></>
                    }
                </div>
            </div>
        )

    }

}

export default ProblemsList