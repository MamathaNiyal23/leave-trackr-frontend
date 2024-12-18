import React from "react";
import "./Home.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="content">
        <h1 className="title">LeaveTrackr 🗓️</h1>
        <p className="description">
          Welcome to the LeaveTrackr application. Track and manage your leave
          requests seamlessly.
        </p>
      </div>

      <div className="btns">
        <Link to="/login">
          <Button label="Login" />
        </Link>
        <Link to="/signup">
          <Button label="Sign Up" />
        </Link>
      </div>
      <footer className="footer">
        <p>© 2024 LeaveTrackr. All rights reserved.</p>
      </footer>
    </div>

  );
};

export default Home;
