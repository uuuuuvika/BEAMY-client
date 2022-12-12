import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function DeleteDeck() {

    const navigate = useNavigate();
    const {deckId} = useParams();

    function deleteElement() {
        if (window.confirm('Are you sure you want to delete this deck?')) {
                axios.delete(`${API_URL}/decks/${deckId}`)
                .then(response => console.log(response.data))
                .catch((error) => console.log(error));
                navigate('/profile')
        }
    }
   
    return (
        <div>
            <button onClick={deleteElement}>DELETE</button>
        </div>
    )
}

export default DeleteDeck;