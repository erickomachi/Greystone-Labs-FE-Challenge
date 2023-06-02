import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../../../components/views/Home/Home'

describe("Home test", () => {

  test('it should contain proper verbiage', () => {
    const homeWrapper = shallow(<Home />);
    expect(homeWrapper.contains(`Welcome to the Loan Amortization App!`)).toBe(true);
    expect(homeWrapper.contains(`Click on the links above to get started!`)).toBe(true);
  })
})
