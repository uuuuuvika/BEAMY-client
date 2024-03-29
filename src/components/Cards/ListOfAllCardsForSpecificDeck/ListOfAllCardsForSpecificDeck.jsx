import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import AddCardButton from "../AddCardButton/AddCardButton";
import StudyBtn from "../StudyBtn/StudyBtn";
import AddDeckButton from "../../Decks/AddDeckButton/AddDeckButton";
import axios from "axios";
import DeleteDeck from "../../Decks/DeleteButton/DeleteDeck";
import DeleteCardButton from "../DeleteCardButton/DeleteCardButton";
import RemoveDeckButton from "../../Decks/RemoveDeckButton/RemoveDeckButton";
import Stats from "../../Stats/Stats";

const API_URL = process.env.REACT_APP_API_URL;

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
    const { user } = useContext(AuthContext);

    function getData() {
        axios
            .get(`${API_URL}/decks/${deckId}`)
            .then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setTempName(response.data.name);
                setTempDescription(response.data.description);
                setCreatedBy(response.data.createdBy);
                setAdoptedBy(response.data.adoptedBy);
                setAllCards(response.data.flashcards);
                setAllCardsLength(response.data.flashcards.length);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getData();
    }, []);

    function handleClick() {
        updateDeck();
    };

    function updateDeck() {
        axios
            .put(`${API_URL}/decks/${deckId}`, { name: tempName, description: tempDescription })
            .then(response => {
                console.log(response.data)
            })
            .catch((error) => console.log(error));
    }

    return (
        < div className="deckPage">
            <div className="list-of-cards">
                {show ? (
                    <form className="edit-name-form">
                        <div className="save-and-delete-buttons">
                            <button className="button clay card" onClick={handleClick}>save changes</button>
                            {user && user._id === createdBy && show ? <DeleteDeck /> : null}
                        </div>
                        <textarea type={"text"} value={tempName} onChange={(event) => setTempName(event.target.value)} /><br />
                        <textarea type={"text"} value={tempDescription} onChange={(event) => setTempDescription(event.target.value)} />
                    </form>)
                    :
                    <>
                        <h2>{name}</h2>
                        <div className="study-btn">
                            <StudyBtn deckId={deckId} />
                            {user && user._id === createdBy
                                ? <div><button className="button clay card" onClick={() => setShow(!show)}>{!show ? "edit deck" : "cancel"}</button></div>
                                : null}
                        </div>
                        <p className="wrapping-description">{description}</p>
                    </>
                }
                {allCards.map((card, i) => (
                    <div key={card._id}>
                        {show ? (
                            <div className="card-with-del-btn">
                                <DeleteCardButton cardId={card._id} getData={getData} />
                                <p>{card.question}</p>
                            </div>)
                            :
                            <>
                                <p>{i + 1}. <span className="blue-text-not-link">{card.question}</span> /  {card.answer}</p>
                            </>
                        }
                    </div>

                ))} <p><i>total {allCardsLength} cards</i></p>
                {user && user._id !== createdBy && adoptedBy.includes(user._id) ? <RemoveDeckButton /> : null}
                {user && user._id !== createdBy
                    && !adoptedBy.includes(user._id)
                    ? <AddDeckButton onClick={() => setAdoptedBy(adoptedBy.concat([user._id]))} />
                    : null}
            </div>
            <div className="chart">
                {user && !show ? <Stats />
                    :
                    <div className="deck-buttons">
                        {user && user._id === createdBy && show ? <AddCardButton getData={getData} deckId={deckId} /> : null}
                    </div>}
            </div>
        </div>
    )
}

export default ListAllCardsForSpecificDeck;