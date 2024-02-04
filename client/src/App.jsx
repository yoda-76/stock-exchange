import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import TradeDashboard from "./components/TradeDashboard.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tradeDashboard" element={<TradeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
