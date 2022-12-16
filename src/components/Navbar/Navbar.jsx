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
				{isLoggedIn && <Link to="/study-again">Study</Link>}
			</div>

			<div className="navRight">
				{isLoggedIn ? (
					<div style={{ display: "flex", alignItems: "center" }}>
						{/* <button className="button clay card" style={{display: "flex", alignItems: "center"}}onClick={logOutUser}>Logout</button> */}
						<Link to="/profile">Hi, {user && user.name}!</Link>
						<Link to="/profile">
							<img src={pic} className="gloving " style={{ width: 50, height: 50, borderRadius: 25, margin: 10 }} alt="beamy" />
						</Link>
						<Link to="#" onClick={logOutUser} style={{ display: "flex", alignItems: "center" }}>Log Out</Link>
					</div>)
					:
					<>
						<Link to="/signup">{" "}Sign Up{" "}</Link>
						<Link to="/login">{" "}Login{" "}</Link>
					</>}
			</div>
		</nav>
	);
}

export default Navbar;
