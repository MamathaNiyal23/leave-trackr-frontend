import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from './Register';



global.fetch = jest.fn();

describe("SignUp Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to the dashboard on successful form submission", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: "Mamatha", role: "user" }),
    });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "mamatha@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "mamatha123" },
    });
    fireEvent.click(screen.getByLabelText("User"));

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(localStorage.getItem("user")).toEqual(
        JSON.stringify({ userId: 1, username: "Mamatha", role: "user" })
      );
    });
  });

  test("displays error message on failed registration", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "mamatha@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "mamatha123" },
    });
    fireEvent.click(screen.getByLabelText("User"));

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
    });
  });

  test("displays alert on network error", async () => {
    
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "mamatha@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "mamatha123" },
    });
    fireEvent.click(screen.getByLabelText("User"));

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });
  });
});

