import React, { useState } from "react";
import "./DeckForm.css"
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function authTokenHeader() {
    const storedToken = localStorage.getItem("authToken");
    return { Authorization: `Bearer ${storedToken}` }
}

function DeckForm({getData}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    // const navigate = useNavigate();

    const handleChange = () => {
        setIsPublic(!isPublic);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = { name: name, description: description, isPublic: isPublic };
        axios
            .post(`${API_URL}/decks`, body,  { headers: authTokenHeader() })
            .then((response) => {
                setName("");
                setDescription("");
                setIsPublic(false);
                getData();
            });
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
            <button type="submit">Submit</button>
        </form>
    );
};


export default DeckForm;