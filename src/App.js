import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChatHome } from "./pages/ChatHome";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={currentUser ? <ChatHome /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />

          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      {/* <Register/> */}
    </BrowserRouter>
  );
}

export default App;
