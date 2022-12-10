import "./ListOfAllCardsForSpecificDeck.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCardButton from "../AddCardButton/AddCardButton";
import EditDeckButton from "../../Decks/EdditDeckButton/EditDeckButton";
import axios from "axios";
import jwtDecode from 'jwt-decode';

const API_URL = "http://localhost:5005";


// here should be a button : which will allowed user !!who made a collection -> add a card -> from a form)
function ListAllCardsForSpecificDeck() {

    const [allCards, setAllCards] = useState([]);
    const [allCardsLength, setAllCardsLength] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const { deckId } = useParams();

    const token = localStorage.getItem("authToken");
    let user = null;

    if (token) {
        user = jwtDecode(token);
    }

    function getData() {
        //console.log(deckId);
        axios
            .get(`${API_URL}/decks/${deckId}`)
            .then((response) => {
                //console.log(response.data);
                setName(response.data.name);
                setDescription(response.data.description);
                setCreatedBy(response.data.createdBy);
                setAllCards(response.data.flashcards);
                setAllCardsLength(response.data.flashcards.length);

            })
            .catch((error) => console.log(error));
    };
    useEffect(() => getData(), []);

    // console.log("USER:", user._id);
    // console.log("CREATED:", createdBy)

    return (
        <div className="deckPage">
            {/* <input type={"text"} value={name} /> */}
            {/* <input type={"text"} value={description} /> */}
            <h1>{name}</h1>
            <h3>{description}</h3>
            {allCards.map((card) => (
                <div key={card._id}>
                    <div>
                        <p>{card.question}</p>
                    </div>
                </div>
            ))} totall {allCardsLength} cards
        {user && user._id === createdBy ? <AddCardButton getData={getData} deckId={deckId} /> : null}
        {user && user._id === createdBy ? <EditDeckButton name={name} description={description} deckId={deckId} /> : null}
        </div>
    )
}

export default ListAllCardsForSpecificDeck;