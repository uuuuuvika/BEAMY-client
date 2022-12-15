import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import del from "../../Cards/DeleteCardButton/del.png"

const API_URL =  process.env.REACT_APP_API_URL;

function DeleteDeck() {

    const navigate = useNavigate();
    const {deckId} = useParams();

    function deleteElement() {
        if (window.confirm('Are you sure you want to delete this deck?')) {
                axios.delete(`${API_URL}/decks/${deckId}`)
                .then(response => console.log(response.data))
                .catch((error) => console.log(error));
                navigate('/profile');
        }
    }
   
    return (
        <div>
            <button className="button clay card" onClick={deleteElement}>delete deck</button>
        </div>
    )
}

export default DeleteDeck;