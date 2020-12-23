import React from 'react'
import { shallow } from 'enzyme'
import ProblemsList from './ProblemsList'
beforeAll(() => {
    global.fetch = jest.fn(); // mocking `fetch()` API
    //window.fetch = jest.fn();

});
let wrapper;
beforeEach(() => {
    wrapper = shallow(<ProblemsList />, { disableLifecycleMethods: true })
});
afterEach(() => {
    wrapper.unmount();
});
/*Fold folds the innermost uncollapsed region at the cursor:

Ctrl + Shift + [ on Windows and Linux
⌥ + ⌘ + [ on macOS*/
test('on mount, ProblemsList should populate problems in state after API call', (done) => {
    const spyDidMount = jest.spyOn(ProblemsList.prototype, "componentDidMount")

    fetch.mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            json: () => {
                return Promise.resolve([
                    {
                        id: 1,
                        name: "ED",
                        description: "It won't stand up. Need disability paycheck to feel like a man."
                    },
                    {
                        id: 2,
                        name: "Out of beer",
                        description: "kegerator spewing foam"
                    }
                ]);
            }
        });
    });

    const didMount = wrapper.instance().componentDidMount();
    // expecting componentDidMount have been called
    expect(spyDidMount).toHaveBeenCalled();
    didMount.then(() => {
        // updating the wrapper
        wrapper.update();
        expect(wrapper.find(".ProblemsList>ul").children().first().text()).toContain("ED");
        expect(wrapper.find(".ProblemsList>ul").children().length).toBe(2);
        spyDidMount.mockRestore();
        fetch.mockClear();
        done();
    });

})
test('toggleAddProblemForm() modifies isAddProblemFormDisplayed state value to toggle visibility of a form on the page ', () => {

    wrapper.instance().toggleAddProblemForm()

    wrapper.update()
    expect(wrapper.state().isAddProblemFormDisplayed).toBeTruthy()
    expect(wrapper.exists("#problem-form")).toEqual(true)

    wrapper.instance().toggleAddProblemForm()
    expect(wrapper.exists("#problem-form")).toEqual(false)
    expect(wrapper.state().isAddProblemFormDisplayed).toBeFalsy()
});
test('the Add Problem button onClick calls the toggleAddProblemForm method', () => {

    wrapper.instance().toggleAddProblemForm = jest.fn()
    wrapper.instance().forceUpdate()
    // forceUpdate needs to be used because the wrapper instance that has already been rendered is not using the mock function, 
    // so React does not automatically detect that the method definition has been changed
    const button = wrapper.find('#add-problem')

    button.simulate('click')

    expect(wrapper.instance().toggleAddProblemForm).toHaveBeenCalled()
});
test('submitting the form calls the submitProblem method', () => {

    wrapper.setState({ isAddProblemFormDisplayed: true })
    wrapper.instance().submitProblem = jest.fn()
    wrapper.instance().forceUpdate()

    wrapper.find('#problem-form').simulate("submit")
    expect(wrapper.instance().submitProblem).toHaveBeenCalled()
})
test('submitProblem() calls fetch', async () => {
    const problemName = "Hot Pockets"
    const problemDescription = "microwave for 60 seconds"
    wrapper.setState({
        isAddProblemFormDisplayed: true,
        newProblemName: problemName,
        newProblemDescription: problemDescription
    })

    const submittedProblem = { name: problemName, Description: problemDescription }
    //jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    const mockPreventDefault = jest.fn()

    fetch.mockImplementation(() => {
        return Promise.resolve({
            status: 201,
            json: () => {
                return Promise.resolve(submittedProblem);
            }
        });
    });
    wrapper.find('#problem-form').simulate("submit", {
        preventDefault: mockPreventDefault
    })
    expect(fetch).toHaveBeenCalled()


})

test('submitProblem() modifies the problems value in state', async () => {

    const problemName = "Hot Pockets"
    const problemDescription = "microwave for 60 seconds"
    wrapper.setState({
        isAddProblemFormDisplayed: true,
        newProblemName: problemName,
        newProblemDescription: problemDescription
    })
    fetch.mockImplementation(() => {
        return Promise.resolve({
            status: 201,
            json: () => {
                return Promise.resolve(submittedProblem);
            }
        });
    });
    const submittedProblem = { name: problemName, description: problemDescription }

    const mockPreventDefault = jest.fn()
    wrapper.find('#problem-form').simulate("submit", {
        preventDefault: mockPreventDefault
    })
    expect(mockPreventDefault).toHaveBeenCalled()

})
test('typing into the problem name input updates state ', () => {

    const problemName = "No Pockets"

    wrapper.setState({
        isAddProblemFormDisplayed: true,
    })

    wrapper.find('input[name="newProblemName"]').simulate("change", {
        target: { name: 'newProblemName', value: problemName }
    })

    expect(wrapper.state().newProblemName).toEqual(problemName)
})
test('typing into the problem Description input updates state ', () => {

    const problemDescription = "kinda hard to write Description without knowing what I'm cooking"

    wrapper.setState({
        isAddProblemFormDisplayed: true,
    })

    wrapper.find('textarea[name="newProblemDescription"]').simulate("change", {
        target: { name: 'newProblemDescription', value: problemDescription }
    })

    expect(wrapper.state().newProblemDescription).toEqual(problemDescription)
})
test('problem name from problem in state appears in unordered list', () => {

    const problemName = "Lean Pockets"
    const problemDescription = "place in toaster oven on 350 for 45 minutes"
    const submittedProblem = { name: problemName, Description: problemDescription }

    wrapper.setState({ problems: [submittedProblem] })

    expect(wrapper.find('li')).toHaveLength(1)
    expect(wrapper.find('li').text()).toEqual("Lean Pockets")
})