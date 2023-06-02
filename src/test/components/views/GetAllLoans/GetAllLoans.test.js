import React from 'react';
import GetAllLoans from '@components/views/GetAllLoans/GetAllLoans'
import { shallow } from 'enzyme';

describe("ShareLoan test", () => {

  test('it successfully renders', () => {
    const getAllLoansWrapper = shallow(<GetAllLoans />)

    expect(getAllLoansWrapper.exists()).toBe(true)
  })
})
