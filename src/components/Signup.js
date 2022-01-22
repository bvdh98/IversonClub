import { Alert, Form, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  //grabbing sign-up function from context
  const { signup} = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPassRef.current.value) {
      return setError("passwords do not match!");
    } else if (passwordRef.current.value.length < 6) {
      return setError("passwords must be at least 6 characters long");
    }
    try {
      //set error back to empty string
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        confirmPassRef.current.value
      );
      //if succesful login send user to main page
      navigate("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        setError("email already in use");
      } else {
        setError("failed to create an account");
        console.log(error);
      }
    }
  };
  return (
    <div id="sign_up_container" className="card col-sm-6">
      <h1>Sign Up</h1>
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email" className="user_input_field">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password" className="user_input_field">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Form.Group id="password-confirm" className="user_input_field">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" ref={confirmPassRef} required />
        </Form.Group>
        <Button disabled={loading} className="" type="submit">
          Sign Up
        </Button>
      </Form>
      <h4>
        Already have an account? <Link to="/login">Log in</Link>
      </h4>
    </div>
  );
};

export default Signup;
