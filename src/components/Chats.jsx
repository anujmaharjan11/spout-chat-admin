// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";

// export const Chats = () => {
//   const [chats, setChats] = useState([]);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(
//         doc(db, "chats-with-users", currentUser.uid),
//         (doc) => {
//           setChats(doc.data());
//         }
//       );

//       console.log("uuuuu >>>", chats)

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [chats, currentUser.uid]);

//   const handleSelect = (user) => {
//     dispatch({ type: "CHANGE_USER", payload: user });
//   };
//   return (
//     <div>
//       {Object?.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat) => 
//       (
//         <div
//           key={chat[0]}
//           onClick={handleSelect(chat[1].userInfo)}
//           className="text-lg p-[10px] text-white flex flex-col items-center cursor-pointer"
//         >
//           <span>{chat[1].userInfo.displayName}</span>
//           <p>{chat[1].lastMessage?.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
