import React from "react";
import { render, screen } from "@testing-library/react";
import DashBoardHeader from "./DashBoardHeader";


const mockUsername = "Mamatha";

describe("DashBoardHeader Component", () => {
  it("should render the header with the correct username", () => {

    render(<DashBoardHeader username={mockUsername} />);

    
    expect(screen.getByText(`Hello, ${mockUsername} 👋`)).toBeInTheDocument();
  });
});
