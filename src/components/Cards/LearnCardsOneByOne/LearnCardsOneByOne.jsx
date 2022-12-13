import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import Card from "../Card/Card";

const API_URL = "http://localhost:5005";

// nums from 1 to 100
function LearnCardsOneByOne({ cards }) {

    const [cardsToShow, setCardsToShow] = useState([]);
    const [didShuffleCards, setDidShuffleCards] = useState(false);
    const [count, setCount] = useState(0);
    const user = useContext(AuthContext);
    const { deckId } = useParams();

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

        console.log("NUM OF CLICKS", count);
        console.log("CARDS IN TOTAL", cards.length);

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
            {cardsToShow.length === 0 ? <a href="/profile">Done!</a>
                :
                <div>
                    <button onClick={() => {
                        setCardsToShow(cardsToShow.slice(1));
                        setCount(count + 1);
                    }}>
                        I KNOW
                    </button>

                    <button onClick={() => {
                        const card = cardsToShow[0];
                        setCardsToShow(cardsToShow.slice(1).concat(card));
                        setCount(count + 1);
                    }}>
                        I DON'T KNOW
                    </button>

                    <div className="clay card">
                        <div><Card
                            question={cardToShow.question}
                            answer={cardToShow.answer}
                        /></div>
                    </div>
                </div>}
        </div>
    );
}

export default LearnCardsOneByOne;