import "./App.css";
import "./components/Banner.js";
import Banner from "./components/Banner.js";
import { AuthProvider } from "./components/contexts/AuthContext";
import ShoeList from "./components/ShoeList";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Container fluid>
      {/* <Banner />
      <div id="shoe_col" className="col-sm-12 border border-primary">
        <ShoeList />
      </div> */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<ShoeList/>}/>
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
