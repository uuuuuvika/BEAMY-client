import { useState, useEffect } from "react";
import axios from "axios";
import LearnCardsOneByOne from "../../components/Cards/LearnCardsOneByOne/LearnCardsOneByOne";
import { useParams } from "react-router-dom";

const API_URL =  process.env.REACT_APP_API_URL;


function StudyPage() {

    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    
    function getCards() {
        axios
          .get(`${API_URL}/decks/${deckId}/card`)
          .then((response) => {
            //console.log(response.data)
            setCards(response.data)
        })
          .catch((error) => console.log(error));
      };

    useEffect(() => {
        getCards();
    }, []);

    return (
        <>
         <LearnCardsOneByOne cards={cards} />
        </>
    );
}

export default StudyPage;