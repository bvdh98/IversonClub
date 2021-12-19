import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    //grabbing sign-up function from context
    const {signup} = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPassRef.current.value){
            return setError('passwords do not match!');
        }
        try{
            //set error back to empty string
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, confirmPassRef.current.value);
            //if succesful login send user to main page
            navigate("/");
        }catch{
            setError("failed to create an account");
            console.log(error);
        }
        setLoading(false);
    }
  return (
    <div id="sign_up_container" className="card col-sm-6">
      <h1>Sign Up</h1>
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
        <div className="form-control">
          <label htmlFor="password-confirm">Confirm Password:</label>
          <br />
          <input type="text" id="password-confirm" name="password-confirm" ref={confirmPassRef}/>
        </div>
        {/* prevent user from trying to create multiple users at once */}
        <button type="submit" disabled={loading} onClick={handleSubmit}>Sign Up</button>
      </div>
      <h4>Already have an account? <Link to="/login">Log in</Link></h4>
    </div>
  );
};

export default Signup;
