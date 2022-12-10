import sampleCards from "../../../samples.json";
import { useEffect, useState } from "react";
import Card from "../Card/Card";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// show all cards one after each other as a part of learning process
function LearnCardsOneByOne() {

  const [cardsToShow, setCardsToShow] = useState([]);
  const cardToShow = cardsToShow[0];

  useEffect(() => {
    // i will be getting CARDS data here 
    setCardsToShow(shuffle(sampleCards));
  }, []);
  
  if (cardsToShow.length === 0) {
    return <>Done!</>
  }
  return (
    <div>
      <button onClick={() => { setCardsToShow(cardsToShow.slice(1)) }}>
        next
      </button>

      <div className="clay card" >
       <p><Card 
          question={cardToShow.question}
          answer={cardToShow.answer}
        /></p>
      </div>
    </div>
  );
}

export default LearnCardsOneByOne;