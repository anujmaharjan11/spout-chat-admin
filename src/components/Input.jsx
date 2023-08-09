import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

export const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendMsg = async () => {
    if (text) {
      updateDoc(doc(db, "chats", data.chatId.sessionId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          receiverId: data.user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // await updateDoc(doc(db, "userChats", currentUser.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    setText("");
  };


  return (
    <div className="p-[10px] flex items-center justify-between">
      <input
        value={text}
        className="bg-transparent text-[18px] placeholder-gray-500 w-full border-none outline-none "
        type="text"
        placeholder="Message"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center">
        <button
          onClick={handleSendMsg}
          className="text-white bg-purple-700 px-[15px] py-[10px]"
        >
          Send
        </button>
      </div>
    </div>
  );
};
