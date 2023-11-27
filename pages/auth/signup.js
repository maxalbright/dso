import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';
import { useRouter } from "next/router";
import React, { useState } from "react";
import { auth } from "../../firebase";
const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Paswords do not match. Please try again.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful!");
      router.push("/");
    } catch (error) {
      console.error("Error during sign up:", error.message);
      if (error.code === "auth/email-already-exists") {
        alert("email is already in use. Please use a different email or sign in.");
      } else {
        alert("An error occurred during sign up. Please try again.")
      }
    }
  };

  const buttonStyle = {
    cursor: "pointer",
  };

  const containerStyle = {
    backgroundImage: `url("https://source.unsplash.com/V3dHmb1MOXM")`, // Replace with your background image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh", // Ensure the container takes at least the full height of the viewport
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const formContainerStyle = {
    position: "relative",
    top: "-70%",
    transform: "translateY(-70%)",
    maxWidth: "400px",
    marginTop: "25rem",
    width: "100%",
    backgrounColor: "white"
  };

  return (
    <div style={containerStyle}>
      <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-md" style={formContainerStyle}>
        <h1 className="text-3xl font-bold mb-4" style={{ color: "#333" }}>Sign Up</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            className="border rounded-md w-full py-2 px-3"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            className="border rounded-md w-full py-2 px-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            className="border rounded-md w-full py-2 px-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
          <input
            className="border rounded-md w-full py-2 px-3"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSignUp} style={{ color: "#333" }}>
          Sign Up
        </button>
        <p className="mt-2" style={{ color: "#333" }}>
          Already have an account?  <Link href="/auth/auth"><a>Sign In</a></Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;