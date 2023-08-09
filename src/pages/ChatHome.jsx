import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";

export const ChatHome = () => {
  return (
    <div className="bg-gray-300 flex items-center justify-center">
      <div className="flex border-[1px] w-full border-white border-solid">
        <div className="flex-[10%] overflow-hidden">
          <Sidebar />
        </div>

        <div className="flex-[50%] bg-purple-200">
          <Chat />
        </div>
      </div>
    </div>
  );
};
