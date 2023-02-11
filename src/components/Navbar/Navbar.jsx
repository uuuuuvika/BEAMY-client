import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">BEAMY</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link to="/about" className="nav-link">What is it all about?</Link>
						<Link to="/decks" className="nav-link">Decks</Link>
						{isLoggedIn && <Link to="/study-again" className="nav-link">Study</Link>}
						{isLoggedIn ? (
							<div className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="/decks" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									Hi, {user && user.name}!
								</a>
								<ul className="dropdown-menu">
									<Link to="/profile" className="dropdown-item">Go to my profile</Link>
									<Link to="#" className="dropdown-item" onClick={logOutUser}>Log Out</Link>
								</ul>
							</div>
						) : <Link to="/login" className="nav-link">Login</Link>}
						{!isLoggedIn ? <Link to="/signup" className="nav-link">Sign Up</Link> : null}
					</div>
				</div>

			</div>
		</nav>
	);
}

export default Navbar;
