import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import pic from "./testRat.png"

function Navbar() {
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
	return (
		<ul className="navBar">
				<Link className="active" to="/">Home</Link>
				<Link to="/decks">Decks</Link>
				{isLoggedIn && <Link to="/study-again">Study</Link>}
		
				{isLoggedIn ? (
					<div className="right" >
						<Link to="#" onClick={logOutUser}>Log Out</Link>
						<Link  to="/profile" className="hide">Hi, {user && user.name}!</Link>
						<Link to="/profile">
							<img src={pic} className="gloving" style={{ width: 50, height: 50, borderRadius: 25}} alt="beamy" />
						</Link>
					</div>)
					:
					< div className="right">
						<Link to="/signup">Sign Up</Link>
						<Link to="/login">Login</Link>
					</div>}
		</ul>
	);
}

export default Navbar;
