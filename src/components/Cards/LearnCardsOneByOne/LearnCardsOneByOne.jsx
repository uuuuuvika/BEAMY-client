import axios from "axios";
import "./LearnCardsOneByOne.css"
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import Card from "../Card/Card";
import back from "./back.png";

// const API_URL = "http://localhost:5005";
const API_URL = process.env.REACT_APP_API_URL;
//css piper    visbag

function LearnCardsOneByOne({ cards }) {

    const [cardsToShow, setCardsToShow] = useState([]);
    const [didShuffleCards, setDidShuffleCards] = useState(false);
    const [count, setCount] = useState(0);
    const { user } = useContext(AuthContext);
    const { deckId } = useParams();
    const navigate = useNavigate();

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        if (cards.length === 0) {
            return;
        }
        if (!didShuffleCards) {
            setCardsToShow(shuffle(cards));
            setDidShuffleCards(true);
        }
    }, [cards, cardsToShow]);

    const cardToShow = cardsToShow[0];

    if (didShuffleCards && cardsToShow.length === 0) {
        const body = { user, numCardsInDeck: cards.length, numClicks: count }
        axios
            .post(`${API_URL}/stats/${deckId}`, body)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            {cardsToShow.length === 0
                ? <div className="vertical">
                    Done!
                    <button className="button clay card" onClick={() => { window.location.reload() }}>
                        study again
                    </button>
                    <button className="button clay card" onClick={() => navigate(-1)}>
                        back 
                    </button>
                </div>
                :
                <div>
                    <div className="button clay card-w-margin">
                        <div><Card
                            question={cardToShow.question}
                            answer={cardToShow.answer}
                        /></div>
                    </div>
                    <div>
                        <div className="some"> 
                            <button className="button clay blue" onClick={() => {
                                const card = cardsToShow[0];
                                setCardsToShow(cardsToShow.slice(1).concat(card));
                                setCount(count + 1);
                            }}>
                                no idea...
                            </button>
                            <button className="button clay blue" onClick={() => {
                                setCardsToShow(cardsToShow.slice(1));
                                setCount(count + 1);
                            }}>
                                i knew it!
                            </button>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default LearnCardsOneByOne;