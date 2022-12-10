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
            .then((response) => setAllDecks(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {allDecks.map(deck => (
                <div key={deck._id}>
                    <Link to={`/decks/${deck._id}`}>
                        <h1>{deck.name}</h1>
                        <p>{deck.description}</p>
                    </Link>
                    {/* <h2>{deck.name}</h2>
                    <p>{deck.description}</p>
                    <button onClick={() => props.onSelectDeck(deck)}>
                        Start studying
                    </button> */}
                </div>
            ))}
        </div>
    );
}

export default Decks;

{/* <DeckList
  decks={decks}
  onSelectDeck={selectedDeck => {
    // Handle the selected deck here
  }}
/> */}