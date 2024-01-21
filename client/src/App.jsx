import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import TradeDashboard from "./components/TradeDashboard.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tradeDashboard" element={<TradeDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
