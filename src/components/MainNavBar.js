import React, {useState} from "react";
import { Badge } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useAuth } from "./contexts/AuthContext";
import { useShoppingCart } from "./contexts/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import './MainNavBar.css';

const MainNavBar = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {state} = useShoppingCart();
  const handleLogOut = async(e) => {
    setError('');
    try{
      await logout();
      navigate('/login');
    }
    catch{
      setError('failed to log out');
    }
  }
  return (
    <nav id="main_nav_bar" className="navbar navbar-light bg-light">
      <Icon
        className="user_icon_img"
        icon="carbon:user-avatar-filled-alt"
        width={"3rem"}
      />
      <h4 className="user_email">
        {currentUser && currentUser.email}
      </h4>
      <button className="btn btn-outline-success" type="button" onClick={handleLogOut}>Log Out</button>
      <a href="/shopping-cart">
        <span>
          <Icon className="cart_icon" icon="mdi-light:cart" width={"2rem"}/>
        </span>
        {state.shoes.length > 0 && 
        <span className= "cart_notification">
          <Badge>{state.shoes.length}</Badge>
        </span>}
      </a>
    </nav>
  );
};

export default MainNavBar;
