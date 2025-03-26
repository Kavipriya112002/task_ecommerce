import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/admins");
      const admins = await response.json();
      const admin = admins.find(
        (admin) => admin.email === email && admin.password === password
      );

      if (admin) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin-dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
         /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        /><br/>
        <button type="submit" className="login">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
