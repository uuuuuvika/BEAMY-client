import axios from "axios";
import "./DeleteCardButton.css"
import del from "./del.png";

const API_URL = "http://localhost:5005";


function DeleteCardButton({ cardId, getData }) {

    function deleteElement() {
        if (window.confirm('Are you sure you want to delete this card?')) {
            axios.delete(`${API_URL}/card/${cardId}`)
                .then(response => console.log(response.data))
                .catch((error) => console.log(error));
                getData();
        }
    }

    return (
        <div>
            <img className="icon-button" src={del} style={{width: 20, height: 20}} onClick={deleteElement} />
            <i>delete card</i>
        </div>
    )
}

export default DeleteCardButton;