'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/Navbar";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";

const UserAccount = () => {
  const context = useContext(UserContext);
  const { user, login, register, logout } = context || {}; // Ensure context is defined
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handles login
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    login && login(email, password);
  };

  // Handles registration
  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    register && register({ username, email, password });
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="login-form flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input mb-4"
      />
      <button onClick={handleLogin} className="btn">
        Login
      </button>
      <p className="mt-4">
        Do not have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          Register here
        </span>
      </p>
    </div>
  );

  // Render register form
  const renderRegisterForm = () => (
    <div className="register-form flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input mb-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input mb-4"
      />
      <button onClick={handleRegister} className="btn">
        Register
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLogin(true)}
        >
          Login here
        </span>
      </p>
    </div>
  );

  // Render user profile
  const renderUserProfile = () => (
    <div className="profile mt-10 flex flex-col items-center">
      <h2 className="text-2xl">Welcome, {user?.username}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout} className="btn mt-4">
        Logout
      </button>
    </div>
  );

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        {user ? renderUserProfile() : showLogin ? renderLoginForm() : renderRegisterForm()}
      </div>
      <Footer />
    </div>
  );
};

export default UserAccount;
