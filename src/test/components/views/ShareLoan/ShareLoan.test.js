import React from 'react';
import ShareLoan from '@components/views/ShareLoan/ShareLoan'
import { shallow } from 'enzyme';

describe("ShareLoan test", () => {

  test('it successfully renders', () => {
    const shareLoanWrapper = shallow(<ShareLoan />)

    expect(shareLoanWrapper.exists()).toBe(true)
  })
})
