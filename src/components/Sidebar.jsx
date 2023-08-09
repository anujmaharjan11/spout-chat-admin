import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const Sidebar = () => {
  const [user, setUser] = useState();
  const { currentUser } = useContext(AuthContext);

  const [chat, setChat] = useState();

  const [selectedChat, setSelectedChat] = useState();

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUser(fetchedData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [setUser]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatSnapshot = await getDocs(collection(db, "chats"));
        const fetchedChatData = chatSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setChat(fetchedChatData);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchChatData();
  }, [setChat]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setSelectedChat(user);
  };

  return (
    <div className="bg-purple-600 h-[100vh]">
      <div className="border-b">
        <Navbar />
      </div>
      <div className="pl-3 pt-2 text-white font-bold text-3xl">Chats</div>

      <ul className="m-3">
        {user ? (
          user
            ?.filter((u) => u.id !== currentUser.uid)
            .filter((u) =>
              chat?.find(
                (c) => c.messages[0]?.senderId === u.uid && c.endedAt === null
              )
            ).length > 0 ? (
            user
              ?.filter((u) => u.id !== currentUser.uid)
              .filter((u) =>
                chat?.find(
                  (c) => c.messages[0]?.senderId === u.uid && c.endedAt === null
                )
              )
              .map((item, index) => (
                <li
                  onClick={() => {
                    handleSelect(item);
                  }}
                  className={`${
                    selectedChat === item
                      ? "px-1 cursor-not-allowed bg-purple-400"
                      : "bg-purple-600"
                  } hover:bg-purple-400 px-1 py-2 w-full flex items-start rounded-lg cursor-pointer mb-3 text-white`}
                  key={item.uid}
                >
                  {item.username}
                </li> // Assuming each document has a 'name' field
              ))
          ) : (
            <div className="text-white italic font-bold flex flex-col items-center">
              No active users available
            </div>
          )
        ) : (
          <div className="text-white flex flex-col items-center">
            Loading...
          </div>
        )}
      </ul>
    </div>
  );
};
