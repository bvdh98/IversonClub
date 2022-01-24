import "./App.css";
import "./components/Banner.js";
import Banner from "./components/Banner.js";
import { AuthProvider } from "./components/contexts/AuthContext";
import ShoeList from "./components/DataHydrator";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import { ShoppingCartProvider } from "./components/ShoppingCartContext";
import ShoppingCartList from "./components/ShoppingCartList";
//todo: hide api keys and paypal client id before psuhing to github MVP
//todo: save cart items on firebase
//todo: quantity of shoes
//todo: reusable login/signup form
//todo: delete unused code and console logs
//center loading... heading
//get rid of unused react boiler plate
//add more iverson images
//for production: If authenticated from firebase: Change allow read, write: if false; to request.auth != null;
//make shoppingcart more DRY
//add notification to navbar
//remove shoes on shoppingcartlist page
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
