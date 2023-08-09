import React, { useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import { ChatContext } from "../context/ChatContext";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Input } from "./Input";
import { AuthContext } from "../context/AuthContext";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(""); // Add loading state
  // Add loading state

  const { data } = useContext(ChatContext);
  const [user, setUser] = useState();
  const { currentUser } = useContext(AuthContext);

  const [chat, setChat] = useState();

  useEffect(() => {
    try {
      setLoading(true);
      const unsub = onSnapshot(
        doc(db, "chats", data.chatId.sessionId),
        (doc) => {
          doc.exists() && setMessages(doc.data().messages);
          setLoading(false);
          // setInit(false)//
        }
      );
      // throw "Error testing";

      return () => {
        unsub();
      };
    } catch (e) {
      setErr(`Error: ${e} `);
      console.log("Issue loading msgs....", e);
    }
  }, [data, data.chatId]);

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

  return (
    <>
      {user
        ?.filter((u) => u.id !== currentUser.uid)
        .filter((u) =>
          chat?.find(
            (c) => c.messages[0]?.senderId === u.uid && c.endedAt === null
          )
        ).length < 0 ? (
        <div className="flex justify-center bg-white p-4 w-full">
          The user has ended this session.
        </div>
      ) : (
        <>
          <div className="bg-gray-300 p-[12px] h-[calc(100vh-116px)] overflow-auto">
            {loading && !err.length && (
              <div className="flex justify-center items-center text-xl">
                Loading...
              </div>
            )}

            {!loading &&
              !err.length &&
              messages.map((m) => <Message message={m} key={m.id} />)}

            {err.length > 0 ? (
              <div className="bg-red-500 p-2 text-white flex justify-center items-center text-lg">
                {err}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="">
            <Input />
          </div>
        </>
      )}
    </>
  );
};

export default Messages;
