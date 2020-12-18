import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import Cookie from 'js-cookie'
import Age from './Components/Age'

test('it checks for age cookie', () => {
  jest.mock('js-cookie', () => jest.fn())
  Cookie.get = () => undefined
  const spyDidMount = jest.spyOn(App.prototype, "componentDidMount")
  const spyGetCookie = jest.spyOn(Cookie, "get")
  const wrapper = shallow(<App />, { disableLifecycleMethods: true })
  const didMount = wrapper.instance().componentDidMount();
  expect(spyDidMount).toHaveBeenCalled();
  wrapper.update();
  expect(spyGetCookie).toHaveBeenCalled();
})


