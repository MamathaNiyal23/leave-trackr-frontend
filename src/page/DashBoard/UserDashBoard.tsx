import DashBoardHeader from "../../components/DashBoardHeader/DashBoardHeader";
import LeaveForm from "../../components/Form/LeaveForm";
import "./UserDashBoard.css";
import React, { useState, useEffect } from "react";

interface Leave {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface UserDashboardProps {
  userId: number;
  username: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userId, username }) => {
  const [view, setView] = useState<"Dashboard" | "Leaves"  | "Apply">(
    "Dashboard"
  );
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/leave/view/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch leaves");
        const leaveData = await response.json();
        setLeaves(leaveData);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, [userId]);

  const handleLeaveSubmit = async (leaveForm: {
    leaveType: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/leave/application`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...leaveForm, userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to apply leave");
      const newLeave = await response.json();
      setLeaves([...leaves, newLeave]);
    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };

  const handleCancelLeave = async (leaveId: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/leave/cancel/${leaveId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to cancel leave");

      setLeaves(leaves.filter((leave) => leave.id !== leaveId));
    } catch (error) {
      console.error("Error canceling leave:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <DashBoardHeader username={username} />

      <div className="dashboard-body">
      <div className="left-section">
      <ul>
        <li
          className={view === "Dashboard" ? "active" : ""}
          onClick={() => setView("Dashboard")}
        >
          User Dashboard
        </li>
        <li
          className={view === "Leaves" ? "active" : ""}
          onClick={() => setView("Leaves")}
        >
          All Leaves
        </li>
        <li
          className={view === "Apply" ? "active" : ""}
          onClick={() => setView("Apply")}
        >
          Apply Leave
        </li>
      </ul>
      </div>
        <div className="middle-section">
          {view === "Dashboard" && (
            <div className="dashboard-welcome">
              <div className="welcome">
                <h2>Welcome to Your Dashboard!</h2>
              </div>
              <div className="content-body1">
                <div className="data">
                  <strong>Total Annual Leaves: 12</strong>

                  <strong>Total Leaves taken : {leaves.length}</strong>
                  <strong>Remaining leaves: {12 - leaves.length}</strong>
                </div>
              </div>
            </div>
          )}

          {view === "Leaves" && (
            <div className="leaves-section">
              <h3>Your Leaves</h3>
              {leaves.length > 0 ? (
                <div className="leave-cards-container">
                  {leaves.map((leave, index) => (
                    <div key={index} className="leave-card">
                      <h4>Reason: {leave.leaveType}</h4>
                      <span className="time">
                        <strong>Start Date:</strong>{" "}
                        {new Date(leave.startDate).toLocaleDateString()}
                      </span>
                      <p>
                        <strong>End Date:</strong>{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <span className="btn">
                        <strong>Status:</strong>

                        <strong
                          className={
                            leave.status === "pending"
                              ? "status-pending"
                              : leave.status === "approved"
                              ? "status-approved"
                              : leave.status === "rejected"
                              ? "status-rejected"
                              : ""
                          }
                        >
                          {leave.status}
                        </strong>

                        {leave.status === "pending" && (
                          <button
                            className="cancelBtn"
                            onClick={() => handleCancelLeave(leave.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No leaves to display</p>
              )}
            </div>
          )}
          {view === "Apply" && <LeaveForm onSubmit={handleLeaveSubmit} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
