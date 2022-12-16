import axios from "axios";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context.jsx";

const API_URL = process.env.REACT_APP_API_URL;


function RemoveDeckButton() {

    const { user } = useContext(AuthContext)
    const { deckId } = useParams();
    const navigate = useNavigate();

    function removeDeck() {
        if (window.confirm('Are you sure you want to remove this deck from your collection?')) {
            axios
                .put(`${API_URL}/decks/${deckId}/remove`, user)
                .then(response => console.log(response.data))
                .catch((error) => console.log(error));
            navigate('/profile');
        }
    }

    return (
        <div>
            <button className="button clay bl" onClick={removeDeck}>remove deck from your collection</button>
        </div>
    )
}

export default RemoveDeckButton;