import { Alert } from "react-bootstrap";
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
        setLoading(false);
    }
  return (
    <div id="sign_up_container" className="card col-sm-6">
      <h1>Log In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="form">
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <br />
          <input type="text" id="email" name="email" ref={emailRef}/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <br />
          <input type="text" id="password" name="password" ref={passwordRef}/>
        </div>
        {/* prevent user from trying to create multiple users at once */}
        <button type="submit" disabled={loading} onClick={handleSubmit}>Log In</button>
      </div>
      <h4>Need an account? <Link to="/signup">Sign Up</Link></h4>
    </div>
  );
};

export default Login;
