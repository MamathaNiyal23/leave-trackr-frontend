import React from "react";
import "./Registration.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/dashboard");
  };
  return (
    <div className="container">
      <div className="right">
        <h2>Welcome! 👋 </h2>
        <p>Create an account to get started</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "username is required" })}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "email is required" })}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "password is required" })}
          />

          <div className="role">
            <label>
              <input
                type="radio"
                value="admin"
                {...register("role", { required: true })}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                value="user"
                {...register("role", { required: true })}
              />
              User
            </label>
          </div>
          <button type="submit">Register</button>
        </form>

        <div>
          <h4>
            Already have an account ? <Link to="/login">Login</Link>
          </h4>
        </div>
      </div>
      <div className="left">
        <img src="/backgroundImg.svg" alt="Background" />
      </div>
      <footer className="footer">
        <p>© 2024 LeaveTrackr. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default SignUp;
