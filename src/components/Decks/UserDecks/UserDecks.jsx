import "./UserDecks.css"
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import StudyBtn from "../../Cards/StudyBtn/StudyBtn";
import { AuthContext } from "../../../context/auth.context.jsx";
import adopted from "./adoption.png"


// make search and sort too
function UserDecks({ getData, userDecks }) {

    const { user } = useContext(AuthContext);
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='line'>
            {userDecks.length === 0 
            ? <div className="linee">place for your decks</div>
            : userDecks.map(deck => (
                <div key={deck._id}>
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <div className="study-button-line">
                            <p>{deck.flashcards.length}</p>

                            <StudyBtn deckId={deck._id} />
                            
                            <Link to={`/decks/${deck._id}`}>
                                <div className="one-line">
                                    <h2>{deck.name}</h2>
                                    {user && user._id !== deck.createdBy ? <img src={adopted} style={{ width: 20, height: 20 }} /> : null}
                                </div>
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