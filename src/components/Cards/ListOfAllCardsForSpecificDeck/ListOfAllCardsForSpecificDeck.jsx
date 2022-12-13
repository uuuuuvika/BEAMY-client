import "./ListOfAllCardsForSpecificDeck.css"
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import AddCardButton from "../AddCardButton/AddCardButton";
import StudyBtn from "../StudyBtn/StudyBtn";
import AddDeckButton from "../../Decks/AddDeckButton/AddDeckButton";
import axios from "axios";
// import jwtDecode from 'jwt-decode';
import DeleteDeck from "../../Decks/DeleteButton/DeleteDeck";
import DeleteCardButton from "../DeleteCardButton/DeleteCardButton";
import RemoveDeckButton from "../../Decks/RemoveDeckButton/RemoveDeckButton";
import Stats from "../../Stats/Stats";

const API_URL = "http://localhost:5005";

// TO DO: check out for THE LOOP!
function ListAllCardsForSpecificDeck() {

    const [allCards, setAllCards] = useState([]);
    const [allCardsLength, setAllCardsLength] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tempName, setTempName] = useState(name);
    const [tempDescription, setTempDescription] = useState(description);
    const [createdBy, setCreatedBy] = useState("");
    const [adoptedBy, setAdoptedBy] = useState([]);
    const [show, setShow] = useState(false);

    const { deckId } = useParams();
    const {user} = useContext(AuthContext);

    function getData() {
        axios
            .get(`${API_URL}/decks/${deckId}`)
            .then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setTempName(response.data.name)
                setTempDescription(response.data.description);
                setCreatedBy(response.data.createdBy);
                setAdoptedBy(response.data.adoptedBy);
                setAllCards(response.data.flashcards);
                setAllCardsLength(response.data.flashcards.length);
            })
            .catch((error) => console.log(error));
    };
    // useEffect(() => {
    //     if (adoptedBy.length === 0) {
    //         getData();
    //     }
    // }, [adoptedBy]);

    useEffect(() => {
       getData();
    }, []);

    function updateDeck() {
        axios
            .put(`${API_URL}/decks/${deckId}`, { name: tempName, description: tempDescription })
            .then(response => console.log(response.data))
            .catch((error) => console.log(error));
    }

    return (
        < div className="deckPage">
            <div className="study-btn">
                <StudyBtn deckId={deckId} />
            </div>
            <div className="list-of-cards">
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
                        {show ? (
                            <div>
                                <p>{card.question}</p>
                                <DeleteCardButton cardId={card._id} getData={getData} />
                            </div>)
                            :
                            <>
                                <p>{card.question}</p>
                            </>
                        }
                    </div>
                ))} <i>total {allCardsLength} cards</i>
                <div className="deck-buttons">
                    {user && user._id === createdBy ? <AddCardButton getData={getData} deckId={deckId} /> : null}
                    {user && user._id === createdBy ? <button onClick={() => setShow(!show)}>{!show ? "click me to edit your deck" : "cancel"}</button> : null}
                    {user && user._id === createdBy ? <DeleteDeck /> : null}
                    {user && user._id !== createdBy 
                                        && !adoptedBy.includes(user._id)
                                        ? <AddDeckButton onClick={() => setAdoptedBy(adoptedBy.concat([user._id]))} /> 
                                        : null}
                    {user && user._id !== createdBy && adoptedBy.includes(user._id) ? <RemoveDeckButton /> : null}
                </div>
                <Stats />
            </div>
        </div >
    )
}

export default ListAllCardsForSpecificDeck;