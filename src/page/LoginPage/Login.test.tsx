import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

describe("SignUp Component", () => {
  test("navigates to the dashboard on successful form submission", async () => {
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
      expect(screen.findByText(/Dashboard/i)).toBeTruthy();
    });
  });
});
