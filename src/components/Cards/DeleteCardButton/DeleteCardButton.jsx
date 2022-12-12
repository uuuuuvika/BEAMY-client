import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function DeleteCardButton({cardId}) {

    const {deckId} = useParams();
    const navigate = useNavigate();
  
    function deleteElement() {
        console.log(cardId);

        axios.delete(`${API_URL}/card/${cardId}`)
        .then(response => console.log(response.data))
        .catch((error) => console.log(error));
        // FIX NAVIGATION: make component rerender instead of: navigate(`/decks/${deckId}`)
    }

    return (
        <div>
            <button onClick={deleteElement}>DELETE</button>
        </div>
    )
}

export default DeleteCardButton;