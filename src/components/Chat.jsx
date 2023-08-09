import React, { useContext } from "react";
import Messages from "./Messages";
import { ChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <>
      {data.chatId !== "null" ? (
        <div className="">
          <div className="h-[50px] text-white bg-purple-700 flex items-center self-start px-2">
            <span className="text-lg font-semibold">{data.user.username}</span>
          </div>

          <Messages />
        </div>
      ) : (
        <div className="text-xl h-screen flex justify-center items-center">
          Dashboard
        </div>
      )}
    </>
  );
};
