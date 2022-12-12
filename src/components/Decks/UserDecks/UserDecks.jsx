import "./UserDecks.css"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import StudyBtn from "../../Cards/StudyBtn/StudyBtn";


// make search and sort too
function UserDecks({ getData, userDecks }) {

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='line'>
            {userDecks.map(deck => (
                <div key={deck._id}>
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <div className="study-button-line">
                            <p>{deck.flashcards.length}</p>
                            <StudyBtn deckId={deck._id} />
                            <Link to={`/decks/${deck._id}`}>
                                <h2>{deck.name}</h2>
                                <p className="grey">{deck.description}</p>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

export default UserDecks;