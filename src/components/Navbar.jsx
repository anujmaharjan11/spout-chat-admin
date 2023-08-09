import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="bg-purple-600 text-white flex items-center p-[10px] h-[60px] justify-between">
      <span className="font-bold">Help Chat</span>
      <div>
        <span className="pr-2 text-sm italic">{currentUser.email}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-400 px-2 py-1 rounded-xl "
        >
          Logout
        </button>
      </div>
    </div>
  );
};
