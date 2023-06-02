import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CreateUser from '@components/views/CreateUser/CreateUser'
import '@testing-library/jest-dom'


describe("CreateUser test", () => {

  test('it should submit user successfully', async() => {
    global.fetch = jest.fn().mockReturnValueOnce({status: 200});
    jest.useFakeTimers();
    render(<CreateUser />);
    fireEvent.submit(screen.getByRole('button'));
    await screen.findAllByText(`User created!`);
    jest.advanceTimersByTime(3000);

    expect(fetch).toHaveBeenCalled();
  })

  test('it should submit user unsuccessfully', async() => {
    global.fetch = jest.fn().mockReturnValueOnce({status: 422});
    render(<CreateUser />);
    fireEvent.submit(screen.getByRole('button'));
    await screen.findAllByText(`An error has occured!`);

    expect(fetch).toHaveBeenCalled();
  })
})
