// import React, { useContext, useState } from "react";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { AuthContext } from "../context/AuthContext";

// export const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (e) {
//       setError(e);
//       console.log("aayo one>>> ", e)

//     }
//   };

//   const handleEnter = (e) => {
//     try{
//     e.code === "Enter" && handleSearch();
//     } catch(e){
//       console.log("aayo >>> ", e)
//     }
//   };

//   const handleSelect = async (e) => {
//     //check whether the group (chats collection in firestore), if not create userchats
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
//     try {
//       const response = await getDoc(doc(db, "chats", combinedId));
//       if (!response.exists()) {
//         // creating chats between two users in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(
//           doc(db, "chats-with-users", currentUser.uid),
//           {
//             [combinedId + ".userInfo"]: {
//               uid: user.uid,
//               displayName: user.displayName,
//             },
//             [combinedId + ".date"]: serverTimestamp(),
//           }
//         );
//       }
//     } catch (e) {
//       console.log("eee>>>>>>>>>>>>", e);
//     }

//     setUser(null);
//     setUsername("");
//   };

//   return (
//     <div className="">
//       <div className="bg-purple-400 border border-gray-300 p-[10px]">
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           onKeyDown={handleEnter}
//           placeholder="search user... "
//           className="placeholder-gray-500 bg-transparent border-none outline-none"
//           type="text"
//         />
//       </div>
//       {error && <span>User not found.</span>}
//       {user && (
//         <div className="cursor-pointer text-lg p-[10px] border-b-2 text-white flex items-center">
//           <span onClick={handleSelect}>here is {user.displayName}</span>
//         </div>
//       )}
//     </div>
//   );
// };
