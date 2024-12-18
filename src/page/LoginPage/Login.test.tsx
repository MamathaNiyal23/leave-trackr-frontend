import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";


global.fetch = jest.fn();

describe("Login Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to the dashboard on successful login", async () => {
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, username: "Mamatha", role: "user" }),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "mamatha123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(localStorage.getItem("user")).toEqual(
        JSON.stringify({ userId: 1, username: "Mamatha", role: "user" })
      );
    });
  });

  test("displays error message on failed login", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test("displays alert on network error", async () => {
   
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Mamatha" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "mamatha123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });
  });
});

