import { useEffect, useState } from "react";
import Card from "../Card/Card";
// [ TO DO:
//   {userid, deckid, cardid, event (iknow/dontknow), time}
// ]

// nums from 1 to 100
function LearnCardsOneByOne({ cards }) {

  const [cardsToShow, setCardsToShow] = useState([]);
  const [didShuffleCards, setDidShuffleCards] = useState(false);
  const [count, setCount] = useState(0);
  //const [singleSessionAvg, setSingleSessionAvg] = useState(0);

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

  if (cardsToShow.length === 0) {

    console.log("NUM OF CLICKS", count);
    console.log("CARDS IN TOTAL", cards.length);

    // if(count === cards.length) {
    //   setSingleSessionAvg(100)
     
    // }
    // else if(count === cards.length*2) {
    //   setSingleSessionAvg(0)
      
    // }
    // else {
    //   let num = 100 - ((count - cards.length)/cards.length)*100;
    //   setSingleSessionAvg(num)
      
    // }
    //console.log(singleSessionAvg)
    return <>Done!</>
  }

  return (
    <div>
      <button onClick={() => {
        setCardsToShow(cardsToShow.slice(1));
        setCount(count+1);
      }}>
        I KNOW
      </button>

      <button onClick={() => {
        const card = cardsToShow[0];
        setCardsToShow(cardsToShow.slice(1).concat(card));
        setCount(count+1);
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