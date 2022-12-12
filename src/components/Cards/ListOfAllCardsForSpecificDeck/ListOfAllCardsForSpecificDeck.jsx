import "./ListOfAllCardsForSpecificDeck.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCardButton from "../AddCardButton/AddCardButton";
import StudyBtn from "../StudyBtn/StudyBtn";
import axios from "axios";
import jwtDecode from 'jwt-decode';

const API_URL = "http://localhost:5005";


function ListAllCardsForSpecificDeck() {

    const [allCards, setAllCards] = useState([]);
    const [allCardsLength, setAllCardsLength] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tempName, setTempName] = useState(name);
    const [tempDescription, setTempDescription] = useState(description);
    const [createdBy, setCreatedBy] = useState("");
    const [show, setShow] = useState(false);
    const { deckId } = useParams();

    const token = localStorage.getItem("authToken");
    let user = null;
    if (token) {
        user = jwtDecode(token);
    }

    function getData() {
        axios
            .get(`${API_URL}/decks/${deckId}`)
            .then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setTempName(response.data.name)
                setTempDescription(response.data.description);
                setCreatedBy(response.data.createdBy);
                setAllCards(response.data.flashcards);
                setAllCardsLength(response.data.flashcards.length);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => getData(), []);

    function updateDeck() {
        axios
            .put(`${API_URL}/decks/${deckId}`, { name: tempName, description: tempDescription })
            .then(response => console.log(response.data))
            .catch((error) => console.log(error));
    }

    return (
        < div className="deckPage">
            <div className="study-btn">
                <StudyBtn className="big" deckId={deckId} />
            </div>
            <div>
                {show ? (
                    <form>
                        <input type={"text"} value={tempName} onChange={(event) => setTempName(event.target.value)} /><br />
                        <input type={"text"} value={tempDescription} onChange={(event) => setTempDescription(event.target.value)} />
                        <button onClick={updateDeck}>save</button>
                    </form>)
                    :
                    <>
                        <h1>{name}</h1>
                        <h3>{description}</h3>
                    </>
                }
                {allCards.map((card) => (
                    <div key={card._id}>
                        <div>
                            <p>{card.question}</p>
                        </div>
                    </div>
                ))} totall {allCardsLength} cards
                {user && user._id === createdBy ? <AddCardButton getData={getData} deckId={deckId} /> : null}
                {user && user._id === createdBy ? <button onClick={() => setShow(!show)}>{!show ? "click me to edit your deck" : "cancel"}</button> : null}
            </div>
        </div>
    )
}

export default ListAllCardsForSpecificDeck;