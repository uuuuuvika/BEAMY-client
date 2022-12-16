import "./ListOfAllCardsForSpecificDeck.css"
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
                setTempName(response.data.name)
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

    function updateDeck() {
        axios
            .put(`${API_URL}/decks/${deckId}`, { name: tempName, description: tempDescription })
            .then(response => console.log(response.data))
            .catch((error) => console.log(error));
    }

    return (
        < div className="deckPage">
            <div className="chart">
                {user && !show ? <Stats />
                    :
                    <div className="deck-buttons">
                        {user && user._id === createdBy && show ? <AddCardButton getData={getData} deckId={deckId} /> : null}

                        {/* {user && user._id === createdBy
                        ? <div><button className="button clay card" onClick={() => setShow(!show)}>{!show ? "click me to edit your deck" : "cancel"}</button></div>
                        : null} */}
                    </div>}

            </div>
            <div className="list-of-cards">
                {show ? (
                    <form className="edit-name-form">
                        <div className="bbb">
                            <>
                                <button className="button clay card" onClick={updateDeck}>save changes</button>
                            </>
                            {user && user._id === createdBy && show ? <DeleteDeck /> : null}
                        </div>
                        <textarea type={"text"} value={tempName} onChange={(event) => setTempName(event.target.value)} /><br />
                        <textarea type={"text"} value={tempDescription} onChange={(event) => setTempDescription(event.target.value)} />
                    </form>)
                    :
                    <>
                        <h1>{name}</h1>
                        <div className="study-btn">
                            <StudyBtn deckId={deckId} />
                            {user && user._id === createdBy
                                ? <div><button className="button clay card" onClick={() => setShow(!show)}>{!show ? "edit" : "cancel"}</button></div>
                                : null}
                        </div>
                        <h3>{description}</h3>
                    </>
                }
                {allCards.map((card) => (
                    <div key={card._id}>
                        {show ? (
                            <div className="card-with-del-btn">
                                <DeleteCardButton cardId={card._id} getData={getData} />
                                <p>{card.question}</p>
                            </div>)
                            :
                            <>
                                <p>{card.question}</p>
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
        </div>



    )
}

export default ListAllCardsForSpecificDeck;