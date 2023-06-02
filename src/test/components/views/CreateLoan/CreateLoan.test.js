import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateLoan from '@components/views/CreateLoan/CreateLoan'
import '@testing-library/jest-dom'


describe("CreateLoan test", () => {

  test('it should submit loan successfully', async() => {
    // global.fetch = jest.fn().mockReturnValueOnce({status: 200});
    // jest.useFakeTimers();
    // render(<CreateLoan />);
    // const input = screen.getByLabelText
    // fireEvent.submit(screen.getByRole('button'));
    // await screen.findAllByText(`User created!`);
    // jest.advanceTimersByTime(3000);

    // expect(fetch).toHaveBeenCalled();
  })

  // test('it should submit loan unsuccessfully', async() => {
  //   global.fetch = jest.fn().mockReturnValueOnce({status: 422});
  //   render(<CreateLoan />);
  //   fireEvent.submit(screen.getByRole('button'));
  //   await screen.findAllByText(`An error has occured!`);

  //   expect(fetch).toHaveBeenCalled();
  // })
})
