import { useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../Context/Login-Context";
import classes from "./Header.module.css";

const Header = () => {
  const loginCtx = useContext(LoginContext);
  console.log(loginCtx.isLoggedIn);
  return (
    <header className={classes.Header}>
      <div>
        <h3>Expense Tracker</h3>
      </div>
      {!loginCtx.isLoggedIn && <Link to="/signUp">Sign Up</Link>}
      {!loginCtx.isLoggedIn && <Link to="/LogIn">Log In</Link>}
      
      {loginCtx.isLoggedIn && (
        <Link onClick={loginCtx.logout} to="/LogIn">
          Log out
        </Link>
      )}
    </header>
  );
};
export default Header;