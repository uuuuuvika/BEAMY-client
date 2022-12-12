import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import pic from "./testRat.png"

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="navBar">

      <div className="navLeft">
        <Link to="/">Home</Link>
        <Link to="/decks">Decks</Link>
        {/* <Link to="/">About</Link> */}
      </div>

      <div className="navLeft">
        {isLoggedIn && (
          <>
            <button className="button clay card" onClick={logOutUser}>Logout</button>
            <Link to="/profile">
              <img src={pic} style={{ width: 50, height: 50, borderRadius: 25, margin: 5 }} alt="beamy" />
              <span className="smallText" >Hi, {user && user.name}!</span>
            </Link>
          </>
        )}
        {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}Sign Up{" "}
          </Link>
          <Link to="/login">
            {" "}Login{" "}
          </Link>
        </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
