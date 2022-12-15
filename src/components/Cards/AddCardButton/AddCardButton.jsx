import { useState } from "react";
import axios from "axios";
import "./AddCardButton.css"
import add from "./add.png";
import authTokenHeader from "../../../token";

const API_URL = "http://localhost:5005";


function AddCardButton({ getData, deckId }) {

    const [show, setShow] = useState(false);
    const [question, setQuesion] = useState("");
    const [answer, setAnswer] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const body = { question, answer };
        axios
            .post(`${API_URL}/decks/${deckId}/card`, body, { headers: authTokenHeader() })
            .then((response) => {
                setQuesion("");
                setAnswer("");
                getData();
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="add-form">
            <button className="button clay card" onClick={() => setShow(!show)}>{!show ? "add new card" : "hide"}</button>
            {show && (
                <form className="form" onSubmit={handleSubmit}>
                    <textarea type="text" name="question" placeholder="front" value={question} onChange={(e) => { setQuesion(e.target.value) }} />
                    <br />
                    <textarea type="text" name="answer"  placeholder="back" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
                    <button className="button clay blue marg" type="submit">add card</button>
                </form>
            )}
        </div>
    );
}

export default AddCardButton;