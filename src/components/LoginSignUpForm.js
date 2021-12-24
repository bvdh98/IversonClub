import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const LoginSignUpForm = ({
  title,
  hasPassword,
  hasPassConfirmation,
  hasNeedAnAccountLink,
  hasAlreadyHaveAccountLink,
  hasForgotPasswordLink,
  hasLoginLink,
  submitButtonTitle, 
  formType
}) => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
      switch(formType){
        case 'signUp': 
            handleSignUp();
            break;
        case 'signIn':
            handleSignIn();
            break;
        case 'forgotPassword':
            handleForgotPassword();
            break;
      }
  }
  
  const handleSignUp = async(e) => {
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
const handleSignIn = async(e) => {
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
const handleForgotPassword = async(e) => {
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
      <h1>
        {title}
      </h1>
      {error &&
        <Alert variant="danger">
          {error}
        </Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email" className="user_input_field">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        {hasPassword &&
          <Form.Group id="password" className="user_input_field">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>}
        {hasPassConfirmation &&
          <Form.Group id="password-confirm" className="user_input_field">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password" ref={confirmPassRef} required />
          </Form.Group>}
        <Button disabled={loading} type="submit">
          {submitButtonTitle}
        </Button>
      </Form>
      
      {hasForgotPasswordLink &&
        <h4>
          <Link to="/forgot-password">Forgot Password?</Link>
        </h4>}
      {hasLoginLink &&
        <h4>
          <Link to="/login">Login</Link>
        </h4>}
      {hasNeedAnAccountLink &&
        <h4>
          Need an account? <Link to="/signup">Sign Up</Link>
        </h4>}
      {hasAlreadyHaveAccountLink &&
        <h4>
          Already have an account? <Link to="/login">Log in</Link>
        </h4>}
    </div>
  );
};

export default LoginSignUpForm;
