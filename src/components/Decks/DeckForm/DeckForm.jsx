import React, { useState } from "react";
import "./DeckForm.css"
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL


function authTokenHeader() {
    const storedToken = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${storedToken}` }
}

function DeckForm({ getData }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    function handleChange() {
        setIsPublic(!isPublic);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const body = { name: name, description: description, isPublic: isPublic };
        axios
            .post(`${API_URL}/decks`, body, { headers: authTokenHeader() })
            .then((response) => {
                setName("");
                setDescription("");
                setIsPublic(false);
                getData();
            })
            .catch((error) => console.log(error));
    }

    return (
        <form className="deck-form" onSubmit={handleSubmit}>
            <h2>Create New Deck</h2>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
            />
            <label htmlFor="isPublic">Is it a public deck?</label>
            <input
                type="checkbox"
                checked={isPublic}
                onChange={handleChange}
            />
            <button className="button clay bl" type="submit">create</button>
        </form>
    );
};


export default DeckForm;