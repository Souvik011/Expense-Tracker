import React , {useContext} from "react";
import "./App.css";
import { LoginContextProvider } from "./Context/Login-Context";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import SignupPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import LoginContext from "./Context/Login-Context";

function App() {
  const Ctx = useContext(LoginContext);
  return (
    <React.Fragment>
      <LoginContextProvider>
        <Routes>
          <Route path="/" element={<SignupPage />}/>
            

          <Route path="/signUp" element={<SignupPage />}/>
            

          {Ctx.isLoggedIn ? <Route path="/LogIn" element={<LogInPage />}/> : <Route path="/LogIn" element={<WelcomePage/>}/>}

          <Route path="/welcome" element={<WelcomePage />}/>
        </Routes>
      </LoginContextProvider>
    </React.Fragment>
  );
}

export default App;
