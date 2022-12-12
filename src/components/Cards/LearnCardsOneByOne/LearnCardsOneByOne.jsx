import { useEffect, useState } from "react";
import Card from "../Card/Card";
// [ TO DO:
//   {userid, deckid, cardid, event (iknow/dontknow), time}
// ]

function LearnCardsOneByOne({ cards }) {

  const [cardsToShow, setCardsToShow] = useState([]);
  const [didShuffleCards, setDidShuffleCards] = useState(false);

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

  if (cardsToShow.length === 0) return <>Done!</>

  return (
    <div>
      <button onClick={() => setCardsToShow(cardsToShow.slice(1))}>
        I KNOW
      </button>

      <button onClick={() => {
        const card = cardsToShow[0];
        setCardsToShow(cardsToShow.slice(1).concat(card));
      }}>
        I DON'T KNOW
      </button>

      <div className="clay card">
        <div><Card
          question={cardToShow.question}
          answer={cardToShow.answer}
        /></div>
      </div>
    </div>
  );
}

export default LearnCardsOneByOne;