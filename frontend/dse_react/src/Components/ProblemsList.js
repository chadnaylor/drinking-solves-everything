import React from 'react'
import './ProblemsList.css'

class ProblemsList extends React.Component {
    state = {
        isAddProblemFormDisplayed: false,
        problems: [
            { name: "Angered significant other", drink: "Rum", description: "She's not talking to me but it def wasn't my fault" },
            { name: "Living organism that may or may not identify as a 'dog'", drink: "Vodka", description: "Pour it out of the bottle into a cup" },
            { name: "No job", drink: "Whiskey", description: "Pour it out of the bottle into a cup" },
            { name: "No money ", drink: "Mojito", description: "There are banks everywhere, OK? Get a mask, a gun..." }
        ],
        newProblemName: "",
        newProblemDescription: "",
        targetProblemName: "",
        targetProblemDescription: "",
        targetProblemDrink: "temp",
        drink: ""
    }
    handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    toggleAddProblemForm = () => {
        this.setState({ isAddProblemFormDisplayed: !this.state.isAddProblemFormDisplayed })
    }
    async submitProblem(event) {
        event.preventDefault()

        try {
            const newProblem = {
                name: this.state.newProblemName,
                description: this.state.newProblemDescription
            }
            const res = await fetch('http://localhost:3001/problems', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(newProblem)
            })
            const json = await res.json()
            return this.setState({
                problems: [...this.state.problems,
                    newProblem
                ]
            })

        } catch (e) {
            return console.log(`Error: ${e}, `)
        }

    }
    async updateProblem(problem) {
        this.setState({
            ...this.state,
            targetProblemName: problem.name,
            targetProblemDrink: problem.drink,
            targetProblemDescription: problem.description
        });

        const result = await fetch('http://localhost:3001/random')
        const drink = await result.json()
        this.setState({ ...this.state, drink })
    }
    async componentDidMount() {
        try {
            const result = await fetch('http://localhost:3001/problems')
            const problems = await result.json()
            this.setState({ ...this.state, problems: problems })

        } catch (e) {
            console.log(e)
        }

    }
    render() {
        const addNewProblemForm = (
            <form id="problem-form" onSubmit={(event) => this.submitProblem(event)}>
                <label htmlFor="newProblemName">Problem name: </label>
                <input type="text" name="newProblemName" onChange={this.handleChange} value={this.state.newProblemName} />
                <div />
                <label htmlFor="newProblemDescription">Description:</label>
                <textarea name="newProblemDescription"
                    placeholder="write problem description here..."
                    onChange={this.handleChange}
                    value={this.state.newProblemDescription} />
                <div />
                <input id="submitProblem" type="submit" />
            </form>
        )



        return (
            <div className="ProblemContainer">
                <div className="ProblemsList">
                    <h1 className="Problems-header">Problems List</h1>
                    {
                        this.state.problems.length > 0 ?
                            <ul >
                                {this.state.problems.map((problem) =>
                                    <li className="specialList" key={problem.id} onClick={() =>
                                        this.updateProblem(problem)}>{problem.name}</li>)}
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
                            <h1 className="Problems-header">Select a problem</h1> :
                            <>
                                <h1 className="Problems-header">{this.state.targetProblemName}</h1>
                                <p className="Problem-description"><strong>Problem:</strong> {this.state.targetProblemDescription}</p>
                                <p className="Problem-drink">{this.state.targetProblemDrink}</p>
                                {this.state.drink !== null ?
                                    <>
                                        <h3>Your Solution:</h3>
                                        <div/>
                                        <p><strong>Cocktail:</strong> {this.state.drink.name}</p>
                                        {this.state.drink.ingredients ?
                                            <>
                                                <p>Ingredients:</p>
                                                <ul>
                                                    {this.state.drink.ingredients.map(ing => <li>{ing}</li>)}
                                                </ul>
                                            </> : <p>No ingredients</p>
                                        }
                                        <p>{this.state.drink.instructions}</p>


                                    </> :
                                    <p>No drink</p>
                                }
                            </>
                    }
                </div>

            </div>
        )

    }
}


export default ProblemsList
