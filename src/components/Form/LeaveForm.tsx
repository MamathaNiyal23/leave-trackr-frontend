
import React, { useState } from "react";

interface LeaveFormProps {
  onSubmit: (formData: { leaveType: string; startDate: string; endDate: string }) => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(leaveForm);
    setLeaveForm({ leaveType: "", startDate: "", endDate: "" });
  };

  return (
    <div className="form-div">
      <form className="apply-leave-form" onSubmit={handleSubmit}>
        <h3>Apply for Leave</h3>
        <label>
          Leave Type:
          <input
            type="text"
            value={leaveForm.leaveType}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, leaveType: e.target.value })
            }
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={leaveForm.startDate}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, startDate: e.target.value })
            }
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={leaveForm.endDate}
            onChange={(e) =>
              setLeaveForm({ ...leaveForm, endDate: e.target.value })
            }
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeaveForm;
