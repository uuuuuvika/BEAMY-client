import "./ProfilePage.css";
import { useState } from "react";
import DeckForm from "../../components/Decks/DeckForm/DeckForm";
import UserDecks from "../../components/Decks/UserDecks/UserDecks";
import axios from "axios";
import authTokenHeader from "../../token.jsx";
//import LearnCardsOneByOne from "../../components/Cards/LearnCardsOneByOne/LearnCardsOneByOne";

const API_URL = "http://localhost:5005";

function ProfilePage() {

  const [userDecks, setAllDecks] = useState([]);
  //const storedToken = localStorage.getItem("authToken");
  
  function getData() {
    axios
      .get(`${API_URL}/decks/my`, { headers: authTokenHeader() })
      .then((response) => setAllDecks(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <UserDecks getData={getData} userDecks={userDecks} />
      <DeckForm getData={getData} />
      {/* <LearnCardsOneByOne /> */}
    </>
  );
}

export default ProfilePage;