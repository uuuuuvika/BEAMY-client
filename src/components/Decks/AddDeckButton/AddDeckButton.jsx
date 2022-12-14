import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context.jsx";

const API_URL = process.env.REACT_APP_API_URL;


function AddDeckButton({ onClick }) {

    const {user} = useContext(AuthContext);
    const {deckId} = useParams();
    
    function addDeck(event) {
        axios
            .put(`${API_URL}/decks/${deckId}/add`, user)
            .then(response => console.log(response.data))
            .catch((error) => console.log(error));
        onClick();
    }
    
    return (
        <button className="button clay card" onClick={addDeck}>add deck to your collection</button>
    )
}

export default AddDeckButton