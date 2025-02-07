import { useState, useEffect } from "react";
import "./Admin.css";
import DashBoardHeader from "../../components/DashBoardHeader/DashBoardHeader";
import LeftSection from "../../components/Sections/LeftSection";

interface AdminDashboardProps {
  userId: number;
  username: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userId,
  username,
}) => {
  const [view, setView] = useState<"Dashboard" | "Leaves" | "Manage" | "Apply">(
    "Dashboard"
  );
  const [leaves, setLeaves] = useState<any[]>([]);
  const [pendingLeaves, setPendingLeaves] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdminLeaves = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/admin/allEmployees`
        );
        if (!response.ok) throw new Error("Failed to fetch all leaves");
        const allLeaves = await response.json();
        setLeaves(allLeaves);

        const pendingResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/admin/allEmployees?status=pending`
        );
        if (!pendingResponse.ok)
          throw new Error("Failed to fetch pending leaves");
        const pendingData = await pendingResponse.json();
        setPendingLeaves(pendingData);
      } catch (error) {
        console.error("Error fetching admin leaves:", error);
      }
    };

    fetchAdminLeaves();
  }, []);

  const handleLeaveApproval = async (
    id: number,
    action: "approved" | "rejected"
  ) => {
    if (!id) {
      console.error("Invalid leaveId:", id);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/admin/manage/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, status: action }),
        }
      );
      if (!response.ok)
        throw new Error(`Failed to ${action} leave with ID: ${id}`);
      const updatedLeave = await response.json();

      setPendingLeaves((prevPendingLeaves) =>
        prevPendingLeaves.filter((leave) => leave.id !== id)
      );
      setLeaves((prevLeaves) => [
        ...prevLeaves,
        {
          ...updatedLeave,
          status: action,
        },
      ]);
    } catch (error) {
      console.error(`Error ${action} leave ID ${id}:`, error);
    }
  };

  return (
    <div className="dashboard-container">
      <DashBoardHeader username={username} />

      <div className="dashboard-body">
        <LeftSection view={view} setView={setView} />

        <div className="middle-section">
          {view === "Dashboard" && (
            <div className="dashboard-welcome">
              <div className="welcome">
                <h2>Welcome to Admin Dashboard!</h2>
              </div>
              <div className="content-body">
                <img src="./analysis.png" className="analysisImage" />
              </div>
            </div>
          )}

          {view === "Leaves" && (
            <div className="leaves-section">
              <h3>All Leave Requests</h3>
              {leaves.length > 0 ? (
                <div className="leave-cards-container">
                  {leaves.map((leave, index) => (
                    <div key={index} className="leave-card">
                      <h4>Employee: {leave.User?.username || "Unknown"}</h4>
                      <p>
                        <strong>Leave Type:</strong> {leave.leaveType}
                      </p>
                      <p>
                        <strong>Status:</strong> {leave.status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No leave requests to manage</p>
              )}
            </div>
          )}

          {view === "Manage" && (
            <div className="manage-leaves">
              <h3>Pending Leave Requests</h3>
              {pendingLeaves.length > 0 ? (
                <div className="leave-cards-container">
                  {pendingLeaves.map((leave, index) => (
                    <div key={index} className="leave-card">
                      <h4>Employee: {leave.User?.username || "Unknown"}</h4>
                      <p>
                        <strong>Leave Type:</strong> {leave.leaveType}
                      </p>
                      <p>
                        <strong>Status:</strong> {leave.status}
                      </p>

                      <button
                        onClick={() =>
                          handleLeaveApproval(leave.id, "approved")
                        }
                        className={`approve-btn ${
                          leave.status === "approved" ? "approved" : ""
                        }`}
                        disabled={leave.status !== "pending"}
                      >
                        {leave.status === "approved" ? "Approved" : "Approve"}
                      </button>
                      <button
                        onClick={() =>
                          handleLeaveApproval(leave.id, "rejected")
                        }
                        className={`reject-btn ${
                          leave.status === "rejected" ? "rejected" : ""
                        }`}
                        disabled={leave.status !== "pending"}
                      >
                        {leave.status === "rejected" ? "Rejected" : "Reject"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pending requests</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
