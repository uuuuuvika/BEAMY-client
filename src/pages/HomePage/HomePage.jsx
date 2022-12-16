import "./HomePage.css";
import { motion } from 'framer-motion';
import Card from "../../components/Cards/Card/Card";
import { Link } from "react-router-dom";

function HomePage() {

	return (
		<div>
			<motion.div
				animate={{ margin: 0 }}
				transition={{
					type: 'spring',
					stiffness: 100,
				}}
				whileHover={{ scale: 1.2 }}>
				<h1 className="text">BEAMY</h1>
			</motion.div>

			<div className="rowOfcards">
				<div className="clay small">
					<Card
						question="What is BEAMY?"
						answer={<div>
							<p>BEAMY is a learning APP
								where you can:<br /><br />
								create and share flashcard decks
								or use the community created,
								track your progress
								and mainly HAVE FUN!</p>
						</div>}
					/>
				</div>
				<div className="clay small" >
					<Card
						question="Is BEAMY free?"
						answer={<div>
							<p>Yes!<br/> <br/>BEAMY is TOTALLY FREE
								and it always will be.</p>
						</div>}
					/>
				</div>
				<div className="clay small" >
					<Card
						question="How do I use BEAMY?"
						answer={<div>
							<p>To browse an awailible decks</p>
							<p>simply click <mark><Link to="/decks">here</Link></mark></p>
							<p>or register <mark><Link to="/signup">here</Link></mark> to start learning and creating</p>
						</div>}
					/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
