import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateLoan from '@components/views/CreateLoan/CreateLoan'
import '@testing-library/jest-dom'
import { enableFetchMocks } from 'jest-fetch-mock'


describe("CreateLoan test", () => {
  enableFetchMocks();

  beforeEach( () => {
    fetch.resetMocks();
  })
  test('it should display "value must be greater than 0"', async () => {
    fetch.mockResponse(JSON.stringify([{ username: 'test', id: 'test' }]))

    render(<CreateLoan />);
    const amountInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(amountInput, { target: { value: '0'}});
    fireEvent.submit(screen.getAllByRole('button')[2]);
    const value = await screen.findAllByText(`Value must be greater than 0`);

    expect(value).toBeTruthy();
  })

  test('it should submit loan successfully', async () => {
    fetch.mockResponse(JSON.stringify([{ username: 'test', id: 'test' }]))
    jest.useFakeTimers();
    render(<CreateLoan />);
    fireEvent.submit(screen.getAllByRole('button')[2]);

    const value = await screen.findAllByText(`Loan created!`);
    jest.advanceTimersByTime(3000);

    expect(value).toBeTruthy()
  })
})
