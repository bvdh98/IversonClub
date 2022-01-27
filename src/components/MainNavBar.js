import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useAuth } from "./contexts/AuthContext";
import { useShoppingCart } from "./ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./MainNavBar.css";

const MainNavBar = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {state, dispatch} = useShoppingCart();
  const handleLogOut = async(e) => {
    setError('');
    try{
      await logout();
      dispatch({type:"log out"});
      navigate('/login');
    }
    catch{
      setError('failed to log out');
    }
  }
  return (
    <Navbar
      id="main_nav_bar"
      bg="dark"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Navbar.Brand>
        <Icon
          className="user_icon_img"
          icon="carbon:user-avatar-filled-alt"
          width={"3rem"}
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <NavDropdown title={currentUser && currentUser.email}>
            <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate('/shopping-cart')}>Your Shopping Cart</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
