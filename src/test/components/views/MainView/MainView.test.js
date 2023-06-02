import { shallow } from 'enzyme';
import React from 'react';
import MainView from '../../../../components/views/MainView/MainView'


describe("MainView test", () => {

  test('it should contain NavigationPane', () => {
    const mainViewWrapper = shallow(<MainView />);
    const navigationPaneWrapper = mainViewWrapper.find(`NavigationPane`);
    expect(navigationPaneWrapper.exists()).toBe(true);
  })

  test('it should contain 5 routes', () => {
    const mainViewWrapper = shallow(<MainView />);
    const routesWrapper = mainViewWrapper.find(`Routes`);
    expect(routesWrapper.children()).toHaveLength(5)
  })
})
