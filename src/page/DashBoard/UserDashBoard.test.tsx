import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserDashboard from "./UserDashBoard";
// import '@testing-library/jest-dom';
// import { jest } from '@jest/globals';


// global.fetch = jest.fn();

// const mockUser = {
//   userId: 1,
//   username: "testUser",
// };

// describe("UserDashboard", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders the dashboard and displays the welcome message", () => {
//     render(<UserDashboard {...mockUser} />);

//     expect(screen.getByText("Welcome to Your Dashboard!")).toBeInTheDocument();
//   });

//   it("displays the correct total leaves information", async () => {

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => [
//         { id: 1, leaveType: "Sick", startDate: "2024-01-01", endDate: "2024-01-02", status: "approved" },
//         { id: 2, leaveType: "Vacation", startDate: "2024-02-01", endDate: "2024-02-05", status: "approved" },
//       ],
//     });

//     render(<UserDashboard {...mockUser} />);

//     await waitFor(() => screen.getByText(/Total Annual Leaves:/));

//     expect(screen.getByText(/Total Annual Leaves: 12/i)).toBeInTheDocument();

//   });

//   it("displays leaves when 'All Leaves' view is selected", async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => [
//         { id: 1, leaveType: "Sick", startDate: "2024-01-01", endDate: "2024-01-02", status: "approved" },
//       ],
//     });

//     render(<UserDashboard {...mockUser} />);

//     fireEvent.click(screen.getByText("All Leaves"));
    
//     await waitFor(() => screen.getByText(/Your Leaves/i));

//     expect(screen.getByText("Reason: Sick")).toBeInTheDocument();
//     expect(screen.getByText("Start Date: 01/01/2024")).toBeInTheDocument();
//     expect(screen.getByText("End Date: 01/02/2024")).toBeInTheDocument();
//     expect(screen.getByText("Status: approved")).toBeInTheDocument();
//   });

//   it("shows 'No leaves to display' when no leaves are present", async () => {
//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => [],
//     });

//     render(<UserDashboard {...mockUser} />);

//     fireEvent.click(screen.getByText("All Leaves"));

//     await waitFor(() => screen.getByText(/No leaves to display/i));

//     expect(screen.getByText("No leaves to display")).toBeInTheDocument();
//   });

//   it("allows the user to apply for a leave", async () => {
//     const leaveFormData = {
//       leaveType: "Sick",
//       startDate: "2024-12-01",
//       endDate: "2024-12-03",
//     };

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         ...leaveFormData,
//         id: 3,
//         status: "pending",
//       }),
//     });

//     render(<UserDashboard {...mockUser} />);

//     fireEvent.click(screen.getByText("Apply Leave"));


//     fireEvent.change(screen.getByLabelText("Leave Type"), {
//       target: { value: leaveFormData.leaveType },
//     });
//     fireEvent.change(screen.getByLabelText("Start Date"), {
//       target: { value: leaveFormData.startDate },
//     });
//     fireEvent.change(screen.getByLabelText("End Date"), {
//       target: { value: leaveFormData.endDate },
//     });
    
//     fireEvent.click(screen.getByText("Submit"));

//     await waitFor(() => screen.getByText("Sick"));

//     expect(screen.getByText("Sick")).toBeInTheDocument();
//     expect(screen.getByText("Start Date: 12/01/2024")).toBeInTheDocument();
//     expect(screen.getByText("End Date: 12/03/2024")).toBeInTheDocument();
//     expect(screen.getByText("Status: pending")).toBeInTheDocument();
//   });

//   it("allows the user to cancel a leave", async () => {
//     const leaveToCancel = {
//       id: 1,
//       leaveType: "Sick",
//       startDate: "2024-01-01",
//       endDate: "2024-01-02",
//       status: "pending",
//     };

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => [],
//     });

//     render(<UserDashboard {...mockUser} />);


//     (fetch as jest.Mock).mockResolvedValueOnce({
//       ok: true,
//       json: async () => [leaveToCancel],
//     });

//     fireEvent.click(screen.getByText("All Leaves"));

//     await waitFor(() => screen.getByText("Sick"));


//     fireEvent.click(screen.getByText("Cancel"));


//     await waitFor(() => expect(screen.queryByText("Sick")).toBeNull());
//   });

//   it("handles errors when fetching leaves", async () => {
//     (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch leaves"));

//     render(<UserDashboard {...mockUser} />);

//     await waitFor(() => screen.getByText("No leaves to display"));

//     expect(screen.getByText("No leaves to display")).toBeInTheDocument();
//     expect(console.error).toHaveBeenCalledWith("Error fetching leaves:", expect.any(Error));
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });
// });



