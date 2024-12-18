import React from 'react';

interface DashBoardHeaderProps {
  username: string;
}

const DashBoardHeader: React.FC<DashBoardHeaderProps> = ({ username }) => {
  return (
    <header className="dashboard-header">
      <div className="header-icons">
        <h3>Hello, {username} 👋</h3>
      </div>
      <div className="icons">
        <img src="./home.png" className="Image" />
        <img src="./bell.png" className="Image" />
        <img src="./profile-picture.png" className="Image" />
      </div>
    </header>
  );
};

export default DashBoardHeader;
