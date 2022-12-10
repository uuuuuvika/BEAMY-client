import { useState } from "react";
import axios from "axios";
import  authTokenHeader from "../../../token";

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
                //what do i do with response here?
                setQuesion("");
                setAnswer("");
                getData();
            });
    }

    return (
        <div>
            <button onClick={() => setShow(!show)}>{!show ? "click me to add a new card" : "hide"}</button>
            {show && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Question:
                        <input type="text" name="question" value={question} onChange={(e) => { setQuesion(e.target.value) }} />
                    </label>
                    <br />
                    <label>
                        Answer:
                        <input type="text" name="answer" value={answer} onChange={(e) => { setAnswer(e.target.value) }} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default AddCardButton;