import "./App.css";
import "./components/Banner.js";
import Banner from "./components/Banner.js";
import { AuthProvider } from "./components/contexts/AuthContext";
import ShoeList from "./components/ShoeList";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Container fluid>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
