import React, { useState } from "react";

const LoginContext = React.createContext({
  email: null,
  idToken: null,
  isLoggedIn:false,
  submitEmailToken: () => {},
  logout: () => {}
});

export const LoginContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [idToken, setIdToken] = useState("");

  const userIsLoggedIn = !!idToken;

  const submitEmailTokenHandler = (email, idToken) => {
    setEmail(email);
    setIdToken(idToken);

    localStorage.setItem('EmailId', email)

  };
  const loginContext = {
    email: email,
    idToken: idToken,
    isLoggedIn: userIsLoggedIn,
    submitEmailToken: submitEmailTokenHandler,
  };
  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;