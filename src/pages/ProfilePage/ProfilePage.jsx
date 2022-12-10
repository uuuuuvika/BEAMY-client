import "./ProfilePage.css";
import { useState } from "react";
import DeckForm from "../../components/Decks/DeckForm/DeckForm";
import UserDecks from "../../components/Decks/UserDecks/UserDecks";
import axios from "axios";
import LearnCardsOneByOne from "../../components/Cards/LearnCardsOneByOne/LearnCardsOneByOne"

const API_URL = "http://localhost:5005";

function ProfilePage() {
  const [userDecks, setAllDecks] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getData = () => {
    axios
      .get(`${API_URL}/decks/my`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setAllDecks(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <UserDecks getData={getData} userDecks={userDecks} />
      <DeckForm getData={getData} />
      <LearnCardsOneByOne />
    </div>
  );
}

export default ProfilePage;