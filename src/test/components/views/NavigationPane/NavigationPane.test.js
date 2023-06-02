import { shallow } from 'enzyme';
import React from 'react';
import NavigationPane from '@components/views/NavigationPane/NavigationPane'

describe("NavigationPane test", () => {

  test('it should contain proper verbiage', () => {
    const navigationPaneWrapper = shallow(<NavigationPane />);
    expect(navigationPaneWrapper.contains(`HOME`)).toBe(true);
    expect(navigationPaneWrapper.contains(`CREATE USER`)).toBe(true);
    expect(navigationPaneWrapper.contains(`CREATE LOAN`)).toBe(true);
    expect(navigationPaneWrapper.contains(`SHARE LOANS`)).toBe(true);
    expect(navigationPaneWrapper.contains(`VIEW LOANS`)).toBe(true);
  })
})
