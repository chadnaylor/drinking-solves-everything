import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

test('toggleAddProblemForm() modifies isAddProblemFormDisplayed state value to toggle visibility of a form on the page ', () => {
  const wrapper = shallow(<App />)
  wrapper.instance().toggleAddProblemForm()

  wrapper.update()
  expect(wrapper.state().isAddProblemFormDisplayed).toBeTruthy()
  expect(wrapper.exists("#problem-form")).toEqual(true)

  wrapper.instance().toggleAddProblemForm()
  expect(wrapper.exists("#problem-form")).toEqual(false)
  expect(wrapper.state().isAddProblemFormDisplayed).toBeFalsy()
});
