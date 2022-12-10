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
      </div>

      <div className="navLeft">
        {isLoggedIn && (<><button className="button clay card" onClick={logOutUser}>Logout</button>
          <Link to="/profile">
            {/* Profile */}
            <img src={pic} style={{ width: 50, height: 50, borderRadius: 25 }} alt="profile" />
          </Link>
          {/* <span>{user && user.name}</span> */}
        </>
        )}

        {!isLoggedIn && (<>
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
