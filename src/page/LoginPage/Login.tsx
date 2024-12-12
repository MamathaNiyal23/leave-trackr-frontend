import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/dashboard");
  };
  return (
    <div className="container">
      <div>
        <img src="/bg1.png" alt="Background" />
      </div>

      <div className="right">
        <h1>Hello again! 👋 </h1>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "username is required" })}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "password is required" })}
          />

          <button type="submit">Login</button>
        </form>

        <div>
          <h4>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </h4>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 LeaveTrackr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
