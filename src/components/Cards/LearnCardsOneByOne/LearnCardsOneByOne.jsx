// import sampleCards from "../../../samples.json";
import { useEffect, useState } from "react";
import Card from "../Card/Card";



// show all cards one after each other as a part of learning process
function LearnCardsOneByOne({cards}) {
  //console.log("CARDS", cards);

  const [cardsToShow, setCardsToShow] = useState([]);
  const [cardsDunno, setCardsDunno] = useState([]);
  const cardToShow = cardsToShow[0];

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setCardsToShow(shuffle(cards));
  }, [cards]);
  

  if (cardsToShow.length === 0) {
    return <>Done!</>
  }

  function dunno(array) {
    console.log(array)
    return array.reverse()
  }
  console.log("DONT KNOW", cardsDunno)
  console.log("SHOW IT", cardToShow)
  
  return (
    <div>
      <button onClick={() => { setCardsToShow(cardsToShow.slice(1)) }}>
        I KNOW
      </button>
      <button onClick={() => { setCardsDunno(cardsToShow.shift(1)) }}>
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