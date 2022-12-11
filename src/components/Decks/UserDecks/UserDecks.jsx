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
        <div className='user-decks'>
            {userDecks.map(deck => (
                <div key={deck._id} className="cc">
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link to={`/decks/${deck._id}`}>
                            <p>{deck.flashcards.length}</p>
                            <h1 className="d">{deck.name}</h1>
                        </Link>
                    </motion.div>
                    <StudyBtn />
                </div>
            ))}
        </div>
    );
}

export default UserDecks;