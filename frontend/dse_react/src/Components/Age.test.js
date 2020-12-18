import React from 'react'
import { shallow } from 'enzyme'
import Cookie from 'js-cookie'
import Age from './Age'

test('it adds age cookie if user clicks yes', () => {
    jest.mock('js-cookie', () => jest.fn())
    Cookie.get = () => undefined
    const spyGetCookie = jest.spyOn(Cookie, "get")
    const wrapper = shallow(<Age />, { disableLifecycleMethods: true })
    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();
    wrapper.update();
    expect(spyGetCookie).toHaveBeenCalled();
})