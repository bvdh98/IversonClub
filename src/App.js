import "./App.css";
import "./components/Banner.js";
import { AuthProvider } from "./components/contexts/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import { ShoppingCartProvider } from "./components/ShoppingCartContext";
import ShoppingCartList from "./components/ShoppingCartList";
function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <ShoppingCartProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/shopping-cart" element={<ShoppingCartList/>}/>
              <Route
                exact
                path="/forgot-password"
                element={<ForgotPassword />}
              />
            </Routes>
          </ShoppingCartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
