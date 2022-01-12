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
//todo: paypal MVP
//todo: save cart items on firebase
//todo: quantity of shoes
//todo: reusable login/signup form
//todo: delete unused code and console logs
//todo: fix update unmounted component error
//todo: shoppingcartlist fix return duplicate elements
//center loading... heading
//get rid of unused react boiler plate
//implement remove from cart button on shoelist and checkout page
//add more iverson images
//dialog warning user that commerce page is fake MVP
//warn user that passwords must be atleast 6 characters MVP
//empty cart when something has been purchased MVP
//associate local storage with current user
//for production: If authenticated from firebase: Change allow read, write: if false; to request.auth != null;
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
