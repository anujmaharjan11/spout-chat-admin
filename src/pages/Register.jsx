import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName,
        email,
      }).catch((e) => console.log(e));

      await setDoc(doc(db, "chats-with-users", response.user.uid), {});
      
      nav("/");

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
        <span className="text-sm">Sign Up</span>
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input className="px-3 py-2 " type="text" placeholder="Your name" />
          <input className="px-3 py-2  " type="email" placeholder="Email" />
          <input className="px-3 py-2" type="password" placeholder="Password" />
          <button className="py-3 text-white bg-purple-500 hover:bg-purple-400">
            Sign Up
          </button>
          {error && <span>Something went wrong. Please try again.</span>}
        </form>
        <div className="text-xs mt-2">
          Already have an account?{" "}
          <span className="text-purple-500"><Link to = '/login'>Sign in</Link></span>
        </div>
      </div>
    </div>
  );
};
