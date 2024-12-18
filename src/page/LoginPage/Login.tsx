import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { id, username, role } = responseData;

        localStorage.setItem(
          "user",
          JSON.stringify({ userId: id, username, role })
        );
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
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
