import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './Register';


describe('SignUp Component', () => {
  test('navigates to the dashboard on successful form submission', async () => {
    render(
      <MemoryRouter >
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Mamatha' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'mamatha@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'mamatha123' } });
    fireEvent.click(screen.getByLabelText('User')); 

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.findByText(/Dashboard/i)).toBeTruthy(); 
    });
  });
});

