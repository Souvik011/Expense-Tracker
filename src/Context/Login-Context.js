import React, { useState } from "react";

const LoginContext = React.createContext({
  email: null,
  idToken: null,
  isLoggedIn:false,
  login: () => {},
  logout: () => {}
});

export const LoginContextProvider = (props) => {
  const [email, setEmail] = useState(localStorage.getItem("EmailId"));
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));

  const [userIsLoggedIn,setUserIsLoggedIn] = useState(!!localStorage.getItem("EmailId"));

  const logInHandler = (email, idToken) => {
    setEmail(email);
    setIdToken(idToken);
    setUserIsLoggedIn(true);

    localStorage.setItem('EmailId', email)
    localStorage.setItem("idToken", idToken);
  };

  const logOutHandler = () => {
    setEmail(null);
    setIdToken(null);
    setUserIsLoggedIn(false);

    localStorage.removeItem("EmailId");
    localStorage.removeItem("idToken");
  };

  const loginContext = {
    email: email,
    idToken: idToken,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;