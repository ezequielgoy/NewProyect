import Room from "./pages/Room";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route
}from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";



function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Main/> : <Login/>}/> 
        <Route path="/signup" element={<Register/>}/> 
        <Route path="/room" element={<Room/>}/>
      </Routes>
    </Router>

  );
}

export default App;
