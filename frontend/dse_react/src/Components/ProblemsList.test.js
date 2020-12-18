import React from 'react'
import { shallow } from 'enzyme'
import ProblemsList from './ProblemsList'

test('toggleAddProblemForm() modifies isAddProblemFormDisplayed state value to toggle visibility of a form on the page ', () => {
  const wrapper = shallow(<ProblemsList />)
  wrapper.instance().toggleAddProblemForm()

  wrapper.update()
  expect(wrapper.state().isAddProblemFormDisplayed).toBeTruthy()
  expect(wrapper.exists("#problem-form")).toEqual(true)

  wrapper.instance().toggleAddProblemForm()
  expect(wrapper.exists("#problem-form")).toEqual(false)
  expect(wrapper.state().isAddProblemFormDisplayed).toBeFalsy()
});
test('the Add Problem button onClick calls the toggleAddProblemForm method', () => {
  const wrapper = shallow(<ProblemsList />)
  wrapper.instance().toggleAddProblemForm = jest.fn()
  wrapper.instance().forceUpdate()
  // forceUpdate needs to be used because the wrapper instance that has already been rendered is not using the mock function, 
  // so React does not automatically detect that the method definition has been changed
  const button = wrapper.find('#add-problem')

  button.simulate('click')

  expect(wrapper.instance().toggleAddProblemForm).toHaveBeenCalled()
});
test('submitting the form calls the submitProblem method', () => {
  const wrapper = shallow(<ProblemsList />)
  wrapper.setState({ isAddProblemFormDisplayed: true })
  wrapper.instance().submitProblem = jest.fn()
  wrapper.instance().forceUpdate()

  wrapper.find('#problem-form').simulate("submit")
  expect(wrapper.instance().submitProblem).toHaveBeenCalled()
})
test('submitProblem() modifies the problems value in state', () => {
  const wrapper = shallow(<ProblemsList />)
  const problemName = "Hot Pockets"
  const problemInstructions = "microwave for 60 seconds"
  wrapper.setState({
    isAddProblemFormDisplayed: true,
    newProblemName: problemName,
    newProblemInstructions: problemInstructions
  })
  const submittedProblem = { name: problemName, instructions: problemInstructions }

  const mockPreventDefault = jest.fn()

  wrapper.find('#problem-form').simulate("submit", {
    preventDefault: mockPreventDefault
  })
  expect(mockPreventDefault).toHaveBeenCalled()
  expect(wrapper.state().problems).toEqual([submittedProblem])
})
test('typing into the problem name input updates state ', () => {
  const wrapper = shallow(<ProblemsList />)
  const problemName = "No Pockets"

  wrapper.setState({
    isAddProblemFormDisplayed: true,
  })

  wrapper.find('input[name="newProblemName"]').simulate("change", {
    target: { name: 'newProblemName', value: problemName }
  })

  expect(wrapper.state().newProblemName).toEqual(problemName)
})
test('typing into the problem instructions input updates state ', () => {
  const wrapper = shallow(<ProblemsList />)
  const problemInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  wrapper.setState({
    isAddProblemFormDisplayed: true,
  })

  wrapper.find('textarea[name="newProblemInstructions"]').simulate("change", {
    target: { name: 'newProblemInstructions', value: problemInstructions }
  })

  expect(wrapper.state().newProblemInstructions).toEqual(problemInstructions)
})
test('problem name from problem in state appears in unordered list', () => {
  const wrapper = shallow(<ProblemsList />)
  const problemName = "Lean Pockets"
  const problemInstructions = "place in toaster oven on 350 for 45 minutes"
  const submittedProblem = { name: problemName, instructions: problemInstructions }

  wrapper.setState({ problems: [submittedProblem] })

  expect(wrapper.find('li')).toHaveLength(1)
  expect(wrapper.find('li').text()).toEqual("Lean Pockets")
})