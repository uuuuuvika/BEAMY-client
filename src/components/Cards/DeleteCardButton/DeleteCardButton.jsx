import axios from "axios";

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
            <button onClick={deleteElement}>DELETE</button>
        </div>
    )
}

export default DeleteCardButton;