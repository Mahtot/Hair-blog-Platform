'use client';
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar/Navbar";
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import UserContext from "../../contexts/UserContext";
import Page from "@/app/user-profile/page";

const UserAccount = () => {
  const context = useContext(UserContext);
  const { user, login, register, logout } = context || {};
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // Handles login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    const success = await login?.(email, password);
    if (success) {
      router.push('/user-profile'); // Redirect to user profile after login
    }
  };

  // Handles registration
  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const success = await register?.({ username, email, password, img: "", about: "", savedBlogs: [] });
    if (success) {
      router.push('/user-profile'); // Redirect to user profile after registration
    }
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="flex flex-col items-center mt-10 md:w-[35vw] gap-3 mx-auto">
      <h2 className="text-[#605e5e] text-3xl md:text-5xl font-bold font-sans mb-10">Sign In</h2>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <button onClick={handleLogin} className="bg-[#636363] text-white rounded-lg w-full p-3 hover:bg-[#9C3A14] transition-all duration-300">
        SIGN IN
      </button>
      <p className="mt-4">
        Do not have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          Create One
        </span>
      </p>
    </div>
  );

  // Render register form
  const renderRegisterForm = () => (
    <div className="flex flex-col items-center mt-10 md:w-[35vw] gap-3 mx-auto">
      <h2 className="text-[#605e5e] text-3xl md:text-5xl font-bold font-sans mb-10">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-2 p-3 border outline-[#9C3A14] w-full"
      />
      <button onClick={handleRegister} className="bg-[#636363] text-white rounded-lg w-full p-3 hover:bg-[#9C3A14] transition-all duration-300">
        CREATE ACCOUNT
      </button>
      <p className="mt-4 font-thin">
        Already have an account? Please{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setShowLogin(true)}
        >
          Sign In
        </span>
      </p>
    </div>
  );
  return (
    user ? (
      <Page />
    ) : (

      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-col justify-center items-center p-10">
          {showLogin ? renderLoginForm() : renderRegisterForm()}
        </div>
        <Footer />
      </div>
    )


  )
};

export default UserAccount;
