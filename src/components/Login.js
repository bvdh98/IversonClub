import { Alert, Form, Button, Modal } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import './Signup.css';

const Login = () => {
    //grabbing sign-up function from context
    const {login} = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            //set error back to empty string
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            //if succesful login send user to main page
            navigate("/");
        }catch{
            setError("failed to sign in");
            console.log(error);
        }
    }
  return (
    <div id="sign_up_container" className="card col-sm-6">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Important:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Iverson Club is a fake store. It was intended to be a personal project and nothing more.</Modal.Body>
        <Modal.Body>Please do not purchase any of the products listed, since they won`t be shipped to you.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Log In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email" className="user_input_field">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password" className="user_input_field">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Button disabled={loading} className="" type="submit">
          Login
        </Button>
      </Form>
      <h4><Link to="/forgot-password">Forgot Password?</Link></h4>
      <h4>Need an account? <Link to="/signup">Sign Up</Link></h4>
    </div>
  );
};

export default Login;
