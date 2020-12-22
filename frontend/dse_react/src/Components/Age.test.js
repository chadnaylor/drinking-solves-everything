import React from 'react'
import { shallow } from 'enzyme'
import Cookie from 'js-cookie'
import Age from './Age'

test('addAgeCookie adds age cookie', () => {
    jest.mock('js-cookie', () => jest.fn())
    const cookies = {}
    Cookie.get = () => cookies
    Cookie.set = (cookie,value) => cookies[cookie] = value
    const spySetCookie = jest.spyOn(Cookie, "set")
    const wrapper = shallow(<Age />, { disableLifecycleMethods: true })
    wrapper.instance().addAgeCookie();

    wrapper.update();
    expect(spySetCookie).toHaveBeenCalled();
    expect(cookies.legalAge).toBeDefined()

})