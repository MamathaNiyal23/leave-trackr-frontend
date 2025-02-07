import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeaveForm from "./LeaveForm"; 


const mockOnSubmit = jest.fn();

describe("LeaveForm Component", () => {
  beforeEach(() => {

    mockOnSubmit.mockClear();
  });

  it("should render the form correctly", () => {
    render(<LeaveForm onSubmit={mockOnSubmit} />);


    expect(screen.getByLabelText(/leave type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should call onSubmit with correct form data when form is submitted", async () => {
    render(<LeaveForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/leave type/i), {
      target: { value: "Sick Leave" },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2024-01-05" },
    });


    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));


    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        leaveType: "Sick Leave",
        startDate: "2024-01-01",
        endDate: "2024-01-05",
      })
    );
  });

});
