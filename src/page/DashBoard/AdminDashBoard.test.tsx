import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import  AdminDashboard  from "./AdminDashBoard";
import userEvent from "@testing-library/user-event";


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockUser = { userId: 1, username: 'adminUser' };

describe("AdminDashboard", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders AdminDashboard and displays username", () => {
    render(<AdminDashboard {...mockUser} />);
    expect(screen.getByText("Hello, adminUser 👋")).toBeInTheDocument();
  });


  it("handles view switching correctly", async () => {
    render(<AdminDashboard {...mockUser} />);

 
    expect(screen.getByText("Welcome to Admin Dashboard!")).toBeInTheDocument();

    const allLeavesTab = screen.getByText("All Leaves");
    userEvent.click(allLeavesTab);

    await waitFor(() => screen.getByText("All Leave Requests"));
    expect(screen.getByText("All Leave Requests")).toBeInTheDocument();


    const manageLeavesTab = screen.getByText("Manage Leaves");
    userEvent.click(manageLeavesTab);

    await waitFor(() => screen.getByText("Pending Leave Requests"));
    expect(screen.getByText("Pending Leave Requests")).toBeInTheDocument();
  });


  it("fetches and displays all leave requests", async () => {
    const mockLeaveData = [
      { id: 1, leaveType: "Sick", status: "approved", User: { username: "user1" } },
      { id: 2, leaveType: "Vacation", status: "pending", User: { username: "user2" } },
    ];
  
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockLeaveData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });
  
    render(<AdminDashboard {...mockUser} />);
  
    fireEvent.click(screen.getByText(/All Leaves/i));
    await waitFor(() => screen.getByText("All Leave Requests"));
  

    const leaveTypeElements = await screen.findAllByText(/Leave Type:/);
    expect(leaveTypeElements.length).toBe(2); 
  
    const statusElements = await screen.findAllByText(/Status:/);
    expect(statusElements.length).toBe(2); 
  
  });


it('handles approval and rejection of leave requests', async () => {

  const mockPendingLeaves = [
    { id: 1, leaveType: "Sick", status: "pending", User: { username: "user1" } },
    { id: 2, leaveType: "Vacation", status: "pending", User: { username: "user2" } },
  ];


  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockPendingLeaves, 
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, status: "approved" }), 
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 2, status: "rejected" }),
    });

  const mockUser = {
    userId: 123,
    username: 'adminUser',
  };

  render(<AdminDashboard {...mockUser} />);

  fireEvent.click(screen.getByText(/Manage Leaves/i));


  await waitFor(() => screen.getByText("Pending Leave Requests"));


  const leaveCards = await screen.findAllByText(/Employee:/);
  expect(leaveCards.length).toBeGreaterThan(0);

  const approveButton = screen.getByText(/Approve/i);
  const rejectButton = screen.getByText(/Reject/i);

  expect(approveButton).toBeInTheDocument();
  expect(rejectButton).toBeInTheDocument();


  userEvent.click(approveButton);


  await waitFor(() => expect(approveButton).toBeDisabled());

  
  userEvent.click(rejectButton);

  await waitFor(() => expect(rejectButton).toBeDisabled());
});
  // it("handles approval and rejection of leave requests", async () => {
  //   const mockPendingLeaves = [
  //     { id: 1, leaveType: "Sick", status: "pending", User: { username: "user1" } },
  //     { id: 2, leaveType: "Vacation", status: "pending", User: { username: "user2" } },
  //   ];
  

  //   (global.fetch as jest.Mock)
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => mockPendingLeaves, 
  //     })
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => ({ id: 1, status: "approved" }),
  //     })
  //     .mockResolvedValueOnce({
  //       ok: true,
  //       json: async () => ({ id: 2, status: "rejected" }), 
  //     });
  
  //   render(<AdminDashboard {...mockUser} />);
  
  //   fireEvent.click(screen.getByText(/Manage Leaves/i));
  
    
  //   await waitFor(() => screen.getByText("Pending Leave Requests"));
  

  //   const leaveCards = await screen.findAllByText(/Employee:/);
  //   expect(leaveCards.length).toBeGreaterThan(0); 
  
  //   const approveButton = await screen.findByText(/Approve/i);
  //   const rejectButton = await screen.findByText(/Reject/i);
  

  //   expect(approveButton).toBeInTheDocument();
  //   expect(rejectButton).toBeInTheDocument();
  
    
  //   userEvent.click(approveButton);
  

  //   await waitFor(() => expect(approveButton).toBeDisabled());
  
  
  //   userEvent.click(rejectButton);
  

  //   await waitFor(() => expect(rejectButton).toBeDisabled());
  // });


});
