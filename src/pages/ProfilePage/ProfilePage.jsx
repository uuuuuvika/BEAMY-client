import "./ProfilePage.css";
import { useState } from "react";
import DeckForm from "../../components/Decks/DeckForm/DeckForm";
import UserDecks from "../../components/Decks/UserDecks/UserDecks";
import axios from "axios";
import authTokenHeader from "../../token.jsx";

const API_URL =  process.env.REACT_APP_API_URL;


function ProfilePage() {
  
  const [userDecks, setAllDecks] = useState([]);

  function getData() {
    axios
      .get(`${API_URL}/decks/my`, { headers: authTokenHeader() })
      .then((response) => setAllDecks(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="page-layout">
      <DeckForm getData={getData} />
      <UserDecks getData={getData} userDecks={userDecks} />
    </div>
  );
}

export default ProfilePage;