global.fetch = jest.fn();

const mockUser = {
  userId: 1,
  username: "Mamatha",
};

describe("UserDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard and displays the welcome message", () => {
    render(<UserDashboard {...mockUser} />);

    expect(screen.getByText("Welcome to Your Dashboard!")).toBeInTheDocument();
  });

  it("displays the correct total leaves information", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, leaveType: "Sick", startDate: "2024-01-01", endDate: "2024-01-02", status: "approved" },
        { id: 2, leaveType: "Vacation", startDate: "2024-02-01", endDate: "2024-02-05", status: "approved" },
      ],
    });

    render(<UserDashboard {...mockUser} />);

    await waitFor(() => screen.getByText(/Total Annual Leaves:/));

    expect(screen.getByText(/Total Annual Leaves: 12/i)).toBeInTheDocument();
  });

  it("displays leaves when 'All Leaves' view is selected", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, leaveType: "Sick", startDate: "2024-01-01", endDate: "2024-01-02", status: "approved" },
      ],
    });

    render(<UserDashboard {...mockUser} />);

    fireEvent.click(screen.getByText("All Leaves"));

    await waitFor(() => screen.getByText(/Your Leaves/i));

    expect(screen.getByText("Reason: Sick")).toBeInTheDocument();
    expect(screen.getByText("Start Date: 01/01/2024")).toBeInTheDocument();
    expect(screen.getByText("End Date: 01/02/2024")).toBeInTheDocument();
    expect(screen.getByText("Status: approved")).toBeInTheDocument();
  });

  it("shows 'No leaves to display' when no leaves are present", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserDashboard {...mockUser} />);

    fireEvent.click(screen.getByText("All Leaves"));

    await waitFor(() => screen.getByText(/No leaves to display/i));

    expect(screen.getByText("No leaves to display")).toBeInTheDocument();
  });

  it("allows the user to apply for a leave", async () => {
    const leaveFormData = {
      leaveType: "Sick",
      startDate: "2024-12-01",
      endDate: "2024-12-03",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ...leaveFormData,
        id: 3,
        status: "pending",
      }),
    });

    render(<UserDashboard {...mockUser} />);

    fireEvent.click(screen.getByText("Apply Leave"));

    fireEvent.change(screen.getByLabelText("Leave Type"), {
      target: { value: leaveFormData.leaveType },
    });
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: leaveFormData.startDate },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: leaveFormData.endDate },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => screen.getByText("Sick"));

    expect(screen.getByText("Sick")).toBeInTheDocument();
    expect(screen.getByText("Start Date: 12/01/2024")).toBeInTheDocument();
    expect(screen.getByText("End Date: 12/03/2024")).toBeInTheDocument();
    expect(screen.getByText("Status: pending")).toBeInTheDocument();
  });

  it("allows the user to cancel a leave", async () => {
    const leaveToCancel = {
      id: 1,
      leaveType: "Sick",
      startDate: "2024-01-01",
      endDate: "2024-01-02",
      status: "pending",
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserDashboard {...mockUser} />);

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [leaveToCancel],
    });

    fireEvent.click(screen.getByText(/All Leaves/i));

    await waitFor(() => screen.getByText("Sick"));

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() => expect(screen.queryByText("Sick")).toBeNull());
  });

  it("handles errors when fetching leaves", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch leaves"));

    render(<UserDashboard {...mockUser} />);

    await waitFor(() => screen.getByText("No leaves to display"));

    expect(screen.getByText("No leaves to display")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith("Error fetching leaves:", expect.any(Error));
  });

  
});
