import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LeftSection from "./LeftSection"; 


const mockSetView = jest.fn();

describe("LeftSection Component", () => {
  it("should render the list items with correct class", () => {

    render(<LeftSection view="Dashboard" setView={mockSetView} />);


    const dashboardItem = screen.getByText("Admin Dashboard");
    const leavesItem = screen.getByText("All Leaves");
    const manageItem = screen.getByText("Manage Leaves");

 
    expect(dashboardItem).toHaveClass("active");
    expect(leavesItem).not.toHaveClass("active");
    expect(manageItem).not.toHaveClass("active");
  });

  it("should call setView when a list item is clicked", () => {
    render(<LeftSection view="Dashboard" setView={mockSetView} />);


    const leavesItem = screen.getByText("All Leaves");
    fireEvent.click(leavesItem);


    expect(mockSetView).toHaveBeenCalledWith("Leaves");


    const manageItem = screen.getByText("Manage Leaves");
    fireEvent.click(manageItem);


    expect(mockSetView).toHaveBeenCalledWith("Manage");
  });

  it("should apply 'active' class to the clicked list item", () => {

    render(<LeftSection view="Leaves" setView={mockSetView} />);


    expect(screen.getByText("All Leaves")).toHaveClass("active");
    expect(screen.getByText("Admin Dashboard")).not.toHaveClass("active");
    expect(screen.getByText("Manage Leaves")).not.toHaveClass("active");


    fireEvent.click(screen.getByText("Manage Leaves"));


    expect(screen.getByText("Manage Leaves")).toHaveClass("active");
    expect(screen.getByText("Admin Dashboard")).not.toHaveClass("active");
    expect(screen.getByText("All Leaves")).not.toHaveClass("active");
  });
});
