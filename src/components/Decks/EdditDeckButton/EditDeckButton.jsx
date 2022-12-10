import { useState } from "react";
import axios from "axios";
import  authTokenHeader from "../../../token";

const API_URL = "http://localhost:5005";


function EditDeckButton({ name, description, deckId }) {

    console.log(name)
    console.log(description)

    const [edit, setEdit] = useState(false);
    // const [newName, setNewName] = useState(name);
    // const [newDescription, setNewDescription] = useState(description);

    // axios
    //     .put(`${API_URL}/decks/${deckId}`)
    
   
    return (
        <div>
            <button onClick={() => setEdit(!edit)}>click me edit your deck</button> 
            {/* if setEdit activated want to toggle divs in parent (listOfAllCards..), so p will become input */}
        </div>
    );
}

export default EditDeckButton;