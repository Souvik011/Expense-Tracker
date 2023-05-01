import React, { useRef, useState } from "react";
import classes from "./SignUpPage.module.css";
import { NavLink } from "react-router-dom";

const SignupPage = () => {
  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");

  const [emailValid, setEmailValid] = useState(false);
  const [passValid, setPassValid] = useState(false);
  const [confirmPassValid, setConfirmPassValid] = useState(false);

  const signUpSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passValue = passRef.current.value;
    const confirmPassValue = confirmPassRef.current.value;
    if (
      emailValue.includes("@") &&
      emailValue.includes(".") &&
      passValue.length > 6 &&
      confirmPassValue === passValue
    ) {
      setEmailValid(false);
      setPassValid(false);
      setConfirmPassValid(false);

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDICIhykIkqE7MfZMMbKHGVp7G1EQVAeK4",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailValue,
            password: confirmPassValue,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.email);
        emailRef.current.value = "";
        passRef.current.value = "";
        confirmPassRef.current.value = "";
      } else {
        alert(data.error.message);
      }
    } else {
      if (!emailValue.includes("@") || !emailValue.includes(".")) {
        setEmailValid(true);
      }
      if (passValue.length < 6) {
        setPassValid(true);
      }
      if (confirmPassValue !== passValue) {
        setConfirmPassValid(true);
      }
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={signUpSubmitHandler} className={classes.signUp}>
        <div>
          <h3>Sign Up</h3>
        </div>
        <div>
          <input
            id="emailId"
            placeholder="Email"
            type="text"
            ref={emailRef}
          ></input>
          {emailValid && <p>Please Enter Valid Email</p>}
          <input
            id="passwordId"
            placeholder="Password"
            type="password"
            ref={passRef}
          />
          {passValid && <p>Please Enter Valid Password</p>}
          <input
            id="confirmPwdId"
            placeholder="Confirm Password"
            type="password"
            ref={confirmPassRef}
          />
          {confirmPassValid && <p>Please Match the Password</p>}
        </div>
        <button>Sign Up</button>
        <div className={classes.signIn}> Already Have An Account ?
        <NavLink  to="/LogIn" ><button style={{backgroundColor:"blue"}} >LogIn</button></NavLink><NavLink to="/forgotPass"><button style={{backgroundColor:"red"}}>Forget Password</button></NavLink>
        </div>
      </form>
      
        
      
    </React.Fragment>
  );
};

export default SignupPage;
