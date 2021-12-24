import { Alert, Form, Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link} from "react-router-dom";
import './Signup.css';

const ForgotPassword = () => {
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const {resetPassword} = useAuth();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            //set error back to empty string
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("check your email inbox for further instructions")
        }catch{
            setError("failed to reset password");
            console.log(error);
        }
        setLoading(false);
    }
    return (
    <div id="sign_up_container" className="card col-sm-6">
      <h1>Password Reset</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email" className="user_input_field">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Button disabled={loading} className="" type="submit">
          Reset Password
        </Button>
      </Form>
      <h4><Link to="/login">Login</Link></h4>
      <h4>Need an account? <Link to="/signup">Sign Up</Link></h4>
    </div>
    )
}

export default ForgotPassword
