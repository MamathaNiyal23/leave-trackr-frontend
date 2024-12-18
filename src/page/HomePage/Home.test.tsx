import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home Component Check", () => {
  test("renders the LeaveTrackr title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/LeaveTrackr 🗓️/i)).toBeInTheDocument();
  });

  test("check if Login and Sign Up buttons have correct links", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const loginButton = screen.getByText(/Login/i);
    expect(loginButton.closest("a")).toHaveAttribute("href", "/login");

    const signUpButton = screen.getByText(/Sign Up/i);
    expect(signUpButton.closest("a")).toHaveAttribute("href", "/signup");
  });
});
