import "./Decks.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import brain from "./brain.png";
import { motion } from 'framer-motion';

const API_URL = "http://localhost:5005";

// make search and sort
function Decks() {
    const [allDecks, setAllDecks] = useState([]);
    function getData() {
        axios
            .get(`${API_URL}/decks`)
            .then((response) => {
                const decks = response.data;
                let userIds = [];
                decks.forEach(deck => {
                    const userId = deck.createdBy;
                    if (!userIds.includes(userId)) {
                        userIds.push(userId);
                    }
                    console.log(userIds);
                });
                Promise.all(userIds.map((userId) => axios.get(`${API_URL}/user/${userId}`)))
                    .then((responses) => {
                        const users = responses.map((response) => response.data)
                        console.log(users);
                        const decksWithUserNames = decks.map(deck => {
                            const matchingUser = users.find((user) => user._id === deck.createdBy);
                            return { ...deck, userName: matchingUser.name }
                        });
                        setAllDecks(decksWithUserNames);
                    });
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="whole-greed">
            {allDecks.map(deck => (
                <div className="column" key={deck._id}>
                    <motion.div
                        className="box"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link to={`/decks/${deck._id}`} className="each-deck">
                            <div className="length-row">
                                <img src={brain} style={{ width: '20px', height: '20px' }} />
                                <p>{deck.flashcards.length}</p>
                            </div>
                            <h1 className="d">{deck.name}</h1>
                            <p style={{ color: 'gray' }}>{deck.description}</p>
                            <i style={{ color: 'gray' }}>created by {deck.userName}</i>
                        </Link>
                        {/* HERE ADD BUTTON => "ADD DECK IN YOUR DECK COLLECTION"
                    (for that should i make a new entery in user schema 
                    something like "adopted decks" ?) */}
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

export default Decks;