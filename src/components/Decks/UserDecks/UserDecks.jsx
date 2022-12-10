import React from 'react';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';


// make search and sort too
function UserDecks({getData, userDecks}) {

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='userDecks'>
            {userDecks.map(deck => (
                <div key={deck._id}>
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link to={`/decks/${deck._id}`}>
                            <h1>{deck.name}</h1>
                            {/* <p>{deck.description}</p> */}
                        </Link>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

export default UserDecks;