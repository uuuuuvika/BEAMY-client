import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:5005";

// make search and sort
function Decks() {
    
    const [allDecks, setAllDecks] = useState([]);

    const getData = () => {
        axios
            .get(`${API_URL}/decks`)
            .then((response) => {
                //console.log(response.data);
                setAllDecks(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {allDecks.map(deck => (
                <div key={deck._id}>
                    <>{}</>
                    <Link to={`/decks/${deck._id}`}>
                        <p>{deck.flashcards.length}</p>
                        <h1>{deck.name}</h1>
                        <p>{deck.description}</p>
                    </Link>
                    {/* HERE ADD BUTTON => "ADD DECK IN YOUR DECK COLLECTION"
                    (for that should i make a new entery in user schema 
                    something like "adopted decks" ?) */}
                </div>
            ))}
        </div>
    );
}

export default Decks;