import React from "react";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {

  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        await signInWithEmailAndPassword(auth, email, password)
        nav('/')
    } catch (e) {
      setError(e);
    }
  };
  return (
    <div className="bg-purple-400 h-[100vh] flex items-center justify-center ">
      <div className="bg-gray-200 rounded-xl px-12 py-8 flex flex-col items-center gap-[10px]">
        <span className="flex self-center text-xl text-purple-500 font-bold">
          Help Chat
        </span>
        <span className="text-sm">Login</span>
        <form onSubmit= {handleSignIn} className="flex flex-col gap-4">
          <input className="px-3 py-2  " type="email" placeholder="Email" />
          <input className="px-3 py-2" type="password" placeholder="Password" />
          <button className="py-3 text-white bg-purple-500 hover:bg-purple-400">
            Login
          </button>
          {error && <span>Something went wrong. Please try again.</span>}

        </form>
        <div className="text-xs mt-2">
          Don't have an account?{" "}
          <span className="text-purple-500"><Link to = '/register'>Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};
