import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function DeleteDeck() {

    const navigate = useNavigate();
    const {deckId} = useParams();
    console.log(deckId);

    function deleteElement() {
        axios.delete(`${API_URL}/decks/${deckId}`)
        .then(response => console.log(response.data))
        .catch((error) => console.log(error));
        navigate('/profile')
    }

    return (
        <div>
            <button onClick={deleteElement}>DELETE</button>
        </div>
    )
}

export default DeleteDeck;