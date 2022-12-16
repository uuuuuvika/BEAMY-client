import { useState } from "react";
import axios from "axios";
import "./AddCardButton.css";
import authTokenHeader from "../../../token";

const API_URL = process.env.REACT_APP_API_URL;


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
        <div className="edit-name-form">
            <button className="button clay card" onClick={() => setShow(!show)}>{!show ? "add new card" : "hide"}</button>
            {show && (<>
                <form  onSubmit={handleSubmit}>
                    <div>
                        <textarea type="text" name="question" placeholder="front" value={question} onChange={(e) => { setQuesion(e.target.value) }} />
                        <br />
                        <textarea type="text" name="answer" placeholder="back" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
                    </div>
                    <button className="button clay card mrg" type="submit">add card</button>
                </form>
                    </>
            )}
        </div>
    );
}

export default AddCardButton;