import React from 'react';

interface LeftSectionProps {
  view: "Dashboard" | "Leaves" | "Manage" | "Apply";
  setView: React.Dispatch<React.SetStateAction<"Dashboard" | "Leaves" | "Manage" | "Apply">>;
}

const LeftSection: React.FC<LeftSectionProps> = ({ view, setView }) => {
  return (
    <div className="left-section">
      <ul>
        <li
          className={view === "Dashboard" ? "active" : ""}
          onClick={() => setView("Dashboard")}
        >
          Admin Dashboard
        </li>
        <li
          className={view === "Leaves" ? "active" : ""}
          onClick={() => setView("Leaves")}
        >
          All Leaves
        </li>
        <li
          className={view === "Manage" ? "active" : ""}
          onClick={() => setView("Manage")}
        >
          Manage Leaves
        </li>
      </ul>
    </div>
  );
};

export default LeftSection;
