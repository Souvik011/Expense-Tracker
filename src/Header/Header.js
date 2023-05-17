
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../store/Auth";

const Header = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
  };
  return (
    <header className={classes.Header}>
      <div>
        <h3>Expense Tracker</h3>
      </div>
      {!isLoggedIn && <Link to="/signUp">Sign Up</Link>}
      {!isLoggedIn && <Link to="/LogIn">Log In</Link>}
      {!!isLoggedIn && <Link to="/expenses">Expenses</Link>}
      {isLoggedIn && (
        <Link onClick={logoutHandler} to="/LogIn">
          Log out
        </Link>
      )}
    </header>
  );
};
export default Header;