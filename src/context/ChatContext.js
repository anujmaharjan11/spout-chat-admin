import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [chat, setChat] = useState();

  const { currentUser } = useContext(AuthContext);
  const initialState = {
    chatId: "null",
    user: {},
  };

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

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          loading: false,
          user: action.payload,
          chatId: chat?.find(
            (c) =>
              c.messages[0]?.senderId === action.payload.uid &&
              c.endedAt === null
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
